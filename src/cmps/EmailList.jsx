
import { EmailPreview } from "./EmailPreview";


export function EmailList({emails, onDeleteEmail, onStarEmail, onToogleRead}) {
    
    return (
            <ul className="email-list">
                {emails.map(email =>
                    <li key={email.id}>
                        <EmailPreview email={email} onDelete={() =>  onDeleteEmail(email.id) } onStar={() =>  onStarEmail(email.id, !email.isStarred)} onToogleRead={() =>  onToogleRead(email.id, !email.isRead)} />
                        {/* <section className="email-actions">
                            <button onClick={() => onRemoveRobot(robot.id)}>X</button>
                        </section> */}
                    </li>
                )}
            </ul>
       
    )
}