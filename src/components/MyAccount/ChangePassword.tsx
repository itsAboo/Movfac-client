import { FormEvent, useState } from "react";
import classes from "./styles/ChangePassword.module.css";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../util/userApi";
import Loader from "../Loader";

export default function ChangePassword() {
  const [inputForm, setInputForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [inputErr, setInputErr] = useState({
    status: false,
    text: "",
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: updatePassword,
    onError: (err) => {
      setInputErr((prevErr) => ({
        ...prevErr,
        status: true,
        text: err.message,
      }));
    },
  });

  const inputIsInvalid =
    inputForm.currentPassword.length < 6 || inputForm.newPassword.length < 6;

  const handleChange = (name: string, value: string) => {
    setInputForm((prevInput) => ({ ...prevInput, [name]: value }));
    setInputErr((prevErr) => ({ ...prevErr, status: false, text: "" }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputIsInvalid) return;
    mutate({ ...inputForm });
  };
  return (
    <div className={classes.container}>
      <h2>เปลี่ยนรหัสผ่าน</h2>
      <form onSubmit={handleSubmit} className={classes["change-pw-form"]}>
        <div className={classes["form-group"]}>
          <label htmlFor="old-password">รหัสผ่านปัจจุบัน</label>
          <input
            onChange={(e) => handleChange("currentPassword", e.target.value)}
            value={inputForm.currentPassword}
            className={`${classes["change-pw-input"]} ${
              inputErr.status && classes["pw-err-input"]
            }`}
            type="password"
            id="old-password"
          />
          {inputErr.status && (
            <p className={classes["pw-err-txt"]}>{inputErr.text}</p>
          )}
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="old-password">รหัสผ่านใหม่</label>
          <input
            onChange={(e) => handleChange("newPassword", e.target.value)}
            value={inputForm.newPassword}
            className={classes["change-pw-input"]}
            type="password"
            id="new-password"
          />
        </div>
        <button disabled={inputIsInvalid || inputErr.status || isSuccess}>
          {isPending ? (
            <Loader className={classes.loader} boxHeight="24px" />
          ) : (
            "บันทึก"
          )}
        </button>
      </form>
    </div>
  );
}
