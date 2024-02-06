import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import classes from "../styles/Layout.module.css";
import Footer from "./Footer";
import { useEffect } from "react";

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className={classes.container}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
