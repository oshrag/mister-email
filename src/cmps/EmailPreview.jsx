import { Link, useParams } from "react-router-dom";

import { utilService } from '../services/util.service.js'
import { emailService } from '../services/email.service.js'


export function EmailPreview({email, onDelete, onRemove, onStar, onToogleRead, folder}) {


    const params = useParams()
    const editPath = `/email/${params.folder}/edit/${email.id}` 

    return (
        <article className={`email-preview ${email.isRead  ? 'read' : ''}`} >
            <Link to={`/email/${folder}/${email.id}`}>
            <div className="inner"> 
                <p className="star-check" > 
                    <input type="checkbox"/>
                    <button className= {`star ${email.isStarred ? 'stared' : '' }` } onClick={(event) => { onStar(); event.preventDefault() } }>s</button>
                </p>
                <p> {emailService.getLogedOnUser().email == email.from ? `To: ${email.to}` :  `${email.from}` } </p>
                <div className="subject-exerpt"> 
                    <p> {email.subject}  </p>
                    <p className="exerpt"> {email.body}</p>
                    {/* <p className="exerpt" > {utilService.getXWords( email.body, 20)}  </p> */}
                </div>
                <p className="dateAndButtons"> 
                    { email.status !== 'draft' ?  <span className="date"> {utilService.getDateDayMonth(email.sentAt)} </span> : <span className="date">draft</span>}
                    
                    { email.status === 'draft' ? <Link to={editPath}> <button className="edit"> edit</button></Link> : null}

                    { 
                       (email.removedAt) ? 
                       <button className="delete" onClick={(event) => { onDelete(); event.preventDefault() } }>delete</button> :
                       <button className="delete" onClick={(event) => { onRemove(); event.preventDefault() } }>delete</button> 
                    }
  
                    <button className="archive" >archive</button>
                    <button className="toogleRead"  onClick={(event) => { onToogleRead(); event.preventDefault() } } >toogle read </button>
                </p> 
            </div>
            </Link>
        </article>
    )
}