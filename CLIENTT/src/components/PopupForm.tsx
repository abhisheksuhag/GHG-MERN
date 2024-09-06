


// import { useState, useEffect } from 'react';
// import { generateSourceId } from '../utils/helpers';

// interface PopupFormProps {
//   onSubmit: (formData: any) => void;
//   onClose: () => void;
//   fields: Array<{ label: string; type: string; key: string; options?: string[] }>; // Dynamic fields
// }

// const PopupForm = ({ onSubmit, onClose, fields }: PopupFormProps) => {
//   const [formData, setFormData] = useState<{ [key: string]: any }>({});
//   const [sourceId, setSourceId] = useState(''); // State for auto-generated source ID

//   // Load saved form data from local storage
//   useEffect(() => {
//     const savedFormData = localStorage.getItem('popupFormData');
//     if (savedFormData) {
//       setFormData(JSON.parse(savedFormData));
//     }
//   }, []);

//   // Save form data to local storage on change
//   useEffect(() => {
//     localStorage.setItem('popupFormData', JSON.stringify(formData));
//   }, [formData]);

//   // Automatically generate the sourceId based on the site input
//   useEffect(() => {
//     if (formData['site']) {
//       setSourceId(generateSourceId(formData['site']));
//     }
//   }, [formData['site']]);

//   const handleChange = (key: string, value: any) => {
//     setFormData((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const fullFormData = { ...formData, sourceId }; // Include the generated sourceId
//     onSubmit(fullFormData); // Pass the form data back to the parent component
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//       <div className="bg-white p-8 rounded max-h-[90%] overflow-y-auto">
//         <h2 className="text-xl font-bold mb-4">Add Details</h2>
//         <form onSubmit={handleSubmit}>
//           {fields.map((field) => (
//             <div className="mb-4" key={field.key}>
//               <label>{field.label}:</label>
//               {field.type === 'text' && (
//                 <input
//                   type="text"
//                   value={formData[field.key] || ''}
//                   onChange={(e) => handleChange(field.key, e.target.value)}
//                   className="border p-2 w-full"
//                   required
//                 />
//               )}
//               {field.type === 'number' && (
//                 <input
//                   type="number"
//                   value={formData[field.key] || ''}
//                   onChange={(e) => handleChange(field.key, parseFloat(e.target.value))}
//                   className="border p-2 w-full"
//                   required
//                 />
//               )}
//               {field.type === 'dropdown' && field.options && (
//                 <select
//                   value={formData[field.key] || ''}
//                   onChange={(e) => handleChange(field.key, e.target.value)}
//                   className="border p-2 w-full"
//                   required
//                 >
//                   <option value="">Select an option</option>
//                   {field.options.map((option, idx) => (
//                     <option key={idx} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               )}
//             </div>
//           ))}

//           {/* Source ID Field (auto-generated) */}
//           <div className="mb-4">
//             <label>Source ID (Auto-generated):</label>
//             <input
//               type="text"
//               value={sourceId}
//               disabled
//               className="border p-2 w-full bg-gray-200"
//             />
//           </div>

//           <div className="flex justify-end">
//             <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 mr-2">
//               Cancel
//             </button>
//             <button type="submit" className="bg-blue-500 text-white px-4 py-2">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PopupForm;










import { useState, useEffect } from 'react';
import { generateSourceId } from '../utils/helpers'; // Import the helper function

interface PopupFormProps {
  fields: Array<{ label: string, type: string, key: string, options?: string[] }>;
  formData?: any; // Optional pre-filled data for editing
  onSubmit: (formData: any) => void;
  onClose: () => void;
}

const PopupForm = ({ fields, formData, onSubmit, onClose }: PopupFormProps) => {
  const [formState, setFormState] = useState<any>({});

  // Generate the sourceId automatically
  useEffect(() => {
    if (formData) {
      setFormState(formData);
    } else if (formState.site) {
      setFormState((prev: any) => ({
        ...prev,
        sourceId: generateSourceId(formState.site),
      }));
    }
  }, [formState.site, formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string) => {
    setFormState({
      ...formState,
      [key]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded max-h-[90%] overflow-auto">
        <h2 className="text-xl font-bold mb-4">Add Entry</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.key} className="mb-4">
              <label>{field.label}:</label>
              {field.type === 'text' || field.type === 'number' ? (
                <input
                  type={field.type}
                  value={formState[field.key] || ''}
                  onChange={(e) => handleChange(e, field.key)}
                  required
                  className="border p-2 w-full"
                />
              ) : field.type === 'dropdown' ? (
                <select
                  value={formState[field.key] || ''}
                  onChange={(e) => handleChange(e, field.key)}
                  required
                  className="border p-2 w-full"
                >
                  <option value="">Select an option</option>
                  {field.options?.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          ))}
          {/* Ensure sourceId is generated */}
          <div className="mb-4">
            <label>Source ID (Auto-generated):</label>
            <input
              type="text"
              value={formState.sourceId || ''}
              disabled
              className="border p-2 w-full bg-gray-200"
            />
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




