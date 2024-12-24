import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { AnalyzePage } from './components/AnalyzePage';
import Modal from './components/Modal';

function App() {
  const { user } = useUser(); // Fetch logged-in user details
  const [showModal, setShowModal] = useState(false);
  const path = window.location.pathname;

  useEffect(() => {
    if (user) {
      console.log('User ID:', user.id); // Debug: Log user ID
      axios
        .get(`http://localhost:5000/api/user-data/${user.id}`) // Check if user exists
        .then((response) => {
          if (!response.data.exists) {
            setShowModal(true); // Show modal for new users
          }
        })
        .catch((error) => {
          console.error('Error checking user data:', error);
        });
    }
  }, [user]);

  const handleSaveData = async (formData: Record<string, unknown>) => {
    if (user) {
      try {
        const response = await axios.post('http://localhost:5000/api/user-data/${user.id}', {
          clerkId: user.id,
          ...formData,
        });
        console.log('Save Response:', response.data); // Debug: Log save response
        setShowModal(false);
        alert('Data saved successfully!');
      } catch (error) {
        console.error('Error saving data:', error);
        alert('Failed to save data. Please try again.');
      }
    } else {
      console.warn('User is not authenticated');
      alert('User is not authenticated.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <Navbar />
      {path === '/analyze' ? <AnalyzePage /> : <HomePage />}
      {showModal && <Modal onSave={handleSaveData} />} {/* Show modal */}
    </div>
  );
}

export default App;
