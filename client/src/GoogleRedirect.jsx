import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserContext";

const GoogleRedirect = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/api/auth/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        if (res.data.user.role === "admin") navigate("/dash");
        else if (res.data.user.role === "student") navigate("/studentaccount");
        else navigate("/");
      })
      .catch((err) => {
        console.error("Error fetching user after Google login", err);
        navigate("/");
      });
  }, [navigate, setUser]);

  return <div>Logging you in...</div>;
};

export default GoogleRedirect;
