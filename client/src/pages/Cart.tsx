/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, removeProductFromCart } from '@/app/api/authSlice';
import { ShoppingCartItem } from '@/app/api/models';
import Button from '@/components/inputs/Button';
import Layout from '@/components/layouts/Layout';
import { Minus, Plus, X } from 'lucide-react';

interface TableHeaderProps {
  header?: string;
  titles?: string[];
  className?: string;
}

const TableHeader = ({ header, titles, className }: TableHeaderProps) => {
  return (
    <header
      className={`flex w-full rounded-t-lg bg-primary px-12 py-8 text-lg text-white justify-between ${
        className ?? ''
      }`}
    >
      {!titles ? (
        <span>{header}</span>
      ) : (
        titles?.map((title, idx) => (
          <span key={title} className={`${idx === 0 ? 'w-2/5 pl-8' : ''} `}>
            {title}
          </span>
        ))
      )}
    </header>
  );
};

interface TableRowProps {
  title: string;
  value: string;
}

const TableRow = ({ title, value }: TableRowProps) => (
  <div className=" w-full p-8 flex justify-between bg-border-color/30 border-x-[1px] border-b-[1px] border-primary">
    <span className="text-primary text-base uppercase">{title}</span>
    <span className="text-primary text-base">{value}</span>
  </div>
);
export default function CartPage() {
  const user = useSelector((state: any) => state.auth.user);

  const loading = useSelector((state: any) => state.auth.loading);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const products = useSelector(
    (state: any) => state?.auth?.user?.shopping_cart?.products ?? []
  );

  const subtotal = React.useMemo<number>(() => {
    return products.reduce((acc: number, product: ShoppingCartItem) => {
      return acc + (product?.product?.price ?? 0) * (product?.quantity ?? 0);
    }, 0);
  }, [products]);

  const taxes = React.useMemo<number>(() => subtotal * 0.05, [subtotal]);

  const total = React.useMemo<number>(
    () => subtotal + taxes,
    [subtotal, taxes]
  );

  const onDeleteItem = async (id: string) => {
    const res = await dispatch(removeProductFromCart(id) as any);
    if (res.error) {
      return toast.error('Error removing item from cart');
    }
    setTimeout(() => {
      toast.success('Item removed from cart');
    }, 1500);
  };

  if (!user) {
    navigate('/auth?redirect=login');
  }

  const handleAmmountChange = (
    id: string,
    ammount: number,
    cart_item_id?: string
  ) => {
    if (ammount <= 0 && cart_item_id) {
      return onDeleteItem(cart_item_id);
    }
    try {
      dispatch(addProductToCart({ product_id: id, quantity: ammount }) as any);
      setTimeout(() => {
        toast.success('Cart updated');
      }, 1500);
    } catch (error) {
      toast.error('Error updating cart');
    }
  };

  return (
    <Layout>
      <section className="flex gap-8 flex-col lg:flex-row lg:justify-between justify-center w-full">
        <article className="w-full py-auto border overflow-y-auto max-h-[768px]">
          <TableHeader
            titles={['Product', 'Quantity', 'Price', 'Total']}
            className="sticky top-0 z-10"
          />
          {products.map((product: ShoppingCartItem) => (
            <div
              key={product?.product?.id}
              className="w-full p-8 flex justify-between bg-border-color/30 border-x-[1px] border-b-[1px] border-primary items-center"
            >
              <div className="flex gap-4 items-center">
                <X
                  className="cursor-pointer hover:text-rose-500 hover:scale-125 transition-all ease-in duration-100"
                  onClick={() => onDeleteItem(product?.id ?? '')}
                />
                <img
                  src={product?.product?.images?.[0]?.image ?? ''}
                  alt={product?.product?.name}
                  className="size-24 object-cover rounded-lg"
                  loading="lazy"
                />
                <span className="text-primary text-base font-semibold max-w-96 line-clamp-3 w-44">
                  {product?.product?.name}
                </span>
              </div>
              <div className="flex w-36 lg:w-24 border border-primary rounded-full text-sm justify-between items-center h-[42px]">
                <button
                  onClick={() =>
                    handleAmmountChange(
                      product.product.id,
                      (product?.quantity ?? 1) - 1,
                      product.id
                    )
                  }
                  className="w-1/3 text-center bg-white group-hover:bg-primary group-hover:text-white transition-all duration-300 ease-in-out font-semibold text-sm lg:text-base  rounded-full h-full rounded-r-none
                "
                  disabled={loading}
                >
                  <Minus
                    size={20}
                    className="group-hover:text-white transition-all duration-300 ease-in-out ml-3 lg:ml-2
                  "
                  />
                </button>
                <span
                  className={`bg-white size-full flex justify-center items-center text-lg ${
                    product?.quantity === product?.product?.stock
                      ? 'text-rose-500'
                      : 'text-primary'
                  }`}
                  title={
                    product?.quantity === product?.product?.stock
                      ? 'Max Stock'
                      : ''
                  }
                >
                  {product?.quantity}
                </span>
                <button
                  onClick={() =>
                    handleAmmountChange(
                      product.product.id,
                      (product?.quantity ?? 0) + 1
                    )
                  }
                  className={`w-1/3 text-center bg-white group-hover:bg-primary group-hover:text-white transition-all duration-300 ease-in-out font-semibold text-sm lg:text-base  rounded-full h-full rounded-l-none ${
                    product?.quantity === product?.product?.stock
                      ? 'pointer-events-none'
                      : ''
                  } 
                  ${
                    product?.quantity === product?.product?.stock
                      ? 'disabled:text-primary/50'
                      : ''
                  }
                `}
                  disabled={
                    loading || product?.quantity === product?.product?.stock
                  }
                >
                  <Plus
                    size={20}
                    className={`group-hover:text-white transition-all duration-300 ease-in-out mr-1 lg:mr-2
                    ${
                      product?.quantity === product?.product?.stock
                        ? 'text-primary/30'
                        : 'text-primary'
                    }
                  `}
                  />
                </button>
              </div>
              <span className="text-primary text-base">
                ${product?.product?.price.toFixed(2)}
              </span>
              <span className="text-primary text-base">
                ${(product?.product?.price * product?.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </article>
        <article className="w-full py-auto flex flex-col justify-start items-start">
          <TableHeader header="Cart total" />
          <TableRow title="Subtotal" value={`$${subtotal.toFixed(2)}`} />
          <TableRow title="Taxes (5%)" value={`$${taxes.toFixed(2)}`} />
          <TableRow title="Total" value={`$${total.toFixed(2)}`} />
          <Button
            onClick={() => navigate('/checkout')}
            text="Proceed to checkout"
            className="bg-primary text-white w-full rounded-none rounded-b-xl z-10 -mt-1"
          />
        </article>
      </section>
    </Layout>
  );
}
