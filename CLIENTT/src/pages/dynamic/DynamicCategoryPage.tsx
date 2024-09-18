// import  { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom'; // for dynamic routing
// import { categoryConfig } from '../../utils/categoryConfig';
// import PopupForm from '../../components/PopupForm';
// import Table from '../../components/Table';
// import MainLayout from '../../layouts/MainLayout';
// import axios from 'axios';

// const DynamicCategoryPage = () => {
//   const { category } = useParams(); // Get category from URL
//   const config = categoryConfig[category]; // Load the appropriate config based on the category
//   const [data, setData] = useState<any[]>([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [editIndex, setEditIndex] = useState<number | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchDataFromBackend();
//   }, [category]);

//   const fetchDataFromBackend = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/${category}/66dea837debad3d86c91d178`);
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching data from backend:', error);
//       setError('Failed to fetch data. Please try again.');
//     }
//   };

//   const handleAddData = (formData: any, sectionIndex: number) => {
//     if (editIndex !== null) {
//       const updatedData = [...data];
//       updatedData[editIndex] = { ...updatedData[editIndex], ...formData };
//       setData(updatedData);
//     } else {
//       const newEntry = {
//         ...formData,
//         sourceId: Date.now().toString(), // Example: generate a unique sourceId dynamically
//       };
//       setData([...data, newEntry]);
//     }
//     setShowPopup(false);
//     setError(null);
//   };

//   const handleEdit = (index: number) => {
//     setEditIndex(index);
//     setShowPopup(true);
//   };

//   const handleDelete = (index: number) => {
//     const updatedData = data.filter((_, i) => i !== index);
//     setData(updatedData);
//   };

//   const handleFinalSubmit = async () => {
//     try {
//       const response = await axios.post(`http://localhost:3000/api/${category}/final-submit`, {
//         userId: '66dea837debad3d86c91d178',
//         data,
//       });
//       console.log(response.data.message);
//       setError(null);
//     } catch (error) {
//       console.error('Error during final data submission:', error);
//       setError('Failed to submit data. Please try again.');
//     }
//   };

//   if (!config) {
//     return <div>Category not found</div>;
//   }

//   return (
//     <MainLayout>
//       <h1 className="text-2xl font-bold mb-4">{config.pageTitle}</h1>

//       {config.sections.map((section, sectionIndex) => (
//         <div key={sectionIndex} className="mb-6">
//           <p>{section.description}</p>
//           <button
//             onClick={() => setShowPopup(true)}
//             className="bg-green-500 text-white px-4 py-2 mt-4"
//           >
//             {section.addButtonLabel}
//           </button>

//           <Table
//             data={data}
//             columns={section.columns}
//             onDelete={handleDelete}
//             onEdit={handleEdit}
//             isEditingMode={true} // This can be dynamic if needed
//           />
//         </div>
//       ))}

//       <div className="flex justify-end mt-4">
//         <button
//           onClick={handleFinalSubmit}
//           className="bg-blue-500 text-white px-4 py-2"
//         >
//           Final Submit
//         </button>
//       </div>

//       {showPopup && (
//         <PopupForm
//           fields={config.sections[0].fields} // Handle multiple sections here if needed
//           formData={editIndex !== null ? data[editIndex] : null}
//           onSubmit={(formData) => handleAddData(formData, 0)}
//           onClose={() => setShowPopup(false)}
//           isEditing={editIndex !== null}
//         />
//       )}
//     </MainLayout>
//   );
// };

// export default DynamicCategoryPage;














import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { categoryConfig } from '../../utils/categoryConfig';
import PopupForm from '../../components/PopupForm';
import Table from '../../components/Table';
import MainLayout from '../../layouts/MainLayout';
import axios from 'axios';

// Helper function to convert kebab-case to camelCase
const toCamelCase = (str: string) => {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

const DynamicCategoryPage = () => {
  const { category } = useParams(); // Get category from URL
  const camelCaseCategory = toCamelCase(category!); // Convert URL param to camelCase
  const config = categoryConfig[camelCaseCategory]; // Access config using camelCase key
  const [data, setData] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditingMode, setIsEditingMode] = useState(false);

  useEffect(() => {
    fetchDataFromBackend();
  }, [category]);

  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/${category}/66dea837debad3d86c91d178`);
      if (response.data.length > 0) {
        setData(response.data);
      } else {
        setData([]); // Ensure we don't populate with empty values
      }
    } catch (error) {
      console.error('Error fetching data from backend:', error);
      setError('Failed to fetch data. Please try again.');
    }
  };

  const handleAddOrEditData = (formData: any, sectionIndex: number) => {
    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = { ...updatedData[editIndex], ...formData };
      setData(updatedData);
    } else {
      const newEntry = {
        ...formData,
        sourceId: Date.now().toString(),
      };
      setData([...data, newEntry]);
    }
    setShowPopup(false);
    setEditIndex(null);
    setActiveSectionIndex(null);
    setError(null);
  };

  const handleEdit = (index: number, sectionIndex: number) => {
    setEditIndex(index);
    setActiveSectionIndex(sectionIndex);
    setShowPopup(true);
  };

  const handleDelete = (index: number) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const handleFinalSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/${category}/final-submit`, {
        userId: '66dea837debad3d86c91d178', // Assuming userId is hardcoded
        data,
        category, // Pass the category for the backend
      });
      console.log(response.data.message);
      setError(null);
    } catch (error) {
      console.error('Error during final data submission:', error);
      setError('Failed to submit data. Please try again.');
    }
  };


  const toggleEditMode = () => {
    setIsEditingMode(!isEditingMode);
  };

  if (!config) {
    return <div>Category not found</div>;
  }

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">{config.pageTitle}</h1>

      {/* Toggle button to enable/disable edit mode */}
      <button
              onClick={toggleEditMode}
              className="bg-yellow-500 text-white px-4 py-2 mb-4"
            >
              {isEditingMode ? 'Disable Edit Mode' : 'Enable Edit Mode'}
            </button>

      {config.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          <p>{section.description}</p>
          <button
            onClick={() => {
              setShowPopup(true);
              setActiveSectionIndex(sectionIndex);
            }}
            className="bg-green-500 text-white px-4 py-2 mt-4"
          >
            {section.addButtonLabel}
          </button>

          {/* Only render the table if data exists */}
          {data.length > 0 ? (
            <Table
              data={data}
              columns={section.columns}
              onDelete={handleDelete}
              onEdit={(index) => handleEdit(index, sectionIndex)} // Pass the sectionIndex for editing
              isEditingMode={isEditingMode} // Table only allows edit if edit mode is enabled
            />
          ) : (
            <p className="mt-4">No data available for this category.</p>
          )}
        </div>
      ))}

      <div className="flex justify-end mt-4">
        <button
          onClick={handleFinalSubmit}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Final Submit
        </button>
      </div>

      {showPopup && activeSectionIndex !== null && (
        <PopupForm
          fields={config.sections[activeSectionIndex].fields}
          formData={editIndex !== null ? data[editIndex] : null}
          onSubmit={(formData) => handleAddOrEditData(formData, activeSectionIndex)}
          onClose={() => {
            setShowPopup(false);
            setEditIndex(null);
            setActiveSectionIndex(null);
          }}
          isEditing={editIndex !== null}
        />
      )}
    </MainLayout>
  );
};

export default DynamicCategoryPage;
