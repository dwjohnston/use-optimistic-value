
import React, { useMemo } from 'react';



export type MySelectProps<T> = {


    values: Array<T>; 

    generateLabelFn: (value:T) => string; 

    selectedValue: T; 
    onChange: (newValue: T) => void; 
};



export const  MySelect= <T,>(props: MySelectProps<T>) => {
  const {values, selectedValue, generateLabelFn,  onChange  } = props;



  const valueMap = useMemo(() => {
    return values.reduce((acc, cur) => {


        const label = generateLabelFn(cur); 
        return {
            ...acc, 
            [label]: cur
        }
    }, {}  as Record<string, T>);

  }, [values, generateLabelFn]); 


  return (
    <div>
      <select value ={generateLabelFn(selectedValue)}
        onChange= {(e) => {

            const valueString = e.target.value; 
            const value = valueMap[valueString]; 

            onChange(value); 
        }}
      >
            {values.map((v) => {

                const label = generateLabelFn(v); 
                return <option key ={label} value ={label}>{label}</option>
            })}
      </select>
    </div>
  );
};
