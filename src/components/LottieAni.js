import React from "react";

import lottie from "lottie-web";

const LottieAni = (props) => {
  const { styles, filename } = props;

  const lottieAniRef = React.useRef(null);
  React.useEffect(() => {
    lottie.loadAnimation({
      container: lottieAniRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require(`../image/chatani/${filename}`),
    });
  }, []);
  return <div ref={lottieAniRef} style={{ ...styles }}></div>;
};

export default LottieAni;
