
import { emailService } from "../services/email.service"
import { utilService } from '../services/util.service.js'


import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'


import { EmailList } from "../cmps/EmailList"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailCompose } from "../cmps/EmailCompose"
import { EmailSort } from "../cmps/EmailSort"





export function EmailIndex() {

    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    const [toCompose, setToCompose] = useState(false)
    const [sortOrder, setSortOrder] = useState(emailService.getDefaultSort())


    useEffect(() => {
        loadEmails()
    }, [filterBy, sortOrder])

    async function loadEmails() {
        try {
            console.log('EmailIndex loadEmails sortOrder', sortOrder)
            const emails = await emailService.query(filterBy, sortOrder)
            setEmails(emails)
        } catch (error) {
            console.log('Having issues with loading emails:', error)
            // showUserMsg('Problem!')
        }
    }


    async function onDeleteEmail(emailId) {
        try {
            await emailService.remove(emailId)
            setEmails(prevEmails => prevEmails.filter(email => email.id !== emailId))
        } catch (error) {
            console.log('Having issues deleting email:', error)
        }
    }


    function onSetFilterBy(filterBy) {
        console.log('EmailIndex onSetFilterBy')
        console.log('filterBy:', {filterBy})
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }


    function onSetOrder(sortOrder) {
        console.log('Email Index onSetOrder sortOrder:', sortOrder)
        setSortOrder(prevSortOrder => ({ ...prevSortOrder, ...sortOrder }))
    }


  async function onEmailStatusChange(id, propertyName, value) {
    try {
        const emailToSave = emails.find(email => email.id === id)
        
        const updatedEmailToSave = {...emailToSave, [propertyName] : value}
        await emailService.save(updatedEmailToSave)  
        loadEmails()

       
     } catch (error) {
         console.log('Having issues saving email sfter star toogle:', error)
    }
  }


  async function onSend(target) {
    let { to, subject, body } = target
    const newEmailToSave = { subject: subject, body: body, isRead: false, isStarred: false, sentAt : Date.now(), removedAt : null,  from: 'momo@momo.com', to: to } 
    let entitywithID = await emailService.save(newEmailToSave)   
    setEmails(prevEmails => [ ...prevEmails, entitywithID ])
    setToCompose(false)
    // loadEmails()
  }


    if (!emails) return <div>Loading...</div>
    return (
        <section className="email-index">
            <EmailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy}/>
            <aside> 
                {/* <Link to="/email/compose">Compose</Link> */}
                <button className="btn-compose" onClick={()=> { setToCompose(true) }}>compose</button>
                { toCompose ? <EmailCompose onClose={() => { setToCompose(false)}}  onSend={onSend}/> : null }
                <EmailSort sortOrder={sortOrder} onSetOrder={onSetOrder}/>
            </aside>
            <EmailList emails={emails} onDeleteEmail={onDeleteEmail} onEmailStatusChange={onEmailStatusChange} />
        </section>
       
    )
}


