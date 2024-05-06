/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Input from '@/components/inputs/Input';
import Button from '@/components/inputs/Button';
import { Link } from 'react-router-dom';
import ProductsList from '@/components/products/ProductsList';
import { useDispatch, useSelector } from 'react-redux';
import {
  featuredProducts,
  fetchCategories,
  fetchPopularProducts,
} from '@/app/api/productSlice';
import { Skeleton } from '@/components/ui/skeleton';
import { Category } from '@/app/api/models';

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
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(featuredProducts() as any);
    dispatch(fetchPopularProducts() as any);
    dispatch(fetchCategories() as any);
  }, [dispatch]);

  const featured = useSelector((state: any) => state.products.featuredProducts);
  const isLoadingFeatured = useSelector(
    (state: any) => state.products.loadingFeatured
  );

  const popular = useSelector((state: any) => state.products.popular);
  const isLoadingPopular = useSelector(
    (state: any) => state.products.loadingPopular
  );

  const categories = useSelector((state: any) => state.products.categories);
  const isLoadingCategories = useSelector(
    (state: any) => state.products.loadingCategories
  );

  const [search, setSearch] = React.useState('');

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
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products"
          />
        </div>
      </section>
      {/* Featured products */}
      <ProductsList
        isLoading={isLoadingFeatured}
        products={featured}
        title="Featured Products"
        section={{ className: 'bg-bg-neutral' }}
        grid={{ className: 'gap-x-20' }}
        rightComponent={
          <span className="text-wrap  w-48 md:w-72">
            For only this week this products have incredible discounts you can't
            miss
          </span>
        }
      />
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
        {isLoadingCategories ? (
          <div className="grid lg:grid-cols-3 gap-8 w-full">
            <div className="size-full relative">
              <Skeleton className="w-full h-96 rounded-xl" />
            </div>
            <div className="size-full">
              <div className="flex flex-col items-center justify-center w-full gap-8">
                <div className="w-full relative">
                  <Skeleton className="w-full rounded-xl lg:h-44 h-96 object-cover" />
                </div>
                <div className="w-full relative">
                  <Skeleton className="w-full rounded-xl lg:h-44 h-96 object-cover" />
                </div>
              </div>
            </div>
            <div className="size-full relative">
              <div className="size-full relative">
                <Skeleton className="w-full h-96 rounded-xl" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 w-full">
            <Link
              to={`/products?cat=${
                Array.isArray(categories) &&
                categories?.filter(
                  (category: Category) => category?.name === 'Electronics'
                )[0]?.id
              }`}
            >
              <div className="size-full relative">
                <img
                  src="electronic.webp"
                  alt="Category"
                  className="size-full rounded-xl h-96"
                />
                <p className="absolute bottom-2 px-4 text-white z-10 text-xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  Electronics
                </p>
                <div className="absolute bottom-0 left-0 w-full rounded-xl h-16 bg-gradient-to-t from-gray-300 to-transparent" />
              </div>
            </Link>
            <div className="size-full">
              <div className="flex flex-col items-center justify-center w-full gap-8">
                <Link
                  to={`/products?cat=${
                    Array.isArray(categories) &&
                    categories?.filter(
                      (category: Category) => category?.name === 'Jewelry'
                    )[0]?.id
                  }`}
                  className="w-full"
                >
                  <div className="w-full relative">
                    <img
                      src="jewlry.webp"
                      alt="Category"
                      className="w-full rounded-xl lg:h-44 h-96 object-cover"
                    />
                    <p className="absolute bottom-2 px-4 text-white z-10 text-xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                      Jewelry
                    </p>
                    <div className="absolute bottom-0 left-0 w-full rounded-xl h-16 bg-gradient-to-t from-gray-300 to-transparent" />
                  </div>
                </Link>

                <Link
                  to={`/products?cat=${
                    Array.isArray(categories) &&
                    categories?.filter(
                      (category: Category) => category?.name === 'Clothing'
                    )[0]?.id
                  }`}
                  className="w-full"
                >
                  <div className="w-full relative">
                    <img
                      src="clothing.webp"
                      alt="Category"
                      className="w-full rounded-xl lg:h-44 h-96 object-cover"
                    />
                    <p className="absolute bottom-2 px-4 text-white z-10 text-xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                      Clothing
                    </p>
                    <div className="absolute bottom-0 left-0 w-full rounded-xl h-16 bg-gradient-to-t from-gray-300 to-transparent" />
                  </div>
                </Link>
              </div>
            </div>
            <Link
              to={`/products?cat=${
                Array.isArray(categories) &&
                categories?.filter(
                  (category: Category) => category?.name === 'Books'
                )[0]?.id
              }`}
            >
              <div className="size-full relative">
                <img
                  src="bedroomfurniture.webp"
                  alt="Category"
                  className="size-full rounded-xl h-96"
                />
                <p className="absolute bottom-2 px-4 text-white z-10 text-xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  Furniture
                </p>
                <div className="absolute bottom-0 left-0 w-full rounded-xl h-16 bg-gradient-to-t from-gray-300 to-transparent" />
              </div>
            </Link>
          </div>
        )}
      </section>
      {/* Popular products */}
      <ProductsList
        isLoading={isLoadingPopular}
        products={popular}
        title="Most Popular Products"
        subtitle="This are our most purchased products overtime"
        section={{ className: 'bg-bg-neutral' }}
        grid={{ className: 'gap-x-20' }}
        rightComponent={
          <Link to="/products">
            <Button
              text="View All"
              className="w-24 lg:w-28"
              onClick={() => window.scrollTo(0, 0)}
            />
          </Link>
        }
      />
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
