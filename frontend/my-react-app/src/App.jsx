import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./home";
import LogIn from "./user/login";
import SignUp from "./user/signup";
import Publiaction from "./publication/publication";
import { CheckAuth } from "./user/logeInCheck";
import Comment from "./publication/comments";
import Profile from "./user/profile";
import NotFound from "./notFound";
import UserProvider from "./context/contextApi";

export default function Login() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route element={<CheckAuth />}> */}
            <Route path="/publication" element={<Publiaction />} />
            <Route path="/publication/:id" element={<Comment />} />
            <Route path="/profile/:id/:action?" element={<Profile />}></Route>
          {/* </Route> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
