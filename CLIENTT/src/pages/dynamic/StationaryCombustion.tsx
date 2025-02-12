import { useState, useEffect } from 'react';
import axios from 'axios';
import PopupForm from '../../components/PopupForm';
import Table from '../../components/Table';
import MainLayout from '../../layouts/MainLayout';
import { generateSourceId } from '../../utils/helpers';

const StationaryCombustion = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fields = [
    { label: 'Site Name', type: 'text', key: 'siteName' },
    { label: 'Source Description', type: 'text', key: 'sourceDescription' },
    { label: 'Source Area (sq ft)', type: 'number', key: 'area' },
    { label: 'Fuel Type', type: 'dropdown', key: 'fuelType', options: ['Diesel', 'Petrol', 'Natural Gas'] },
    { label: 'Fuel State', type: 'dropdown', key: 'fuelState', options: ['Solid', 'Liquid', 'Gas'] },
    { label: 'Quantity Combusted', type: 'number', key: 'quantity' },
    { label: 'Units', type: 'dropdown', key: 'unit', options: ['MMBtu', 'Gallons'] },
  ];

  const columns = [
    { label: 'Source ID', key: 'sourceId' },
    { label: 'Site Name', key: 'siteName' },
    { label: 'Source Description', key: 'sourceDescription' },
    { label: 'Source Area (sq ft)', key: 'area' },
    { label: 'Fuel Type', key: 'fuelType' },
    { label: 'Fuel State', key: 'fuelState' },
    { label: 'Quantity', key: 'quantity' },
    { label: 'Units', key: 'unit' },
  ];

  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/stationary-combustion/66dea837debad3d86c91d178');
      setData(response.data);
      console.log('Data fetched from backend:', response.data);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
      setError('Failed to fetch data. Please try again.');
    }
  };

  const handleAddSite = (formData: any) => {
    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = { ...updatedData[editIndex], ...formData };
      setData(updatedData);
    } else {
      const newEntry = {
        ...formData,
        sourceId: generateSourceId(formData.siteName),
      };
      setData([...data, newEntry]);
    }
    setShowPopup(false);
    setEditIndex(null);
    setError(null);
  };

  const handleDelete = (index: number) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setShowPopup(true);
  };

  const toggleEditMode = () => {
    setIsEditingMode(!isEditingMode);
  };

  const handleFinalSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/stationary-combustion/final-submit', {
        userId: '66dea837debad3d86c91d178',
        data,
      });
      console.log(response.data.message);
      setError(null);
      // Optionally, you can refresh the data from the backend after final submit
      // fetchDataFromBackend();
    } catch (error) {
      console.error('Error during final data submission:', error);
      setError('Failed to submit data. Please try again.');
    }
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Stationary Combustion</h1>
      <p>Guidelines: Please add details about stationary combustion sources...</p>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button
        onClick={() => {
          setEditIndex(null);
          setShowPopup(true);
        }}
        className="bg-green-500 text-white px-4 py-2 mt-4"
      >
        Add a Site and Combustion Data
      </button>

      {data.length > 0 && (
        <div className="mt-4">
          <button
            onClick={toggleEditMode}
            className="bg-yellow-500 text-white px-4 py-2 mb-4"
          >
            {isEditingMode ? 'Exit Edit Mode' : 'Enable Edit Mode'}
          </button>

          <Table
            data={data}
            columns={columns}
            onDelete={handleDelete}
            onEdit={handleEdit}
            isEditingMode={isEditingMode}
          />

          <div className="flex justify-end mt-4">
            <button
              onClick={handleFinalSubmit}
              className="bg-blue-500 text-white px-4 py-2"
            >
              Final Submit
            </button>
          </div>
        </div>
      )}

      {showPopup && (
        <PopupForm
          fields={fields}
          formData={editIndex !== null ? data[editIndex] : null}
          onSubmit={handleAddSite}
          onClose={() => {
            setShowPopup(false);
            setEditIndex(null);
          }}
          isEditing={editIndex !== null}
        />
      )}
    </MainLayout>
  );
};

export default StationaryCombustion;