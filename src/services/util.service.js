
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    getDateDayMonth,
    getXWords,
    debounce
    // strToNullableBool,
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}


function getMonthName(date) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return monthNames[date.getMonth()]
}

function getDateDayMonth(ts) {
    const date = new Date(ts);
    return  ` ${date.getDate()}  ${getMonthName(date)}` 
}

function getXWords(str, x) {
   return (str.split(" ").slice([0], [x-1])).join(" ")
}


// const mapObjStrNullableBool = {
//   true : true,
//   false : false,
//   all : null
// }

// function strToNullableBool(str)
// {
//    return mapObjStrNullableBool[str]
// }

function debounce(func, timeout = 500) {
    let timer
    
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            // func.call(this, ...args)
            func(...args)
        }, timeout)
    }
}
