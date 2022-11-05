import React, { useState, useEffect } from "react";
import Select from 'react-select';

import './App.css'

const API_URL = 'http://localhost:4000/graphql';
const INGS_QUERY = '{ all_ingredients { name, id } }';

function App() {
  const [all_ingredients, setAllIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [res_ingredients, setResIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  //called when app loads
  useEffect(() => {

    //fetches data from api
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ query: INGS_QUERY })
    })
    .then(r => r.json()) //process data into json
    .then(payload =>  {
      let options = payload.data.all_ingredients
      setAllIngredients(options.map(item => { return {value: item.id, label: item.name} } ) ); //sets our state
    })
    .catch (error => { console.error("An error occurred: ", error); } ) //catches errors
    .finally(() => { setLoading(false); } ); //sets loading state
  }, []);


  //return jsx
  return (
    <div className="app">
      <h1> Kitchen </h1>
        <div className='search'>
         <Select
           options={all_ingredients}
           isMulti
           onChange={opt => setResIngredients(opt) }
         />
       </div>
    </div>
  );
}

export default App;
