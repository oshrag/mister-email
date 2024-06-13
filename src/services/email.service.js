import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    getDefaultFilter,
    getFilterFromSearchParams,
    // getDefaultSort,
    getSortFromSearchParams,
    getLogedOnUser,
    getFolders,
    createEmail,
    getUnCountRead,
    convertIsReadStatus
    // convertSortDirection
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
        // status: '', //'inbox/sent/star/trash'
        text: '',
        isRead: null //true/false/null
    }
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


function getDefaultSort() {
    return {
        by: 'date', //' read / starred / date / subject '
        dir: 1 // ' 1 - asc /  -1 - desc'
    }
}

function getSortFromSearchParams(searchParams) {
    // const filterBy = {
    //     type: searchParams.get('type')
    // }
    const defaultSort = getDefaultSort()
    const sortBy = {}
    for (const field in defaultSort) {
        sortBy[field] = searchParams.get(field) || ''
    }
   
    return sortBy

}

const defaultLogedOnUser = { 
    name: 'oshra', 
    email: 'eli@momo.com'
}


function getLogedOnUser() {
    return defaultLogedOnUser;
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
            { id: 'e101', subject: 'hi eli Miss you!', isRead: true, isStarred: false, sentAt : 1551133930594, removedAt : null,  from: 'momo@momo.com', to: 'eli@momo.com' , body: 'Lorem Would love to catch up sometimes'},
            { id: 'e102', subject: 'hi momo Love you!', isRead: false, isStarred: false, sentAt : 1551133938594, removedAt : null,  from: 'eli@momo.com', to: 'momo@momo.com' , body: 'whats up peace' },
            { id: 'e103', subject: 'hi momo Love you More!', isRead: false, isStarred: false, sentAt : 1551133938594, removedAt : null,  from: 'eli@momo.com', to: 'momo@momo.com', body: 'er since the peace 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and' },
            { id: 'e104', subject: 'hi momo Lorem ipsum!', isRead: false, isStarred: true, sentAt : 1551133938594, removedAt : null,  from: 'eli@momo.com', to: 'momo@momo.com',  body: 'ter took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and' },
            { id: 'e105', subject: 'hi eli Lorem ipsum re', isRead: false, isStarred: true, sentAt : 1551133938594, removedAt : null,  from: 'momo@momo.com', to: 'eli@momo.com', body: 'ter took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and' },
            { id: 'e106', subject: 'hi momo Lorem ipsum et', isRead: false, isStarred: true, sentAt : 1551133938594, removedAt : null,  from: 'eli@momo.com', to: 'momo@momo.com', body: 'ter took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and' },
            { id: 'e107', subject: 'hi momo?', isRead: false, isStarred: true,  sentAt : null,  removedAt : null,  from: 'eli@momo.com', to: 'momo@momo.com', body: 'dvs ter took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and' }

        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}




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




async function getUnCountRead(){
    let emails = await storageService.query(STORAGE_KEY)   
    emails = emails.filter(mail => !mail.isRead)
    return emails.length
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
            name: 'starred',
            path: 'starred'
        }
    ]
        
}



function convertIsReadStatus(isRead) {
    return (isRead == '')  ?  "null"  :  isRead
}


// function convertSortDirection(dir) {
//     return ( dir == '0') ? 1 : -1
// }
