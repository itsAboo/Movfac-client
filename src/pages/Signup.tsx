import classes from "../styles/Login.module.css";
import appLogo from "../assets/full-logo.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import Loader from "../components/Loader";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../util/userApi";
import { AnimatePresence, motion } from "framer-motion";
import { queryClient } from "../util/mediaApi";
import { saveLocalToken, saveLocalUser } from "../util/audentication";

export default function Signup() {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      saveLocalUser(data?.user);
      saveLocalToken(data?.token);
      // queryClient.invalidateQueries({ queryKey: ["isLoggedIn"] });
      queryClient.setQueriesData({ queryKey: ["user"] }, data?.user);
      navigate("/signup/name");
    },
    onError: ({ message }) => {
      setError((prevErr) => ({ ...prevErr, status: true, text: message }));
    },
  });
  const [searchParams] = useSearchParams();
  const [inputForm, setInputForm] = useState({
    email: searchParams.get("email") || "",
    password: "",
  });
  const [didEdit, setDidEdit] = useState({
    email: searchParams.get("email") || false,
    password: false,
  });
  const [error, setError] = useState({
    status: false,
    text: "",
  });
  const [pwIsVisible, setPwIsVisible] = useState(false);
  const emailIsInvalid =
    (didEdit.email && !inputForm.email.includes("@")) ||
    (didEdit.email && inputForm.email.trim().length < 8) ||
    (didEdit.email && inputForm.email.includes(" "));

  const passwordIsInvalid =
    (didEdit.password && inputForm.password.length < 6) ||
    (didEdit.password && !inputForm.password.match(/^[a-zA-Z0-9]+$/));

  const handleChange = (value: string, name: string) => {
    setInputForm((prevInput) => {
      return { ...prevInput, [name]: value };
    });
    setDidEdit((prevEdit) => {
      return { ...prevEdit, [name]: false };
    });
    setError({ status: false, text: "" });
  };

  const handleBlur = (name: "email" | "password") => {
    if (inputForm[name].length > 0) {
      setDidEdit((prevEdit) => {
        return { ...prevEdit, [name]: true };
      });
    } else {
      setDidEdit((prevEdit) => {
        return { ...prevEdit, [name]: false };
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (inputForm.email.length === 0) {
      setError({ status: true, text: "กรุณากรอกอีเมล" });
    } else if (inputForm.password.length === 0) {
      setDidEdit((prevEdit) => {
        return { ...prevEdit, password: true };
      });
    }
    if (
      emailIsInvalid ||
      passwordIsInvalid ||
      !didEdit.email ||
      !didEdit.password
    ) {
      return;
    }
    mutate({ inputForm });
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.logo}>
          <Link to="/">
            <img src={appLogo} alt="app-logo" />
          </Link>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={"signup"}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "tween" }}
            exit={{ x: -300, opacity: 0 }}
            className={classes["form-container"]}
          >
            <div className={classes.title}>
              <h1>สมัครสมาชิก</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={classes["form-group"]}>
                <label htmlFor="email">อีเมล</label>
                <input
                  className={
                    emailIsInvalid || error.status ? classes["input-err"] : ""
                  }
                  onChange={(e) => handleChange(e.target.value, "email")}
                  value={inputForm.email}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="example@gmail.com"
                  onBlur={() => handleBlur("email")}
                />
                {emailIsInvalid || error.status ? (
                  <p className={classes["err-txt"]}>
                    {error.text || "อีเมลไม่ถูกต้อง"}
                  </p>
                ) : null}
              </div>
              <div className={classes["form-group"]}>
                <label htmlFor="password">รหัสผ่าน</label>
                <input
                  className={passwordIsInvalid ? classes["input-err"] : ""}
                  onChange={(e) => handleChange(e.target.value, "password")}
                  type={pwIsVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="ความยาวตัวอักษร 6 ตัวขึ้นไป"
                  onBlur={() => handleBlur("password")}
                />
                <span
                  className={`material-symbols-outlined ${classes["eye-icon"]}`}
                  onClick={() => setPwIsVisible((prevState) => !prevState)}
                >
                  {pwIsVisible ? "visibility" : "visibility_off"}
                </span>
                {passwordIsInvalid && (
                  <p className={classes["err-txt"]}>รูปแบบไม่ถูกต้อง</p>
                )}
              </div>
              <p className={classes.desc}>
                มีบัญชี Movfav แล้ว
                <Link to={"/login"}> เข้าสู่ระบบ</Link>
              </p>
              <div className={classes.btn}>
                <button disabled={error.status} type="submit">
                  {isPending ? (
                    <Loader className={classes.loader} />
                  ) : (
                    "สมัครสมาชิก"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
