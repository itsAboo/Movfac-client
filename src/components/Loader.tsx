import { motion } from "framer-motion";

const loadingContainer = {
  width: "2.5rem",
  height: "2rem",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};
const loadingCircle = {
  display: "block",
  width: "0.5rem",
  height: "0.5rem",
  backgroundColor: "white",
  borderRadius: "0.5rem",
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: ["10%", "30%", "60%", "0%"],
  },
};
const loadingCircleTransition = {
  duration: 1,
  ease: "easeInOut",
  repeat: Infinity,
};
export default function Loader({
  className,
  size,
  boxHeight,
}: {
  className?: string | undefined;
  size?: string | undefined;
  boxHeight?: string | undefined;
}) {
  return (
    <div className={className}>
      <div>
        <motion.div
          style={{...loadingContainer,height : boxHeight || "2rem"}}
          variants={loadingContainerVariants}
          initial="start"
          animate="end"
        >
          <motion.span
            style={{
              ...loadingCircle,
              width: size || "0.5rem",
              height: size || "0.5rem",
            }}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          ></motion.span>
          <motion.span
            style={{
              ...loadingCircle,
              width: size || "0.5rem",
              height: size || "0.5rem",
            }}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          ></motion.span>
          <motion.span
            style={{
              ...loadingCircle,
              width: size || "0.5rem",
              height: size || "0.5rem",
            }}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          ></motion.span>
        </motion.div>
      </div>
    </div>
  );
}
