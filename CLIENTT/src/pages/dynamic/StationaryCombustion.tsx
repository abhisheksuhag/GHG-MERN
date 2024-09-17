// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import PopupForm from '../../components/PopupForm';
// import Table from '../../components/Table';
// import MainLayout from '../../layouts/MainLayout';
// import { generateSourceId } from '../../utils/helpers';

// const StationaryCombustion = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [data, setData] = useState<any[]>([]);
//   const [editIndex, setEditIndex] = useState<number | null>(null);
//   const [isEditingMode, setIsEditingMode] = useState(false);

//   const fields = [
//     { label: 'Site Name', type: 'text', key: 'siteName' },
//     { label: 'Source Description', type: 'text', key: 'sourceDescription' },
//     { label: 'Source Area (sq ft)', type: 'number', key: 'area' },
//     { label: 'Fuel Type', type: 'dropdown', key: 'fuelType', options: ['Diesel', 'Petrol', 'Natural Gas'] },
//     { label: 'Fuel State', type: 'dropdown', key: 'fuelState', options: ['Solid', 'Liquid', 'Gas'] },
//     { label: 'Quantity Combusted', type: 'number', key: 'quantity' },
//     { label: 'Units', type: 'dropdown', key: 'unit', options: ['MMBtu', 'Gallons'] },
//   ];

//   const columns = [
//     { label: 'Source ID', key: 'sourceId' },
//     { label: 'Site Name', key: 'siteName' },
//     { label: 'Source Description', key: 'sourceDescription' },
//     { label: 'Source Area (sq ft)', key: 'area' },
//     { label: 'Fuel Type', key: 'fuelType' },
//     { label: 'Fuel State', key: 'fuelState' },
//     { label: 'Quantity', key: 'quantity' },
//     { label: 'Units', key: 'unit' },
//   ];

//   // Load data from localStorage and backend when the component mounts
//   useEffect(() => {
//     const fetchDataFromBackend = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/stationary-combustion/dummyUserId123');
//         setData(response.data);
//         localStorage.setItem('stationaryCombustionData', JSON.stringify(response.data)); // Sync localStorage with backend data
//         console.log('Data fetched from backend:', response.data);
//       } catch (error) {
//         console.error('Error fetching data from backend:', error);
//       }
//     };

//     const storedData = localStorage.getItem('stationaryCombustionData');
//     if (storedData) {
//       setData(JSON.parse(storedData));
//     } else {
//       fetchDataFromBackend(); // Fetch from backend if no local data is found
//     }
//   }, []);

//   // Save data to localStorage whenever 'data' changes
//   useEffect(() => {
//     if (data.length > 0) {
//       localStorage.setItem('stationaryCombustionData', JSON.stringify(data));
//     }
//   }, [data]);

//   const handleAddSite = async (formData: any) => {
//     if (editIndex !== null) {
//       const updatedData = [...data];
//       const entryToUpdate = updatedData[editIndex];

//       // Add _id for update if available
//       if (entryToUpdate._id) {
//         formData._id = entryToUpdate._id;
//       }

//       updatedData[editIndex] = formData;

//       // Send a PUT request to update the backend
//       try {
//         const entryId = updatedData[editIndex]._id; // Use the _id to update
//         await axios.put(`http://localhost:3000/api/stationary-combustion/update/${entryId}`, {
//           ...formData,  // Send the edited form data
//         });
//         console.log('Data successfully updated in the backend.');
//       } catch (error) {
//         console.error('Error updating data in the backend:', error);
//       }

//       setData(updatedData);
//       setEditIndex(null);
//     } else {
//       formData.sourceId = generateSourceId(formData.siteName);

//       // Add new data to the backend using POST request
//       try {
//         await axios.post('http://localhost:3000/api/stationary-combustion/add', {
//           userId: '66dea837debad3d86c91d178', // Replace this with the actual user ID from your dummy user
//           ...formData,  // Send form data to the backend, including area
//         });
//         console.log('Data successfully saved to the backend.');
//       } catch (error) {
//         console.error('Error saving data to the backend:', error);
//       }

//       setData([...data, formData]);
//     }
//     setShowPopup(false);
//   };

