import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/globals.css';
import ShoppingList from './components/ShoppingList';
import MainPage from './components/MainPage'; // Import MainPage component
import { shoppingLists as initialShoppingLists } from './data'; // Assuming shoppingLists is now the updated structure

const App = () => {
  // Debug the imported initialShoppingLists
  console.log('Imported initialShoppingLists:', initialShoppingLists);

  // Ensure shoppingLists is initialized as an array
  const [shoppingListsState, setShoppingLists] = useState(
    Array.isArray(initialShoppingLists) ? initialShoppingLists : []
  );

  // Debug the state to ensure it's being updated correctly
  console.log('App - shoppingListsState:', shoppingListsState);

  const loggedInUser = 'John Doe'; // Placeholder for logged-in user name

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="app-name">ListEd</div>
          <div className="user-name">{loggedInUser}</div>
        </header>

        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  shoppingLists={shoppingListsState}
                  setShoppingLists={setShoppingLists} // Pass state setter to MainPage
                />
              }
            />
            <Route
              path="/shopping-list/:id"
              element={
                <ShoppingList
                  shoppingLists={shoppingListsState}
                  setShoppingLists={setShoppingLists} // Pass state setter to ShoppingList
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
