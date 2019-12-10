import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // useEffect(() => {
  //   fetch('https://react-hooks-starting-project.firebaseio.com/ingredients.json')
  //     .then(response => response.json())
  //     .then(responseData => {
  //       console.log('useEffect responseData', responseData)
  //       const loadedIngredients = []
  //       for(let key in responseData){
  //         loadedIngredients.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount
  //         })
  //       }
  //       setIngredients([
  //         ...loadedIngredients
  //       ])
  //     })
  // }, [])

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients)
  }, [])

  const addIngredientHandler = ingredient => {
    setIsLoading(true)
    fetch('https://react-hooks-starting-project.firebaseio.com/ingredients.json',{
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      setIsLoading(false)
      return response.json()
    }).then(responseData => {
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
    setIsLoading(true)
    fetch(`https://react-hooks-starting-project.firebaseio.com/ingredients/${id}.json`,{
      method: 'DELETE',
    })
    .then(response => {
      setIsLoading(false)

      let filteredIngredients = ingredients.filter(ingredient => {
        return ingredient.id !== id
      })
      setIngredients([
        ...filteredIngredients,
      ])
    })
  }

  return (
    <div className="App">
      <IngredientForm addIngredient={addIngredientHandler} loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={ingredients} removeItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
