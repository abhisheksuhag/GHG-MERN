// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { categoryConfig } from '../../utils/categoryConfig';
// import PopupForm from '../../components/PopupForm';
// import Table from '../../components/Table';
// import MainLayout from '../../layouts/MainLayout';
// import axios from 'axios';
// import { generateSourceId } from '../../utils/helpers';

// // Helper function to convert kebab-case to camelCase
// const toCamelCase = (str: string) => {
//   return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
// };

// // Save to Local Storage Per Section
// const saveToLocalStorage = (category: string, sectionType: string, data: any[]) => {
//   console.log(`Saving data to localStorage for section: ${sectionType}`);
//   localStorage.setItem(`ghg_${category}_${sectionType}_data`, JSON.stringify(data));
// };

// // Load from Local Storage Per Section
// const loadFromLocalStorage = (category: string, sectionType: string) => {
//   console.log(`Loading data from localStorage for section: ${sectionType}`);
//   const savedData = localStorage.getItem(`ghg_${category}_${sectionType}_data`);
//   return savedData ? JSON.parse(savedData) : [];
// };

// // Clear Local Storage Per Section
// const clearLocalStorage = (category: string, sectionType: string) => {
//   console.log(`Clearing localStorage for section: ${sectionType}`);
//   localStorage.removeItem(`ghg_${category}_${sectionType}_data`);
// };

// const DynamicCategoryPage = () => {
//   const { category } = useParams(); // Get category from URL
//   const camelCaseCategory = toCamelCase(category!); // Convert URL param to camelCase
//   const config = categoryConfig[camelCaseCategory]; // Access config using camelCase key

//   // State to manage section data
//   const [sectionData, setSectionData] = useState<any>({});
//   const [showPopup, setShowPopup] = useState(false);
//   const [editIndex, setEditIndex] = useState<number | null>(null);
//   const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isEditingMode, setIsEditingMode] = useState(false); // Manage Edit Mode state

//   useEffect(() => {
//     console.log(`Running useEffect for category: ${category}`);

//     if (config && config.sections) {
//       console.log(`Processing ${config.sections.length} sections`);
//       // Loop through each section and handle data loading
//       config.sections.forEach((section, index) => {
//         const sectionType = section.key || `section${index}`;
//         console.log(`Handling section: ${sectionType}`);

//         const savedData = loadFromLocalStorage(category!, sectionType);

//         if (savedData && savedData.length > 0) {
//           // If localStorage has data, set it in the sectionData state
//           console.log(`Found saved data for section: ${sectionType}`, savedData);
//           setSectionData((prevData) => ({
//             ...prevData,
//             [sectionType]: savedData,
//           }));
//         } else {
//           // Otherwise, fetch from backend using the category and sectionType
//           console.log(`No saved data for section: ${sectionType}. Fetching from backend...`);
//           fetchDataFromBackend(category!, sectionType);
//         }
//       });
//     } else {
//       console.log(`No valid config found for category: ${category}`);
//     }
//   }, [category]);

//   const fetchDataFromBackend = async (category: string, sectionType: string | null) => {
//     try {
//       const url = sectionType
//         ? `http://localhost:3000/api/${category}/section/${sectionType}/66dea837debad3d86c91d178`
//         : `http://localhost:3000/api/${category}/66dea837debad3d86c91d178`;

//       console.log(`Fetching data from backend: ${url}`);
//       const response = await axios.get(url);

//       if (response.data.length > 0) {
//         console.log(`Fetched data for section: ${sectionType}`, response.data);
//         setSectionData((prevData) => ({
//           ...prevData,
//           [sectionType]: response.data,  // Correctly assign the fetched data to the section
//         }));

//         console.log("Updated sectionData after fetching from backend:", sectionData);
//       } else {
//         console.log(`No data received for section: ${sectionType}`);
//         setSectionData((prevData) => ({
//           ...prevData,
//           [sectionType]: [],
//         }));
//       }
//     } catch (error) {
//       console.error('Error fetching data from backend:', error);
//       setError('Failed to fetch data. Please try again.');
//     }
//   };

//   // Add or Edit functionality
//   const handleAddOrEditData = (formData: any, sectionIndex: number) => {
//     console.log(`Handling add/edit for section: ${sectionIndex}`);
//     const sectionType = config.sections[sectionIndex].key || `section${sectionIndex}`;
//     const updatedData = [...(sectionData[sectionType] || [])];

