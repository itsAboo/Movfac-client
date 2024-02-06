import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../util/userApi";

export default function UserRoute({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <Navigate to={"/login"} />;
  }

  return children;
}
