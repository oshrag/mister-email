import { Link, useNavigate, useParams } from "react-router-dom";

import { utilService } from "../services/util.service.js";
import { emailService } from "../services/email.service.js";

export function EmailPreview({
  email,
  onDelete,
  onRemove,
  onStar,
  onToogleRead,
  folder,
}) {
  const params = useParams();
  const editPath = `/email/${params.folder}/?compose=${email.id}`;
  const navigate = useNavigate();

  return (
    <article
      className={`email-preview ${email.isRead ? "read" : ""}`}
      onClick={() => {
        navigate(`/email/${folder}/${email.id}`);
      }}
    >
      <div className="inner">
        <p className="star-check">
          <input type="checkbox" />
          <button
            className={`star ${email.isStarred ? "stared" : ""}`}
            onClick={(event) => {
              event.stopPropagation();
              onStar();
            }}
          >
            s
          </button>
        </p>
        <p>
          {" "}
          {emailService.getLogedOnUser().email == email.from
            ? `To: ${email.to}`
            : `${email.from}`}{" "}
        </p>
        <div className="subject-exerpt">
          <p> {email.subject} </p>
          <p className="exerpt"> {email.body}</p>
          {/* <p className="exerpt" > {utilService.getXWords( email.body, 20)}  </p> */}
        </div>
        <p className="dateAndButtons">
          {email.sentAt ? (
            <span className="date">
              {" "}
              {utilService.getDateDayMonth(email.sentAt)}{" "}
            </span>
          ) : (
            <span className="date">draft</span>
          )}

          {!email.sentAt ? (
            <button
              className="edit"
              onClick={(ev) => {
                ev.stopPropagation();
                navigate(editPath);
              }}
            >
              {" "}
              edit
            </button>
          ) : null}

          {email.removedAt ? (
            <button
              className="delete"
              onClick={(event) => {
                event.stopPropagation();
                onDelete();
              }}
            >
              delete
            </button>
          ) : (
            <button
              className="delete"
              onClick={(event) => {
                event.stopPropagation();
                onRemove();
              }}
            >
              delete
            </button>
          )}

          <button
            className="archive"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            archive
          </button>
          <button
            className="toogleRead"
            onClick={(event) => {
              event.stopPropagation();
              onToogleRead();
            }}
          >
            toogle read{" "}
          </button>
        </p>
      </div>
    </article>
  );
}
