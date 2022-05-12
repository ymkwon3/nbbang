import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// type: 토스트메세지 종류, message: 토스트메세지 내용, autoClose: 유지되는 시간
const notify = (type, message, autoClose, position = "bottom-center") => {
  if (type === "default") return toast(message, { autoClose, position });
  else if (type === "info") return toast.info(message, { autoClose, position });
  else if (type === "success") return toast.success(message, { autoClose, position });
  else if (type === "warning") return toast.warning(message, { autoClose, position });
  else if (type === "error") return toast.error(message, { autoClose, position });
};

const ToastMessage = () => {
  return <ToastContainer position="bottom-center" pauseOnHover={false} />;
};

export { ToastMessage, notify, toast };
