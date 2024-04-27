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
    <header className='w-screen text-center'>
      Soy el header
    </header>
  );
};

export default Header;