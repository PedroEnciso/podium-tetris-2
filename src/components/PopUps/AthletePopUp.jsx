import brooke from "../../images/brooke.png";
import craig from "../../images/craig.png";
import emma from "../../images/emma.png";
import heber from "../../images/heber.png";
import justin from "../../images/justin.png";
import kels from "../../images/kels.png";
import mars from "../../images/mars.png";
import mat from "../../images/mat.png";

import style from "./PopUps.module.css";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

function AthletePopUp({ athlete }) {
  const tl = useRef();
  const athleteRef = useRef();

  const { athleteImage, athleteTagline } = useGetAthleteInfo(athlete);

  useGSAP(() => {
    const rand = gsap.utils.random(1, 4, 1);
    console.log("random number", rand);
    const timeline = getAthleteTimeline(rand, athleteRef);
    tl.current = timeline;
  });

  return (
    <div className={style.athlete_container} ref={athleteRef}>
      <img src={athleteImage} />
      <p>{athleteTagline}</p>
    </div>
  );
}

const useGetAthleteInfo = (athlete) => {
  let athleteImage;
  let athleteTagline;

  switch (athlete) {
    case "brooke":
      athleteImage = brooke;
      athleteTagline = "sweat now, shine later!";
      break;
    case "craig":
      athleteImage = craig;
      athleteTagline = "we don't quit!";
      break;
    case "emma":
      athleteImage = emma;
      athleteTagline = "train insane or remain the same!";
      break;
    case "heber":
      athleteImage = heber;
      athleteTagline = "you gotta want it!";
      break;
    case "justin":
      athleteImage = justin;
      athleteTagline = "my best is enough!";
      break;
    case "kels":
      athleteImage = kels;
      athleteTagline = "just be a nice person!";
      break;
    case "mars":
      athleteImage = mars;
      athleteTagline = "scale your life!";
      break;
    case "mat":
      athleteImage = mat;
      athleteTagline = "hard work pays off!";
  }

  return { athleteImage, athleteTagline };
};

const getAthleteTimeline = (num, athleteRef) => {
  if (num === 1) {
    return gsap
      .timeline()
      .fromTo(
        athleteRef.current,
        { left: -20, bottom: -200 },
        { left: 25, bottom: 20, rotate: 360, duration: 0.5 }
      )
      .to(athleteRef.current, {
        left: -20,
        bottom: -200,
        rotate: 0,
        duration: 0.5,
        delay: 1.1,
      });
  }

  if (num === 2) {
    return gsap
      .timeline()
      .fromTo(
        athleteRef.current,
        { right: -20, bottom: -200 },
        { right: 25, bottom: 20, rotate: 360, duration: 0.5 }
      )
      .to(athleteRef.current, {
        right: -20,
        bottom: -200,
        rotate: 0,
        duration: 0.5,
        delay: 1.1,
      });
  }

  if (num === 3) {
    return gsap
      .timeline()
      .fromTo(
        athleteRef.current,
        { left: -20, top: -200 },
        { left: 25, top: 20, rotate: 360, duration: 0.5 }
      )
      .to(athleteRef.current, {
        left: -20,
        top: -200,
        rotate: 0,
        duration: 0.5,
        delay: 1.1,
      });
  }

  if (num === 4) {
    return gsap
      .timeline()
      .fromTo(
        athleteRef.current,
        { right: -20, top: -200 },
        { right: 25, top: 20, rotate: 360, duration: 0.5 }
      )
      .to(athleteRef.current, {
        right: -20,
        top: -200,
        rotate: 0,
        duration: 0.5,
        delay: 1.1,
      });
  }
};

export default AthletePopUp;
