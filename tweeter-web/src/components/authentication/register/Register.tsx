import "./Register.css";
import "bootstrap/dist/css/bootstrap.css";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../AuthenticationFields";
import useUserInfo from "../../userInfo/UserInfoHook";
import { RegisterPresenter, RegisterView } from "../../../presenters/authentication/RegisterPresenter";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFileExtension, setImageFileExtension] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { updateUserInfo } = useUserInfo();
  const { displayErrorMessage } = useToastListener();

  const listener: RegisterView = {
    displayErrorMessage,
    navigate,
    updateUserInfo,
    setIsLoading,
    setImageUrl,
    setImageFileExtension
  };

  //FIXME: Other stuff should probably also be hooks? check this
  //TODO: Then determine how many other properties of AuthenticationPresenter and RegisterPresenter should actually be there (look at the presenter in the video to determine this)
  const [presenter] = useState(() => new RegisterPresenter(listener));

  const registerOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key == "Enter" && !checkSubmitButtonStatus()) {
      presenter.doRegister(firstName, lastName, alias, password, imageFileExtension);
    }
  };

  const checkSubmitButtonStatus = (): boolean => {
    return (
    !firstName ||
    !lastName ||
    !alias ||
    !password ||
    !imageUrl ||
    !imageFileExtension
    );
  };

  const inputFieldGenerator = () => {
    return (
      <>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            size={50}
            id="firstNameInput"
            placeholder="First Name"
            onKeyDown={registerOnEnter}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <label htmlFor="firstNameInput">First Name</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            size={50}
            id="lastNameInput"
            placeholder="Last Name"
            onKeyDown={registerOnEnter}
            onChange={(event) => setLastName(event.target.value)}
          />
          <label htmlFor="lastNameInput">Last Name</label>
        </div>
        <AuthenticationFields onEnter={registerOnEnter} setAlias={setAlias} setPassword={setPassword} />
        <div className="form-floating mb-3">
          <input
            type="file"
            className="d-inline-block py-5 px-4 form-control bottom"
            id="imageFileInput"
            onKeyDown={registerOnEnter}
            onChange={(event: ChangeEvent<HTMLInputElement>) => presenter.handleFileChange(event)}
          />
          <label htmlFor="imageFileInput">User Image</label>
          <img src={imageUrl} className="img-thumbnail" alt=""></img>
        </div>
      </>
    );
  };

  const switchAuthenticationMethodGenerator = () => {
    return (
      <div className="mb-3">
        Already registered? <Link to="/login">Sign in</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Register"
      submitButtonLabel="Register"
      oAuthHeading="Register with:"
      inputFieldGenerator={inputFieldGenerator}
      switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
      submitButtonDisabled={() => checkSubmitButtonStatus()}
      isLoading={isLoading}
      presenter={presenter}
      submit={() => presenter.doRegister(firstName, lastName, alias, password, imageFileExtension)}
    />
  );
};

export default Register;
