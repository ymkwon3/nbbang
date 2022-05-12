import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// type: 토스트메세지 종류, message: 토스트메세지 내용, autoClose: 유지되는 시간
const notify = (type, message, autoClose) => {
  if (type === "default") toast(message, { autoClose });
  else if (type === "info") toast.info(message, { autoClose });
  else if (type === "success") toast.success(message, { autoClose });
  else if (type === "warning") toast.warning(message, { autoClose });
  else if (type === "error") toast.error(message, { autoClose });
};

const ToastMessage = () => {
  return <ToastContainer position="bottom-center" pauseOnHover={false} />;
};

export { ToastMessage, notify };
