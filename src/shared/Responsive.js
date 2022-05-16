import {useMediaQuery} from "react-responsive"

const Desktop = (props) => {
  const {children} = props;
  const isDesktop = useMediaQuery({minWidth : 1023})
  return isDesktop ? children : null;
}

// 일단 임시로 pc, mobile 두개만 나눔
const Mobile = (props) => {
  const {children} = props;
  const isMobile = useMediaQuery({maxWidth : 1022})
  return isMobile ? children : null;
}

export {Desktop, Mobile};