import React, { useReducer, useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';
import ErrorModal from '../UI/ErrorModal'

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id)
    default:
      throw new Error('Should not reach default')
  }
}

const Ingredients = () => {
  const [ingredients, dispatch ] = useReducer(ingredientReducer, [])
  // const [ingredients, setIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    // fetch('https://react-hooks-starting-project.firebaseio.com/ingredients.json')
    //   .then(response => response.json())
    //   .then(responseData => {
    //     console.log('useEffect responseData', responseData)
    //     const loadedIngredients = []
    //     for(let key in responseData){
    //       loadedIngredients.push({
    //         id: key,
    //         title: responseData[key].title,
    //         amount: responseData[key].amount
    //       })
    //     }
    //     setIngredients([
    //       ...loadedIngredients
    //     ])
    //   })
    console.log('RENDERING INGREDIENTS', ingredients)
  }, [ingredients])

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    // setIngredients(filteredIngredients)
    dispatch({type: 'SET', ingredients: filteredIngredients})
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
      // setIngredients([
      //   ...ingredients,
      //   {
      //     id: responseData.name,
      //     ...ingredient
      //   }
      // ])
      dispatch({type: 'ADD', ingredient: 
          {
            id: responseData.name,
            ...ingredient
          }
        })
    }).catch (error => {
      setError(`Something went wrong. ${error.message}`)
    })
  }
  const removeIngredientHandler = id => {
    setIsLoading(true)
    fetch(`https://react-hooks-starting-project.firebaseio.com/ingredients/${id}.json`,{
      method: 'DELETE',
    })
    .then(response => {
      setIsLoading(false)

      // let filteredIngredients = ingredients.filter(ingredient => {
      //   return ingredient.id !== id
      // })
      // setIngredients([
      //   ...filteredIngredients,
      // ])
      dispatch({type: 'DELETE', id: id})
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
