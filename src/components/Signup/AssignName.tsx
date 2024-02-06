import { AnimatePresence, motion } from "framer-motion";
import classes from "./AssignName.module.css";
import successIcon from "../../assets/correct_icon.png";
import { useContext, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateUserName } from "../../util/userApi";
import Loader from "../Loader";
import {  useNavigate } from "react-router-dom";
import { queryClient } from "../../util/mediaApi";
import { UserContext } from "../../context/UserContext";

export default function AssignName() {
  const userCtx = useContext(UserContext);
  const [isNext, setIsNext] = useState(false);
  const [inputErr, setInputErr] = useState(false);
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: updateUserName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/planform");
    },
  });

  useEffect(() => {
    if (userCtx?.user?.name) {
      navigate("/");
    }
  }, [userCtx?.user?.name]);

  const handleSubmit = () => {
    setInputErr(false);
    if (nameRef.current?.value.length! < 4) {
      setInputErr(true);
      return;
    }
    mutate({ name: nameRef.current?.value as string });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <div className={classes.container}>
          {!isNext ? (
            <motion.div
              className={classes["success-container"]}
              key={"name_step1"}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "tween" }}
              exit={{ x: -300, opacity: 0 }}
            >
              <div className={classes["success-header"]}>
                <img src={successIcon} alt="success_icon" />
                <h3>สมัครสมาชิกสำเร็จ !</h3>
              </div>
              <div className={classes["success-content"]}>
                <h1>ตั้งค่าบัญชีของคุณให้เสร็จสิ้น</h1>
                <p>ตั้งชื่อเล่นของคุณ เพื่อให้ง่ายต่อใช้งาน</p>
              </div>
              <button onClick={() => setIsNext(true)}>ถัดไป</button>
            </motion.div>
          ) : (
            <motion.div
              className={classes["success-container"]}
              key={"name_step2"}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "tween" }}
              exit={{ x: -300, opacity: 0 }}
            >
              <div className={classes["success-header"]}>
                <img src={successIcon} alt="success_icon" />
                <h3>กรอกชื่อเล่นของคุณ</h3>
              </div>
              <div className={classes["success-content"]}>
                <label htmlFor="name">ชื่อเล่น</label>
                <input
                  className={inputErr ? classes["input-err"] : ""}
                  minLength={4}
                  maxLength={12}
                  placeholder="4 ตัวอักษรขึ้นไป และไม่เกิน 12 ตัวอักษร"
                  ref={nameRef}
                  type="text"
                />
                {inputErr && (
                  <p className={classes["err-text"]}>
                    ชื่อเล่นมีตัวอักษรน้อยเกินไป
                  </p>
                )}
              </div>
              <button onClick={handleSubmit}>
                {!isPending ? "ถัดไป" : <Loader className={classes.loader} />}
              </button>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </>
  );
}
