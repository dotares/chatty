import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface Props {
  setIsAuth: Function;
}

const SignUp = (props: Props) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      props.setIsAuth(true);
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
