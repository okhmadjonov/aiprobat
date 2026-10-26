import AppRoute from "./routes/AppRoute";
import AnimatedBackground from "./components/Animated/AnimatedBackground";
import ErrorBoundary from "./components/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ErrorBoundary>
      <AnimatedBackground />
      <>
        <AppRoute />
      </>
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
    </ErrorBoundary>
  );
}

export default App;
