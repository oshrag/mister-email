import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { emailService } from "../services/email.service";

export function EmailDetails() {
  const [email, setEmail] = useState(null);
  const params = useParams();

  useEffect(() => {
    loadEmail();
  }, [params.emailId]);

  async function loadEmail() {
    const email = await emailService.getById(params.emailId);
    if (!email.isRead) {
      await emailService.save({ ...email, isRead: true });
    }
    setEmail(email);
  }

  if (!email) return <div>Loading...</div>;
  return (
    <section className="email-details">
      <h2>subject : {email.subject}</h2>
      <section className="from-to">
        <span>from : {email.from}</span>
        <span>to : {email.to}</span>
      </section>
      <section className="date">{email.sentAt}</section>
      <section className="content">
        <p>{email.body}</p>
      </section>
      {/* <Link to="/robot">Back</Link>
            <Link to="/robot/r4">Next Robot</Link> */}
    </section>
  );
}
