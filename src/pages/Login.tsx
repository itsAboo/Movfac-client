import classes from "../styles/Login.module.css";
import appLogo from "../assets/full-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import Loader from "../components/Loader";
import { useMutation } from "@tanstack/react-query";
import { login } from "../util/userApi";
import { motion } from "framer-motion";
import { queryClient } from "../util/mediaApi";
import { saveLocalToken, saveLocalUser } from "../util/audentication";

export default function Login() {
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      saveLocalUser(data?.user);
      saveLocalToken(data?.token);
      // queryClient.invalidateQueries({ queryKey: ["isLoggedIn"] });
      queryClient.setQueriesData({ queryKey: ["user"] }, data?.user);
      navigate("/category");
    },
    onError: ({ message }) => {
      setError((prevErr) => ({
        ...prevErr,
        email: {
          ...prevErr.email,
          status: true,
          text: message,
        },
      }));
    },
  });
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
  });
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });
  const [error, setError] = useState({
    email: {
      status: false,
      text: "",
    },
    password: {
      status: false,
      text: "",
    },
  });
  const [pwIsVisible, setPwIsVisible] = useState(false);
  const navigate = useNavigate();
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
    setError((prevErr) => ({
      ...prevErr,
      email: { ...prevErr.email, status: false, text: "" },
      password: { ...prevErr.password, status: false, text: "" },
    }));
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
    if (inputForm.email.length < 1) {
      setError((prevErr) => ({
        ...prevErr,
        email: { ...prevErr.email, status: true, text: "กรุณากรอกอีเมล" },
      }));
      return;
    } else if (inputForm.password.length < 1 && !error.email.status) {
      setError((prevErr) => ({
        ...prevErr,
        password: {
          ...prevErr.password,
          status: true,
          text: "กรุณากรอกรหัสผ่าน",
        },
      }));
      return;
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
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "tween" }}
          className={classes["form-container"]}
        >
          <div className={classes.title}>
            <h1>เข้าสู่ระบบ</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={classes["form-group"]}>
              <label htmlFor="email">อีเมล</label>
              <input
                className={
                  emailIsInvalid || error.email.status
                    ? classes["input-err"]
                    : ""
                }
                onChange={(e) => handleChange(e.target.value, "email")}
                type="text"
                name="email"
                id="email"
                onBlur={() => handleBlur("email")}
              />
              {emailIsInvalid || error.email.status ? (
                error.email.status ? (
                  <p className={classes["err-txt"]}>{error.email.text}</p>
                ) : (
                  <p className={classes["err-txt"]}>{"อีเมลไม่ถูกต้อง"}</p>
                )
              ) : null}
            </div>
            <div className={classes["form-group"]}>
              <label htmlFor="password">รหัสผ่าน</label>
              <input
                className={
                  passwordIsInvalid || error.password.status
                    ? classes["input-err"]
                    : ""
                }
                onChange={(e) => handleChange(e.target.value, "password")}
                type={pwIsVisible ? "text" : "password"}
                name="password"
                id="password"
                onBlur={() => handleBlur("password")}
              />
              <span
                className={`material-symbols-outlined ${classes["eye-icon"]}`}
                onClick={() => setPwIsVisible((prevState) => !prevState)}
              >
                {pwIsVisible ? "visibility" : "visibility_off"}
              </span>
              {passwordIsInvalid || error.password.status ? (
                error.password.status ? (
                  <p className={classes["err-txt"]}>{error.password.text}</p>
                ) : (
                  <p className={classes["err-txt"]}>รหัสผ่านไม่ถูกต้อง</p>
                )
              ) : null}
            </div>
            <p className={classes.desc}>
              ยังไม่มีบัญชี Movfac
              <Link to={"/signup"}> สมัครสมาชิก</Link>
            </p>
            <div className={classes.btn}>
              <button
                disabled={error.email.status || error.password.status}
                type="submit"
              >
                {isPending ? (
                  <Loader className={classes.loader} />
                ) : (
                  "เข้าสู่ระบบ"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}
