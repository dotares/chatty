import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import Footer from "../components/Footer";

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
    <div className="text-center">
      <div className="flex flex-col text-center h-screen">
        <div className="m-auto">
          <div>
            <h1 className="py-12 font-pacifico text-8xl text-[#FAF0E6] drop-shadow-xl">
              Chatty
            </h1>
          </div>
          <div>
            <button
              className="group transition hover:scale-110 rounded-xl w-full p-2 text-4xl bg-[#5C5470] hover:bg-[#B9B4C7] drop-shadow-xl hover:drop-shadow-none"
              onClick={signInWithGoogle}
            >
              <svg
                className="transition group-hover:scale-110 fill-[#B9B4C7] group-hover:fill-[#5C5470]"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 488 512"
              >
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default SignUp;
