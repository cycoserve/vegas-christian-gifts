// components/Navigation.tsx
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { menuItems } from './data/menuItems';

const Navigation: React.FC = () => {

  return (
    <>
      <div className="">
        <ul className="flex justify-between space-x-12 items-center list-none">
          {menuItems.map((item) => (
              <Link href={item.url} key={item.id}>
                <p className="text-white text-xl hover:text-slate-200 font-bold hover:text-white px-4 rounded-full ">
                  {item.title}
                </p>
              </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navigation;
