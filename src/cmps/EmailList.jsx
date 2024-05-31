
import { EmailPreview } from "./EmailPreview"


export function EmailList({emails, onEmailStatusChange, onDeleteEmail}) {
    


    return (
           <div>
            <ul className="email-list">
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
                        
            </div>    
       
    )
}