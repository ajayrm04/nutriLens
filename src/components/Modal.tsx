import React, { useState } from 'react';

type FormData = {
  age: string;
  gender: string;
  specialNeeds: string[];
  weight: string;
  height: string;
};

type ModalProps = {
  onSave: (data: FormData) => void;
};

export default function Modal({ onSave }: ModalProps) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [specialNeeds, setSpecialNeeds] = useState<string[]>([]);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ age, gender, specialNeeds, weight, height });
  };

  const handleSpecialNeedsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSpecialNeeds((prev) => (checked ? [...prev, value] : prev.filter((need) => need !== value)));
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>Enter Your Details</h2>
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <fieldset>
          <legend>Special Needs</legend>
          {['Diabetes', 'Obesity', 'Low BP', 'High BP', 'Pregnancy'].map((need) => (
            <label key={need}>
              <input type="checkbox" value={need} onChange={handleSpecialNeedsChange} />
              {need}
            </label>
          ))}
        </fieldset>
        <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} required />
        <input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} required />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
