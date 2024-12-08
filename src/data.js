export const shoppingLists = [
  {
    id: 1,
    name: 'Groceries',
    owner: 'John Doe',
    archived: false,
    members: ['John Doe', 'Jane Smith'],
    items: [
      { id: 1, name: 'Milk', quantity: 1, resolved: false },
      { id: 2, name: 'Bread', quantity: 2, resolved: false },
      { id: 3, name: 'Eggs', quantity: 12, resolved: false },
    ],
  },
  {
    id: 2,
    name: 'Electronics',
    owner: 'Jane Doe',
    archived: true,
    members: ['Jane Doe', 'Alice Johnson'],
    items: [
      { id: 1, name: 'Laptop', quantity: 1, resolved: false },
      { id: 2, name: 'Smartphone', quantity: 1, resolved: false },
    ],
  },
  {
    id: 3,
    name: 'Furniture',
    owner: 'John Doe',
    archived: false,
    members: ['John Doe'],
    items: [
      { id: 1, name: 'Sofa', quantity: 1, resolved: false },
      { id: 2, name: 'Table', quantity: 1, resolved: false },
    ],
  },
  {
    id: 4,
    name: 'Office Supplies',
    owner: 'Jane Smith',
    archived: false,
    members: ['John Doe', 'Jane Smith', 'Alice Johnson'], // John as member
    items: [
      { id: 1, name: 'Pens', quantity: 20, resolved: false },
      { id: 2, name: 'Notebooks', quantity: 10, resolved: false },
    ],
  },
  {
    id: 5,
    name: 'Garden Tools',
    owner: 'Alice Johnson',
    archived: false,
    members: ['John Doe', 'Alice Johnson'], // John as member
    items: [
      { id: 1, name: 'Shovel', quantity: 1, resolved: false },
      { id: 2, name: 'Rake', quantity: 1, resolved: false },
      { id: 3, name: 'Hose', quantity: 1, resolved: false },
    ],
  },
  {
    id: 6,
    name: 'Team Snacks',
    owner: 'Bob Brown',
    archived: false,
    members: ['John Doe', 'Bob Brown', 'Jane Smith'], // John as member
    items: [
      { id: 1, name: 'Chips', quantity: 5, resolved: false },
      { id: 2, name: 'Soda', quantity: 10, resolved: false },
    ],
  },
];
