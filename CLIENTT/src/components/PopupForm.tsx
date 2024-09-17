import { useState, useEffect } from 'react';

interface PopupFormProps {
  fields: Array<{ label: string; type: string; key: string; options?: string[] }>;
  formData?: any;
  onSubmit: (formData: any) => void;
  onClose: () => void;
  isEditing: boolean;
}

const PopupForm = ({ fields, formData, onSubmit, onClose, isEditing }: PopupFormProps) => {
  const [formState, setFormState] = useState<any>({});

  useEffect(() => {
    if (formData) {
      setFormState(formData);
    } else {
      setFormState({});
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string) => {
    if (key === 'siteName' && isEditing) {
      return; // Prevent changing site name when editing
    }
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
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'EDIT COMBUSTION DATA' : 'ADD COMBUSTION DATA'}</h2>
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
                  disabled={field.key === 'siteName' && isEditing}
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
          {isEditing && (
            <div className="mb-4">
              <label>Source ID:</label>
              <input
                type="text"
                value={formState.sourceId || ''}
                disabled
                className="border p-2 w-full bg-gray-200"
              />
            </div>
          )}
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-red-400 text-white px-4 py-2 mr-2">
              Cancel
            </button>
            <button type="submit" className="bg-[#01b0f1] text-white px-4 py-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;