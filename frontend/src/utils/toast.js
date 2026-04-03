import { toast } from "react-hot-toast";

/*
Reusable toast messages
Used for success / error notifications
*/

export const showSuccess = (msg) => {
  toast.success(msg);
};

export const showError = (msg) => {
  toast.error(msg);
};