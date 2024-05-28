import { Link } from "react-router-dom";

import { utilService } from '../services/util.service.js'


export function EmailPreview({email, onDelete, onStar, onToogleRead}) {
    return (
        <article className={`email-preview ${email.isRead  ? 'read' : ''}`} >
            <Link to={`/email/${email.id}`}>
            <div className="inner"> 
                <p className="star-check" > 
                    <input type="checkbox"/>
                    <button className= {`star ${email.isStarred ? 'stared' : '' }` } onClick={(event) => { onStar(); event.preventDefault() } }>s</button>
                </p>
                <p> {email.from} </p>
                <p> {email.subject} <span className="exerpt">{utilService. getXWords( email.body, 10)}</span>  </p>
                <p className="dateAndButtons"> 
                    <span> {utilService.getDateDayMonth(email.sentAt)} </span>
                    <button className="delete" onClick={(event) => { onDelete(); event.preventDefault() } }>delete</button>
                    <button className="archive" >archive</button>
                    <button className="toogleRead"  onClick={(event) => { onToogleRead(); event.preventDefault() } } >toogle read </button>
                </p> 
            </div>
            </Link>
        </article>
    )
}