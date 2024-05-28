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
        setFilterByToEdit(prevFilterByToEdit => ({ ...prevFilterByToEdit, text: value }))
    }


    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { status, text, isRead } = filterByToEdit
    return (
        <form ref={formRef} onSubmit={onSubmitFilter} className="robot-filter">
            <section>
                <label htmlFor="text">search</label>
                <input onChange={handleTextChange} name="text" id="text" type="text" value={text} />
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