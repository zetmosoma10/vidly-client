import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../pages/HomeLayout";

const AuthRequired = () => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return (
      <Navigate to="login" state={{ message: "You should login first" }} />
    );
  }

  return <Outlet />;
};

export default AuthRequired;
