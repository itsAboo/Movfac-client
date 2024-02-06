import { Link } from "react-router-dom";
import classes from "./styles/Plans.module.css";
import { motion } from "framer-motion";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const plans = [
  {
    id: "1",
    title: "Premium",
    price: "319 บาท / เดือน",
    description: "4K(Ultra HD) + HDR",
  },
  {
    id: "2",
    title: "Standard",
    price: "249 บาท / เดือน",
    description: "1080 (Full HD)",
  },
  {
    id: "3",
    title: "Basic",
    price: "179 บาท / เดือน",
    description: "720p (HD)",
  },
];

export default function Plans() {
  const userCtx = useContext(UserContext);
  return (
    <section className={classes.container}>
      <h1 className={classes.title}>สตรีมรายการโปรดของคุณและอีกมากมาย</h1>
      <div className={classes["card-container"]}>
        {plans.map((plan) => (
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "rgba(255, 255, 255, 0.5) 0px 10px 50px",
            }}
            transition={{ type: "spring" }}
            exit={{ boxShadow: "none" }}
            key={plan.id}
            className={classes.card}
          >
            <div className={classes["card-content"]}>
              <h3>{plan.title}</h3>
              <h1>{plan.price}</h1>
              <p>{plan.description}</p>
            </div>
            <div className={classes["card-footer"]}>
              <Link to={userCtx?.user ? "/planform" : "/signup"}>
                คลิกเพื่อสมัคร
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
