import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    getDefaultFilter,
    getDefaultSort2,
    // getDefaultLogdonUser
    getFilterFromSearchParams,
    getFolders,
    createEmail
}

const STORAGE_KEY = 'mister-email'

_createEmails()

async function query(filterBy, sortOrder) {
    try {
        let emails = await storageService.query(STORAGE_KEY)
        if (filterBy) {
            // let { status = 'inbox', text = '',  isRead = false } = filterBy      
            // if (isRead === null)
            // {
            //         emails = emails.filter(email =>
            //             email.subject.concat(' ', email.body).toLowerCase().includes(text.toLowerCase()))
            // }
            // else {
            //     emails = emails.filter(email =>
            //         email.subject.concat(' ', email.body).toLowerCase().includes(text.toLowerCase()) &&
            //         email.isRead == isRead     
            //     )
            // }


            // emails = emails.filter(email => isMatchFilter(email,filterBy))
            // console.log('email-srevice query filterBy:', filterBy)
            
            emails =  _filterMails(emails,  filterBy)
            
        }

       
       
        if (sortOrder.by == 'date' && sortOrder.dir == 1) {
            emails.sort((a, b) => a.sentAt - b.sentAt)
        } else if (sortOrder.by == 'date' && sortOrder.dir == -1) {
            emails.sort((a, b) => b.sentAt - a.sentAt)
        } else if (sortOrder.by == 'subject' && sortOrder.dir == 1) {
            emails.sort((a, b) => a.subject.localeCompare(b.subject))
        } else if (sortOrder.by == 'subject' && sortOrder.dir == -1) {
            emails.sort((a, b) => b.subject.localeCompare(a.subject))
        }  else if (sortOrder.by == 'starred' && sortOrder.dir == 1) {
            emails.sort((a, b) => a.isStarred - b.isStarred)
        } else if (sortOrder.by == 'starred' && sortOrder.dir == -1) {
            emails.sort((a, b) => b.isStarred - a.isStarred)
        } else if (sortOrder.by == 'read' && sortOrder.dir == 1) {
            emails.sort((a, b) => a.isRead - b.isRead)
        } else if (sortOrder.by == 'read' && sortOrder.dir == -1) {
            emails.sort((a, b) => b.isRead - a.isRead)
        }




        return emails
    } catch (error) {
        console.log('error:', error)
        throw error
    }
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
     if (emailToSave.id) {  
        return storageService.put(STORAGE_KEY, emailToSave)
     } else { // create - for later use...
        // console.log("save - create - email to save", emailToSave)
         return storageService.post(STORAGE_KEY, emailToSave)
     }
}




function getDefaultFilter() {
    return {
        status: '', //'inbox/sent/star/trash'
        text: '',
        isRead: null //true/false/null
    }
}



function getDefaultSort2() {
    return {
        by: 'date', //' read / stared / date / subject '
        dir: 1 // ' 1 asc /  -1 desc'
    }
}



const defaultLogedOnUser = { 
    name: 'oshra', 
    email: 'eli@momo.com'
}


function createEmail() {
    return {
      
        subject: '',
        body: '',
        isRead: false,
        isStarred: false,
        // sentAt: Date.now(),  
        from: defaultLogedOnUser.email     
    }
}



function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            { id: 'e101', subject: 'Miss you!', body: 'Lorem Would love to catch up sometimes', isRead: true, isStarred: false, sentAt : 1551133930594, removedAt : null,  from: 'momo@momo.com', to: 'eli@momo.com' },
            { id: 'e102', subject: 'Love you!', body: 'whats up peace', isRead: false, isStarred: false, sentAt : 1551133938594, removedAt : null,  from: 'eli@momo.com', to: 'momo@momo.com' },
            { id: 'e103', subject: 'Love you More!', body: 'er since the peace 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and', isRead: false, isStarred: false, sentAt : 1551133938594, removedAt : null,  from: 'eli@momo.com', to: 'momo@momo.com' },
            { id: 'e104', subject: 'Lorem ipsum!', body: 'ter took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and', isRead: false, isStarred: true, sentAt : 1551133938594, removedAt : null,  from: 'eli@momo.com', to: 'momo@momo.com' },
            { id: 'e105', subject: 'Lorem ipsum re', body: 'ter took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and', isRead: false, isStarred: true, sentAt : 1551133938594, removedAt : null,  from: 'momo@momo.com', to: 'eli@momo.com' },
            { id: 'e106', subject: 'Lorem ipsum et', body: 'ter took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and', isRead: false, isStarred: true, sentAt : 1551133938594, removedAt : null,  from: 'eli@momo.com', to: 'momo@momo.com' },
            { id: 'e107', subject: '?', body: 'dvs ter took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and', isRead: false, isStarred: true,  sentAt : null,  removedAt : null,  from: 'eli@momo.com', to: 'momo@momo.com' }

        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}




// function isMatchFilter(email, filterBy) {
//     let { status = 'inbox', text = '',  isRead = false } = filterBy
   
   
//     if (( status === 'draft') && (email.sentAt)) return false
//     if (( status === 'inbox') && (email.to !== defaultLogedOnUser.email)) return false
//     if (( status === 'sent') && (email.from !== defaultLogedOnUser.email)) return false

//     if ((isRead !== null) && ( email.isRead != isRead) )  return false  
    
//     return email.subject.concat(' ', email.body).toLowerCase().includes(text.toLowerCase()) 

// }


function _filterMails(mails, filterBy) {
    if (filterBy.status) {
        
        mails = _filterMailsByFolder(mails, filterBy.status)
    }
    if (filterBy.text) {
         
        const regExp = new RegExp(filterBy.txt, 'i')
        mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body) || regExp.test(mail.from))
    }
    if (filterBy.isRead !== null && filterBy.isRead !== undefined && filterBy.isRead !== '' && filterBy.isRead !== 'null') {
        const isReadToCompare = (filterBy.isRead === 'true') ? true : false
        mails = mails.filter(mail => mail.isRead === isReadToCompare)
    }
    return mails

}

function _filterMailsByFolder(mails, folder) {
    switch (folder) {
        case 'inbox':
            mails = mails.filter(mail => (mail.to === defaultLogedOnUser.email) && !mail.removedAt && mail.sentAt)
            break
        case 'sent':
            mails = mails.filter(mail => (mail.from === defaultLogedOnUser.email) && !mail.removedAt && mail.sentAt)
            break
        case 'starred':
            mails = mails.filter(mail => mail.isStarred && !mail.removedAt && mail.sentAt)
            break
        case 'trash':
            mails = mails.filter(mail => mail.removedAt)
            break
        case 'draft':
            mails = mails.filter(mail => !mail.sentAt && !mail.removedAt)
            break
    }

    return mails
}



function getFilterFromSearchParams(searchParams) {
    // const filterBy = {
    //     type: searchParams.get('type')
    // }
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
   
    return filterBy

}


function getFolders(){
    return [
        {
            name: 'inbox',
            path: 'inbox'
        },
        {
            name: 'sent',
            path: 'sent'
        },
        {
            name: 'draft',
            path: 'draft'
        },
        {
            name: 'trash',
            path: 'trash'
        },
        {
            name: 'stared',
            path: 'stared'
        }
    ]
        
}