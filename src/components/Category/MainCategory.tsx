import classes from "./styles/MainCategory.module.css";
import Loader from "../Loader";
import { motion } from "framer-motion";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllMedia } from "../../util/mediaApi";
import MediaCard from "./MediaCard";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function MainCotegory() {
  const location = useLocation();
  const params = useParams<{
    type?: string;
    genre?: string;
    keyword?: string;
  }>();
  const [param, setParam] = useState({
    type: "",
    genre: "",
  });
  const [search, setSearch] = useState("");
  const { ref, inView } = useInView();
  const {
    data: media,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["all-media", param.type, param.genre, search],
    queryFn: ({ pageParam }) =>
      getAllMedia({
        pageParam,
        maxPerPage: 20,
        type: param.type,
        genre: param.genre,
        keyword: search,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastpage, allPages) => {
      if (!lastpage.length) return undefined;
      const nextPage = allPages.length + 1;
      return nextPage;
    },
  });

  useEffect(() => {
    setParam((prevParam) => ({
      ...prevParam,
      type: params.type || "",
      genre: params.genre || "",
    }));
  }, [params.genre, params.type]);

  useEffect(() => {
    setSearch(params.keyword || "");
  }, [params.keyword]);

  useEffect(() => {
    refetch();
  }, [location.search]);

  let content;

  if (media) {
    content = media.pages.map((media) =>
      media.map((e, index) => {
        if (media.length == index + 1) {
          return <MediaCard innerRef={ref} key={e._id} media={e} />;
        }
        return <MediaCard key={e._id} media={e} />;
      })
    );
  }

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <motion.div
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      initial="hidden"
      animate="visible"
      className={classes.container}
    >
      <div className={classes["title-container"]}>
        {location.pathname === "/category" ? (
          <h1>ทั้งหมด</h1>
        ) : media?.pages[0].length !== 0 ? (
          param.type && param.genre ? (
            <h1>{param.type + " > " + param.genre} </h1>
          ) : (
            <h1>Keyword : {search}</h1>
          )
        ) : (
          <h1>ไม่พบข้อมูล</h1>
        )}
      </div>
      {isPending ? (
        <Loader className={classes.loader} />
      ) : (
        <motion.div
          className={classes["media-list-container"]}
          variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
        >
          {content}
        </motion.div>
      )}
      {isFetchingNextPage && (
        <Loader className={classes["next-content-loader"]} />
      )}
    </motion.div>
  );
}
