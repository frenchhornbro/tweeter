import { Link } from "react-router-dom";
import { Status, Type } from "tweeter-shared";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfo from "../userInfo/UserInfoHook";
import { useState } from "react";
import { UserNavigationView, UserNavigationPresenter } from "../../presenters/userNavigation/UserNavigationPresenter";

interface Props {
  status: Status;
}

const Post = (props: Props) => {
  const { setDisplayedUser, currentUser, authToken } = useUserInfo();
  const { displayErrorMessage } = useToastListener();

  const listener: UserNavigationView = {
    setDisplayedUser,
    displayErrorMessage
  }

  const [presenter] = useState(() => new UserNavigationPresenter(listener));

  return (
    <>
      {props.status.segments.map((segment, index) =>
        segment.type === Type.alias ? (
          <Link
            key={index}
            to={segment.text}
            onClick={(event) => presenter.useNavigateToUser(event, currentUser, authToken)}
          >
            {segment.text}
          </Link>
        ) : segment.type === Type.url ? (
          <a
            key={index}
            href={segment.text}
            target="_blank"
            rel="noopener noreferrer"
          >
            {segment.text}
          </a>
        ) : segment.type === Type.newline ? (
          <br key={index} />
        ) : (
          segment.text
        )
      )}
    </>
  );
};

export default Post;
