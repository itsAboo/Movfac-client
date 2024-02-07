import { useState } from "react";
import Plan from "../components/Plan/Plan";
import classes from "../styles/Planform.module.css";
import { AnimatePresence, motion } from "framer-motion";
import successIcon from "../assets/correct_icon.png";
import { useMutation } from "@tanstack/react-query";
import { updatePlan } from "../util/userApi";
import Loader from "../components/Loader";
import { Link, Navigate } from "react-router-dom";
import { queryClient } from "../util/mediaApi";
import { getLocalUser } from "../util/audentication";
import { User } from "../util/AppTypes";

const planData = [
  {
    title: "Premium",
    titleDesc: "4K + HDR",
    pricePerMonth: 319,
    videoQuality: "Best",
    resolution: "4K (Ultra HD) + HDR",
    supportedDevices: "TV,computer,mobile phone,tablet",
    houseHold: 4,
    downloadDevices: 6,
    planName: "premium",
    cssClass: "premium",
  },
  {
    title: "Standard",
    titleDesc: "1080p",
    pricePerMonth: 249,
    videoQuality: "Great",
    resolution: "1080p (Full HD)",
    supportedDevices: "TV,computer,mobile phone,tablet",
    houseHold: 2,
    downloadDevices: 2,
    planName: "standard",
    cssClass: "standard",
  },
  {
    title: "Basic",
    titleDesc: "720p",
    pricePerMonth: 179,
    videoQuality: "Good",
    resolution: "720p (HD)",
    supportedDevices: "computer,mobile phone,tablet",
    houseHold: 1,
    downloadDevices: 1,
    planName: "basic",
    cssClass: "basic",
  },
];

export default function Planform() {
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [isNext, setIsNext] = useState(false);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: updatePlan,
    onMutate: (data) => {
      const newPlan = data;
      const previousUser: User = queryClient.getQueryData(["user"])!;
      queryClient.setQueryData(["user"], {
        ...previousUser,
        plan: newPlan,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  if (getLocalUser()?.plan?.packageName) {
    return <Navigate to={"/"} />;
  }
  const handleClick = (planName: string) => {
    setSelectedPlan(planName);
  };
  const handleSubmit = () => {
    mutate({ plan: selectedPlan });
  };
  return (
    <AnimatePresence mode="wait">
      <div className={classes.container}>
        {!isSuccess && isNext ? (
          <motion.div
            key={"plan_2"}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "tween" }}
            className={classes["plan-out-container"]}
          >
            <h1 className={classes.title}>เลือกแพคเกจที่เหมาะสมสำหรับคุณ</h1>
            <div className={classes["plan-container"]}>
              {planData.map((plan) => (
                <Plan
                  key={plan.title}
                  title={plan.title}
                  titleDesc={plan.titleDesc}
                  pricePerMonth={plan.pricePerMonth}
                  videoQuality={plan.videoQuality}
                  resolution={plan.resolution}
                  supportedDevices={plan.supportedDevices}
                  houseHold={plan.houseHold}
                  downloadDevices={plan.downloadDevices}
                  planName={plan.planName}
                  cssClass={selectedPlan === plan.planName ? "selected" : ""}
                  onClick={() => handleClick(plan.planName)}
                />
              ))}
            </div>
            <div className={classes.desc}>
              <p>
                HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability
                subject to your internet service and device capabilities. Not
                all content is available in all resolutions. See our Terms of
                Use for more details. Only people who live with you may use your
                account. Watch on 4 different devices at the same time with
                Premium, 2 with Standard, and 1 with Basic and Mobile.
              </p>
            </div>
            <div className={classes.btn}>
              <button onClick={handleSubmit}>
                {isPending ? <Loader className={classes.loader} /> : "ถัดไป"}
              </button>
            </div>
          </motion.div>
        ) : (
          !isSuccess && (
            <motion.div
              className={classes["pre-plan-container"]}
              key={"plan_1"}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "tween" }}
              exit={{ x: -300, opacity: 0 }}
            >
              <div className={classes["pre-plan-content"]}>
                <h1>เลือกแพคเกจของคุณ</h1>
                <div className={classes["pre-plan-description"]}>
                  <div className={classes["pre-plan-item"]}>
                    <img src={successIcon} alt="icon" />
                    <p>ไม่มีข้อผูกมัด สามารถยกเลิกได้ทุกเมื่อ</p>
                  </div>
                  <div className={classes["pre-plan-item"]}>
                    <img src={successIcon} alt="icon" />
                    <p>ทุกสิ่งใน Movfac ในราคาเดียว</p>
                  </div>
                  <div className={classes["pre-plan-item"]}>
                    <img src={successIcon} alt="icon" />
                    <p>ไม่มีโฆณา ไม่มีค่าธรรมเนียมเพิ่มเติม</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsNext(true)}>ถัดไป</button>
            </motion.div>
          )
        )}
        {isSuccess && (
          <motion.div
            key={"plan_3"}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "tween" }}
            exit={{ x: -300, opacity: 0 }}
            className={classes["success-container"]}
          >
            <img src={successIcon} alt="success-icon" />
            <h1>สมัครการใช้งานสำเร็จ</h1>
            <Link to={"/category"}>เริ่มต้นใช้งาน</Link>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
