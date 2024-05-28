
import { emailService } from "../services/email.service"

import { useEffect, useState } from "react"

import { EmailList } from "../cmps/EmailList"
import { EmailFilter } from "../cmps/EmailFilter"




export function EmailIndex() {

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


    // async function onStarEmail(id, newIsStar) {
        
    //     try {

    //         const emailToSave = emails.find(email => email.id === id)
    //         const updatedEmailToSave = {...emailToSave, isStarred: newIsStar}
    //         await emailService.save(updatedEmailToSave)  
    //         loadEmails()
            
    //      } catch (error) {
    //          console.log('Having issues saving email sfter star toggle:', error)
    //     }
    // }


    // async function onToogleRead(id, newIsRead) {
        
    //     try {
    //         const emailToSave = emails.find(email => email.id === id)
            
    //         const updatedEmailToSave = {...emailToSave, isRead: newIsRead}
    //         await emailService.save(updatedEmailToSave)  
    //         loadEmails()

           
    //      } catch (error) {
    //          console.log('Having issues saving email sfter star toogle:', error)
    //     }
    // }


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




    if (!emails) return <div>Loading...</div>
    return (
        <section>
            <EmailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy}/>
            <EmailList emails={emails} onDeleteEmail={onDeleteEmail} onEmailStatusChange={onEmailStatusChange} />
        </section>
       
    )
}


