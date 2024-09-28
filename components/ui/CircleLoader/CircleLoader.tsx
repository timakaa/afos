import { FC } from "react";
import st from "./circle-loader.module.css";

interface CircleLoaderProps {
  svgClassName?: string;
  circleClassName?: string;
}

const CircleLoader: FC<CircleLoaderProps> = ({
  svgClassName,
  circleClassName,
}) => {
  return (
    <svg className={[st.svg, svgClassName].join(" ")} viewBox='25 25 50 50'>
      <circle
        className={[st.circle, circleClassName].join(" ")}
        r='20'
        cy='50'
        cx='50'
      ></circle>
    </svg>
  );
};

export default CircleLoader;
