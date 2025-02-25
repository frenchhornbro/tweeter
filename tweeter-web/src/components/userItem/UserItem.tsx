import { Link } from "react-router-dom";
import { User } from "tweeter-shared";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfo from "../userInfo/UserInfoHook";
import { UserNavigationPresenter, UserNavigationView } from "../../presenters/userNavigation/UserNavigationPresenter";
import { useState } from "react";

interface Props {
  item: User;
}

const UserItem = (props: Props) => {
  const { setDisplayedUser, currentUser, authToken } = useUserInfo();
  const { displayErrorMessage } = useToastListener();

  const listener: UserNavigationView = {
    setDisplayedUser,
    displayErrorMessage
  }

  const [presenter] = useState(() => new UserNavigationPresenter(listener));
  
  return (
    <div className="col bg-light mx-0 px-0">
      <div className="container px-0">
        <div className="row mx-0 px-0">
          <div className="col-auto p-3">
            <img
              src={props.item.imageUrl}
              className="img-fluid"
              width="80"
              alt="Posting user"
            />
          </div>
          <div className="col">
            <h2>
              <b>
                {props.item.firstName} {props.item.lastName}
              </b>{" "}
              -{" "}
              <Link
                to={props.item.alias}
                onClick={(event) => presenter.useNavigateToUser(event, currentUser, authToken)}
              >
                {props.item.alias}
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
