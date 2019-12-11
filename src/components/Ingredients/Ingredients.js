import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';
import ErrorModal from '../UI/ErrorModal'

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

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
    }).catch (error => {
      setError(`Something went wrong. ${error.message}`)
    })
  }
  const removeIngredientHandler = id => {
    setIsLoading(true)
    fetch(`https://react-hooks-starting-project.firebaseio.com/ingredients/${id}.jsn`,{
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
    }).catch (error => {
      setError(`Something went wrong! ${error.message}`)
      setIsLoading(false)
    })
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm addIngredient={addIngredientHandler} loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={ingredients} removeItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
