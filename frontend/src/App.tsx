import "./App.css";
import { ModeToggle } from "./components/mode-toggle";
import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <Navbar />
      <ModeToggle />

      <Button variant={"outline"}>Test</Button>
    </>
  );
}

export default App;
