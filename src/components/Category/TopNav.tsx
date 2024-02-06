import classes from "./styles/TopNav.module.css";
import movieCategory from "../../util/movieCategory";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function TopNav() {
  const [hoverName, setHoverName] = useState("");
  const [pickedName, setPickedName] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const onHoverHandle = (name: string) => {
    setHoverName(name);
  };
  const onMouseOutHandle = () => {
    setHoverName("");
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const search = searchRef.current?.value;
    return navigate(`/category/search/${search}`);
  };
  const handleDropdownClick = (name: string) => {
    if (name === pickedName) {
      return setPickedName("");
    }
    setPickedName(name);
  };
  const handleCloseNav = () => {
    setPickedName("");
    setIsNavOpen((prevOpen) => !prevOpen);
  };
  return (
    <motion.nav className={classes.container}>
      <button onClick={handleCloseNav} className={classes["hamburger-btn"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={classes.hamburger}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <ul className={classes["dropdown-list"]}>
        <li className={classes["dropdown-item"]}>
          <Link to="/category">ทั้งหมด</Link>
        </li>
        {movieCategory.map((e) => (
          <li
            key={e.title}
            onMouseOver={() => onHoverHandle(e.title)}
            onMouseOut={onMouseOutHandle}
            className={classes["dropdown-item"]}
          >
            {e.title} <span className={classes["dropdown-icon"]}>&#9660;</span>
            <ul className={`${classes["dropdown-content"]}`}>
              {e.content
                .filter(() => hoverName === e.title)
                .map((contentList) => (
                  <li key={contentList}>
                    <Link
                      to={`/category/${e.type}/${contentList.toLowerCase()}`}
                    >
                      {contentList}
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
      <AnimatePresence mode="wait">
        {isNavOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={classes["mobile-dropdown-list"]}
          >
            <li className={classes["mobile-dropdown-item"]}>
              <Link to="/category">ทั้งหมด</Link>
            </li>
            {movieCategory.map((e) => (
              <motion.li
                onClick={() => handleDropdownClick(e.title)}
                key={e.title}
                className={classes["mobile-dropdown-item"]}
              >
                {e.title}{" "}
                <span className={classes["mobile-dropdown-icon"]}>&#9660;</span>
                <ul className={`${classes["mobile-dropdown-content"]}`}>
                  {e.content
                    .filter(() => pickedName === e.title)
                    .map((contentList) => (
                      <motion.li
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ type: "tween", duration: 0.5 }}
                        key={contentList}
                      >
                        <Link
                          onClick={handleCloseNav}
                          to={`/category/${
                            e.type
                          }/${contentList.toLowerCase()}`}
                        >
                          {contentList}
                        </Link>
                      </motion.li>
                    ))}
                </ul>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <form onSubmit={handleSubmit} className={classes.search}>
        <input
          ref={searchRef}
          placeholder="Search..."
          type="text"
          className={classes["search-input"]}
        />
        <button>
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>
      {isNavOpen && (
        <div onClick={handleCloseNav} className={classes["nav-overlay"]}></div>
      )}
    </motion.nav>
  );
}
