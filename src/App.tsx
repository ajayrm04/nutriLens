import React, { useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { AnalyzePage } from './components/AnalyzePage';
import { Chatbot } from './components/Chatbot';
import Modal from './components/Modal';

function App() {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const path = window.location.pathname;

  useEffect(() => {
    if (user) {
      axios.get(`/api/check-user-data/${user.id}`)
        .then(response => {
          if (!response.data.exists) {
            setShowModal(true);
          }
        })
        .catch(error => console.error('Error checking user data:', error));
    }
  }, [user]);

  const handleSaveData = (formData: Record<string, unknown>) => {
    if (user) {
      axios.post('/api/save-user-data', {
      clerkId: user.id,
      ...formData,
    })
    .then(() => {
      setShowModal(false);
      alert('Data saved successfully!');
    })
    .catch(error => {
      console.error('Error saving data:', error);
      alert('Failed to save data.');
    });
  } else {
    console.warn("User is not authenticated");
  }
  };

  return (
    <header>
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <Navbar />
      {path === '/analyze' ? <AnalyzePage /> : <HomePage />}
      {showModal && <Modal onSave={handleSaveData} />}
      <Chatbot />
    </div>
    </header>
  );
}

export default App;
