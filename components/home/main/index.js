import styles from "./styles.module.scss";
import MainSwiper from "./swiper";
import Offer from "./offers";

export default function Main() {
  return (
    <div className={styles.main}>
        <div className={styles.header}>header</div>
        <div className={styles.menu}>menu</div>
        <MainSwiper />
        <Offer />
        <div className={styles.user}>user</div>
    </div>
  )
}

