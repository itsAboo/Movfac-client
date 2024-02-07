import { useState } from "react";
import MainCotegory from "../components/Category/MainCategory";
import TopNav from "../components/Category/TopNav";
import classes from "../styles/Category.module.css";

export default function Category() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleHiddenScroll = (isOpen: boolean) => {
    setIsNavOpen(isOpen);
  };
  return (
    <div
      className={`${classes.container} ${isNavOpen ? classes.hidden : null}`}
    >
      <TopNav hiddenScroll={handleHiddenScroll} />
      <div className={classes["main-container"]}>
        <MainCotegory />
      </div>
    </div>
  );
}
