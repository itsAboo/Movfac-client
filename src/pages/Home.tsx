import classes from "../styles/Home.module.css";
import HeadLine from "../components/Home/HeadLine";
import NewMovie from "../components/Home/NewMovie";
import Reasons from "../components/Home/Reasons";
import MovieTrend from "../components/Home/MovieTrend";
import Plans from "../components/Home/Plans";
import RegisterSection from "../components/Home/RegisterSection";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Home() {
  const userCtx = useContext(UserContext);
  return (
    <>
      <HeadLine />
      <div className={classes.main}>
        <NewMovie />
        <MovieTrend />
        {!userCtx?.user?.plan.packageName && (
          <>
            <Reasons />
            <Plans />
          </>
        )}
        <RegisterSection />
      </div>
    </>
  );
}
