import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const SignUp = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <p>Sign Up with Google</p>
      <button onClick={signInWithGoogle}>Sign up</button>
    </div>
  );
};

export default SignUp;
