
import { EmailPreview } from "./EmailPreview"
import { Outlet } from 'react-router-dom'


export function EmailList({emails, onEmailStatusChange, onDeleteEmail}) {
    


    return (
           <div className="email-list"> 
            <ul>
                {emails.map(email =>
                    <li key={email.id}>
                        <EmailPreview email={email} 
                        onDelete={() =>  onDeleteEmail(email.id) } 
                        onStar={() =>  onEmailStatusChange(email.id,  'isStarred' ,!email.isStarred)} 
                        onToogleRead={() =>  onEmailStatusChange(email.id, 'isRead', !email.isRead)} />
                        {/* <section className="email-actions">
                            <button onClick={() => onRemoveRobot(robot.id)}>X</button>
                        </section> */}
                    </li>
                )}
            </ul>
                  <Outlet/>      
            </div>    
       
    )
}