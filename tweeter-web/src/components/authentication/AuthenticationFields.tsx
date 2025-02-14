// Component for alias and password

import { AuthenticationPresenter } from "../../presenters/authentication/AuthenticationPresenter";

interface Props {
    onEnter: (event: React.KeyboardEvent<HTMLElement>) => void;
    presenter: AuthenticationPresenter;
}

const AuthenticationFields = (props: Props) => {
    return (
        <>
            <div className="form-floating">
                <input
                type="text"
                className="form-control"
                size={50}
                id="aliasInput"
                placeholder="name@example.com"
                onKeyDown={props.onEnter}
                onChange={(event) => props.presenter.alias = event.target.value}
                />
                <label htmlFor="aliasInput">Alias</label>
            </div>
            <div className="form-floating">
                <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                onKeyDown={props.onEnter}
                onChange={(event) => props.presenter.password = event.target.value}
                />
                <label htmlFor="passwordInput">Password</label>
            </div>
        </>
    );
}

export default AuthenticationFields;