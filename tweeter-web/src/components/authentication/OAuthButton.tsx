import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import useToastListener from "../toaster/ToastListenerHook";
import { IconName } from "@fortawesome/fontawesome-svg-core";

interface Props {
    companyName: string;
    companyIcon: IconName;
};

const OAuthButton = (props: Props) => {
    const { displayInfoMessage } = useToastListener();

    const displayInfoMessageWithDarkBackground = (message: string): void => {
        displayInfoMessage(message, 3000, "text-white bg-primary");
    };

    return (
        <button
            type="button"
            className="btn btn-link btn-floating mx-1"
            onClick={() =>
                displayInfoMessageWithDarkBackground(
                `${props.companyName} registration is not implemented.`
                )
            }
            >
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={`${props.companyIcon}Tooltip`}>{props.companyName}</Tooltip>}
            >
                <FontAwesomeIcon icon={["fab", props.companyIcon]} />
            </OverlayTrigger>
        </button>
    );
};

export default OAuthButton;