//   const handleDelete = async (index: number) => {
//     const updatedData = data.filter((_, i) => i !== index);
//     setData(updatedData);
//   };

//   const handleEdit = (index: number) => {
//     setEditIndex(index);
//     setShowPopup(true);
//   };

//   const toggleEditMode = () => {
//     setIsEditingMode(!isEditingMode);
//   };

//   // Function to submit all data to the backend (Final Submit)
//   const handleFinalSubmit = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/api/stationary-combustion/final-submit', {
//         userId: '66dea837debad3d86c91d178', // Use the same dummy user ID
//         data,
//       });
//       console.log(response.data.message);
//     } catch (error) {
//       console.error('Error during final data submission:', error);
//     }
//   };

//   return (
//     <MainLayout>
//       <h1 className="text-2xl font-bold mb-4">Stationary Combustion</h1>
//       <p>Guidelines: Please add details about stationary combustion sources...</p>

//       <button
//         onClick={() => setShowPopup(true)}
//         className="bg-green-500 text-white px-4 py-2 mt-4"
//       >
//         Add a Site and Combustion Data
//       </button>

//       {data.length > 0 && (
//         <div className="mt-4">
//           <button
//             onClick={toggleEditMode}
//             className="bg-yellow-500 text-white px-4 py-2 mb-4"
//           >
//             {isEditingMode ? 'Exit Edit Mode' : 'Enable Edit Mode'}
//           </button>

//           <Table
//             data={data}
//             columns={columns}
//             onDelete={handleDelete}
//             onEdit={handleEdit}
//             isEditingMode={isEditingMode} // Only show edit/delete buttons in editing mode
//           />

//           {/* Final Submit Button */}
//           <div className="flex justify-end mt-4">
//             <button
//               onClick={handleFinalSubmit}
//               className="bg-blue-500 text-white px-4 py-2"
//             >
//               Final Submit
//             </button>
//           </div>
//         </div>
//       )}

//       {showPopup && (
//         <PopupForm
//           fields={fields}
//           formData={editIndex !== null ? data[editIndex] : null}
//           onSubmit={handleAddSite}
//           onClose={() => {
//             setShowPopup(false);
//             setEditIndex(null);
//           }}
//         />
//       )}
//     </MainLayout>
//   );
// };

// export default StationaryCombustion;





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
    const fetchDataFromBackend = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/stationary-combustion/dummyUserId123');
        setData(response.data);
        localStorage.setItem('stationaryCombustionData', JSON.stringify(response.data));
        console.log('Data fetched from backend:', response.data);
      } catch (error) {
        console.error('Error fetching data from backend:', error);
        setError('Failed to fetch data. Please try again.');
      }
    };

    const storedData = localStorage.getItem('stationaryCombustionData');
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      fetchDataFromBackend();
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem('stationaryCombustionData', JSON.stringify(data));
    }
  }, [data]);

  const handleAddSite = async (formData: any) => {
    try {
      if (editIndex !== null) {
        const entryToUpdate = data[editIndex];

        if (entryToUpdate._id) {
          const response = await axios.put(`http://localhost:3000/api/stationary-combustion/update/${entryToUpdate._id}`, {
            ...formData,
            userId: '66dea837debad3d86c91d178', // Ensure userId is sent for updates too
          });

          const updatedData = [...data];
          updatedData[editIndex] = response.data.updatedEntry;
          setData(updatedData);
        } else {
          console.error('No _id found for entry to update');
          setError('Failed to update entry. Missing identifier.');
        }
      } else {
        const response = await axios.post('http://localhost:3000/api/stationary-combustion/add', {
          userId: '66dea837debad3d86c91d178',
          ...formData,
        });
        setData([...data, response.data.entry]);
      }
      setShowPopup(false);
      setEditIndex(null);
      setError(null);
    } catch (error) {
      console.error('Error saving/updating data:', error);
      setError('Failed to save/update data. Please try again.');
    }
  };

  const handleDelete = async (index: number) => {
    // Note: Backend doesn't have a delete endpoint. If you want to implement deletion,
    // you'll need to add it to the backend first.
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
        onClick={() => setShowPopup(true)}
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
        />
      )}
    </MainLayout>
  );
};

export default StationaryCombustion;