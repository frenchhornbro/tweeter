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
import useUserInfo from "./components/userInfo/UserInfoHook";
import { FolloweePresenter } from "./presenters/userItem/FolloweePresenter";
import { FollowerPresenter } from "./presenters/userItem/FollowerPresenter";
import { FeedPresenter } from "./presenters/statusItem/FeedPresenter";
import { StoryPresenter } from "./presenters/statusItem/StoryPresenter";
import { StatusItemPresenter } from "./presenters/statusItem/StatusItemPresenter";
import ItemScroller from "./components/mainLayout/ItemScroller";
import { Status, User } from "tweeter-shared";
import StatusItem from "./components/statusItem/StatusItem";
import { PagedItemView } from "./presenters/PagedItemPresenter";
import { UserItemPresenter } from "./presenters/userItem/UserItemPresenter";
import UserItem from "./components/userItem/UserItem";

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
          <ItemScroller<Status, StatusItemPresenter>
            presenterGenerator={(view: PagedItemView<Status>) => new FeedPresenter(view)}
            itemGenerator={(item) => <StatusItem item={item} />}
            key={1} />
          } />
        <Route path="story" element={
          <ItemScroller<Status, StatusItemPresenter>
            presenterGenerator={(view: PagedItemView<Status>) => new StoryPresenter(view)}
            itemGenerator={(item) => <StatusItem item={item} />}
            key={2} />
          } />
        <Route
          path="followees" element={
          <ItemScroller<User, UserItemPresenter>
            presenterGenerator={(view: PagedItemView<User>) => new FolloweePresenter(view)}
            itemGenerator={(item) => <UserItem item={item} />}
            key={3} />
          } />
        <Route
          path="followers" element={
          <ItemScroller<User, UserItemPresenter>
            presenterGenerator={(view: PagedItemView<User>) => new FollowerPresenter(view)}
            itemGenerator={(item) => <UserItem item={item} />}
            key={4} />
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
