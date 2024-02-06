import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect } from "react";
import { getUser } from "../util/userApi";
import { User } from "../util/AppTypes";
import {
  getLocalToken,
  getLocalUser,
  removeLocalToken,
  removeLocalUser,
  saveLocalUser,
} from "../util/audentication";

interface UserContext {
  user: User | null;
  isUserSuccess: boolean;
  isUserLoading: boolean;
}

export const UserContext = createContext<UserContext | null>(null);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { data: isLoggedIn } = useQuery({
  //   queryKey: ["isLoggedIn"],
  //   queryFn: checkUserIsLogin,
  //   initialData: false,
  // });
  const {
    data: user,
    isSuccess: isUserSuccess,
    isLoading: isUserLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!getLocalUser() || !!getLocalToken(),
  });

  useEffect(() => {
    if (!getLocalUser()) {
      removeLocalUser();
    }
    if (!user && isUserSuccess) {
      if (getLocalToken()) {
        removeLocalToken();
      }
      removeLocalUser();
    } else {
      saveLocalUser(user as User);
    }
  }, [user, getLocalToken, getLocalUser]);

  return (
    <UserContext.Provider
      value={{
        user: user!,
        isUserSuccess,
        isUserLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
