import React, { useEffect, useState } from 'react';
import { NewMemberForm } from './NewMemberForm';
import 'index.css';

export const App = () => {
  const [members, setMembers] = useState([]);

  // Get all the unread members from the API
  const fetchMembers = () => {
    fetch('http://localhost:8080/members')
      .then((res) => res.json())
      .then((json) => setMembers(json));
  };

  const deleteMember = async (id) => {
    await fetch(`http://localhost:8080/members/${id}`, {
      method: 'DELETE',
    });
    fetchMembers();
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div>
      <main>
        <NewMemberForm fetchMembers={fetchMembers}></NewMemberForm>
        <h2>Members:</h2>
        <div>
          {members.map((member) => {
            return (
              <div>
                <p>
                  {member.name} {member.surname}
                </p>
                <p>Letters in First Name: {member.lettersInName}</p>
                <p>Is the Papa: {member.isPapa ? 'yes' : 'no'}</p>
                <button
                  type="button"
                  id={member._id}
                  onClick={(e) => {
                    deleteMember(member._id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
