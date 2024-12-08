import React, { useState } from 'react';

const MemberManagement = ({ list, setList }) => {
  const [newMember, setNewMember] = useState('');

  const handleAddMember = () => {
    const normalizedNewMember = newMember.trim().toLowerCase();
    const normalizedMembers = list.members.map(member => member.toLowerCase());

    if (!normalizedNewMember || normalizedMembers.includes(normalizedNewMember)) {
      setNewMember(''); // Clear input if invalid
      return;
    }

    const updatedMembers = [...list.members, newMember];
    setList(prevShoppingLists =>
      prevShoppingLists.map(l =>
        l.id === list.id ? { ...l, members: updatedMembers } : l
      )
    );
    setNewMember('');
  };

  const handleRemoveMember = (member) => {
    if (member === list.owner) {
      alert('The owner cannot be removed!');
      return;
    }

    const updatedMembers = list.members.filter(m => m !== member);
    setList(prevShoppingLists =>
      prevShoppingLists.map(l =>
        l.id === list.id ? { ...l, members: updatedMembers } : l
      )
    );
  };

  return (
    <div className="member-management">
      <h3>Members</h3>
      {list.members.length > 0 ? (
        <ul>
          {list.members
            .sort((a, b) => a === list.owner ? -1 : b === list.owner ? 1 : 0) // Ensure the owner is at the top
            .map((member) => (
              <li key={member} className="member-item">
                <span>{member}{list.owner === member && ' (Owner)'}</span>
                {member !== list.owner && (
                  <button
                    onClick={() => handleRemoveMember(member)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                )}
              </li>
            ))}
        </ul>
      ) : (
        <p>No members in this list yet.</p>
      )}
      {list.owner && (
        <>
          <input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            placeholder="Add new member"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddMember();
            }}
          />
          <button onClick={handleAddMember}>Add Member</button>
        </>
      )}
    </div>
  );
};

export default MemberManagement;
