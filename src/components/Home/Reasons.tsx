import classes from "./styles/Reasons.module.css";
import opportunityIcon from "../../assets/opportunity.png";
import supportIcon from "../../assets/support.png";
import originalIcon from "../../assets/original.png";
import crossPlatformIcon from "../../assets/crossplatform.png";

export default function Reasons() {
  return (
    <section className={classes.container}>
      <div className={classes["title-container"]}>
        <h1 className={classes.title}>สิทธิพิเศษสำหรับการเป็นสมาชิก</h1>
      </div>
      <div className={classes["card-container"]}>
        <div className={classes.card}>
          <div>
            <h1 className={classes["card-title"]}>
              ความบันเทิงที่คัดสรรตามความชอบของคุณ
            </h1>
          </div>
          <div className={classes["card-image"]}>
            <img
              className={classes["card-image-icon"]}
              src={opportunityIcon}
              alt="icon"
            />
            <div className={classes["card-image-backdrop"]}></div>
          </div>
        </div>
        <div className={classes.card}>
          <div>
            <h1 className={classes["card-title"]}>
              ยกเลิกหรือเปลี่ยนแพคเกจได้ทุกเมื่อ
            </h1>
          </div>
          <div className={classes["card-image"]}>
            <img
              className={classes["card-image-icon"]}
              src={supportIcon}
              alt="icon"
            />
            <div className={classes["card-image-backdrop"]}></div>
          </div>
        </div>
        <div className={classes.card}>
          <div>
            <h1 className={classes["card-title"]}>
              ซีรี่ย์ และ ภาพยนตร์ ที่ไม่สามารถหาดูได้ที่ไหน
            </h1>
          </div>
          <div className={classes["card-image"]}>
            <img
              className={classes["card-image-icon"]}
              src={originalIcon}
              alt="icon"
            />
            <div className={classes["card-image-backdrop"]}></div>
          </div>
        </div>
        <div className={classes.card}>
          <div>
            <h1 className={classes["card-title"]}>
              สำหรับโทรศัพท์ แท็บเล็ต แล็ปท็อป และ ทีวี
            </h1>
          </div>
          <div className={classes["card-image"]}>
            <img
              className={classes["card-image-icon"]}
              src={crossPlatformIcon}
              alt="icon"
            />
            <div className={classes["card-image-backdrop"]}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
