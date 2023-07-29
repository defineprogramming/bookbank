import React, { useState } from 'react';
import challengeService from '../services/challengeService';

const ChallengeAdd = () => {
  const [challenge, setChallenge] = useState({
    title: '',
    description: '',
    goal: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (event) => {
    setChallenge({
      ...challenge,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await challengeService.addChallenge(challenge);
      setChallenge({
        title: '',
        description: '',
        goal: '',
        startDate: '',
        endDate: ''
      });
      alert('Challenge added successfully!');
    } catch (error) {
      console.error('Failed to add challenge', error);
    }
  };

  return (
    <div>
      <h2>Add a new reading challenge</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={challenge.title} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={challenge.description} onChange={handleChange} required />
        </label>
        <label>
          Goal:
          <input type="text" name="goal" value={challenge.goal} onChange={handleChange} required />
        </label>
        <label>
          Start Date:
          <input type="date" name="startDate" value={challenge.startDate} onChange={handleChange} required />
        </label>
        <label>
          End Date:
          <input type="date" name="endDate" value={challenge.endDate} onChange={handleChange} required />
        </label>
        <button type="submit">Add Challenge</button>
      </form>
    </div>
  );
};

export default ChallengeAdd;