import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "@/components/home/main";
import FlashDeals from "@/components/home/flashDeals";
import Category from "@/components/home/category";
import { BsArrowRight } from "react-icons/bs";
import {
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
  gamingSwiper,
} from "@/data/home";
import db from "@/utils/db";
import Product from "@/models/Product";
import { useMediaQuery } from "react-responsive";
import ProductsSwiper from "@/components/productsSwiper";
import ProductCard from "@/components/productCard";

export default function Home({ country, products }) {
  // console.log(products);
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });

  return (
    <>
      <Header country={country} />
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
          <ProductsSwiper products={women_swiper} />
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <ProductsSwiper
            products={gamingSwiper}
            header="For Gamers"
            bg="#5a31f4"
          />
          <ProductsSwiper
            products={homeImprovSwiper}
            header="House Improvement"
            bg=""
          />
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getStaticProps() {
  await db.connectDb();

  //lean method trả về các document dưới dạng plain Object chứ không phải Mongoose document thông thường
  let products = await Product.find()
    .sort({ createdAt: -1 })
    .select("category name rating slug subProducts _id shipping")
    .lean();

  //Giảm số lượng ảnh để giảm dung lượng load của getServerSideProps
  const reduceImagesProducts = products.map((p) => {
    const newSubProducts = p.subProducts.map((s) => {
      return { ...s, images: s.images.slice(0, 2) };
    });

    return { ...p, subProducts: newSubProducts };
  });

  //Lọc mảng gồm các subProduct có discout cho Component FlashDeals
  const leanProducts = reduceImagesProducts.map((p) => ({
    parentId: p._id,
    name: p.name,
    slug: p.slug,
    subProducts: p.subProducts,
  }));

  const flashDealsArray = [];
  leanProducts.forEach((p) => {
    for (let i = 0; i < p.subProducts.length; i++) {
      if (p.subProducts[i].discount > 0) {
        const childProduct = {
          name: p.name,
          slug: `${p.slug}?style=${i}`,
          ...p.subProducts[i],
          parentId: p.parentId,
          style: i,
        };

        flashDealsArray.push(childProduct);
      }
    }
  });

  // const featuredProducts = await Product.find()
  //   .sort({ rating: -1, "subProducts.sold": -1 })
  //   .lean();

  const featuredProducts = reduceImagesProducts
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  const freeShippingProducts = reduceImagesProducts
    .filter((p) => p.shipping === 0)
    .slice(0, 10);

  let country;
  try {
    let data = await axios.get(
      "https://api.ipregistry.co/?key=ng3oke5gnbj5os01"
    );
    country = data?.data.location?.country;
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      products: JSON.parse(JSON.stringify(reduceImagesProducts)),
      flashDeals: JSON.parse(JSON.stringify(flashDealsArray)),
      featuredProducts: JSON.parse(JSON.stringify(featuredProducts)),
      freeShippingProducts: JSON.parse(JSON.stringify(freeShippingProducts)),
      country: { name: country.name, flag: country.flag.emojitwo },
    },
  };
}