//     if (editIndex !== null) {
//       updatedData[editIndex] = { ...updatedData[editIndex], ...formData };
//     } else {
//       const firstTextFieldKey = config.sections[sectionIndex].fields.find((field) => field.type === 'text')?.key;
//       const uniqueId = generateSourceId(formData[firstTextFieldKey]);
//       updatedData.push({ ...formData, sourceId: uniqueId });
//     }

//     setSectionData((prevData) => ({
//       ...prevData,
//       [sectionType]: updatedData,
//     }));

//     saveToLocalStorage(category!, sectionType, updatedData);
//     setShowPopup(false);
//     setEditIndex(null);
//     setActiveSectionIndex(null);
//     setError(null);
//   };

//   // Delete functionality
//   const handleDelete = (index: number, sectionIndex: number) => {
//     console.log(`Deleting item from section: ${sectionIndex}`);
//     const sectionType = config.sections[sectionIndex].key || `section${sectionIndex}`;
//     const updatedData = [...sectionData[sectionType]];
//     updatedData.splice(index, 1);

//     setSectionData((prevData) => ({
//       ...prevData,
//       [sectionType]: updatedData,
//     }));

//     saveToLocalStorage(category!, sectionType, updatedData);
//   };


//   const handleFinalSubmit = async (sectionIndex) => {
//     try {
//       const sectionKey = config.sections[sectionIndex].key || `section${sectionIndex}`;

//       console.log('Submitting final data for section:', sectionKey); // Debugging log

//       // Always use sectionKey to access sectionData
//       const dataToSubmit = sectionData[sectionKey];

//       // If data is undefined or empty, log an error and return early
//       if (!dataToSubmit || dataToSubmit.length === 0) {
//         console.error(`No data to submit for section: ${sectionKey}`);
//         return;
//       }

//       console.log('Data to submit:', dataToSubmit);  // Log the data being submitted

//       const response = await axios.post(`http://localhost:3000/api/${category}/section/${sectionKey}/final-submit`, {
//         userId: '66dea837debad3d86c91d178',  // Example userId
//         data: dataToSubmit,                  // Section data to be submitted
//         category,                            // Current category
//         sectionType: sectionKey,             // Section key
//       });

//       console.log(response.data.message);   // Debugging log for response message
//       clearLocalStorage(category, sectionKey); // Clear data from localStorage

//     } catch (error) {
//       console.error('Error during final submit:', error);  // Debugging log for errors
//     }
//   };





//   // Toggle Edit Mode
//   const toggleEditMode = () => {
//     setIsEditingMode(!isEditingMode);
//   };

//   if (!config) {
//     return <div>Category not found</div>;
//   }

//   return (
//     <MainLayout>
//       <h1 className="text-2xl font-bold mb-4">{config.pageTitle}</h1>

//       {/* Toggle button to enable/disable edit mode */}
//       <button
//         onClick={toggleEditMode}
//         className="bg-yellow-500 text-white px-4 py-2 mb-4"
//       >
//         {isEditingMode ? 'Disable Edit Mode' : 'Enable Edit Mode'}
//       </button>

//       {config.sections.map((section, sectionIndex) => (
//         <div key={sectionIndex} className="mb-6">
//           <p>{section.description}</p>
//           <button
//             onClick={() => {
//               setShowPopup(true);
//               setActiveSectionIndex(sectionIndex);
//             }}
//             className="bg-green-500 text-white px-4 py-2 mt-4"
//           >
//             {section.addButtonLabel}
//           </button>

//           {sectionData[section.key || `section${sectionIndex}`] && sectionData[section.key || `section${sectionIndex}`].length > 0 ? (
//             <Table
//               data={sectionData[section.key || `section${sectionIndex}`]}
//               columns={section.columns}
//               onDelete={isEditingMode ? (index) => handleDelete(index, sectionIndex) : undefined} // Only allow delete in edit mode
//               onEdit={isEditingMode ? (index) => {
//                 setEditIndex(index);
//                 setActiveSectionIndex(sectionIndex);
//                 setShowPopup(true);
//               } : undefined} // Only allow edit in edit mode
//               isEditingMode={isEditingMode} // Pass edit mode state to table
//             />
//           ) : (
//             <p>No data available for this section.</p>
//           )}
//         </div>
//       ))}

//       {showPopup && activeSectionIndex !== null && (
//         <PopupForm
//           fields={config.sections[activeSectionIndex].fields}
//           formData={editIndex !== null ? sectionData[config.sections[activeSectionIndex].key || `section${activeSectionIndex}`][editIndex] : null}
//           onSubmit={(formData) => handleAddOrEditData(formData, activeSectionIndex)}
//           onClose={() => {
//             setShowPopup(false);
//             setEditIndex(null);
//             setActiveSectionIndex(null);
//           }}
//         />
//       )}


