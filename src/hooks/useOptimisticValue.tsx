import { useState,  useEffect, useRef } from "react"



export function useOptimisticValue<T>(stateValue: T, changeHandler: (newValue: T) => void,  timeoutValue: number = 1000) : [
    T, 
    (newValue: T) => void
] {


    const [valueToReturn, setValueToReturn] = useState(stateValue); 

    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(); 

    console.log(JSON.stringify(timeoutRef));

    const newChangeHandler = (newValue: T) => {

        changeHandler(newValue);
        setValueToReturn(newValue); 

        //Now start the timer running
        timeoutRef.current = setTimeout(() => {

            console.log("fires"); 
            setValueToReturn(stateValue); // there is a closure on this variable. 


        }, timeoutValue)


    }

    // If the state change comes through, clear the timeout, prevent the old state value from being set
    useEffect(() => {
        if (timeoutRef.current){

            console.log("clears");
            clearTimeout(timeoutRef.current);
        }
    }, [stateValue]); 

    return [
        valueToReturn, 
        newChangeHandler
    ]
}