import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import Header from "@/components/cart/header";
import styles from "../styles/cart.module.scss";
import Empty from "@/components/cart/empty";
import Product from "@/components/cart/product";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { saveCart } from "../requests/user";

import { updateCart } from "../store/cartSlice";
import { women_swiper } from "../data/home";
import CartHeader from "@/components/cart/cartHeader";
import Checkout from "@/components/cart/checkout";
import PaymentMethods from "@/components/cart/paymentMethods";
import ProductsSwiper from "@/components/productsSwiper";
import {
  calculateSubPrice,
  calculateTotal,
  calculateTotalShipping,
} from "@/utils/productUtils";

export default function Cart() {
  const Router = useRouter();
  const { data: session } = useSession();
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);

  const [shippingFee, setShippingFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setShippingFee(calculateTotalShipping(selected));
    setSubtotal(calculateSubPrice(selected));
    setTotal(calculateTotal(selected, shippingFee));
  }, [selected, shippingFee]);

  const saveCartToDbHandler = async () => {
    if (session) {
      const res = await saveCart(selected, session.user.id);
      Router.push("/checkout");
    } else {
      signIn();
    }
  };

  return (
    <>
      <Header />
      <div className={styles.cart}>
        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <CartHeader
              cartItems={cart.cartItems}
              selected={selected}
              setSelected={setSelected}
            />
            <div className={styles.cart__product}>
              {cart.cartItems.map((product) => (
                <Product
                  product={product}
                  key={product._uid}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
            <Checkout
              subtotal={subtotal}
              shippingFee={shippingFee}
              total={total}
              selected={selected}
              saveCartToDbHandler={saveCartToDbHandler}
            />
            <PaymentMethods />
          </div>
        ) : (
          <Empty />
        )}
        <ProductsSwiper products={women_swiper} />
      </div>
    </>
  );
}