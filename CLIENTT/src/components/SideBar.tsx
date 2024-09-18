// // CLIENT/src/components/SideBar.tsx

// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Sidebar = () => {
//   const [activeCategory, setActiveCategory] = useState('Stationary Combustion');

//   const categories = [
//     { name: 'Stationary Combustion', link: 'stationary-combustion' },
//     { name: 'Mobile Combustion', link: 'mobile-combustion' },
//     { name: 'Process Emissions', link: 'process-emissions' },
//     { name: 'Fugitive Emissions', link: 'fugitive-emissions' },
//     { name: 'Purchased Electricity', link: 'purchased-electricity' },
//     { name: 'Purchased Heating', link: 'purchased-heating' }
//   ];

//   return (
//     <div className="bg-[#01b0f1] text-white w-64 p-4">
//       <h1 className="text-lg font-bold mb-6">Emissions Categories</h1>
//       <ul>
//         {categories.map((category) => (
//           <li
//             key={category.name}
//             className={`mb-4 ${activeCategory === category.name ? 'font-bold' : ''}`}
//             onClick={() => setActiveCategory(category.name)}
//           >
//              {/* Updated links to point to /category/:category */}
//              <Link to={category.link}>{category.name}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;



import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState('Stationary Combustion');

  const categories = [
    { name: 'Stationary Combustion', link: '/category/stationary-combustion' },
    { name: 'Mobile Combustion', link: '/category/mobile-combustion' },
    { name: 'Process Emissions', link: '/category/process-emissions' },
    { name: 'Fugitive Emissions', link: '/category/fugitive-emissions' },
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
            <Link to={category.link}>{category.name}</Link> {/* Use the correct category-based paths */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
