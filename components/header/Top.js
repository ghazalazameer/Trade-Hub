import styles from "./styles.module.scss";
import { HiHeart } from "react-icons/hi";
import { RiAccountPinCircleFill, RiArrowDropDownFill, RiCustomerServiceFill } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";
import { FaHandsHelping } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";

export default function Top() {
  const { data: session } = useSession()
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
          <AiFillSafetyCertificate />
            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
          <RiCustomerServiceFill />
            <span>Customer Service</span>
          </li>
          <li className={styles.li}>
          <FaHandsHelping />
            <span>Help</span>
          </li>
         <li className={styles.li}>
            <HiHeart />
            <Link href="/profile/wishlist">
            <span>Wishlist</span>
            </Link>
            </li>
          <li className={styles.li} onMouseOver={()=>setVisible(true)}
          onMouseLeave={()=>setVisible(false)}>
          { session ? (
              <li>
            <div className={styles.flex}>
            <img
                src={session.user.image}
                alt=""
                />
                <span>{session.user.name}</span>
                <RiArrowDropDownFill />
            </div>
          </li>
            ) : (
              <li>
             <div className={styles.flex}>
                <RiAccountPinCircleFill />
                <span>Account</span>
                <RiArrowDropDownFill />
              </div>
          </li>
            )
          }
              {
                visible && <UserMenu session={session}/>
              }
          </li>
        </ul>
      </div>
    </div>
  );
}