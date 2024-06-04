import { useEffect, useState } from "react"
import { utilService } from '../services/util.service.js'


export function EmailFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    

    useEffect(() => {
        // onSetFilterBy(filterByToEdit) //update EmailIndex without Submit Btn
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type !== 'text' ? utilService.strToNullableBool(value) : value
        setFilterByToEdit(prevFilterByToEdit => ({ ...prevFilterByToEdit, [field]: value }))
    }

    // function handleTextChange({ target }) {
    //     const value = target.value
    //     setFilterByToEdit(prevFilterByToEdit => ({ ...prevFilterByToEdit, text: value}))
    // }

    // function handleSelectChange({ target }) {
    //     const value = target.value
    //     setFilterByToEdit(prevFilterByToEdit => ({ ...prevFilterByToEdit, isRead: utilService.strToNullableBool(value)}))
    // }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { status, text, isRead } = filterByToEdit
    return (
        <form onSubmit={onSubmitFilter} className="email-filter">
            <section>
                <label htmlFor="text">search</label>
                <input onChange={handleChange} name="text" id="text" type="text" value={text} />
            </section>
            <section>
                <label htmlFor="isReads" >Select by read/unread:</label>
                
                <select name="isRead" id="isRead" defaultValue={isRead === null ? 'all' : isRead} onChange={handleChange}>
                <option value="true">Read</option>
                <option value="false">Unread</option>
                <option value="all">all</option>
                </select>

            </section>
            {/* <section>
                <label htmlFor="readStatus">readStatus</label>
                <input onChange={handleChange} name="readStatus" id="readyStatus" type="boolean" value={readStatus} />
            </section> */}
            <section>
                <button>Submit</button>
            </section>
        </form>
    )

 }