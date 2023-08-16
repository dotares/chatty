import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const SignUp = (props) => {
  const { setIsAuth } = props;
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <p>Sign Up with Google</p>
      <button
        className="border-black border-2 rounded"
        onClick={signInWithGoogle}
      >
        Sign up
      </button>
    </div>
  );
};

export default SignUp;
