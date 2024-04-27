/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import Layout from '../../components/layouts/Layout';
import { Heart, Minus, Plus, Star, StarHalf } from 'lucide-react';
import Button from '../../components/inputs/Button';
import TruckIcon from '../../components/icons/TruckIcon';
import PackageIcon from '../../components/icons/PackageIcon';
import Tabs from '../../components/Tabs';
import ReviewCard from '../../components/cards/ReviewCard';
import ReviewForm from '../../components/forms/ReviewForm';
// import ProductsList from '../../components/products/ProductsList';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, getReviewsByProductId } from '../../app/api/productSlice';
import { Pagination, Review } from '../../app/api/models';
import { Pagination as PaginationFooter } from '../../components/common/Pagination';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  numRatings?: number;
  isLiked?: boolean;
  detailedDescription: string[];
  images: {
    image: string;
    id: string;
  }[];
  stock: number;
}

export default function ProductDetailPage() {
  const { id } = useParams();

  const [ammount, setAmmount] = React.useState<number>(1);

  const min = React.useMemo(() => ammount === 1, [ammount]);

  const location = useLocation();

  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);

  const dispatch = useDispatch();

  const product = useSelector((state: any) => state.products.product);

  const isLoading = useSelector((state: any) => state.products.loading);

  const [pagination, setPagination] = React.useState<Pagination<Review>>(() => {
    if (product) {
      return product.reviews;
    }
  });

  const max = React.useMemo(
    () => ammount === product?.stock,
    [ammount, product?.stock]
  );

  const handleLike = () => {
    handleSaveLike(product as Product);
  };

  const handleSaveLike = (product: Product) => {
    console.log(product);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    // Check if id has changed
    if (id !== undefined && id !== product?.id) {
      dispatch(
        getProductById({
          id,
          reviewPage: pagination?.page ?? 1,
          reviewPerPage: pagination?.perPage ?? 5,
        }) as any // Add type assertion here if necessary
      );
    }

    return () => {
      setPagination({
        itemCount: 0,
        content: [],
        page: 1,
        hasNext: false,
        hasPrev: false,
        perPage: 5,
        pageCount: 0,
      });
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (pagination && id) {
      dispatch(
        getReviewsByProductId({
          id,
          page: pagination?.page ?? 1,
          perPage: pagination?.perPage ?? 5,
        }) as any // Add type assertion here if necessary
      );
    }
  }, [pagination, dispatch, id]);

  const handleTabClick = (tabName: string) => {
    if (tabName === 'Description') {
      searchParams.delete('tab');
      navigate(`/products/${id}`);
      return;
    }

    searchParams.set('tab', tabName);
    navigate(`/products/${id}?${searchParams.toString().toLowerCase()}`);
  };

  if (!product) {
    return (
      <Layout>
        {isLoading && (
          // replace for skeleton loader
          <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-100"></div>
          </div>
        )}
        <div className="flex justify-center items-center h-96">
          <h1 className="text-primary-100">Product not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <>
      {isLoading && (
        // replace for skeleton loader
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-100"></div>
        </div>
      )}
      <Layout sectionClassName="pt-32 pb-0 mb-0">
        {/* Product Detail */}
        <div className="flex flex-col gap-4 xl:flex-row">
          <div id="left" className="flex w-full h-4/5">
            <img
              src={
                product?.images[0]?.image ?? 'https://via.placeholder.com/500'
              }
              alt="Product Name"
              className="w-full md:size-5/6 lg:size-11/12 rounded-xl"
            />
          </div>
          <div
            id="right"
            className="flex flex-col gap-5 w-full md:px-0 lg:px-20"
          >
            {/* Name & Heart */}
            <div className="flex justify-between w-full">
              <h1 className="lg:text-4xl text-lg font-bold text-primary-100 ">
                {product?.name}
              </h1>
              <Heart
                role="button"
                className="text-border-color/50 hover:text-rose-500"
                fill={product?.isLiked ? '#ff0000' : 'none'}
                onClick={handleLike}
              />
            </div>
            {/* Price & ratings */}
            <div className="flex gap-1 items-center">
              <h2 className="text-primary-100/70 text-xl">
                ${product?.price.toFixed(2)}
              </h2>
              <span className="text-xl text-primary-100/70">|</span>
              <div className="flex relative gap-1 items-center">
                {Array.from({ length: 5 }, (_, idx) => (
                  <Star
                    fill="#95a9a688"
                    size={19}
                    key={idx * 8}
                    className="text-transparent"
                  />
                ))}
                <div className="flex gap-1 absolute top-[2.5px]">
                  {/* If the rating is a decimal and the decimal is above .5 render a StarHalf */}
                  {Array.from(
                    {
                      length:
                        Math.floor(product?.rating ?? 0) > 5
                          ? 5
                          : Math.floor(product?.rating ?? 0),
                    },
                    (_, idx) => (
                      <Star
                        fill="#f7c948"
                        size={19}
                        key={idx}
                        className="text-transparent"
                      />
                    )
                  )}
                  {(product?.rating ?? 0) <= 5 &&
                    (product?.rating ?? 0) % 1 >= 0.5 && (
                      <StarHalf
                        fill="#f7c948"
                        size={19}
                        className="text-transparent"
                      />
                    )}
                </div>
                <span className="text-primary-100/70">
                  {product?.numRatings === undefined
                    ? 'No reviews'
                    : product?.numRatings > 1
                    ? `${product?.numRatings} reviews`
                    : `${product?.numRatings} review`}
                </span>
              </div>
            </div>
            <div className="h-[1px] w-full  bg-border-color/30" />
            <p className="text-primary-100/70">{product?.description}</p>
            {/* Ammount & add to cart */}
            <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center gap-3 w-full justify-center">
                <div className="flex w-2/6 lg:w-1/5 border border-primary-100 rounded-full text-sm justify-between items-center h-[42px]">
                  <button
                    onClick={() => setAmmount((prev) => prev - 1)}
                    className={`w-1/3 text-center bg-white group-hover:bg-primary-100 group-hover:text-white transition-all duration-300 ease-in-out font-semibold text-sm lg:text-base  rounded-full h-full rounded-r-none ${
                      min ? 'pointer-events-none' : ''
                    }
                  ${min ? 'disabled:text-primary-100/50' : ''}
                `}
                    disabled={min}
                  >
                    <Minus
                      size={20}
                      className={`group-hover:text-white transition-all duration-300 ease-in-out ml-3 lg:ml-2
                    ${min ? 'text-primary-100/30' : 'text-primary-100'}
                  `}
                    />
                  </button>
                  <span
                    className={`bg-white size-full flex justify-center items-center text-lg ${
                      max ? 'text-rose-500' : 'text-primary-100'
                    }`}
                    title={max ? 'Max Stock' : ''}
                  >
                    {ammount}
                  </span>
                  <button
                    onClick={() => setAmmount((prev) => prev + 1)}
                    className={`w-1/3 text-center bg-white group-hover:bg-primary-100 group-hover:text-white transition-all duration-300 ease-in-out font-semibold text-sm lg:text-base  rounded-full h-full rounded-l-none ${
                      max ? 'pointer-events-none' : ''
                    } 
                  ${max ? 'disabled:text-primary-100/50' : ''}
                `}
                    disabled={max}
                  >
                    <Plus
                      size={20}
                      className={`group-hover:text-white transition-all duration-300 ease-in-out mr-1 lg:mr-2
                    ${max ? 'text-primary-100/30' : 'text-primary-100'}
                  `}
                    />
                  </button>
                </div>
                <Button onClick={() => {}} text="Add To Cart" />
              </div>
              <Button onClick={() => {}} variant="secondary" text="Buy Now" />
            </div>
            {/* Shipping */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 justify-start items-center">
                <TruckIcon className="size-8 text-secondary-100" />
                <span className="text-secondary-100">
                  Free shipping on orders over $50
                </span>
              </div>
              <div className="flex gap-4 justify-start items-center">
                <PackageIcon className="size-8 text-secondary-100" />
                <span className="text-secondary-100">
                  Delivers in: 3-7 Working Days Shipping & Return
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Similar Products */}
      </Layout>
      {/* Description & Reviews */}
      <section className="w-full bg-border-color/30 flex flex-col py-16 px-8 lg:px-20 gap-4 mt-8 lg:mt-0">
        <Tabs
          tabs={[
            {
              title: 'Description',
              active: !location.search.includes('reviews'),
            },
            {
              title: 'Reviews',
              active: location.search.includes('reviews'),
            },
          ]}
          onClick={(tabName: string) => {
            handleTabClick(tabName);
          }}
        />
        {!location.search.includes('reviews') && (
          <div className="flex flex-col gap-4">
            <p className="text-primary-100/70">{product?.description}</p>
          </div>
        )}
        {location.search.includes('reviews') && (
          <div className="flex flex-col gap-16 lg:flex-row lg:gap-16">
            <div className="grid grid-cols-1 gap-4 w-full">
              {product?.reviews?.content.map((review: Review, idx: number) => (
                <ReviewCard key={idx} review={review} />
              ))}
              <PaginationFooter
                pagination={product?.reviews}
                setPagination={setPagination}
              />
            </div>
            <ReviewForm />
          </div>
        )}
      </section>
      {/* <SimilarProducts product={product} /> */}
      {/* <ProductsList
        title="Similar Products"
        products={PRODUCTS}
        section={{ className: 'bg-bg-neutral py-20 lg:px-16' }}
      /> */}
    </>
  );
}
