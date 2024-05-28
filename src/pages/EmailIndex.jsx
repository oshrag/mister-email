
import { emailService } from "../services/email.service"
import { EmailMain } from "../cmps/EmailMain"


export function EmailIndex() {
    return (
        <section className="email-index">
            <EmailMain />
        </section>
    )
}
