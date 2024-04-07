import React from 'react';
import FilterCard from '../../components/FilterCard';

export default function Product() {
  return (
    <main className="flex flex-col justify-center items-center w-full lg:px-24">
      {/* introduction section */}
      <section className="flex gap-12 justify-center p-5 mb-12 bg-bg-neutral w-full py-32">
        <aside className="flex flex-col gap-12 lg:w-1/5 w-1/6">
          <FilterCard title="Categories" options={['Beauty', 'Electronic']} />
          <FilterCard title="Price Range" options={['$10-100', '$200-500']} />
        </aside>
        <div className="flex flex-col gap-4 lg:w-4/5 w-5/6 justify-start">
          <h1 className="text-2xl font-bold text-primary">Products</h1>
        </div>
      </section>
    </main>
  );
}
