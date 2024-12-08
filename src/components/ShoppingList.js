import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from './Item';
import MemberManagement from './MemberManagement';

const ShoppingList = ({ shoppingLists, setShoppingLists }) => {
  const { id } = useParams(); // Get the list ID from the URL
  const [list, setLocalList] = useState(null); // Local state to hold the current list
  const [newItem, setNewItem] = useState(''); // State for new item input
  const [newItemQuantity, setNewItemQuantity] = useState(1); // State for new item quantity
  const [filter, setFilter] = useState('all'); // State for filtering items
  const [isEditingName, setIsEditingName] = useState(false); // State for editing list name
  const [newListName, setNewListName] = useState(''); // State for new list name

  // Fetch the current list based on the ID from the URL
  useEffect(() => {
    const currentList = shoppingLists.find(list => list.id === parseInt(id));
    if (currentList) {
      setLocalList(currentList);
      setNewListName(currentList.name); // Initialize with the current list's name
    } else {
      console.log('List not found');
    }
  }, [id, shoppingLists]); // Add shoppingLists to dependency array

  if (!list) return <div>Loading...</div>;

  // Ensure list.items is an array (fallback to an empty array if undefined)
  const filteredItems = (list.items || []).filter((item) => {
    if (filter === 'unresolved') return !item.resolved;
    return true;
  });

  // Handle saving updated list name
  const handleSaveListName = () => {
    if (newListName.trim()) {
      // Update the shopping list name using setShoppingLists
      setShoppingLists(shoppingLists.map((shoppingList) =>
        shoppingList.id === list.id ? { ...shoppingList, name: newListName } : shoppingList
      ));
      setIsEditingName(false);
    }
  };

  // Handle adding new items
  const handleAddItem = () => {
    if (!newItem || newItemQuantity <= 0) return;

    const newItems = [
      ...list.items,
      {
        id: list.items.length + 1,
        name: newItem,
        quantity: newItemQuantity,
        resolved: false,
      },
    ];

    // Update shoppingLists state immutably
    setShoppingLists(
      shoppingLists.map((shoppingList) =>
        shoppingList.id === list.id ? { ...shoppingList, items: newItems } : shoppingList
      )
    );
    setNewItem('');
    setNewItemQuantity(1);
  };

  // Handle removing an item visually (only from frontend, not state)
  const handleRemoveItem = (id) => {
    // Simply filter out the item from the list to "remove" it from view
    const updatedItems = list.items.filter(item => item.id !== id);
    setLocalList((prevList) => ({
      ...prevList,
      items: updatedItems
    }));
  };

  // Handle toggling the resolved status of an item
  const handleToggleResolved = (id) => {
    const updatedItems = list.items.map(item =>
      item.id === id ? { ...item, resolved: !item.resolved } : item
    );

    // Update shoppingLists state immutably
    setShoppingLists(
      shoppingLists.map((shoppingList) =>
        shoppingList.id === list.id ? { ...shoppingList, items: updatedItems } : shoppingList
      )
    );
  };

  return (
    <div className="shopping-list">
      <div className="shopping-list-header">
        {isEditingName ? (
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            onBlur={handleSaveListName}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveListName();
            }}
            autoFocus
            className="editable-title"
          />
        ) : (
          <h1 onClick={() => setIsEditingName(true)}>{list.name}</h1>
        )}
      </div>

      <div className="add-item">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add a new item"
        />
        <input
          type="number"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(Number(e.target.value))}
          min="1"
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      <div className="filter">
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All Items</option>
          <option value="unresolved">Unresolved Items</option>
        </select>
      </div>

      <ul className="item-list">
        {filteredItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            toggleItemResolved={handleToggleResolved}
            removeItem={() => handleRemoveItem(item.id)}  // Pass the correct id
          />
        ))}
      </ul>

      <MemberManagement list={list} setList={setShoppingLists} />
    </div>
  );
};

export default ShoppingList;
