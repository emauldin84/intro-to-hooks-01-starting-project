import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([])

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-starting-project.firebaseio.com/ingredients.json',{
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json()
    }).then(responseData => {
      console.log(responseData)
      setIngredients([
        ...ingredients,
        {
          id: responseData.name,
          ...ingredient
        }
      ])
    })
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
