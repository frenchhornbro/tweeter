import { Link } from "react-router-dom";
import { Status } from "tweeter-shared";
import useNavigateToUser from "../userNavigation/UserNavigationHook";
import Post from "./Post";
import useUserInfo from "../userInfo/UserInfoHook";
import useToastListener from "../toaster/ToastListenerHook";

interface Props {
    item: Status;
}

const StatusItem = (props: Props) => {  
  const { setDisplayedUser, currentUser, authToken } = useUserInfo();
  const { displayErrorMessage } = useToastListener();

  return (
    <div className="col bg-light mx-0 px-0">
        <div className="container px-0">
            <div className="row mx-0 px-0">
                <div className="col-auto p-3">
                    <img
                        src={props.item.user.imageUrl}
                        className="img-fluid"
                        width="80"
                        alt="Posting user"
                    />
                    </div>
                    <div className="col">
                    <h2>
                        <b>
                        {props.item.user.firstName} {props.item.user.lastName}
                        </b>{" "}
                        -{" "}
                        <Link
                        to={props.item.user.alias}
                        onClick={(event) => useNavigateToUser(event, currentUser, authToken, setDisplayedUser, displayErrorMessage)}
                        >
                        {props.item.user.alias}
                        </Link>
                    </h2>
                    {props.item.formattedDate}
                    <br />
                    <Post status={props.item} />
                </div>
            </div>
        </div>
    </div>
  );
}

 export default StatusItem;