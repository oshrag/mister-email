import { emailService } from "../services/email.service";
import { utilService } from "../services/util.service.js";

import { useEffect, useState } from "react";
import {
  Link,
  useParams,
  useSearchParams,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from "../cmps/EmailFilter";
import { EmailSort } from "../cmps/EmailSort";
import { EmailFilterFolder } from "../cmps/EmailFilterFolder";
import { EmailFolderList } from "../cmps/EmailFolderList";
import { EmailSidebar } from "../cmps/EmailSidebar";
import { EmailCompose } from "../cmps/EmailCompose";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export function EmailIndex() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [emails, setEmails] = useState(null);
  const [unReadCount, setUnReadCount] = useState(0);
  const [filterBy, setFilterBy] = useState(
    emailService.getFilterFromSearchParams(searchParams)
  );
  // const [sortOrder, setSortOrder] = useState(emailService.getDefaultSort())
  const [sortBy, setSortBy] = useState(
    emailService.getSortFromSearchParams(searchParams)
  );

  useEffect(() => {
    updateUnReadCount();
  }, [emails]);

  useEffect(() => {
    //setSearchParams({ ...filterBy, ...sortBy });
    renderSearchParams();
    loadEmails();
  }, [filterBy, sortBy, params.folder]);

  async function updateUnReadCount() {
    const value = await emailService.getUnCountRead();
    setUnReadCount(value);
  }

  function renderSearchParams() {
    // Build your obj for search params - do it to in a cool service clean function ;)
    const filterForParams = {
      txt: filterBy.txt || "",
      isRead: filterBy.isRead + "" || "",
      isStarred: filterBy.isStarred || "",
      sortBy: sortBy.by || "",
      compose: searchParams.get("compose") || "",
      to: searchParams.get("to") || "",
      subject: searchParams.get("subject") || "",
    };
    setSearchParams(filterForParams);
  }

  async function loadEmails() {
    try {
      const emails = await emailService.query(
        { ...filterBy, status: params.folder },
        sortBy
      );
      setEmails(emails);
    } catch (error) {
      console.log("Having issues with loading emails:", error);
      showUserMsg("Problem!");
    }
  }

  async function onDeleteEmail(emailId) {
    console.log("EmailIndex onDeleteEmail");

    try {
      await emailService.remove(emailId);
      setEmails((prevEmails) =>
        prevEmails.filter((email) => email.id !== emailId)
      );
    } catch (error) {
      console.log("Having issues deleting email:", error);
    }
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  }

  function onSetSort(sortBy) {
    setSortBy((prevSort) => ({ ...prevSort, ...sortBy }));
  }

  async function onEmailStatusChange(id, propertyName, value) {
    console.log("EmailIndex onEmailStatusChange");

    try {
      const emailToSave = emails.find((email) => email.id === id);

      const updatedEmailToSave = { ...emailToSave, [propertyName]: value };
      await emailService.save(updatedEmailToSave);
      loadEmails();
    } catch (error) {
      console.log("Having issues saving email after star toogle:", error);
    }
  }

  async function onUpdateEmail(mail) {
    try {
      const updatedMail = await emailService.save(mail);
      //* different folders require different state updates (Eg. Draft mail should be removed when sent and otherwise mail should be updated)
      if (params.folder === "draft" && updatedMail.sentAt) {
        setEmails((prevMails) =>
          prevMails.filter((m) => m.id !== updatedMail.id)
        );
      } else if (params.folder === "sent" && updatedMail.sentAt) {
        setEmails((prevMails) => [updatedMail, ...prevMails]);
      } else {
        setEmails((prevMails) =>
          prevMails.map((mail) =>
            mail.id === updatedMail.id ? updatedMail : mail
          )
        );
      }
    } catch (err) {
      showErrorMsg("Can not update mail");
      console.log("Had issues updating mail", err);
    }
  }

  async function onAddEmail(mail) {
    try {
      const savedMail = await emailService.save({ ...mail });
      if (
        (params.folder === "sent" && savedMail.sentAt) ||
        (params.folder === "draft" && !savedMail.sentAt)
      ) {
        setEmails((prevMails) => [savedMail, ...prevMails]);
      }
      const msg = !savedMail.sentAt
        ? "Mail saved to draft"
        : "Mail Sent to " + savedMail.to;
      showSuccessMsg(msg);
      return savedMail;
    } catch (err) {
      showErrorMsg("Sending mail failed");
      console.log("Had issues sending mail", err);
    }
  }

  // async function onSaveEmail(newEmailToSave) {
  //   try {
  //     console.log("onSaveEmail newEmailToSave:", newEmailToSave);
  //     let entitywithID = await emailService.save(newEmailToSave);
  //     // setEmails(prevEmails => [ ...prevEmails, entitywithID ])
  //     console.log("onSaveEmail entitywithID:", entitywithID);
  //     const closePath = `/email/${params.folder}`;
  //     navigate(closePath);
  //   } catch (error) {
  //     console.log("Having issues saving email after edit:", error);
  //   }
  //   loadEmails(); //new mail will appeare acoording to relevant folder
  // }

  // async function onSaveDraft(newEmailToSave) {
  //   try {
  //     let entitywithID = await emailService.save(newEmailToSave);

  //     setEmails((prevMails) =>
  //       prevMails.map((mail) =>
  //         mail.id === entitywithID.id ? entitywithID : mail
  //       )
  //     );

  //     //setEmails((prevEmails) => [...prevEmails, entitywithID]);
  //     // const closePath = `/email/${params.folder}`
  //     // navigate(closePath)
  //     return entitywithID;
  //   } catch (error) {
  //     console.log("Having issues saving email draft:", error);
  //   }
  //   loadEmails(); //new mail will appeare acoording to relevant folder
  // }

  const isComposeOpen = !!searchParams.get("compose");
  const { text, isRead } = filterBy;
  if (!emails) return <div>Loading...</div>;
  return (
    <section className="email-index">
      <EmailFilter onSetFilterBy={onSetFilterBy} filterBy={{ text, isRead }} />

      <aside>
        <EmailSidebar unReadCount={unReadCount} />
      </aside>
      <section className="email-list-container">
        {/* If no params! show sort and list */}
        {!params.emailId && <EmailSort sortBy={sortBy} onSetSort={onSetSort} />}

        {!params.emailId && (
          <EmailList
            emails={emails}
            onDeleteEmail={onDeleteEmail}
            onEmailStatusChange={onEmailStatusChange}
          />
        )}
        {/* If params! show details via outlet */}
        {params.emailId && <Outlet />}
      </section>

      {isComposeOpen && (
        <EmailCompose
          onAddEmail={onAddEmail}
          onUpdateEmail={onUpdateEmail}
          folder={params.folder}
        />
      )}
    </section>
  );
}
