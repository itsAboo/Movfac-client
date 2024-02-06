import { Navigate, useParams } from "react-router-dom";
import classes from "../styles/SingleMedia.module.css";
import MainSinglemedia from "../components/SingleMedia/MainSingleMedia";
import SideNavSinglemedia from "../components/SingleMedia/SideNavSingleMedia";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Singlemedia() {
  const { path } = useParams<string>();
  const userCtx = useContext(UserContext);

  if (!userCtx?.user?.plan.packageName) {
    return <Navigate to={"/planform"} />;
  }

  return (
    <div className={classes.container}>
      <MainSinglemedia path={path!} />
      <SideNavSinglemedia path={path!} />
    </div>
  );
}
