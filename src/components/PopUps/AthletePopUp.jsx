import messiImage from "../../images/messi.webp";
import ronaldoImage from "../../images/ronaldo.jpeg";
import style from "./PopUps.module.css";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

function AthletePopUp({ athlete }) {
  const athlete1Ref = useRef();
  const athlete2Ref = useRef();
  const tl1 = useRef();
  const tl2 = useRef();
  useGSAP(() => {
    tl1.current = gsap
      .timeline()
      .fromTo(
        athlete1Ref.current,
        { left: 0, bottom: 0 },
        { left: 20, bottom: 100, rotate: 360, duration: 0.5 }
      )
      .to(athlete1Ref.current, {
        left: -20,
        bottom: -200,
        rotate: 0,
        durration: 0.5,
        delay: 1.1,
      });

    tl2.current = gsap
      .timeline()
      .fromTo(
        athlete2Ref.current,
        { right: 0, bottom: 0 },
        { right: 20, bottom: 100, rotate: 360, duration: 0.5 }
      )
      .to(athlete2Ref.current, {
        right: -20,
        bottom: -200,
        rotate: 0,
        durration: 0.5,
        delay: 1.1,
      });
  });
  if (athlete === "messi") {
    return (
      <div className={style.athlete_container} ref={athlete1Ref}>
        <img src={messiImage} />
        <p>Hard work pays off!</p>
      </div>
    );
  }

  if (athlete === "ronaldo") {
    return (
      <div className={style.athlete_container} ref={athlete2Ref}>
        <img src={ronaldoImage} />
        <p>SUUUIII</p>
      </div>
    );
  }

  if (athlete === "cheat") {
    return (
      <>
        <div className={style.athlete_container} ref={athlete1Ref}>
          <img src={messiImage} />
          <p>NICE</p>
        </div>
        <div className={style.athlete_container} ref={athlete2Ref}>
          <img src={ronaldoImage} />
          <p>NICE</p>
        </div>
      </>
    );
  }
}

export default AthletePopUp;
