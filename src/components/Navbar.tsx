import React from 'react';
import { Menu } from 'lucide-react';

export function Navbar() {
  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (window.location.pathname !== '/') {
      window.location.href = '/#about';
    } else {
      aboutSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.location.href = path;
  };

  const isCurrentPath = (path: string) => window.location.pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a 
              href="/"
              onClick={(e) => handleNavigation(e, '/')}
              className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
            >
              NutriLens
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              href="/" 
              onClick={(e) => handleNavigation(e, '/')}
              isActive={isCurrentPath('/')}
            >
              Home
            </NavLink>
            <NavLink 
              href="/analyze" 
              onClick={(e) => handleNavigation(e, '/analyze')}
              isActive={isCurrentPath('/analyze')}
            >
              Analyze
            </NavLink>
            <NavLink 
              href="#about" 
              onClick={scrollToAbout}
              isActive={false}
            >
              About Us
            </NavLink>
          </div>
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ 
  href, 
  children, 
  isActive, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode; 
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${
        isActive ? 'text-emerald-600' : 'text-gray-600'
      } hover:text-emerald-500 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
    >
      {children}
    </a>
  );
}