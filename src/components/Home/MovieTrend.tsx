import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import classes from "./styles/MovieTrend.module.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLatestMedia } from "../../util/mediaApi";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function MovieTrend() {
  const userCtx = useContext(UserContext);
  const {
    data: media,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["latest-media", { limit: 8 }],
    queryFn: () => getLatestMedia({ type: "movie", limit: 8 }),
  });
  const sliderConfig = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          infinite: true,
        },
      },
    ],
  };

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <section className={classes.container}>
      <h1>ยอดนิยม</h1>
      {isPending ? (
        "Loading..."
      ) : (
        <Slider className={classes.slider} {...sliderConfig}>
          {media?.map((media) => (
            <div className={classes.block} key={media._id}>
              <Link
                to={
                  userCtx?.user
                    ? `/media/${media.type}/${media.path}`
                    : "/login"
                }
              >
                <img src={media.imageUrl} alt={media.title} />
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </section>
  );
}
