import { useContext, useState } from "react";
import classes from "./styles/RegisterSection.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

export default function RegisterSection() {
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
      {!userCtx?.user ? (
        <>
          <p className={classes.title}>
            หากพร้อมรับชม ป้อนอีเมลเพื่อทำการสมัครสมาชิก
          </p>
          <form>
            <input
              style={{ borderColor: emailIsInvalid ? "red" : "" }}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              placeholder="อีเมล"
              name="email"
              type="text"
            />
            <button type="button" onClick={handleClick}>
              สมัครสมาชิก
            </button>
          </form>
          {emailIsInvalid && (
            <p className={classes["err-txt"]}>อีเมลไม่ถูกต้อง</p>
          )}
        </>
      ) : !userCtx.user.name ? (
        <Link to={"/signup/name"}>ทำการสมัครให้เสร็จสิ้น</Link>
      ) : !userCtx.user.plan.packageName ? (
        <Link to={"/planform"}>ทำการสมัครให้เสร็จสิ้น</Link>
      ) : null}
    </section>
  );
}
