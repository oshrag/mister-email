import { useState, useEffect, useRef } from "react";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { emailService } from "../services/email.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { useSaveToDraft } from "../customHooks/useSaveToDraft.js";
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js";
import { useForm } from "../customHooks/useForm.js";
import * as Yup from "yup";
import { useFormik } from "formik";

export function EmailCompose2({ onAddEmail, onUpdateEmail, folder }) {
  const params = useParams();
  const navigate = useNavigate();
  const [viewState, setViewState] = useState("normal");
  const [searchParams, setSearchParams] = useSearchParams();

  const SignupSchema = Yup.object().shape({
    to: Yup.string().email("Invalid email").required("Required!!"),
    subject: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    body: Yup.string()
      .min(2, "Too Short!")
      .max(500, "Too Long!")
      .required("Required"),
  });

  const [email, setEmail] = useState(
    emailService.getMailFromSearchParams(searchParams)
  );

  //   const [email, handleChange, setEmail] = useForm(
  //     emailService.getMailFromSearchParams(searchParams)
  //   );

  const formik = useFormik({
    initialValues: {
      to: email.to,
      subject: email.subject,
      body: email.body,
    },
    validationSchema: SignupSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("on submit values: ", values);
      onSubmitEmail(values);
      //   alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    const emailId = searchParams.get("compose");
    if (emailId && emailId !== "new") {
      emailService.getById(emailId).then(setEmail);
    }
  }, []);

  const onCancelSaveToDraft = useSaveToDraft(
    { ...email, ...formik.values },
    onSaveDraft
  );

  useEffectUpdate(() => {}, [viewState]);

  // useEffectUpdate(() => {
  //   if (timeoutRef.current) {
  //     clearTimeout(timeoutRef.current);
  //     timeoutRef.current = null;
  //   }

  //   timeoutRef.current = setTimeout(() => onSaveDraft(email), 5000);

  //   // return () => {
  //   //   clearTimeout(timeoutRef.current);
  //   //   timeoutRef.current = null;
  //   // };
  // }, [email]);

  async function onSaveDraft(email) {
    try {
      if (!email.id) {
        const addedMail = await onAddEmail(email);
        // Update new mail ID for next uses
        setEmail(addedMail);
      } else {
        onUpdateEmail(email);
      }
      showSuccessMsg("Draft saved");
    } catch (err) {
      console.log("err:", err);
      showErrorMsg("Error saving draft");
    }
  }

  // function handleChange({ target }) {
  //   let { name: field, value, type } = target;
  //   switch (type) {
  //     case "number":
  //     case "range":
  //       value = +value;
  //       break;
  //     case "checkbox":
  //       value = target.checked;
  //     default:
  //       break;
  //   }
  //   setEmail((prevEmail) => ({ ...prevEmail, [field]: value }));
  // }

  function onSubmitEmail(values) {
    onSaveDraft({ ...email, ...values, sentAt: Date.now(), status: "sent" });
    onCancelSaveToDraft();
    navigate(`/email/${folder}`);
  }

  function onChangeView(view) {
    setViewState(view);
  }

  const closePath = `/email/${params.folder}`;

  const { subject, body, from, to } = formik.values;

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

      <form onSubmit={formik.handleSubmit}>
        <input
          name="to"
          type="text"
          placeholder="To"
          value={to}
          onChange={formik.handleChange}
        ></input>
        {formik.errors.to && formik.touched.to && (
          <strong>{formik.errors.to}</strong>
        )}
        <input
          name="subject"
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={formik.handleChange}
        ></input>
        {formik.errors.subject && formik.touched.subject && (
          <strong>{formik.errors.subject}</strong>
        )}
        <textarea
          name="body"
          value={body}
          onChange={formik.handleChange}
        ></textarea>
        {formik.errors.body && formik.touched.body && (
          <strong>{formik.errors.body}</strong>
        )}

        <button className="send" type="submit">
          send
        </button>
      </form>
    </section>
  );
}
