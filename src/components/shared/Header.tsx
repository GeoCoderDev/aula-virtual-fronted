"use client";
// Header.tsx
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const pathname = usePathname();
  const isLoginPage = pathname.startsWith('/login');

  if (isLoginPage) {
    return null; // No renderizar el componente en la ruta /login
  }

  return (
    <header id="header" className='w-screen text-center bg-verde-spotify py-4 sticky top-0 left-0 '>
      Soy el header
    </header>
  );
};

export default Header;