import { Key } from "react";
import classes from "./Plan.module.css";

interface Props {
  key?: Key;
  title: string;
  titleDesc: string;
  pricePerMonth: number;
  videoQuality: string;
  resolution: string;
  supportedDevices: string;
  houseHold: number;
  downloadDevices: number;
  planName: string;
  cssClass: string;
  onClick: () => void;
}

export default function Plan({
  title,
  titleDesc,
  pricePerMonth,
  videoQuality,
  resolution,
  supportedDevices,
  houseHold,
  downloadDevices,
  planName,
  onClick,
  cssClass,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`${classes.container} ${classes[cssClass]}`}
    >
      <div className={`${classes.title} ${classes[planName]}`}>
        <h3>{title}</h3>
        <p>{titleDesc}</p>
      </div>
      <div className={classes.item}>
        <p>Monthly price</p>
        <p>THB {pricePerMonth}</p>
      </div>
      <div className={classes.item}>
        <p>Video and sound quality</p>
        <p>{videoQuality}</p>
      </div>
      <div className={classes.item}>
        <p>Resolution</p>
        <p>{resolution}</p>
      </div>
      <div className={classes.item}>
        <p>Supported devices</p>
        <p>{supportedDevices}</p>
      </div>
      <div className={classes.item}>
        <p>Devices your household can watch at the same time</p>
        <p>{houseHold}</p>
      </div>
      <div className={classes.item}>
        <p>Download devices</p>
        <p>{downloadDevices}</p>
      </div>
    </div>
  );
}
