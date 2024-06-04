import { useEffect, useState } from "react"


export function EmailSort({sortOrder, onSetOrder}){

    const [order, setOrder] = useState(sortOrder)

    useEffect(() => {
        onSetOrder(order)
    }, [order])

    function handleChange({ target }) {
        let { value, name: field } = target
        console.log('Email sort handleChange target.value:', target.value)
        setOrder(prevOrder => ({ ...prevOrder, [field]: value }))
    }


    return (
        <form >
            <label htmlFor="sortOrder">Sort By Date:</label>
            <select name="sortOrder" id="sortOrder"  defaultValue={order} onChange={handleChange}>
                <option value="desc">new on top</option>
                <option value="asc">old on top</option>
            </select>
        </form>
    )
}