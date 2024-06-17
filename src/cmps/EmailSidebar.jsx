import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { EmailFolderList } from "../cmps/EmailFolderList";

export function EmailSidebar({ unReadCount }) {
  const params = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldExpandClass = isExpanded ? "expanded" : "";

  //   const editPath = `/email/${params.folder}/edit/`;
  const editPath = `/email/${params.folder}/?compose=new`;

  return (
    <section
      className={`${shouldExpandClass}  mail-sidebar`}
      onMouseOut={() => setIsExpanded(false)}
      onMouseOver={() => setIsExpanded(true)}
    >
      <Link to={editPath} className="compose">
        <span className="material-symbols-outlined">edit</span>
        {isExpanded && <span>compose</span>}
      </Link>

      <EmailFolderList unReadCount={unReadCount} isExpand={isExpanded} />
    </section>
  );
}
