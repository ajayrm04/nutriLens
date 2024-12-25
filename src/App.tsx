import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { AnalyzePage } from './components/AnalyzePage';
import Modal from './components/Modal';

function App() {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const path = window.location.pathname;

  useEffect(() => {
    if (user) {
      console.log('User ID:', user.id);
      
      axios.get(`http://localhost:5000/api/check-user-data/${user.id}`)
        .then(response => {
          if (!response.data.exists) {
            setShowModal(true);
          } else {
            console.log('User data fetched successfully');
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setShowModal(true);
        });
    } else {
      setShowModal(false);
    }
  }, [user]);

  const handleSaveData = async (formData: Record<string, unknown>) => {
    if (user) {
      try {
        const numericData = {
          ...formData,
          age: Number(formData.age), // Convert to number
          weight: Number(formData.weight), // Convert to number
          height: Number(formData.height), // Convert to number
        };
        const response = await axios.post(`http://localhost:5000/api/user-data`, {
          clerkId: user.id,
          ...numericData,
        });
        console.log('Save Response:', response.data);
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
