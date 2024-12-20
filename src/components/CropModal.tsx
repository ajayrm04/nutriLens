import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface CropModalProps {
  imageFile: File | null;
  onClose: () => void;
  onSave: (croppedImage: File) => void;
}

const CropModal: React.FC<CropModalProps> = ({ imageFile, onClose, onSave }) => {
  const [crop, setCrop] = useState<Crop>({ aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop({
      unit: "%",
      width: 80,
      height: (80 * height) / width,
    });
  };

  // Generate the cropped image
  const generateCroppedImage = () => {
    if (!completedCrop || !imageRef.current || !previewCanvasRef.current) return;

    const image = imageRef.current;
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const { width, height, x, y } = completedCrop;

    canvas.width = width!;
    canvas.height = height!;

    ctx.drawImage(image, x!, y!, width!, height!, 0, 0, width!, height!);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'image.png', { type: 'image/png' });
        onSave(file);
      }
    }, 'image/png');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 max-w-full w-[90%] md:w-[600px] max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4">Crop Your Image</h2>
        <div className="flex justify-center mb-4">
          {imageFile && (
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={16 / 9}
              className="max-w-full"
            >
              <img
                ref={imageRef}
                src={URL.createObjectURL(imageFile)}
                alt="Crop Preview"
                onLoad={handleImageLoad}
                className="max-w-full max-h-96"
              />
            </ReactCrop>
          )}
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={generateCroppedImage}
            className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition"
          >
            Save
          </button>
        </div>
        <canvas ref={previewCanvasRef} className="hidden"></canvas>
      </div>
    </div>
  );
};

export default CropModal;
