import { useEffect, useRef, useState } from "react"


export function EmailFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const formRef = useRef()


    useEffect(() => {
        setFilterByToEdit(filterByToEdit)
    }, [filterByToEdit])

    // function handleChange({ target }) {
    //     let { value, name: field, type } = target
    //     value = type === 'boolean' ? +value : value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    // }

    function handleTextChange({ target }) {
        const value = target.value
        setFilterByToEdit(prevFilterByToEdit => ({ ...prevFilterByToEdit, text: value}))
    }

    function handleSelectChange({ target }) {
        const value = target.value
        // console.log("handleSelectChange : ", value)
        let value1
        switch (value) {
            case 'true':
                value1 = true;
              break;
            case 'false':
                value1 = false;
                break;
            default:
                value1 = null;
          }


        setFilterByToEdit(prevFilterByToEdit => ({ ...prevFilterByToEdit, isRead: value1}))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { status, text, isRead } = filterByToEdit
    return (
        <form ref={formRef} onSubmit={onSubmitFilter} className="email-filter">
            <section>
                <label htmlFor="text">search</label>
                <input onChange={handleTextChange} name="text" id="text" type="text" value={text} />
            </section>
            <section>
                <label htmlFor="isReads" >Select by read/unread:</label>
                
                <select name="isRead" id="isRead" defaultValue={` ${isRead ? 'all' : isRead }` } onChange={handleSelectChange}>
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