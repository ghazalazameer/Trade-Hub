import { useSelector } from "react-redux";
import Sidebar from "./sidebar";
import styles from "./styles.module.scss";
import DialogModal from "@/components/dialogModal";
import { useEffect } from "react";
import { hideDialog } from "@/store/DialogSlice";
import { useDispatch } from "react-redux";

export default function Layout({children}) {
    const { expandSidebar } = useSelector((state) => ({...state}));
    const showSidebar = expandSidebar.expandSidebar;
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(hideDialog(-1))
    }, []);

  return (
    <div className={styles.layout}>
      <DialogModal />
      <Sidebar />
      <div 
      style={{marginLeft: `${showSidebar ? "280px" : "80px"}`}}
      className={styles.layout__main}
      >
        {children}</div>
    </div>
  )
}
