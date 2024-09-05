// CLIENT/src/layouts/MainLayout.tsx

import { ReactNode } from 'react';
import Sidebar from '../components/SideBar';

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow p-4">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
