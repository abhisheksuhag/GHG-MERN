// CLIENT/src/components/SideBar.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState('Stationary Combustion');

  const categories = [
    { name: 'Stationary Combustion', link: '/stationary-combustion' },
    { name: 'Mobile Combustion', link: '/mobile-combustion' },
    { name: 'Process Emissions', link: '/process-emissions' },
    { name: 'Fugitive Emissions', link: '/fugitive-emissions' },
    { name: 'Purchased Electricity', link: '/purchased-electricity' },
    { name: 'Purchased Heating', link: '/purchased-heating' }
  ];

  return (
    <div className="bg-gray-800 text-white w-64 p-4">
      <h1 className="text-lg font-bold mb-6">Emissions Categories</h1>
      <ul>
        {categories.map((category) => (
          <li
            key={category.name}
            className={`mb-4 ${activeCategory === category.name ? 'font-bold' : ''}`}
            onClick={() => setActiveCategory(category.name)}
          >
            <Link to={category.link}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
