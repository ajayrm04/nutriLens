import React, { useState } from 'react';
import { Camera, Upload, AlertTriangle } from 'lucide-react';

export function AnalyzePage() {
  const [servingSize, setServingSize] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleCameraClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => handleFileUpload(e as React.ChangeEvent<HTMLInputElement>);
    input.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <div className="p-6">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-800">Food Label Analyzer</h1>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
              Dashboard
            </button>  
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Card - Upload Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Upload Food Label</h2>
            <div 
              className="border-2 border-dashed border-emerald-200 rounded-lg p-8 text-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-4">
                <Upload className="w-12 h-12 text-emerald-600" />
                <p className="text-gray-600">
                  {selectedFile ? selectedFile.name : "Drag and drop your image here or"}
                </p>
                <div className="flex gap-4">
                  <label className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center gap-2 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    Upload File
                  </label>
                  <button 
                    onClick={handleCameraClick}
                    className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    Use Camera
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Serving Size (grams)
              </label>
              <input
                type="number"
                value={servingSize}
                onChange={(e) => setServingSize(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter serving size"
              />
            </div>
          </div>

          {/* Right Card - Analysis Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Safety Rating</h3>
                <div className="h-4 bg-emerald-200 rounded-full">
                  <div className="h-4 bg-emerald-600 rounded-full w-3/4"></div>
                </div>
                <p className="text-emerald-700 mt-2">75% Safe for Consumption</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Recommended Amount</h3>
                <p className="text-gray-700">30g per serving</p>
                <p className="text-sm text-gray-500 mt-1">Maximum 2 servings per day</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Allergen Information
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Contains Peanuts</li>
                  <li>May contain traces of Milk</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Calorie Burn Cards */}
        <h2 className="text-2xl font-bold text-emerald-800 mb-6">Calorie Burn Time</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { activity: 'Walking', time: '1h 16m', icon: '🚶‍♀️' },
            { activity: 'Jogging', time: '22 min', icon: '🏃‍♀️' },
            { activity: 'Cycling', time: '22 min', icon: '🚴‍♀️' },
            { activity: 'Swimming', time: '30 min', icon: '🏊‍♀️' },
          ].map((exercise, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl mb-4">{exercise.icon}</span>
                <h3 className="text-xl font-semibold text-emerald-800">{exercise.time}</h3>
                <p className="text-gray-600">of {exercise.activity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}