//       <div className="flex justify-end mt-4">
//         {config.sections.map((section, sectionIndex) => (
//           <button
//             key={sectionIndex}
//             onClick={() => handleFinalSubmit(sectionIndex)}
//             className="bg-blue-500 text-white px-4 py-2"
//           >
//             Final Submit {section.description}
//           </button>
//         ))}
//       </div>
//     </MainLayout>
//   );
// };

// export default DynamicCategoryPage;











import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Add useNavigate
import { categoryConfig } from '../../utils/categoryConfig';
import PopupForm from '../../components/PopupForm';
import Table from '../../components/Table';
import MainLayout from '../../layouts/MainLayout';
import axios from 'axios';
import { generateSourceId } from '../../utils/helpers';

// Helper function to convert kebab-case to camelCase
const toCamelCase = (str: string) => {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

// Save to Local Storage Per Section
const saveToLocalStorage = (category: string, sectionType: string, data: any[]) => {
  console.log(`Saving data to localStorage for section: ${sectionType}`);
  localStorage.setItem(`ghg_${category}_${sectionType}_data`, JSON.stringify(data));
};

// Load from Local Storage Per Section
const loadFromLocalStorage = (category: string, sectionType: string) => {
  console.log(`Loading data from localStorage for section: ${sectionType}`);
  const savedData = localStorage.getItem(`ghg_${category}_${sectionType}_data`);
  return savedData ? JSON.parse(savedData) : [];
};

// Clear Local Storage Per Section
const clearLocalStorage = (category: string, sectionType: string) => {
  console.log(`Clearing localStorage for section: ${sectionType}`);
  localStorage.removeItem(`ghg_${category}_${sectionType}_data`);
};

const DynamicCategoryPage = () => {
  const { category } = useParams(); // Get category from URL
  const navigate = useNavigate(); // Add navigate for redirection
  const camelCaseCategory = toCamelCase(category!); // Convert URL param to camelCase
  const config = categoryConfig[camelCaseCategory]; // Access config using camelCase key

  // State to manage section data
  const [sectionData, setSectionData] = useState<any>({});
  const [showPopup, setShowPopup] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditingMode, setIsEditingMode] = useState(false); // Manage Edit Mode state

  useEffect(() => {
    console.log(`Running useEffect for category: ${category}`);

    if (config && config.sections) {
      console.log(`Processing ${config.sections.length} sections`);
      // Loop through each section and handle data loading
      config.sections.forEach((section, index) => {
        const sectionType = section.key || `section${index}`;
        console.log(`Handling section: ${sectionType}`);

        const savedData = loadFromLocalStorage(category!, sectionType);

        if (savedData && savedData.length > 0) {
          // If localStorage has data, set it in the sectionData state
          console.log(`Found saved data for section: ${sectionType}`, savedData);
          setSectionData((prevData) => ({
            ...prevData,
            [sectionType]: savedData,
          }));
        } else {
          // Otherwise, fetch from backend using the category and sectionType
          console.log(`No saved data for section: ${sectionType}. Fetching from backend...`);
          fetchDataFromBackend(category!, sectionType);
        }
      });
    } else {
      console.log(`No valid config found for category: ${category}`);
    }
  }, [category]);

  const fetchDataFromBackend = async (category: string, sectionType: string | null) => {
    try {
      const url = sectionType
        ? `http://localhost:3000/api/${category}/section/${sectionType}/66dea837debad3d86c91d178`
        : `http://localhost:3000/api/${category}/66dea837debad3d86c91d178`;

      console.log(`Fetching data from backend: ${url}`);
      const response = await axios.get(url);

      if (response.data.length > 0) {
        console.log(`Fetched data for section: ${sectionType}`, response.data);
        setSectionData((prevData) => ({
          ...prevData,
          [sectionType]: response.data,  // Correctly assign the fetched data to the section
        }));

        console.log("Updated sectionData after fetching from backend:", sectionData);
      } else {
        console.log(`No data received for section: ${sectionType}`);
        setSectionData((prevData) => ({
          ...prevData,
          [sectionType]: [],
        }));
      }
    } catch (error) {
      console.error('Error fetching data from backend:', error);
      setError('Failed to fetch data. Please try again.');
    }
  };

  // Add or Edit functionality
  const handleAddOrEditData = (formData: any, sectionIndex: number) => {
    console.log(`Handling add/edit for section: ${sectionIndex}`);
    const sectionType = config.sections[sectionIndex].key || `section${sectionIndex}`;
    const updatedData = [...(sectionData[sectionType] || [])];

    if (editIndex !== null) {
      updatedData[editIndex] = { ...updatedData[editIndex], ...formData };
    } else {
      const firstTextFieldKey = config.sections[sectionIndex].fields.find((field) => field.type === 'text')?.key;
      const uniqueId = generateSourceId(formData[firstTextFieldKey]);
      updatedData.push({ ...formData, sourceId: uniqueId });
    }

    setSectionData((prevData) => ({
      ...prevData,
      [sectionType]: updatedData,
    }));

    saveToLocalStorage(category!, sectionType, updatedData);
    setShowPopup(false);
    setEditIndex(null);
    setActiveSectionIndex(null);
    setError(null);
  };

  // Delete functionality
  const handleDelete = (index: number, sectionIndex: number) => {
    console.log(`Deleting item from section: ${sectionIndex}`);
    const sectionType = config.sections[sectionIndex].key || `section${sectionIndex}`;
    const updatedData = [...sectionData[sectionType]];
    updatedData.splice(index, 1);

    setSectionData((prevData) => ({
      ...prevData,
      [sectionType]: updatedData,
    }));

    saveToLocalStorage(category!, sectionType, updatedData);
  };


  const handleFinalSubmit = async (sectionIndex) => {
    try {
      const sectionKey = config.sections[sectionIndex].key || `section${sectionIndex}`;

      console.log('Submitting final data for section:', sectionKey); // Debugging log

      // Always use sectionKey to access sectionData
      const dataToSubmit = sectionData[sectionKey];

      // If data is undefined or empty, log an error and return early
      if (!dataToSubmit || dataToSubmit.length === 0) {
        console.error(`No data to submit for section: ${sectionKey}`);
        return;
      }

      console.log('Data to submit:', dataToSubmit);  // Log the data being submitted

      const response = await axios.post(`http://localhost:3000/api/${category}/section/${sectionKey}/final-submit`, {
        userId: '66dea837debad3d86c91d178',  // Example userId
        data: dataToSubmit,                  // Section data to be submitted
        category,                            // Current category
        sectionType: sectionKey,             // Section key
      });

      console.log(response.data.message);   // Debugging log for response message
      clearLocalStorage(category, sectionKey); // Clear data from localStorage

    } catch (error) {
      console.error('Error during final submit:', error);  // Debugging log for errors
    }
  };

  // Handle navigation to calculation page
  const handleViewCalculatedData = () => {
    // Navigate to the calculation page for the current category
    navigate(`/category/${category}/calculations`);
  };

  // Toggle Edit Mode
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

          {sectionData[section.key || `section${sectionIndex}`] && sectionData[section.key || `section${sectionIndex}`].length > 0 ? (
            <Table
              data={sectionData[section.key || `section${sectionIndex}`]}
              columns={section.columns}
              onDelete={isEditingMode ? (index) => handleDelete(index, sectionIndex) : undefined} // Only allow delete in edit mode
              onEdit={isEditingMode ? (index) => {
                setEditIndex(index);
                setActiveSectionIndex(sectionIndex);
                setShowPopup(true);
              } : undefined} // Only allow edit in edit mode
              isEditingMode={isEditingMode} // Pass edit mode state to table
            />
          ) : (
            <p>No data available for this section.</p>
          )}
        </div>
      ))}

      {showPopup && activeSectionIndex !== null && (
        <PopupForm
          fields={config.sections[activeSectionIndex].fields}
          formData={editIndex !== null ? sectionData[config.sections[activeSectionIndex].key || `section${activeSectionIndex}`][editIndex] : null}
          onSubmit={(formData) => handleAddOrEditData(formData, activeSectionIndex)}
          onClose={() => {
            setShowPopup(false);
            setEditIndex(null);
            setActiveSectionIndex(null);
          }}
        />
      )}

      {/* Final Submit Button */}
      <div className="flex justify-end mt-4">
        {config.sections.map((section, sectionIndex) => (
          <button
            key={sectionIndex}
            onClick={() => handleFinalSubmit(sectionIndex)}
            className="bg-blue-500 text-white px-4 py-2"
          >
            Final Submit {section.description}
          </button>
        ))}
      </div>

      {/* New Calculate Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleViewCalculatedData}
          className="bg-red-500 text-white px-4 py-2"
        >
          View Calculated Data
        </button>
      </div>
    </MainLayout>
  );
};

export default DynamicCategoryPage;



















