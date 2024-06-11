
import { EmailPreview } from "./EmailPreview"
import { Outlet } from 'react-router-dom'
import { useParams } from "react-router-dom";


export function EmailList({emails, onEmailStatusChange, onDeleteEmail}) {
    
    const params = useParams()


    return (
           <div className="email-list"> 
            <ul>
                {emails.map(email =>
                    <li key={email.id}>
                        <EmailPreview email={email} 
                        onDelete={() =>  onDeleteEmail(email.id) } 
                        onRemove={ () => {onEmailStatusChange(email.id,  'removedAt' , Date.now())} }
                        onStar={() =>  onEmailStatusChange(email.id,  'isStarred' ,!email.isStarred)} 
                        onToogleRead={() =>  onEmailStatusChange(email.id, 'isRead', !email.isRead)}
                        folder = {params.folder}/>
                        {/* <section className="email-actions">
                            <button onClick={() => onRemoveRobot(robot.id)}>X</button>
                        </section> */}
                    </li>
                )}
            </ul>
            </div>    
       
    )
}