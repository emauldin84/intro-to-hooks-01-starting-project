import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [inputState, setInputState] = useState({
    title: '',
    amount: ''
  })
  const submitHandler = e => {
    e.preventDefault();
    // ...
  };
  const changeHandler = e => {
    setInputState({
      ...inputState,
      [e.target.id]: e.target.value
    })
  }
  console.log(inputState)
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={inputState.title} onChange={changeHandler}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={inputState.amount} onChange={changeHandler}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
