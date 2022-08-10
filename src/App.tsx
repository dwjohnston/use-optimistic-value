import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { MySelect } from './comps/MySelect';
import { useOptimisticValue } from './hooks/useOptimisticValue';


const options = [1, 2, 3, 4]

function App() {


  const [valueInState, setValueInState] = useState(options[0]);

  const handleChange = (newValue: number) => {
    setTimeout(() => {
      setValueInState(newValue);
    }, 1000)
  }


  return (
    <div className="App">

      <AppInner value={valueInState} onChangeValue={handleChange} />


    </div>
  );
}


function AppInner(props: {
  value: number, onChangeValue: (newValue: number) => void;
}) {

  const { value, onChangeValue } = props;


  const [optValue, optValueChangeHandler] = useOptimisticValue(value, onChangeValue, 2000);
  return <>
  
    <div className ="container">
    <MySelect onChange={onChangeValue} values={options} selectedValue={value} generateLabelFn={(v) => `${v}`} />



    </div>

    <div className ="container">
    <MySelect onChange={optValueChangeHandler} values={options} selectedValue={optValue} generateLabelFn={(v) => `${v}`} />
</div> 

  </>

}

export default App;
