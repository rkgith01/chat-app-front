import { useContext } from "react";
import SignupSignIn from "./SignupSignIn";
import { UserContext } from "./UserContext";
import Chat from "./Chat";
import {
  BrowserRouter as Router,
  Route,
  Routes as ReactRoutes,
  Navigate,
} from "react-router-dom";
import LandingPage from "./LandingPage";

const Routes = () => {
  const { username } = useContext(UserContext);

  return (
    <Router>
      <ReactRoutes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signin"
          element={username ? <Navigate to="/chat" /> : <SignupSignIn />}
        />
        <Route
          path="/signup"
          element={username ? <Navigate to="/chat" /> : <SignupSignIn />}
        />
        <Route
          path="/chat"
          element={username ? <Chat /> : <Navigate to="/signin" />}
        />
        {/* Add more routes as needed */}
      </ReactRoutes>
    </Router>
  );
};

export default Routes;
