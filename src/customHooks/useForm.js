import { useState , useRef } from "react";
import { useEffectUpdate } from "./useEffectUpdate.js";
import { utilService } from "../services/util.service.js";



export function useForm(initialState, cb) {

    const [fields, setFields] = useState(initialState)
    //const debouncedCallbackRef = useRef(null);

    useEffectUpdate(() => {
        cb?.(fields)
    }, [fields])



    // if (!debouncedCallbackRef.current && cb) {
    //     debouncedCallbackRef.current = utilService.debounce(cb, 3000);
    // }


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

        //if (!debouncedCallbackRef.current) {
            setFields((prevFields) => ({ ...prevFields, [field]: value }))
        // }
        // else {
        //     setFields((prevFields) => {
        //         const newFields = { ...prevFields, [field]: value };
        //         debouncedCallbackRef.current(newFields); // Execute debounced callback with new state
        //         return newFields;
        //     });
        // }
        
    }

    return [fields, handleChange, setFields]

}
