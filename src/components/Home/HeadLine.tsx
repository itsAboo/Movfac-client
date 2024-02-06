import { Link, useNavigate } from "react-router-dom";
import thorBg from "../../assets/821364.jpg";
import classes from "./styles/HeadLine.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

export default function HeadLine() {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState({
    value: "",
    didEdit: false,
  });
  const emailIsInvalid =
    (email.didEdit && !email.value.includes("@")) ||
    (email.didEdit && email.value.trim().length < 8) ||
    (email.didEdit && email.value.includes(" "));

  const handleChange = (value: string) => {
    setEmail((prevEmail) => {
      return { ...prevEmail, value };
    });
  };
  const handleBlur = () => {
    setEmail((prevEmail) => {
      return { ...prevEmail, didEdit: true };
    });
  };
  const handleClick = () => {
    if ((email.didEdit && emailIsInvalid) || email.value.length === 0) {
      setEmail((prevEmail) => {
        return { ...prevEmail, didEdit: true };
      });
      return;
    }
    return navigate(`/signup/?email=${email.value}`);
  };
  return (
    <section className={classes.container}>
      <div className={classes.headline}>
        <img src={thorBg} alt="thorBg" className={classes.bg} />
        <div className={classes["headline-text"]}>
          <h1>ภาพยนตร์, รายการทีวี, ซีรี่ย์ และ อื่นๆ อีกมากมาย</h1>
          <div className={classes["email-box"]}>
            {!userCtx?.user ? (
              <>
                <p>ดูได้ตลอดชีพ เริ่มต้นเพียง 30บ.</p>
                <p>หากต้องการรับชม กรอกอีเมลเพื่อสมัครสมาชิก</p>
                <div className={classes["email-input"]}>
                  <input
                    style={{ borderColor: emailIsInvalid ? "red" : "" }}
                    onChange={(e) => handleChange(e.target.value)}
                    type="text"
                    placeholder="อีเมล"
                    onBlur={handleBlur}
                  />
                  {emailIsInvalid && (
                    <p className={classes["err-txt"]}>อีเมลไม่ถูกต้อง</p>
                  )}
                  <button onClick={handleClick}>สมัครสมาชิก</button>
                </div>
              </>
            ) : !userCtx.user.name ? (
              <Link to={"/signup/name"}>ทำการสมัครให้เสร็จสิ้น</Link>
            ) : !userCtx.user.plan.packageName ? (
              <Link to={"/planform"}>ทำการสมัครให้เสร็จสิ้น</Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
