import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState('stationary-combustion');

  const categories = [
    { name: 'Stationary Combustion', link: '/category/stationary-combustion' },
    { name: 'Mobile Combustion', link: '/category/mobile-combustion' },
    { name: 'Refrigeration and AC', link: '/category/refrigeration-combustion' }, // Use matching key for backend
    { name: 'Gas Combustion', link: '/category/gas-combustion' },
    { name: 'Fire Suppression Combustion', link: '/category/fire-suppression-combustion' }, // Corrected link
    { name: 'Purchased Electricity', link: '/category/purchased-electricity' },
    { name: 'Purchased Heating', link: '/category/purchased-heating' }
  ];

  return (
    <div className="bg-[#01b0f1] text-white w-64 p-4">
      <h1 className="text-lg font-bold mb-6">Emissions Categories</h1>
      <ul>
        {categories.map((category) => (
          <li
            key={category.name}
            className={`mb-4 ${activeCategory === category.name ? 'font-bold' : ''}`}
            onClick={() => setActiveCategory(category.name)}
          >
            <Link to={category.link}>{category.name}</Link> {/* Match category link */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
