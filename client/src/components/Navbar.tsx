import React from 'react';
import Logo from './icons/logoIcon';
import UserIcon from './icons/UserIcon';
import CartIcon from './icons/cartIcon';
import { Menu } from 'lucide-react';

const ROUTES = [
  {
    id: '1',
    text: 'Home',
    path: '/',
  },
  {
    id: '2',
    text: 'Products',
    path: '/products',
  },
  {
    id: '3',
    text: 'Contact Us',
    path: '/contact',
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="flex justify-between items-center bg-transparent w-full lg:px-28 -mt-6 px-12">
      <Logo className="text-white size-32" />
      <Menu
        className="text-white lg:hidden flex"
        role="button"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute top-16 right-4 bg-white text-primary p-4 w-48 transition-all ease-in-out duration-300 z-50">
          <ul className="flex flex-col gap-4">
            {ROUTES.map((route) => (
              <a href={route?.path ?? ''} id={route?.id}>
                <li className="border-b border-primary/3 pb-2">
                  {route?.text}
                </li>
              </a>
            ))}
          </ul>
        </div>
      )}
      <ul className="lg:flex hidden gap-6">
        {ROUTES.map((route) => (
          <a href={route?.path ?? ''} id={route?.id}>
            <li className="text-white">{route?.text}</li>
          </a>
        ))}
      </ul>
      <div className="lg:flex hidden gap-12">
        <a href="/user">
          <UserIcon className="size-6 text-white" />
        </a>
        <a href="/cart">
          <CartIcon className="size-6 text-white" />
        </a>
      </div>
    </header>
  );
}
