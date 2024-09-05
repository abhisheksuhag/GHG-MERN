// CLIENT/src/components/PopupForm.tsx

import { useState } from 'react';

interface PopupFormProps {
  onSubmit: (formData: any) => void;
  onClose: () => void;
}

const PopupForm = ({ onSubmit, onClose }: PopupFormProps) => {
  const [site, setSite] = useState('');
  const [sourceDescription, setSourceDescription] = useState('');
  const [area, setArea] = useState<number | ''>('');
  const [fuelType, setFuelType] = useState('');
  const [fuelState, setFuelState] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [unit, setUnit] = useState('');

  const fuelOptions = ['Diesel', 'Petrol', 'Natural Gas', 'Coal', 'Propane'];
  const fuelStateOptions = ['Solid', 'Liquid', 'Gas'];
  const unitOptions = ['MMBtu', 'Gallons'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      site,
      sourceDescription,
      area,
      fuelType,
      fuelState,
      quantity,
      unit,
    };
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded">
        <h2 className="text-xl font-bold mb-4">Stationary Source Fuel Combustion</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Site Name:</label>
            <input
              type="text"
              value={site}
              onChange={(e) => setSite(e.target.value)}
              required
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label>Source Description:</label>
            <input
              type="text"
              value={sourceDescription}
              onChange={(e) => setSourceDescription(e.target.value)}
              required
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label>Source Area (sq ft):</label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(parseFloat(e.target.value))}
              required
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label>Fuel Type:</label>
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              required
              className="border p-2 w-full"
            >
              <option value="">Select a fuel type</option>
              {fuelOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label>Fuel State:</label>
            <select
              value={fuelState}
              onChange={(e) => setFuelState(e.target.value)}
              required
              className="border p-2 w-full"
            >
              <option value="">Select fuel state</option>
              {fuelStateOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label>Quantity Combusted:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value))}
              required
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label>Units:</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
              className="border p-2 w-full"
            >
              <option value="">Select a unit</option>
              {unitOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 mr-2">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
