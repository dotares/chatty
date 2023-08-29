import Home from "./pages/Home";
import { invoke } from "@tauri-apps/api";

function App() {
  invoke("greet", { name: "World" }).then((response) => console.log(response));
  return <Home />;
}

export default App;
