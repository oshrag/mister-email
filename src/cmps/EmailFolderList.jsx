import { emailService } from "../services/email.service.js";
import { useNavigate, useParams } from "react-router-dom";

export function EmailFolderList({ count }) {
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
      {folders.map((folder) => (
        <button
          key={folder.name}
          className={`folderName${folder.name}`}
          onClick={() => {
            onGoToFolder(folder.path);
          }}
        >
          {folder.name}
          {folder.name === "inbox" ? <span>{count}</span> : null}
        </button>
      ))}
    </section>
  );
}
