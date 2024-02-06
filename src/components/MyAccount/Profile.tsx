import { FormEvent, useContext, useEffect, useState } from "react";
import classes from "./styles/Profile.module.css";
import { UserContext } from "../../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { updateUserName } from "../../util/userApi";
import Loader from "../Loader";
import { queryClient } from "../../util/mediaApi";

export default function Profile() {
  const userCtx = useContext(UserContext);
  const { mutate, isPending } = useMutation({
    mutationFn: updateUserName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const [inputForm, setInputForm] = useState({
    name: userCtx?.user?.name || "",
    email: userCtx?.user?.email || "",
  });
  useEffect(() => {
    if (userCtx?.isUserSuccess) {
      setInputForm((prevInput) => ({
        ...prevInput,
        name: userCtx?.user?.name || "",
        email: userCtx?.user?.email || "",
      }));
    }
  }, [userCtx?.isUserSuccess]);

  const handleChange = (name: string, value: string) => {
    setInputForm((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ name: inputForm.name });
  };

  return (
    <div className={classes.container}>
      <h2>โปรไฟล์</h2>
      <form onSubmit={handleSubmit} className={classes["profile-form"]}>
        <div className={classes["form-group"]}>
          <label htmlFor="name">ชื่อ</label>
          <input
            onChange={(e) => handleChange("name", e.target.value)}
            value={inputForm.name}
            className={classes["profile-input"]}
            type="text"
            id="name"
          />
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="email">ที่อยู่อีเมล</label>
          <input
            disabled
            onChange={(e) => handleChange("email", e.target.value)}
            value={inputForm.email}
            className={classes["profile-input"]}
            type="text"
            id="email"
          />
        </div>
        <button disabled={inputForm.name === userCtx?.user?.name}>
          {isPending ? (
            <Loader boxHeight="24px" className={classes.loader} />
          ) : (
            "บันทึก"
          )}
        </button>
      </form>
    </div>
  );
}
