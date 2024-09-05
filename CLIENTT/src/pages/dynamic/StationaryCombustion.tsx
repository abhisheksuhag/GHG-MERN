// CLIENT/src/pages/dynamic/StationaryCombustion.tsx

import { useState } from 'react';
import PopupForm from '../../components/PopupForm';
import Table from '../../components/Table';
import MainLayout from '../../layouts/MainLayout';

const StationaryCombustion = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const handleAddSite = (formData: any) => {
    setData([...data, formData]);
    setShowPopup(false);
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Stationary Combustion</h1>
      <p>Guidelines: Please add details about stationary combustion sources...</p>

      <button onClick={() => setShowPopup(true)} className="bg-green-500 text-white px-4 py-2 mt-4">
        Add a Site
      </button>

      {showPopup && <PopupForm onSubmit={handleAddSite} onClose={() => setShowPopup(false)} />}

      {data.length > 0 && <Table data={data} />}
    </MainLayout>
  );
};

export default StationaryCombustion;
