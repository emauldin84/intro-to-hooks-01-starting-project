import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([])

  const addIngredientHandler = ingredient => {
    setIngredients([
      ...ingredients,
      {
        id: Date.now(),
        ...ingredient
      }
    ])
  }
  const removeIngredientHandler = id => {
    let filteredIngredients = ingredients.filter(ingredient => {
      return ingredient.id !== id
    })

    setIngredients([
      ...filteredIngredients,
    ])
  }

  return (
    <div className="App">
      <IngredientForm addIngredient={addIngredientHandler}/>

      <section>
        <Search />
        <IngredientList ingredients={ingredients} removeItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
