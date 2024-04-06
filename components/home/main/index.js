import styles from "./styles.module.scss";
import MainSwiper from "./swiper";
import Offer from "./offers";
import Menu from "./Menu";
import User from "./User";
import { useSession } from "next-auth/react";
import Header from "./Header";

export default function Main() {
  const { data: session }= useSession();
  return (
    <div className={styles.main}>
        <Header/>
        <Menu />
        <MainSwiper />
        <Offer />
        <User />
    </div>
  )
}

