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

export function EmailIndex() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [emails, setEmails] = useState(null);
  const [unReadCount, setUnReadCount] = useState(0);
  const [filterBy, setFilterBy] = useState(
    emailService.getFilterFromSearchParams(searchParams)
  );
  // const [sortOrder, setSortOrder] = useState(emailService.getDefaultSort())
  const [sort2, setSort2] = useState(
    emailService.getSortFromSearchParams(searchParams)
  );

  useEffect(() => {
    updateUnReadCount();
  }, [emails]);

  useEffect(() => {
    setSearchParams({ ...filterBy, ...sort2 });
    loadEmails();
  }, [filterBy, sort2, params.folder]);

  async function updateUnReadCount() {
    const value = await emailService.getUnCountRead();
    setUnReadCount(value);
  }

  async function loadEmails() {
    try {
      const emails = await emailService.query(
        { ...filterBy, status: params.folder },
        sort2
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

  function onSetSort2(sort) {
    // setSort2((prevSort2) => ({ by: sort.by, dir: prevSort2.dir * -1 }));
    setSort2(sort);
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

  async function onSaveEmail(newEmailToSave) {
    try {
      console.log("onSaveEmail newEmailToSave:", newEmailToSave);
      let entitywithID = await emailService.save(newEmailToSave);
      // setEmails(prevEmails => [ ...prevEmails, entitywithID ])
      console.log("onSaveEmail entitywithID:", entitywithID);
      const closePath = `/email/${params.folder}`;
      navigate(closePath);
    } catch (error) {
      console.log("Having issues saving email after edit:", error);
    }
    loadEmails(); //new mail will appeare acoording to relevant folder
  }

  async function onSaveDraft(newEmailToSave) {
    try {
      let entitywithID = await emailService.save(newEmailToSave);
      // setEmails(prevEmails => [ ...prevEmails, entitywithID ])
      // const closePath = `/email/${params.folder}`
      // navigate(closePath)
      return entitywithID;
    } catch (error) {
      console.log("Having issues saving email draft:", error);
    }
    // loadEmails() //new mail will appeare acoording to relevant folder
  }

  const editPath = `/email/${params.folder}/edit/`;
  const { text, isRead } = filterBy;
  if (!emails) return <div>Loading...</div>;
  return (
    <section className="email-index">
      <EmailFilter onSetFilterBy={onSetFilterBy} filterBy={{ text, isRead }} />

      <aside>
        <Link to={editPath}>Compose</Link>
        {/* <EmailFilterFolder  onSetFilterBy={onSetFilterBy} filterBy={{status}}/> */}
        <EmailFolderList count={unReadCount} />
      </aside>
      <section className="email-list-container">
        <EmailSort sort2={sort2} onSetSort2={onSetSort2} />
        <EmailList
          emails={emails}
          onDeleteEmail={onDeleteEmail}
          onEmailStatusChange={onEmailStatusChange}
        />
      </section>

      <Outlet context={{ onSaveEmail, onSaveDraft }} />
    </section>
  );
}
