import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

const SignUp = () => {
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };
  return (
    <div>
      <p>Sign Up with Google</p>
      <button onClick={signInWithGoogle}>Sign up</button>
    </div>
  );
};

export default SignUp;
