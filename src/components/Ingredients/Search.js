import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props
  const [ enteredFilter, setEnteredFilter ] = useState('')

  useEffect (() => {
    const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`
    fetch('https://react-hooks-starting-project.firebaseio.com/ingredients.json' + query)
      .then(response => response.json())
      .then(responseData => {
        console.log('useEffect responseData', responseData)
        const loadedIngredients = []
        for(let key in responseData){
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          })
        }
      onLoadIngredients(loadedIngredients)
      })
  }, [enteredFilter, onLoadIngredients])

  const handleFilterChange = (e) => {
    setEnteredFilter( e.target.value )
  }

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredFilter} onChange={handleFilterChange}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
