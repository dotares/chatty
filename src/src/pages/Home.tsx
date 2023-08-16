import { useState } from "react";
import SignUp from "./SignUp";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Home = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  if (!isAuth) {
    return (
      <div>
        <SignUp />
      </div>
    );
  }

  return <div>You're already signed up</div>;
};

export default Home;
