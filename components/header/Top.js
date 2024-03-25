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
                src="data:image/jpeg;base64,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"
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