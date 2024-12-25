import React, { useState } from 'react';
import { Camera, Upload, AlertTriangle } from 'lucide-react';
import CropModal from '../components/CropModal';
import { CameraModal } from './CameraModal';
import { Blob } from 'buffer';

export function AnalyzePage() {
  const [foodName, setFoodName] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowCropModal(true);
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

  const handleSaveCroppedImage = (croppedImage: any) => {
    setSelectedFile(croppedImage);
    setShowCropModal(false);
    alert('Image cropped and saved successfully!');
  };

  const handleCaptureImage = (blob: Blob) => {
    const file = new File([blob], 'captured-image.png', { type: 'image/png' });
    setSelectedFile(file);
    setShowCropModal(true);
    setShowCameraModal(false);
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
        onClick={() => setShowCameraModal(true)}
        className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition flex items-center gap-2"
      >
        <Camera className="w-4 h-4" />
        Use Camera
      </button>

      {showCropModal && selectedFile && (
        <CropModal
          imageFile={selectedFile}
          onClose={() => setShowCropModal(false)}
          onSave={handleSaveCroppedImage}
        />
      )}

      <CameraModal
        isOpen={showCameraModal}
        onClose={() => setShowCameraModal(false)}
        onCapture={handleCaptureImage}
      />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Food Name</label>
              <input
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter food name"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Serving Size (grams)</label>
              <input
                type="number"
                value={servingSize}
                onChange={(e) => setServingSize(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter serving size"
              />
            </div>
          </div>
            <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-all shadow-lg">
            Process
          </button>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
  <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
  <div className="space-y-6">
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-2">Safety Rating</h3>
      <div className="h-4 bg-emerald-200 rounded-full">
        <div className="h-4 bg-emerald-600 rounded-full w-0"></div>
      </div>
      <p className="text-emerald-700 mt-2">{selectedFile ? 'Processing...' : 'Upload to check Rating'}</p>
    </div>

    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-2">Recommended Amount</h3>
      <p className="text-gray-700">{selectedFile ? 'Processing...' : 'Upload to check Recommended Amount'}</p>
      <p className="text-sm text-gray-500 mt-1">{selectedFile ? '' : ''}</p>
    </div>

    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-amber-500" />
        Allergen Information
      </h3>
      <ul className="list-disc list-inside text-gray-700">
        {selectedFile ? <li>Processing...</li> : <li>Upload to check Allergen Info</li>}
      </ul>
    </div>
  </div>
</div>

        </div>
        
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {[
    { activity: 'Walking', time: selectedFile ? '1h 16m' : 'NA', icon: '🚶‍♀️' },
    { activity: 'Jogging', time: selectedFile ? '22 min' : 'NA', icon: '🏃‍♀️' },
    { activity: 'Cycling', time: selectedFile ? '22 min' : 'NA', icon: '🚴‍♀️' },
    { activity: 'Swimming', time: selectedFile ? '30 min' : 'NA', icon: '🏊‍♀️' },
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