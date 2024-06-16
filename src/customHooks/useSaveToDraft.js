import { useEffect, useRef } from "react"
import { useEffectUpdate } from "./useEffectUpdate.js";


export function useSaveToDraft(mailToEdit, onSaveDraft) {
    const timeoutRef = useRef()
    
    useEffectUpdate(() => {
      
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }

        timeoutRef.current = setTimeout(() => onSaveDraft(mailToEdit), 5000)
    }, [mailToEdit])


    return () => clearTimeout(timeoutRef.current)
}