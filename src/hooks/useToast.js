// useToast.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = () => {
  const notify = (type, message) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "info":
        toast.info(message);
        break;
      default:
        toast(message);
    }
  };

  return { notify };
};

export default useToast;
