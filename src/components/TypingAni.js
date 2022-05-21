import React from "react";

import lottie from "lottie-web";

const TypingAni = (props) => {
  const { styles } = props;

  const typingRef = React.useRef(null);
  React.useEffect(() => {
    lottie.loadAnimation({
      container: typingRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../image/chatani/typing-indicator.json"),
    });
  }, []);
  return <div ref={typingRef} style={{ ...styles }}></div>;
};

export default TypingAni;
