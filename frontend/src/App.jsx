import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Body from "./Body";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./pages/Feed";
import { Toaster } from 'react-hot-toast';
import ConnectionPage from "./pages/ConnectionPage";
import RequestPage from "./pages/RequestPage";

function App() {
  return(
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>

          <Route path="/" element={<Body />}>

            <Route path="/feed" element={<Feed />} />
            <Route path="/login" element={<LoginPage />} />
             <Route path="/login/profile/view" element={<LoginPage />} />
            <Route path="/profile/view" element={<ProfilePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/connections" element={<ConnectionPage />}/>
            <Route path="/requests" element={<RequestPage />} />

          </Route>

        </Routes>
        <Toaster position="top-center"/>
      </BrowserRouter>
    </Provider>
    </>
  );
}

export default App
