import classes from "./styles/SideNavSingleMedia.module.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRandomMedia } from "../../util/mediaApi";

export default function SideNavSingleMedia({ path }: { path: string }) {
  const { data: media, isPending } = useQuery({
    queryKey: ["random-media", path],
    queryFn: ({ signal }) => getRandomMedia({ path, signal }),
  });
  if (isPending) {
    return <p>Loading...</p>;
  }
  return (
    <nav className={classes.container}>
      <h1 className={classes.title}>แนะนำสำหรับคุณ</h1>
      <div className={classes["media-container"]}>
        {media?.map((media) => (
          <Link
            to={`/media/${media.type}/${media.path}`}
            className={classes.media}
            key={media._id}
          >
            <div className={classes.image}>
              <img src={media.propImageUrl} alt={media.title} />
            </div>
            <div className={classes.desc}>
              <h3>{media.title}</h3>
              <p>{media.duration}น.</p>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
