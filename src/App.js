import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IngredientSearchForm from "./components/IngredientSearchForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<IngredientSearchForm />} />
          <Route path="/recipes/:ingredient" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
