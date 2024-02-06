import { motion } from "framer-motion";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Media } from "../../util/AppTypes";
import classes from "./styles/MediaCard.module.css";

export default function MediaCard({
  media,
  innerRef,
}: {
  media: Media;
  innerRef?: React.Ref<HTMLDivElement>;
}) {
  const userCtx = useContext(UserContext);
  return (
    <motion.li
      key={media._id}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 1.05 },
      }}
      transition={{ type: "spring" }}
    >
      <Link
        to={userCtx?.user ? `/media/${media.type}/${media.path}` : "/login"}
        className={classes.media}
      >
        <div className={classes["media-main"]}>
          <img
            className={classes["media-img"]}
            src={media.imageUrl}
            alt={media.title}
          />
        </div>
        <div className={classes["media-subtitle"]}>
          <p>{media.subtitle}</p>
        </div>
        <div className={classes["media-title"]}>
          <p>{media.title}</p>
        </div>
        <div className={classes["media-overlay"]}></div>
      </Link>
      <div ref={innerRef} className={classes.view}></div>
    </motion.li>
  );
}
