import { toast } from "sonner";

export const CheckToken = () => {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    toast.error("You must be logged in to perform this action");
    return false;
  }

  return true;
};
