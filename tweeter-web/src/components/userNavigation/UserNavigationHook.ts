import { AuthToken, User, FakeData } from "tweeter-shared";

const useNavigateToUser = async (
    event: React.MouseEvent, currentUser: User | null, authToken: AuthToken | null,
    setDisplayedUser: (user: User) => void, displayErrorMessage: (message: string, bootstrapClasses?: string) => void
): Promise<void> => {
    event.preventDefault();
    try {
        const alias = extractAlias(event.target.toString());
        const user = await getUser(authToken!, alias);
        if (!!user) {
            if (currentUser!.equals(user)) {
            setDisplayedUser(currentUser!);
            } else {
            setDisplayedUser(user);
            }
        }
    } catch (error) {
        displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
};
  
const extractAlias = (value: string): string => {
    const index = value.indexOf("@");
    return value.substring(index);
};

const getUser = async (
    authToken: AuthToken,
    alias: string
): Promise<User | null> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.findUserByAlias(alias);
};

export default useNavigateToUser;