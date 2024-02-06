import appLogo from "../assets/full-logo.png";
import classes from "../styles/Header.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "./Loader";

export default function Header() {
  // const { scrollY } = useScroll();
  // const bgOpacity = useTransform(
  //   scrollY,
  //   [0, 200, 300],
  //   [" rgba(0,0,0,0)", " rgba(0,0,0,0.5)", " rgba(0,0,0,1)"]
  // );
  const userCtx = useContext(UserContext);
  return (
    <motion.nav
      // style={{ backgroundColor: bgOpacity }}
      className={classes.container}
    >
      <div className={classes.logo}>
        <Link to="/">
          <img src={appLogo} alt="app-logo" />
        </Link>
      </div>
      <ul className={classes["nav-list"]}>
        <li className={classes["nav-item"]}>
          <Link to="/category">เลือกดูรายการ</Link>
        </li>
        {userCtx?.isUserLoading ? (
          <Loader />
        ) : userCtx?.user && userCtx.isUserSuccess ? (
          <li className={classes["nav-item"]}>
            <Link to={"/myaccount/profile"}>บัญชีของฉัน</Link>
          </li>
        ) : (
          <li className={classes["nav-item"]}>
            <Link to="/login" className={classes.login}>
              เข้าสู่ระบบ
            </Link>
          </li>
        )}
      </ul>
    </motion.nav>
  );
}
