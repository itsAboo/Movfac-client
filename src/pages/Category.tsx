import MainCotegory from "../components/Category/MainCategory";
import TopNav from "../components/Category/TopNav";
import classes from "../styles/Category.module.css";

export default function Category() {
  return (
    <div

      className={classes.container}
    >
      <TopNav />
      <div className={classes["main-container"]}>
        <MainCotegory />
      </div>
    </div>
  );
}
