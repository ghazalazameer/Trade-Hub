import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";

export default function Top() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png?20230723002237"
              alt="India Flag"
            />
            <span>India / INR</span>
          </li>
          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
            <span>Customer Service</span>
          </li>
          <li className={styles.li}>
            <span>Help</span>
          </li>
         <li className={styles.li}>
            <BsSuitHeart />
            <Link href="/profile/wishlist">
            <span>Wishlist</span>
            </Link>
            </li>
          <li className={styles.li} onMouseOver={()=>setVisible(true)}
          onMouseLeave={()=>setVisible(false)}>
          { loggedIn ? (
              <li>
            <div className={styles.flex}>
            <img
                src="https://img.freepik.com/free-vector/cute-muslim-praying-cartoon-character-chibi-cartoon-animation-design_40876-3674.jpg"
                alt=""
                />
                <span>TradeHub</span>
                <RiArrowDropDownFill />
            </div>
          </li>
            ) : (
              <li>
            <div className={styles.flex}>
            <RiAccountPinCircleLine />
                <span>Account</span>
                <RiArrowDropDownFill />
            </div>
          </li>
            )
          }
              {
                visible && <UserMenu loggedIn={loggedIn}/>
              }
          </li>
        </ul>
      </div>
    </div>
  );
}