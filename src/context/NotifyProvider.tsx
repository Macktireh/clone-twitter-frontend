import React from "react";
import { ToastContainer, toast } from "react-toastify";

type ContextPropsType = {
  typeNotify: {
    success: string;
    info: string;
    warning: string;
    error: string;
    default: string;
  };
  notify: (type: string, text: string) => void;
};

const NotifyContext = React.createContext<ContextPropsType | null>(null);

const typeNotify = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
  default: "default",
};

const NotifyProvider = ({ children }: React.PropsWithChildren) => {
  const notify = (type: string, text: string) => {
    switch (type) {
      case typeNotify.info:
        toast.info(text);
        break;
      case typeNotify.success:
        toast.success(text);
        break;
      case typeNotify.warning:
        toast.warn(text);
        break;
      case typeNotify.error:
        toast.error(text);
        break;
      default:
        toast(text);
    }
  };

  return (
    <NotifyContext.Provider value={{ notify, typeNotify }}>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </NotifyContext.Provider>
  );
};

export const useNotifyContext = (): ContextPropsType | null => {
  return React.useContext(NotifyContext);
};

export default NotifyProvider;
