import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetails.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
 

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipeDetails(data.meals[0]);
      })
      .catch((error) => console.error("Error", error));
  }, [id]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (!recipeDetails) {
    return <div className="loading">Loading...</div>;
  }

  const {
    strMeal,
    strMealThumb,
    strInstructions,
    strCategory,
    strArea,
    strTags,
    strYoutube,
    ...ingredients
  } = recipeDetails;

  return (
    <div>
      <div className="ingredient-search-form">
        <h1>Recipes </h1>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-box"
        />
      </div>
      <div className="container">
        <h2>{strMeal}</h2>
        <img src={strMealThumb} alt={strMeal} />
        <div className="category">
          <span>Category: {strCategory}</span>
          {strYoutube && (
            <a href={strYoutube} target="_blank" rel="noopener noreferrer">
              Youtube Link
            </a>
          )}
        </div>
        {strTags && <p>Tags: {strTags}</p>}
        <div className="ingredients">
          <h3>Ingredients</h3>
          <ul>
            {Object.entries(ingredients)
              .filter(
                ([key]) => key.startsWith("strIngredient") && ingredients[key]
              )
              .map(([key, value]) => (
                <li key={key}>{value}</li>
              ))}
          </ul>
        </div>
        <div className="instructions">
          <h3>Cooking Instructions</h3>
          <p>{strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
