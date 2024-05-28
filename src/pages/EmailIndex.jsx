
import { emailService } from "../services/email.service"
import { EmailMain } from "../cmps/EmailMain"


export function EmailIndex() {
    return (
        <section className="email-index">
            <h1>email index</h1>
            <EmailMain />
        </section>
    )
}
