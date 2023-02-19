import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../api/useUser";

const useProtectedPage = () => {
  const { isLoadingUser, isLoggedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoadingUser) {
      if (!isLoggedIn) {
        navigate("/");
      }
    }
  }, [isLoadingUser, isLoggedIn, navigate]);

  return;
};

export default useProtectedPage;
