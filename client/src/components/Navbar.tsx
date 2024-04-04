// import React from 'react';
import Logo from './icons/logoIcon';
import UserIcon from './icons/UserIcon';
import CartIcon from './icons/cartIcon';

export default function Navbar() {
  return (
    <header className="flex justify-between items-center bg-transparent w-full px-28 py-5">
      <Logo className="text-white size-32" />
      <ul className="flex gap-6">
        <li className="text-white">Home</li>
        <li className="text-white">Categories</li>
        <li className="text-white">Contact Us</li>
        <li className="text-white">Blog</li>
      </ul>
      <div className="flex gap-4">
        <a href="/user">
          <UserIcon className="size-6 text-white" />
        </a>
        <a href="/user">
          <CartIcon className="size-6 text-white" />
        </a>
      </div>
    </header>
  );
}
