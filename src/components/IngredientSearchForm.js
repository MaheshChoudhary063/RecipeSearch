import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./IngredientSearchForm.css";

const IngredientSearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((response) => response.json())
      .then((data) => {
        const sortedIngredients = data.meals.sort((a, b) =>
          a.strIngredient.localeCompare(b.strIngredient)
        );
        setIngredients(sortedIngredients);
      })
      .catch((error) => console.error("Error", error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleIngredientClick = (ingredient) => {
    navigate(`/recipes/${ingredient}`);
  };

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.strIngredient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedIngredients = filteredIngredients.reduce(
    (groups, ingredient) => {
      const firstLetter = ingredient.strIngredient[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(ingredient);
      return groups;
    },
    {}
  );

  return (
    <div className="ingredient-search-form">
      <h1>Recipe Search</h1>
      <input
        type="text"
        placeholder="Search ingredients..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="ingredients-list">
        {Object.keys(groupedIngredients)
          .sort()
          .map((letter) => (
            <div key={letter} className="ingredient-group">
              <h2>{letter}</h2>
              <ul>
                {groupedIngredients[letter].map((ingredient, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleIngredientClick(ingredient.strIngredient)
                    }
                  >
                    {ingredient.strIngredient}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default IngredientSearchForm;
