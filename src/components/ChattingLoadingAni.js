import React from "react";

import lottie from "lottie-web";

const ChattingLoadingAni = (props) => {
  const { styles } = props;

  const chattingLoadingRef = React.useRef(null);
  React.useEffect(() => {
    lottie.loadAnimation({
      container: chattingLoadingRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../image/chatani/happy-toast.json"),
    });
  }, []);
  return <div ref={chattingLoadingRef} style={{ ...styles }}></div>;
};

export default ChattingLoadingAni;
