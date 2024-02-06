import classes from "./styles/NewMovie.module.css";

export default function NewMovie() {
  return (
    <section className={classes.container}>
      <div className={classes.video}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/TcMBFSGVi1c?si=y2lL3EWS4ork_iZO"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className={classes.desc}>
        <h1>หนังมาใหม่</h1>
        <p>
          หลังจากเหตุการณ์ทำลายล้างใน Avengers: Infinity War (2018)
          จักรวาลก็พังทลายลง ด้วยความช่วยเหลือจากพันธมิตรที่เหลือ
          เหล่าอเวนเจอร์สจึงมารวมตัวกันอีกครั้งเพื่อพลิกกลับการกระทำของธานอสและคืนความสมดุลให้กับจักรวาล
        </p>
      </div>
    </section>
  );
}
