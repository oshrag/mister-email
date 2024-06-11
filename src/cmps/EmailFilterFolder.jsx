
import { useEffect, useState } from "react"


export function EmailFilterFolder({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)


    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])


    // function handleChange({ target }) {
    //     let { value, name: field, type } = target
    //     value = type === 'number' ? +value : value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    // }

    function onClickFolder(folder) {
        //  ev.preventDefault;
         
        console.log('handleChange : folder', folder)
      
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, status: folder }))
     

    }

    const folders = ['inbox', 'sent', 'draft', 'trash', 'stared']
    const { status } = filterBy
    return (

        
        <section>


            { folders.map((folder)=> 

            <button 
            key={folder}
            className={`folderName${folder}`} 
            onClick={() => {onClickFolder(folder)}}>
            {folder} 
            </button>
            )}
            
                

        </section>
    )
}