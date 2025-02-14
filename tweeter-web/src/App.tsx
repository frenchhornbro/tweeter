import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import UserItemScroller from "./components/mainLayout/UserItemScroller";
import StatusItemScroller from "./components/mainLayout/StatusItemScroller";
import useUserInfo from "./components/userInfo/UserInfoHook";
import { UserItemView } from "./presenters/userItem/UserItemPresenter";
import { FolloweePresenter } from "./presenters/userItem/FolloweePresenter";
import { FollowerPresenter } from "./presenters/userItem/FollowerPresenter";
import { FeedPresenter } from "./presenters/statusItem/FeedPresenter";
import { StoryPresenter } from "./presenters/statusItem/StoryPresenter";
import { StatusItemView } from "./presenters/statusItem/StatusItemPresenter";

const App = () => {
  const { currentUser, authToken } = useUserInfo();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/feed" />} />
        <Route path="feed" element={
          <StatusItemScroller presenterGenerator={(view: StatusItemView) => new FeedPresenter(view)} key={1} />
          } />
        <Route path="story" element={
          <StatusItemScroller presenterGenerator={(view: StatusItemView) => new StoryPresenter(view)} key={2} />
          } />
        <Route
          path="followees" element={
          <UserItemScroller presenterGenerator={(view: UserItemView) => new FolloweePresenter(view)} key={1} />
          } />
        <Route
          path="followers" element={
          <UserItemScroller presenterGenerator={(view: UserItemView) => new FollowerPresenter(view)} key={2} />
          } />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/feed" />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login originalUrl={location.pathname} />} />
    </Routes>
  );
};

export default App;
