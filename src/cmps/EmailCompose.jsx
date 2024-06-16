import { useState, useEffect, useRef } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
import { emailService } from "../services/email.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
// import { useSaveToDraft } from "../customHooks/useSaveToDraft.js";
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js";
import { ViewStream } from "@mui/icons-material";

export function EmailCompose() {
  const params = useParams();
  const [viewState, setViewState] = useState("normal");
  const { onSaveEmail, onSaveDraft } = useOutletContext();
  const [email, setEmail] = useState(emailService.createEmail);
  const timeoutRef = useRef();

  useEffect(() => {
    if (params.emailId) {
      loadEmail();
    }
  }, []);

  // const onCancelSaveToDraft = useSaveToDraft(email, onAutoSaveDraft);

  useEffectUpdate(() => {}, [viewState]);

  useEffectUpdate(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    timeoutRef.current = setTimeout(() => onAutoSaveDraft(email), 5000);

    return () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };
  }, [email]);

  async function loadEmail() {
    try {
      const email = await emailService.getById(params.emailId);
      setEmail(email);
    } catch (error) {
      console.log("error:", error);
    }
  }

  async function onAutoSaveDraft(email) {
    try {
      //onSaveDraft(email)
      if (!email.id) {
        //const addedMail = await onAddMail(email)
        const addedMail = await onSaveDraft({ ...email, status: "draft" });
        // Update new mail ID for next uses
        setEmail(addedMail);
      } else {
        onSaveDraft(email);
        //onUpdateMail({ ...email })
      }
      showSuccessMsg("Draft saved");
    } catch (err) {
      console.log("err:", err);
      showErrorMsg("Error saving draft");
    }
  }

  function handleChange({ target }) {
    let { name: field, value, type } = target;
    switch (type) {
      case "number":
      case "range":
        value = +value;
        break;
      case "checkbox":
        value = target.checked;
      default:
        break;
    }
    setEmail((prevEmail) => ({ ...prevEmail, [field]: value }));
  }

  function onSubmitEmail(ev) {
    ev.preventDefault();
    onSaveEmail({ ...email, sentAt: Date.now(), status: "sent" });
  }

  function onChangeView(view) {
    setViewState(view);
  }

  const closePath = `/email/${params.folder}`;

  const { subject, body, from, to } = email;

  return (
    <section className={`email-compose ${viewState}`}>
      <section className="compose-header">
        <span>{email.id ? "edit" : "new"} email </span>{" "}
        {viewState !== "normal" ? (
          <span
            className="material-symbols-outlined"
            onClick={() => onChangeView("normal")}
          >
            add
          </span>
        ) : null}
        {viewState !== "minimize" ? (
          <span
            className="material-symbols-outlined"
            onClick={() => onChangeView("minimize")}
          >
            minimize
          </span>
        ) : null}
        {viewState !== "maximize" ? (
          <span
            className="material-symbols-outlined"
            onClick={() => onChangeView("maximize")}
          >
            open_in_full
          </span>
        ) : null}
        <Link to={closePath}>
          <span className="material-symbols-outlined">close</span>
        </Link>
      </section>

      <form onSubmit={onSubmitEmail}>
        {/* <label>To</label> */}
        <input
          name="to"
          type="text"
          placeholder="To"
          value={to}
          onChange={handleChange}
        ></input>
        {/* <label>Subject</label> */}
        <input
          name="subject"
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={handleChange}
        ></input>
        {/* <label>content</label> */}
        <textarea name="body" value={body} onChange={handleChange}></textarea>

        <button className="send">send</button>
      </form>
    </section>
  );
}
