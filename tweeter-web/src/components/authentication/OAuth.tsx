import OAuthButton from "./OAuthButton";

const OAuth = () => {
    return (
        <div className="text-center mb-3">
            <OAuthButton companyName="Google" companyIcon={"google"} />
            <OAuthButton companyName="Facebook" companyIcon={"facebook"} />
            <OAuthButton companyName="Twitter" companyIcon={"twitter"} />
            <OAuthButton companyName="LinkedIn" companyIcon={"linkedin"} />
            <OAuthButton companyName="Github" companyIcon={"github"} />
    </div>
    );
};

export default OAuth;