import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import Layout from '../../components/Layout';
import { Heart, Minus, Plus, Star, StarHalf } from 'lucide-react';
import Button from '../../components/inputs/Button';
import TruckIcon from '../../components/icons/TruckIcon';
import PackageIcon from '../../components/icons/PackageIcon';
import Tabs from '../../components/Tabs';
import ReviewCard from '../../components/cards/ReviewCard';
import ReviewForm from '../../components/forms/ReviewForm';
import ProductsList from '../../components/ProductsList';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  numRatings?: number;
  isLiked?: boolean;
  detailedDescription: string[];
  src?: string;
  stock: number;
}

const simulateGetProduct = async (id: string): Promise<Product> => {
  return {
    id,
    name: 'Product Name',
    price: 100,
    description:
      'This is a very long description of the product. It is very long and should be truncated. This product can be used for many things. It is very versatile.',
    rating: 1.5,
    numRatings: 100,
    isLiked: !true,
    detailedDescription: [
      'Has 3 different colors',
      'Has 3 different sizes',
      'Has 3 different shapes',
      'Has 3 different materials',
    ],
    src: 'https://via.placeholder.com/500',
    stock: 10,
  };
};

const REVIEWS = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      image: 'https://via.placeholder.com/50',
    },
    rating: 4,
    content: 'This is a great product. I would recommend it to anyone.',
  },
  {
    id: '2',
    user: {
      name: 'Jane Doe',
      image: 'https://via.placeholder.com/50',
    },
    rating: 2,
    content: 'This is a great product. I would recommend it to anyone.',
  },
  {
    id: '2',
    user: {
      name: 'Jane Doe',
      image: 'https://via.placeholder.com/50',
    },
    rating: 3,
    content: 'This is a great product. I would recommend it to anyone.',
  },
  {
    id: '2',
    user: {
      name: 'Jane Doe',
      image: 'https://via.placeholder.com/50',
    },
    rating: 1,
    content: 'This is a great product. I would recommend it to anyone.',
  },
];

const PRODUCTS = [
  {
    id: '1',
    name: 'Product name',
    price: 100,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Product name',
    price: 100,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Product name',
    price: 100,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    name: 'Product name',
    price: 100,
    image: 'https://via.placeholder.com/150',
  },
];

export default function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = React.useState<Product>();

  const [ammount, setAmmount] = React.useState<number>(1);

  const min = React.useMemo(() => ammount === 1, [ammount]);

  const location = useLocation();

  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);

  const max = React.useMemo(
    () => ammount === product?.stock,
    [ammount, product?.stock]
  );

  const handleLike = () => {
    setProduct(
      () =>
        product && {
          ...product,
          isLiked: !product.isLiked,
        }
    );
    handleSaveLike(product as Product);
  };

  const handleSaveLike = (product: Product) => {
    console.log(product);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    simulateGetProduct(id as string).then((product) => {
      setProduct(product);
    });
  }, [id, navigate]);

  const handleTabClick = (tabName: string) => {
    if (tabName === 'Description') {
      searchParams.delete('tab');
      navigate(`/products/${id}`);
      return;
    }

    searchParams.set('tab', tabName);
    navigate(`/products/${id}?${searchParams.toString().toLowerCase()}`);
  };

  return (
    <>
      <Layout sectionClassName="pt-32 pb-0 mb-0">
        {/* Product Detail */}
        <div className="flex flex-col gap-4 xl:flex-row">
          <div id="left" className="flex w-full h-4/5">
            <img
              src={product?.src ?? 'https://via.placeholder.com/500'}
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
              <h1 className="lg:text-4xl text-lg font-bold text-primary ">
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
              <h2 className="text-primary/70 text-xl">
                ${product?.price.toFixed(2)}
              </h2>
              <span className="text-xl text-primary/70">|</span>
              <div className="flex relative gap-1 items-center">
                {Array.from({ length: 5 }, () => (
                  <Star
                    fill="#95a9a688"
                    size={19}
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
                <span className="text-primary/70">
                  ( {product?.numRatings} review
                  {(product?.numRatings ?? 0) > 0 ? 's' : ''} )
                </span>
              </div>
            </div>
            <div className="h-[1px] w-full  bg-border-color/30" />
            <p className="text-primary/70">{product?.description}</p>
            {/* Detailed Description */}
            <div className="flex flex-col gap-2">
              <ul className="list-disc pl-5">
                {product?.detailedDescription.map((detail, idx) => (
                  <li key={idx} className="text-primary/70">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            {/* Ammount & add to cart */}
            <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center gap-3 w-full justify-center">
                <div className="flex w-2/6 lg:w-1/5 border border-primary rounded-full text-sm justify-between items-center h-[42px]">
                  <button
                    onClick={() => setAmmount((prev) => prev - 1)}
                    className={`w-1/3 text-center bg-white group-hover:bg-primary group-hover:text-white transition-all duration-300 ease-in-out font-semibold text-sm lg:text-base  rounded-full h-full rounded-r-none ${
                      min ? 'pointer-events-none' : ''
                    }
                  ${min ? 'disabled:text-primary/50' : ''}
                `}
                    disabled={min}
                  >
                    <Minus
                      size={20}
                      className={`group-hover:text-white transition-all duration-300 ease-in-out ml-3 lg:ml-2
                    ${min ? 'text-primary/30' : 'text-primary'}
                  `}
                    />
                  </button>
                  <span
                    className={`bg-white size-full flex justify-center items-center text-lg ${
                      max ? 'text-rose-500' : 'text-primary'
                    }`}
                    title={max ? 'Max Stock' : ''}
                  >
                    {ammount}
                  </span>
                  <button
                    onClick={() => setAmmount((prev) => prev + 1)}
                    className={`w-1/3 text-center bg-white group-hover:bg-primary group-hover:text-white transition-all duration-300 ease-in-out font-semibold text-sm lg:text-base  rounded-full h-full rounded-l-none ${
                      max ? 'pointer-events-none' : ''
                    } 
                  ${max ? 'disabled:text-primary/50' : ''}
                `}
                    disabled={max}
                  >
                    <Plus
                      size={20}
                      className={`group-hover:text-white transition-all duration-300 ease-in-out mr-1 lg:mr-2
                    ${max ? 'text-primary/30' : 'text-primary'}
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
                <TruckIcon className="size-8 text-secondary" />
                <span className="text-secondary">
                  Free shipping on orders over $50
                </span>
              </div>
              <div className="flex gap-4 justify-start items-center">
                <PackageIcon className="size-8 text-secondary" />
                <span className="text-secondary">
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
            <p className="text-primary/70">{product?.description}</p>
            <div className="flex flex-col gap-2">
              <ul className="list-disc pl-5">
                {product?.detailedDescription.map((detail, idx) => (
                  <li key={idx} className="text-primary/70">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {location.search.includes('reviews') && (
          <div className="flex flex-col gap-16 lg:flex-row lg:gap-16">
            <div className="grid grid-cols-1 gap-16 w-full">
              {REVIEWS.map((review, idx) => (
                <ReviewCard key={idx} review={review} />
              ))}
            </div>
            {/* Make into separate component */}
            <ReviewForm />
          </div>
        )}
      </section>
      {/* <SimilarProducts product={product} /> */}
      <ProductsList
        title="Similar Products"
        products={PRODUCTS}
        section={{ className: 'bg-bg-neutral py-20 lg:px-16' }}
      />
    </>
  );
}
