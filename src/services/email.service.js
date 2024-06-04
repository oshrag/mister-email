import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    // createRobot,
    getDefaultFilter,
    getDefaultSort
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
            emails = emails.filter(email => isMatchFilter(email,filterBy))
        }

        if (sortOrder) {
            console.log('email.service query sort')
            if (sortOrder.sortOrder == "asc") {
                emails.sort((a, b) => a.sentAt - b.sentAt)
            } else {
                emails.sort((a, b) => b.sentAt - a.sentAt)
            }
           
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



// function createRobot(model = '', type = '', batteryStatus = 100) {
//     return {
//         model,
//         batteryStatus,
//         type
//     }
// }




function getDefaultFilter() {
    return {
        status: '', //'inbox/sent/star/trash'
        text: '',
        isRead: null //true/false/null
    }
}


function getDefaultSort() {
    return {
        sortOrder: 'desc' //'asc / desc'
    }
}


function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            { id: 'e101', subject: 'Miss you!', body: 'Lorem Would love to catch up sometimes', isRead: true, isStarred: false, sentAt : 1551133930594, removedAt : null,  from: 'momo@momo.com', to: 'user@appsus.com' },
            { id: 'e102', subject: 'Love you!', body: 'whats up peace', isRead: false, isStarred: false, sentAt : 1551133938594, removedAt : null,  from: 'eli@momo.com', to: 'info@appsus.com' },
            { id: 'e103', subject: 'Love you More!', body: 'er since the peace 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and', isRead: false, isStarred: false, sentAt : 1551133938594, removedAt : null,  from: 'eli@momo.com', to: 'info@appsus.com' },
            { id: 'e104', subject: 'Lorem ipsum!', body: 'ter took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and', isRead: false, isStarred: true, sentAt : 1551133938594, removedAt : null,  from: 'eli@momo.com', to: 'info@appsus.com' }

        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}




function isMatchFilter(email, filterBy) {
    let { status = 'inbox', text = '',  isRead = false } = filterBy
                  
    if ((isRead !== null) && ( email.isRead != isRead) )  return false  
    
    return email.subject.concat(' ', email.body).toLowerCase().includes(text.toLowerCase()) 

}