import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MainPage.css';
import Header from './Header';
import { shoppingLists } from '../data';

const MainPage = () => {
    const loggedInUser = "John Doe"; // Placeholder for logged-in user name
    const navigate = useNavigate();

    const [shoppingListsState, setShoppingLists] = useState(shoppingLists);
    const [showModal, setShowModal] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [filter, setFilter] = useState('all'); // New state for filter

    // Filtered shopping lists based on filter state
    const filteredLists = shoppingListsState.filter((list) => {
        if (filter === 'all') return true;
        if (filter === 'active') return !list.archived;
        if (filter === 'archived') return list.archived;
        return true;
    });

    // Handle adding a new list
    const handleAddNewList = () => {
        setShowModal(true);
    };

    // Handle saving a new list
    const handleSaveNewList = () => {
        const newList = {
            id: shoppingListsState.length + 1,
            name: newListName,
            owner: loggedInUser,
            archived: false,
            members: [],
            items: [],
        };
        setShoppingLists([...shoppingListsState, newList]);
        setShowModal(false);
        setNewListName('');
    };

    // Handle deleting a list
    const handleDeleteList = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this shopping list?');
        if (confirmDelete) {
            setShoppingLists(shoppingListsState.filter(list => list.id !== id));
        }
    };

    // Redirect to the Shopping List details page
    const handleGoToShoppingListDetail = (id) => {
        navigate(`/shopping-list/${id}`);
    };

    // Handle filter change
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    return (
        <div className="main-page">
            <Header loggedInUser={loggedInUser} />

            <div className="main-content">
                <h2>Shopping Lists Overview</h2>

                {/* Filter buttons */}
                <div className="filter-buttons">
                    <button
                        className={filter === 'all' ? 'active-filter' : ''}
                        onClick={() => handleFilterChange('all')}
                    >
                        All
                    </button>
                    <button
                        className={filter === 'active' ? 'active-filter' : ''}
                        onClick={() => handleFilterChange('active')}
                    >
                        Active
                    </button>
                    <button
                        className={filter === 'archived' ? 'active-filter' : ''}
                        onClick={() => handleFilterChange('archived')}
                    >
                        Archived
                    </button>
                </div>

                {/* Button to open modal for adding a new list */}
                <button className="add-new-list" onClick={handleAddNewList}>
                    Add New Shopping List
                </button>

                <div className="shopping-lists">
                    {filteredLists.map((list) => (
                        <div
                            key={list.id}
                            className="shopping-list-tile"
                            onClick={() => handleGoToShoppingListDetail(list.id)}
                        >
                            <h3>{list.name}</h3>
                            <p>Owner: {list.owner}</p>
                            <p>{list.archived ? 'Archived' : 'Active'}</p>
                            <p>{list.members.length} Members</p>
                            {list.owner === loggedInUser && (
                                <span
                                    className="delete-icon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteList(list.id);
                                    }}
                                >
                                    &times; {/* This is the red "X" */}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Modal for adding a new list */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>Create New Shopping List</h2>
                            <input
                                type="text"
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                                placeholder="Enter list name"
                            />
                            <button onClick={handleSaveNewList}>Save</button>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainPage;
