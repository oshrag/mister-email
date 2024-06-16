import { emailService } from "../services/email.service.js";
import { useNavigate, useParams } from "react-router-dom";

export function EmailFolderList({ unReadCount, isExpand }) {
  const navigate = useNavigate();
  const params = useParams();

  function onGoToFolder(path) {
    if (path === params.folder) return;
    // setIsLoading(true)
    // const composeState = searchParams.get('compose')
    //const url = `/mail/${path}?txt=${searchParams.get('txt')}` + (composeState ? `&compose=${composeState}` : '')
    const url = `/email/${path}`;
    navigate(url);
  }

  const folders = emailService.getFolders();
  return (
    <section className="email-folder-list">
      <ul>
        {folders.map((folder) => (
          <li
            key={folder.name}
            className={
              params.folder === folder.name
                ? `folderName${folder.name} active`
                : `folderName-${folder.name}`
            }
            onClick={() => {
              onGoToFolder(folder.path);
            }}
          >
            <span className="material-symbols-outlined">{folder.icon}</span>
            {isExpand && <span>{folder.name}</span>}
            {isExpand && folder.name === "inbox" && <span>{unReadCount}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
