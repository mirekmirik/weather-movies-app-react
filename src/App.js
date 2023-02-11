import Question from "./components/Question/Question";
import Header from "./Layout/Header";
import Modal from "./components/Modal/Modal";
import UserContextProvider from "./context/userContextProvider";
import RoutesComponent from "./routes/Routes";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <UserContextProvider>
      <Header/>
      <RoutesComponent />
    </UserContextProvider>
  );
}

export default App;
