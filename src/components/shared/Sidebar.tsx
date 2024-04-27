"use client";

// Sidebar.tsx
import { usePathname } from 'next/navigation';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const isLoginPage = pathname.startsWith('/login');

  if (isLoginPage) {
    return null; // No renderizar el componente en la ruta /login
  }

  return (
    <aside>
      Sidebar
    </aside>
  );
};

export default Sidebar;