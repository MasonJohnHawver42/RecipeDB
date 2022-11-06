import React from "react";


const RecipeCard = ({ recipe: { id, name, ingredients }, res_ingredients }) => {
  return (
    <div className="recipe" key={id}>
      <h3> {name} | Missing: [ { ingredients.map(item => !res_ingredients.has(item.id) ? item.name : "").join(" ") } ] </h3>
    </div>
  )
}

export default RecipeCard;
