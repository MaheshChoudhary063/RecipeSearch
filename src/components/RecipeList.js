import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RecipeList.css";

const RecipeList = () => {
  const { ingredient } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.meals);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, [ingredient]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ingredient-search-form">
      <h1>Recipes with {ingredient}</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-box"
      />
      <div className="recipes">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="recipe"
            onClick={() => handleRecipeClick(recipe.idMeal)}
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="recipe-image"
            />
            <div className="recipe-details">
              <h3>{recipe.strMeal}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
