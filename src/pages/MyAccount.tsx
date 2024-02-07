import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import classes from "../styles/MyAccount.module.css";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../util/userApi";
import { queryClient } from "../util/mediaApi";
import { removeLocalToken, removeLocalUser } from "../util/audentication";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function MyAccount() {
  const navigate = useNavigate();
  const [isSelectedOpen, setIsSelectedOpen] = useState(false);
  const [selectedTxt, setSelectedTxt] = useState("โปรไฟล์");
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onMutate: () => {
      removeLocalUser();
      removeLocalToken();
      // queryClient.setQueriesData({ queryKey: ["isLoggedIn"] }, false);
    },
    onSuccess: () => {
      queryClient.setQueriesData({ queryKey: ["user"] }, null);
      // queryClient.removeQueries({ queryKey: ["user"] });
      // queryClient.invalidateQueries({ queryKey: ["isLoggedIn"] });
      navigate("/");
    },
  });
  const location = useLocation();
  if (location.pathname === "/myaccount") {
    return <Navigate to={"/myaccount/profile"} />;
  }
  useEffect(() => {
    if (location.pathname === "/myaccount/profile") {
      setSelectedTxt("โปรไฟล์");
    }
  }, [location.pathname, selectedTxt]);
  const handleLogout = () => {
    mutate();
  };
  const handleCloseSelected = () => {
    setIsSelectedOpen((prevOpen) => !prevOpen);
  };
  return (
    <div className={classes.container}>
      <div className={classes["container-box"]}>
        <nav className={classes.nav}>
          <div>
            <h2>บัญชีของฉัน</h2>
            <ul>
              <li>
                <Link to={"/myaccount/profile"}>โปรไฟล์</Link>
              </li>
              <li>
                <Link to={"/myaccount/password"}>เปลี่ยนรหัสผ่าน</Link>
              </li>
              <li>
                <Link to={"/myaccount/profile"}>ข้อมูลการเรียกเก็บเงิน</Link>
              </li>
              <li>
                <Link to={"/myaccount/profile"}>การจัดการอุปกรณ์</Link>
              </li>
              <li>
                <Link to={"/myaccount/profile"}>ติดต่อเรา</Link>
              </li>
              <button onClick={handleLogout} className={classes.btn}>
                {isPending ? "กำลังออกจากระบบ..." : "ออกจากระบบ"}
              </button>
            </ul>
          </div>
        </nav>
        <nav className={classes["mobile-nav"]}>
          <h2>บัญชีของฉัน</h2>
          <button
            onClick={handleCloseSelected}
            className={classes["mobile-nav-selected"]}
          >
            {selectedTxt}
            <motion.svg
              animate={{ rotate: isSelectedOpen ? 180 : 0 }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={classes["selected-icon"]}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </motion.svg>
          </button>
          <AnimatePresence mode="wait">
            {isSelectedOpen && (
              <motion.ul
                variants={{
                  visible: {
                    height: "auto",
                    transition: { staggerChildren: 0.02 },
                  },
                  hidden: { height: 0 },
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={classes["mobile-nav-list"]}
              >
                <motion.li
                  variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
                  exit={{ opacity: 0 }}
                >
                  <Link
                    className={
                      selectedTxt === "โปรไฟล์"
                        ? classes["hilight-text"]
                        : undefined
                    }
                    onClick={() => {
                      setSelectedTxt("โปรไฟล์");
                      handleCloseSelected();
                    }}
                    to={"/myaccount/profile"}
                  >
                    โปรไฟล์
                  </Link>
                </motion.li>
                <motion.li
                  variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
                  exit={{ opacity: 0 }}
                >
                  <Link
                    className={
                      selectedTxt === "เปลี่ยนรหัสผ่าน"
                        ? classes["hilight-text"]
                        : undefined
                    }
                    onClick={() => {
                      setSelectedTxt("เปลี่ยนรหัสผ่าน");
                      handleCloseSelected();
                    }}
                    to={"/myaccount/password"}
                  >
                    เปลี่ยนรหัสผ่าน
                  </Link>
                </motion.li>
                <motion.li
                  variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
                  exit={{ opacity: 0 }}
                >
                  <Link to={"/myaccount/profile"}>ข้อมูลการเรียกเก็บเงิน</Link>
                </motion.li>
                <motion.li
                  variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
                  exit={{ opacity: 0 }}
                >
                  <Link to={"/myaccount/profile"}>การจัดการอุปกรณ์</Link>
                </motion.li>
                <motion.li
                  variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
                  exit={{ opacity: 0 }}
                >
                  <Link to={"/myaccount/profile"}>ติดต่อเรา</Link>
                </motion.li>
                <motion.li
                  variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
                  exit={{ opacity: 0 }}
                >
                  <Link to={"#"} onClick={handleLogout}>
                    {isPending ? "กำลังออกจากระบบ..." : "ออกจากระบบ"}
                  </Link>
                </motion.li>
              </motion.ul>
            )}
          </AnimatePresence>
        </nav>
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
