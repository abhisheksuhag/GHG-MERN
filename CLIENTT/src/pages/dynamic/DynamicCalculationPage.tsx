// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import MainLayout from '../../layouts/MainLayout';
// import Table from '../../components/Table'; // Reusable table component
// import axios from 'axios';
// import { calculationConfig } from '../../utils/calculationConfig'; // Calculation config

// // Helper function to convert kebab-case to camelCase
// const toCamelCase = (str: string) => {
//   return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
// };

// const DynamicCalculationPage = () => {
//   const { category } = useParams(); // Get category from the URL
//   const camelCaseCategory = toCamelCase(category!); // Convert URL param to camelCase
//   const config = calculationConfig[camelCaseCategory]; // Access config for the category

//   const [inputData, setInputData] = useState<any[]>([]);
//   const [calculatedData, setCalculatedData] = useState<any>({});
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [sourceIds, setSourceIds] = useState<any[]>([]); // List of sourceIds
//   const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null); // Selected sourceId

//   useEffect(() => {
//     // Fetch available sourceIds when component loads
//     fetchSourceIds();
//   }, [category]);

//   useEffect(() => {
//     // Fetch input and calculated data after sourceId is selected
//     if (selectedSourceId) {
//       fetchInputAndCalculatedData(selectedSourceId);
//     }
//   }, [selectedSourceId]);

//   // Fetch sourceIds from the input table
//   const fetchSourceIds = async () => {
//     setLoading(true);
//     try {
//       const url = `http://localhost:3000/api/${category}/sourceIds`; // Assume backend has an endpoint to get all sourceIds
//       const response = await axios.get(url);

//       if (response.data && response.data.length > 0) {
//         setSourceIds(response.data); // Set the list of sourceIds
//         setSelectedSourceId(response.data[0]); // Automatically select the first sourceId
//       } else {
//         setError('No source IDs found.');
//       }
//     } catch (error) {
//       console.error('Error fetching source IDs:', error);
//       setError('Failed to fetch source IDs.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch both input data and calculated data for the selected sourceId
//   const fetchInputAndCalculatedData = async (sourceId: string) => {
//     setLoading(true);
//     try {
//       const url = `http://localhost:3000/api/${category}/${sourceId}`;
//       const response = await axios.get(url);

//       if (response.data) {
//         const { inputData, calculatedData } = response.data;
//         setInputData(inputData);
//         setCalculatedData(calculatedData);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('Failed to fetch input and calculated data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Send request to backend to calculate emissions
//   const handleCalculate = async () => {
//     setLoading(true);
//     try {
//       const url = `http://localhost:3000/api/calculate/${category}`;
//       const response = await axios.post(url, {
//         data: inputData, // Send input data for calculations
//       });

//       if (response.data) {
//         setCalculatedData(response.data.calculatedData);
//       }
//     } catch (error) {
//       console.error('Error calculating emissions:', error);
//       setError('Failed to calculate emissions.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!config) {
//     return <div>Category configuration not found</div>;
//   }

//   return (
//     <MainLayout>
//       <h1 className="text-2xl font-bold mb-4">{config.pageTitle}</h1>

//       {loading && <p>Loading data...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* SourceId Dropdown */}
//       {sourceIds.length > 0 && (
//         <div className="mb-4">
//           <label htmlFor="sourceId" className="mr-2">Select Source ID:</label>
//           <select
//             id="sourceId"
//             value={selectedSourceId || ''}
//             onChange={(e) => setSelectedSourceId(e.target.value)}
//             className="border border-gray-400 px-2 py-1"
//           >
//             {sourceIds.map((id) => (
//               <option key={id} value={id}>{id}</option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Input Data Table */}
//       {inputData.length > 0 && (
//         <div className="mb-6">
//           <h2 className="text-xl font-bold mb-2">Input Data</h2>
//           <Table data={inputData} columns={config.inputColumns} />
//         </div>
//       )}

//       {/* Calculated Data Tables */}
//       {calculatedData && Object.keys(calculatedData).length > 0 && (
//         <>
//           {config.calculatedSections.map((section, index) => (
//             <div key={index} className="mb-6">
//               <h2 className="text-xl font-bold mb-2">{section.title}</h2>
//               <Table data={calculatedData[section.key]} columns={section.columns} />
//             </div>
//           ))}
//         </>
//       )}

//       {/* Calculate Button */}
//       <div className="flex justify-end mt-4">
//         <button onClick={handleCalculate} className="bg-blue-500 text-white px-4 py-2">
//           Calculate Emissions
//         </button>
//       </div>
//     </MainLayout>
//   );
// };

// export default DynamicCalculationPage;













import { useParams } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import CalculateTable from '../../components/CalculateTable'; // Import the simplified table component
import { calculationConfig } from '../../utils/calculationConfig'; // Calculation config

// Helper function to convert kebab-case to camelCase
const toCamelCase = (str: string) => {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

const DynamicCalculationPage = () => {
  const { category } = useParams(); // Get category from the URL
  const camelCaseCategory = toCamelCase(category!); // Convert URL param to camelCase

  // Logging the category and the converted camelCaseCategory
  console.log("Category from URL:", category);
  console.log("Camel Case Category:", camelCaseCategory);

  const config = calculationConfig[camelCaseCategory]; // Access config for the category

  // Logging the config to check if it's being correctly retrieved
  console.log("Fetched Config:", config);

  if (!config) {
    console.log("Category configuration not found");
    return <div>Category configuration not found</div>;
  }

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">{config.pageTitle}</h1>

      {/* Empty table rendering from calculation config */}
      {config.calculatedSections && config.calculatedSections.length > 0 && (
        <>
          {config.calculatedSections.map((section, index) => {
            console.log("Rendering section:", section.title);
            return (
              <div key={index} className="mb-6">
                <h2 className="text-xl font-bold mb-2">{section.title}</h2>
                <CalculateTable data={[]} columns={section.columns} />
              </div>
            );
          })}
        </>
      )}
    </MainLayout>
  );
};

export default DynamicCalculationPage;
