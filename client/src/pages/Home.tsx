import React from 'react';
import Input from '../components/inputs/Input';
import Button from '../components/inputs/Button';
import { useNavigate } from 'react-router';
import ProductCard from '../components/cards/ProductCard';

const PRODUCTS = [
  {
    id: 1,
    name: 'Product name',
    price: 100,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Product name',
    price: 100,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Product name',
    price: 100,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Product name',
    price: 100,
    image: 'https://via.placeholder.com/150',
  },
];

const FAQ = [
  {
    id: 1,
    question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?',
  },
  {
    id: 2,
    question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?',
  },
  {
    id: 3,
    question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos?',
  },
];

const HomePage = () => {
  const [search, setSearch] = React.useState('');
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/products');
  };

  return (
    <main className="flex flex-col justify-center items-center w-full">
      {/* introduction section */}
      <section className="flex flex-col gap-4 justify-center items-center p-5 mb-12 bg-primary w-full py-32">
        <h1 className="text-2xl md:text-4xl font-bold text-white text-center">
          Your preffered place to shop.
        </h1>
        <h1 className="text-2xl md:text-4xl font-bold text-white text-center">
          Shop anywhere anytime
        </h1>
        <p className="text-md md:text-lg text-white">
          We provide the best products for you
        </p>
        <div className="w-96">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </section>
      {/* Featured products */}
      <section className="w-full bg-bg-neutral p-5 flex flex-col gap-4 lg:px-48 md:px-32">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary">Featured products</h2>
          <span className="text-wrap  w-48 md:w-72">
            For only this week this products have incredible discounts you can't
            miss
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {PRODUCTS.map((product, idx) => (
            <ProductCard key={product?.id ?? idx} product={product} />
          ))}
        </div>
      </section>
      {/* Categories */}
      <section className="w-full bg-bg-neutral p-5 justify-center items-center flex flex-col lg:px-48 md:px-32">
        <div className="flex flex-col justify-center items-center gap-4 w-full mb-12">
          <h2 className="text-2xl font-semibold text-primary">
            View our range of categories
          </h2>
          <span className="text-text-color">
            As an E-commerce we have a various selection of categories for our
            products
          </span>
        </div>
        <div className="grid grid-cols-3 gap-8 w-full">
          <div className="size-full relative">
            <img
              src="https://via.placeholder.com/150"
              alt="Category"
              className="size-full rounded-xl h-96"
            />
            <p className="absolute bottom-2 px-4 text-border-color">
              Bedroom Furniture
            </p>
          </div>
          <div className="size-full">
            <div className="flex flex-col items-center justify-center w-full gap-8">
              <div className="w-full">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Category"
                  className="w-full rounded-xl h-44"
                />
                <p className="absolute bottom-1 px-4 text-border-color"></p>
              </div>
              <div className="w-full">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Category"
                  className="w-full rounded-xl h-44"
                />
                <p className="absolute bottom-1 px-4 text-border-color"></p>
              </div>
            </div>
          </div>
          <div className="size-full relative">
            <img
              src="https://via.placeholder.com/150"
              alt="Category"
              className="size-full rounded-xl h-96"
            />
            <p className="absolute bottom-2 px-4 text-border-color">
              Bedroom Furniture
            </p>
          </div>
        </div>
      </section>
      {/* Popular products */}
      <section className="w-full bg-bg-neutral p-5 flex flex-col gap-4 lg:px-48 md:px-32">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-primary">
              Most Popular Products
            </h2>
            <span className="text-sm text-secondary">
              This are our most purchased products overtime
            </span>
          </div>
          <Button
            onClick={handleViewAll}
            text="View All"
            className="w-24 lg:w-28"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {PRODUCTS.map((product, idx) => (
            <ProductCard key={product?.id ?? idx} product={product} />
          ))}
        </div>
      </section>
      {/* FAQ */}
      <section className="w-full bg-bg-neutral p-5 flex flex-col lg:flex-row gap-4 justify-between lg:px-48 md:px-32 pb-10">
        <div className="flex flex-col justify-center items-center xl:justify-start gap-4">
          <h1 className="text-2xl text-primary font-bold">
            Frequently Asked Questions
          </h1>
          <span className="text-text-color">
            Here are some of the most asked questions
          </span>
          <Button onClick={() => {}} text="Ask a question" className="w-1/2" />
        </div>
        <div className="flex flex-col gap-4">
          {FAQ.map((faq, idx) => (
            <div
              key={faq?.id ?? idx}
              className="h-32 border-border-color border shadow rounded-sm"
            >
              <div className="flex justify-between p-4">
                <h2>{faq?.question}</h2>
                <button>^</button>
              </div>
              <p className="px-4 line-clamp-3">{faq?.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
