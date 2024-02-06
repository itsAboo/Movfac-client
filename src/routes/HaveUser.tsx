import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import classes from "./HaveUser.module.css";
import { useQuery } from "@tanstack/react-query";
import { checkUserIsLogin } from "../util/userApi";
import { getLocalToken } from "../util/audentication";

export default function HaveUser({ children }: { children: React.ReactNode }) {
  // const { data, isPending } = useQuery({
  //   queryKey: ["isLoggedIn"],
  //   queryFn: checkUserIsLogin,
  // });
  // if (isPending) {
  //   return <Loader className={classes.loader} />;
  // }
  // if (data) {
  //   return <Navigate to={"/"} />;
  // }
  // return children;
  if (getLocalToken()) {
    return <Navigate to={"/"} />;
  }
  return children;
}
