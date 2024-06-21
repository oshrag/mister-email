import { useState , useRef } from "react";
import { useEffectUpdate } from "./useEffectUpdate.js";
import { utilService } from "../services/util.service.js";



export function useForm(initialState, cb) {

    const [fields, setFields] = useState(initialState)

    useEffectUpdate(() => {
        cb?.(fields)
    }, [fields])



    function handleChange({ target }) {
        let { name: field, value, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
            default:
                break;
        }

        
        setFields((prevFields) => ({ ...prevFields, [field]: value }))
       
        
    }

    return [fields, handleChange, setFields]

}
