import React, { useEffect, useState } from 'react';
export const NewMemberForm = ({ fetchMembers }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isPapa, setIsPapa] = useState(false);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8080/members`, {
      method: 'POST',
      body: JSON.stringify({
        name: firstName,
        surname: lastName,
        isPapa,
      }),
    });
    fetchMembers();
  };

  return (
    <form>
      <h2>New Member:</h2>

      <section>
        <label for="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </section>
      <section>
        <label for="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </section>
      <section>
        <label for="isPapa">Is Papa:</label>
        <input
          type="checkbox"
          name="isPapa"
          id="isPapa"
          value={isPapa}
          onChange={(e) => setIsPapa(e.target.value)}
        />
      </section>
      <button onClick={onFormSubmit}>Create</button>
    </form>
  );
};
