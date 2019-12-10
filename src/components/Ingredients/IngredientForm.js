import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator'

const IngredientForm = React.memo(props => {
  const [inputTitle, setInputTitle] = useState('')
  const [inputAmount, setInputAmount] = useState('')
  
  const submitHandler = e => {
    e.preventDefault();
    props.addIngredient({
      title: inputTitle,
      amount: inputAmount
    })
  };
  
  const changeTitleHandler = e => {
    setInputTitle(e.target.value)
  }
  
  const changeAmountHandler = e => {
    setInputAmount(e.target.value)
  }

  console.log(inputTitle, inputAmount)
  
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={inputTitle} onChange={changeTitleHandler}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={inputAmount} onChange={changeAmountHandler}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator/> }
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
