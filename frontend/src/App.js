import React, { useState, useEffect } from "react";
import Select from 'react-select';

import RecipeCard from "./RecipeCard";

import './App.css'

const API_URL = 'http://localhost:4000/graphql';
const INGS_QUERY = '{ all_ingredients { name, id } }';

function App() {
  const [all_ingredients, setAllIngredients] = useState([]);

  const [res_ingredients, setResIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  //called when app loads
  useEffect(() => {

    //fetches data from api
    fetch(API_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ query: INGS_QUERY })
    })
    .then(r => r.json()) //process data into json
    .then(payload =>  {
      let options = payload.data.all_ingredients
      setAllIngredients(options.map(item => { return {value: item.id, label: item.name} } ) ); //sets our state
    })
  }, []);

  useEffect(() => {
    fetch(API_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ query: `{ sorted_recipes (ing_ids: [` + Array.from(res_ingredients).join(',') + `]) { id, name, ingredients { id, name } } }` })
    })
    .then(r => r.json())
    .then(payload =>  {
      console.log(payload)
      setRecipes(payload.data.sorted_recipes)
    })
  }, [res_ingredients]);

  //return jsx
  return (
    <div className="app">
      <h1> Goldies Kitchen </h1>
        <div className='search'>
         <Select
           options={all_ingredients}
           isMulti
           onChange={opt => setResIngredients(new Set(opt.map(item => item.value))) }
         />
       </div>
       {recipes?.length > 0 ? (
         <div className="container">
          {recipes.map((recipe) => (
            <RecipeCard
            recipe = {recipe}
            res_ingredients = {res_ingredients}
            />
          ))}
         </div>
       ) : (<p>None</p>)}
    </div>
  );
}

export default App;
