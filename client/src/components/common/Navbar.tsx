/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import nProgress from 'nprogress';
import Logo from '@/components/icons/logoIcon';
import UserIcon from '@/components/icons/UserIcon';
import CartIcon from '@/components/icons/cartIcon';
import { logoutUser } from '@/app/api/authSlice';
import { useCustomNavigate } from '@/hooks/use-previouspath';

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

  const user = useSelector((state: any) => state.auth.user);

  const navigate = useCustomNavigate();

  const dispatch = useDispatch();

  const islightNav = React.useMemo(() => {
    return location.pathname === '/';
  }, [location.pathname]);

  const handleLogout = async () => {
    nProgress.start();
    setIsOpen(false);
    dispatch(logoutUser() as any);
    setTimeout(() => {
      navigate('/auth?redirect=login');
      toast.success('Logged out successfully');
      nProgress.done();
    }, 2000);
  };

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
        <div className="absolute top-16 right-4 bg-white text-primary p-4 w-48 transition-all ease-in-out duration-300 z-50 lg:hidden">
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
            {user ? (
              <div className="flex flex-col gap-4">
                <Link to="/profile" onClick={() => setIsOpen(false)}>
                  <li className="border-b border-primary/3 pb-2">Profile</li>
                </Link>
                <Link to="/cart">
                  <li className="border-b border-primary/3 pb-2">Cart</li>
                </Link>
                <Link to="/" onClick={handleLogout}>
                  <li className="border-b border-primary/3 pb-2">Logout</li>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link
                  to="/auth?redirect=login"
                  onClick={() => setIsOpen(false)}
                >
                  <li className="border-b border-primary/3 pb-2">Log in</li>
                </Link>
                <Link
                  to="/auth?redirect=signup"
                  onClick={() => setIsOpen(false)}
                >
                  <li className="border-b border-primary/3 pb-2">Sign up</li>
                </Link>
              </div>
            )}
          </ul>
        </div>
      )}
      <ul className="lg:flex hidden gap-6">
        {ROUTES.map((route) => (
          <Link to={route?.path ?? ''} key={route?.id}>
            <li
              className={` text-xl ${
                islightNav ? 'text-white' : 'text-primary'
              }`}
            >
              {route?.text}
            </li>
          </Link>
        ))}
      </ul>
      <div className="lg:flex hidden gap-12">
        {user ? (
          <div className="flex gap-12">
            <Link to="/profile">
              <UserIcon
                className={`${
                  islightNav ? 'text-white' : 'text-primary'
                } size-6`}
              />
            </Link>
            <Link to="/cart">
              <CartIcon
                className={`${
                  islightNav ? 'text-white' : 'text-primary'
                } size-6`}
              />
            </Link>
            <span
              className={`${
                islightNav ? 'text-white' : 'text-primary'
              } text-xl`}
              onClick={handleLogout}
              role="button"
            >
              Logout
            </span>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/auth?redirect=login">
              <span
                className={`${
                  islightNav ? 'text-white' : 'text-primary'
                } text-xl hover:underline`}
              >
                {' '}
                Log in
              </span>
            </Link>
            <Link to="/auth?redirect=signup">
              <span
                className={`${
                  islightNav ? 'text-white' : 'text-primary'
                } text-xl hover:underline`}
              >
                {' '}
                Sign up
              </span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
