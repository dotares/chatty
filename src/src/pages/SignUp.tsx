import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import Authentication from "../components/Authentication";
import Footer from "../components/Footer";
import { auth, provider } from "../firebase-config";

const cookies = new Cookies();

interface Props {
  setIsAuth: Function;
}

const SignUp = (props: Props) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      cookies.set("auth-token", result.user.refreshToken, { expires });
      props.setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="text-center">
      <div className="flex flex-col text-center h-screen">
        <div className="m-auto">
          <div className="py-16 space-y-16">
            <h1 className="font-pacifico text-8xl text-[#FAF0E6] drop-shadow-lg">
              Chatty
            </h1>
            <p className="font-robotomono text-2xl text-[#B9B4C7] drop-shadow-lg">
              A bloat-free chat application
            </p>
          </div>
          <Authentication signInWithGoogle={signInWithGoogle} />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default SignUp;
