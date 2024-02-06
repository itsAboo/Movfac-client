import { useQuery } from "@tanstack/react-query";
import classes from "./styles/MainSingleMedia.module.css";
import { getMedia } from "../../util/mediaApi";
import { Navigate } from "react-router-dom";

export default function MainSingleMedia({ path }: { path: string }) {
  const {
    data: media,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["media", path],
    queryFn: ({ signal }) => getMedia({ path, signal }),
  });

  if (isError) {
    return <Navigate to={"/"} />;
  }

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <section className={classes.main}>
      <div className={classes.video}>
        <iframe
          src={media?.embedUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className={classes.title}>
        <h1>{media?.title}</h1>
      </div>
      <div className={classes.details}>
        <p>เรื่องย่อ : {media?.description}</p>
      </div>
    </section>
  );
}
