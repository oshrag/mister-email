
import { useEffect, useState } from "react"

import { EmailList } from "./EmailList"
import { EmailFilter } from "./EmailFilter"
import { emailService } from "../services/email.service"




export function EmailMain() {

    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())


    useEffect(() => {
        loadEmails()
    }, [filterBy])

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy)
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


    async function onStarEmail(id, newIsStar) {
        
        try {

            /* 
             is best practice? 
             whay using prevEmail not work? 
             is it inefficient to create emailToSave and then updatedEmails?
             should i write specific function in email.service for that (instad using save)?
             is emailToSave function in email.service is ok?
             i think i dont need the condition there - it belong to robots somehow
             becuse in my case the user click email so there must be an id
            */

            const emailToSave = emails.find(email => email.id === id)
            emailToSave.isStarred = newIsStar;
            
            await emailService.save(emailToSave)  
            
            const updatedEmails = emails.map(email =>
            email.id === id ? { ...email, isStarred: newIsStar } : email
            );

            setEmails(updatedEmails);
         } catch (error) {
             console.log('Having issues saving email sfter star toogle:', error)
        }
    }


    async function onToogleRead(id, newIsRead) {
        
        try {

            const emailToSave = emails.find(email => email.id === id)
            emailToSave.isRead = newIsRead;
            
            await emailService.save(emailToSave)  
            
            const updatedEmails = emails.map(email =>
            email.id === id ? { ...email, isRead: newIsRead } : email
            );

            setEmails(updatedEmails);
         } catch (error) {
             console.log('Having issues saving email sfter star toogle:', error)
        }
    }


  




    if (!emails) return <div>Loading...</div>
    return (
        <section>
            <EmailList emails={emails} onDeleteEmail={onDeleteEmail} onStarEmail={onStarEmail} onToogleRead={onToogleRead} />
            <EmailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy}/>
        </section>
       
    )
}