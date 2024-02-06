import { Link } from "react-router-dom";
import classes from "../styles/Footer.module.css";
import fbLogo from "../assets/facebook.png";
import ytLogo from "../assets/youtube.png";
import twLogo from "../assets/twitter.png";
import igLogo from "../assets/instagram.png";

export default function Footer() {
  return (
    <footer className={classes.container}>
      <div className={classes["group-items"]}>
        <div className={classes["item-container"]}>
          <h3>ช่วยเหลือ</h3>
          <ul className={classes["list-container"]}>
            <li className={classes.item}>
              <Link to="#">สมัครสมาชิกอย่างไร</Link>
            </li>
            <li className={classes.item}>
              <Link to="#">ช่องทางการชำระเงิน</Link>
            </li>
            <li className={classes.item}>
              <Link to="#">ยกเลิกการเป็นสมาชิกอย่างไร</Link>
            </li>
            <li className={classes.item}>
              <Link to="#">นโยบายการคืนเงิน</Link>
            </li>
            <li className={classes.item}>
              <Link to="#">ติดต่อ Movfac</Link>
            </li>
          </ul>
        </div>
        <div className={classes["item-container"]}>
          <h3>เกี่ยวกับ Movfac</h3>
          <ul className={classes["list-container"]}>
            <li className={classes.item}>
              <Link to="#">เกี่ยวกับเรา</Link>
            </li>
            <li className={classes.item}>
              <Link to="#">นโยบายของ Movfac</Link>
            </li>
            <li className={classes.item}>
              <Link to="#">ร่วมงานกับเรา</Link>
            </li>
          </ul>
        </div>
        <div className={classes["item-container"]}>
          <h3>ความเป็นส่วนตัว</h3>
          <ul className={classes["list-container"]}>
            <li className={classes.item}>
              <Link to="#">บัญชี</Link>
            </li>
            <li className={classes.item}>
              <Link to="#">แลกบัตรของขวัญ</Link>
            </li>
            <li className={classes.item}>
              <Link to="#">การตั้งค่าคุกกี้</Link>
            </li>
          </ul>
        </div>
        <div className={classes["contact-item-container"]}>
          <h3>ติดตามเรา</h3>
          <ul className={classes["contact-container"]}>
            <li className={classes.item}>
              <Link to="#">
                <img src={fbLogo} alt="fb-logo" />
              </Link>
            </li>
            <li className={classes.item}>
              <Link to="#">
                <img src={twLogo} alt="tw-logo" />
              </Link>
            </li>
            <li className={classes.item}>
              <Link to="#">
                <img src={igLogo} alt="ig-logo" />
              </Link>
            </li>
            <li className={classes.item}>
              <Link to="#">
                <img src={ytLogo} alt="yt-logo" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={classes["copy-right"]}>
        <p>©2023 MOVFAC Thailand. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
