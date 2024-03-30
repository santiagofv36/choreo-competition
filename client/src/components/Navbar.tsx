import React from 'react';

export default function Navbar() {
  return (
    <header className="flex justify-between bg-transparent w-full p-5">
      <div>Logo</div>
      <ul className="flex gap-2">
        <li className="">Home</li>
        <li className="">Categories</li>
        <li className="">Contact Us</li>
        <li className="">Blog</li>
      </ul>
      <div className="flex gap-4">
        <button>USER</button>
        <button>CART</button>
      </div>
    </header>
  );
}
