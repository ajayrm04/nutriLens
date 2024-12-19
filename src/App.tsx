import { useEffect, useState } from 'react';
import {useUser } from '@clerk/clerk-react';
import axios, { AxiosError } from 'axios';
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
      axios.get(`http://localhost:5000/api/save-user-data/${user.id}`)
        .then(response => {
          if (!response.data.exists) {
            setShowModal(true);
          }
        })
        .catch(error => console.error('Error checking user data:', error));
    }
  }, [user]);

  const handleSaveData = async (formData: Record<string, unknown>) => {
    if (user) {
      try {
        const response = await axios.post('http://localhost:5000/api/save-user-data', {
          clerkId: user.id,
          ...formData,
        });
        console.log(response.data);
        setShowModal(false);
        alert('Data saved successfully!');
      } catch(error: unknown) {
        if (error instanceof AxiosError && error.response) {
          console.error('Error saving data:', error.response.data);
          alert(`Failed to save data. Status code: ${error.response.status}`);
        } else if (error instanceof Error) {
          console.error('Error saving data:', error.message);
          alert('Failed to save data. Check your network connection.');
        } else {
          console.error('Error saving data:', String(error));
          alert('Failed to save data. An unknown error occurred.');
        }
      }
  } else {
    console.warn("User is not authenticated");
    alert("User is not authenticated");
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
