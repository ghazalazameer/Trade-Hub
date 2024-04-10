import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "@/components/home/main";
import FlashDeals from "@/components/home/flashDeals";
import Category from "@/components/home/category";
import { BsArrowRight } from "react-icons/bs";
import { gamingSwiper, women_accessories, women_dresses, women_shoes, women_swiper, homeImprovSwiper } from "@/data/home";
import { useMediaQuery } from "react-responsive";
import ProductsSwiper from "@/components/productsSwiper";
import db from "../utils/db";
import Product from "../models/Product";

export default function Home({products}) {
  console.log("products", products); //remove later..................
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  return (
    <>
      <Header />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category
              header="Dresses"
              products={women_dresses}
              background="#5a31f4"
            />
            {!isMedium && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            {isMobile && (
              <Category
                header="Shoes"
                products={women_shoes}
                background="#3c811f"
              />
            )}
            <Category
              header="Accessories"
              products={women_accessories}
              background="#000"
            />
          </div>
          <ProductsSwiper products={women_swiper} header="Dresses" bg="#5a31f4" />
          <ProductsSwiper products={gamingSwiper} header="For Gamers" bg="#3c811f" />
          <ProductsSwiper products={homeImprovSwiper} header="House Improvements" bg="#5a31f4" />
        </div>
      </div>
      <Footer />
    </>
  );
}
export async function getServerSideProps() {
  db.connectDb();
  let products = await Product.find().sort({ createdAt: -1 }).lean();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}