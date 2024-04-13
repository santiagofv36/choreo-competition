import React from 'react';
import Logo from './icons/logoIcon';
import UserIcon from './icons/UserIcon';
import CartIcon from './icons/cartIcon';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  const { location } = window;

  const islightNav = React.useMemo(() => {
    return location.pathname === '/';
  }, [location.pathname]);

  return (
    <header className="flex justify-between items-center bg-transparent w-full lg:px-28 -mt-6 px-12 absolute z-10 top-0 right-0">
      <Logo
        className={`${islightNav ? 'text-white' : 'text-primary'} size-32`}
      />
      <Menu
        className={`${
          islightNav ? 'text-white' : 'text-primary'
        } lg:hidden flex`}
        role="button"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute top-16 right-4 bg-white text-primary p-4 w-48 transition-all ease-in-out duration-300 z-50">
          <ul className="flex flex-col gap-4">
            {ROUTES.map((route) => (
              <Link
                to={route?.path ?? ''}
                key={route?.id}
                onClick={() => setIsOpen(false)}
              >
                <li className="border-b border-primary/3 pb-2">
                  {route?.text}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
      <ul className="lg:flex hidden gap-6">
        {ROUTES.map((route) => (
          <Link to={route?.path ?? ''} key={route?.id}>
            <li className={`${islightNav ? 'text-white' : 'text-primary'}`}>
              {route?.text}
            </li>
          </Link>
        ))}
      </ul>
      <div className="lg:flex hidden gap-12">
        <a href="/user">
          <UserIcon
            className={`size-6 ${islightNav ? 'text-white' : 'text-primary'}`}
          />
        </a>
        <a href="/cart">
          <CartIcon
            className={`size-6 ${islightNav ? 'text-white' : 'text-primary'}`}
          />
        </a>
      </div>
    </header>
  );
}
