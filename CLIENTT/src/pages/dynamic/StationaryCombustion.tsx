import { useState, useEffect } from 'react';
import PopupForm from '../../components/PopupForm';
import Table from '../../components/Table';
import MainLayout from '../../layouts/MainLayout';
import { generateSourceId } from '../../utils/helpers';

const StationaryCombustion = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isEditingMode, setIsEditingMode] = useState(false); // To toggle edit mode

  const fields = [
    { label: 'Source ID', type: 'text', key: 'sourceId' },
    { label: 'Site Name', type: 'text', key: 'site' },
    { label: 'Source Description', type: 'text', key: 'sourceDescription' },
    { label: 'Source Area (sq ft)', type: 'number', key: 'area' },
    { label: 'Fuel Type', type: 'dropdown', key: 'fuelType', options: ['Diesel', 'Petrol', 'Natural Gas'] },
    { label: 'Fuel State', type: 'dropdown', key: 'fuelState', options: ['Solid', 'Liquid', 'Gas'] },
    { label: 'Quantity Combusted', type: 'number', key: 'quantity' },
    { label: 'Units', type: 'dropdown', key: 'unit', options: ['MMBtu', 'Gallons'] },
  ];

  const columns = [
    { label: 'Source ID', key: 'sourceId' },
    { label: 'Site', key: 'site' },
    { label: 'Source Description', key: 'sourceDescription' },
    { label: 'Source Area (sq ft)', key: 'area' },
    { label: 'Fuel Type', key: 'fuelType' },
    { label: 'Fuel State', key: 'fuelState' },
    { label: 'Quantity', key: 'quantity' },
    { label: 'Units', key: 'unit' },
  ];

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('stationaryCombustionData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  // Save data to localStorage whenever 'data' changes
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem('stationaryCombustionData', JSON.stringify(data));
    }
  }, [data]);

  const handleAddSite = (formData: any) => {
    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = formData;
      setData(updatedData);
      setEditIndex(null);
    } else {
      formData.sourceId = generateSourceId(formData.site);
      setData([...data, formData]);
    }
    setShowPopup(false);
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

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Stationary Combustion</h1>
      <p>Guidelines: Please add details about stationary combustion sources...</p>

      <button
        onClick={() => setShowPopup(true)}
        className="bg-green-500 text-white px-4 py-2 mt-4"
      >
        Add a Site
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
            isEditingMode={isEditingMode} // Only show edit/delete buttons in editing mode
          />
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
        />
      )}
    </MainLayout>
  );
};

export default StationaryCombustion;
