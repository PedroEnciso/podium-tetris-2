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

  athleteImage = `https://playspace-static.s3.us-west-1.amazonaws.com/images/${athlete}.png`;

  switch (athlete) {
    case "brooke":
      athleteTagline = "sweat now, shine later!";
      break;
    case "craig":
      athleteTagline = "we don't quit!";
      break;
    case "emma":
      athleteTagline = "train insane or remain the same!";
      break;
    case "heber":
      athleteTagline = "you gotta want it!";
      break;
    case "justin":
      athleteTagline = "my best is enough!";
      break;
    case "kels":
      athleteTagline = "just be a nice person!";
      break;
    case "mars":
      athleteTagline = "scale your life!";
      break;
    case "mat":
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
