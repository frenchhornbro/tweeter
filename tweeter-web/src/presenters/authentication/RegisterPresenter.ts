import { ChangeEvent } from "react";
import { AuthenticationPresenter } from "./AuthenticationPresenter";
import { Buffer } from "buffer";
import { NavigateFunction } from "react-router-dom";
import { User, AuthToken } from "tweeter-shared";

export interface RegisterView {
    displayErrorMessage: (message: string) => void;
    navigate: NavigateFunction;
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
    setImageUrl: (imageUrl: string) => void;
    setImageFileExtension: (imageFileExtension: string) => void;
}

export class RegisterPresenter extends AuthenticationPresenter {
    private view: RegisterView;
    private imageBytes: Uint8Array;

    public constructor(view: RegisterView) {
        super();
        this.view = view;
        this.imageBytes = new Uint8Array();
    }

    public async doRegister(firstName: string, lastName: string, alias: string, password: string, imageFileExtension: string) {
        try {
            this.view.setIsLoading(true);
        
            const [user, authToken] = await this.userService.register(
                firstName,
                lastName,
                alias,
                password,
                this.imageBytes,
                imageFileExtension
            );
        
            this.view.updateUserInfo(user, user, authToken, this.rememberMe);
            this.view.navigate("/");
        } catch (error) {
            this.view.displayErrorMessage(`Failed to register user because of exception: ${error}`);
        } finally {
            this.view.setIsLoading(false);
        }
    }

    // Arrow syntax preserves `this`
    handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        this.handleImageFile(file);
    };

    private handleImageFile(file: File | undefined) {
        if (file) {
            this.view.setImageUrl(URL.createObjectURL(file));

            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                const imageStringBase64 = event.target?.result as string;

                // Remove unnecessary file metadata from the start of the string.
                const imageStringBase64BufferContents = imageStringBase64.split("base64,")[1];

                const bytes: Uint8Array = Buffer.from(
                    imageStringBase64BufferContents,
                    "base64"
                );

                this.imageBytes = bytes;
            };
            reader.readAsDataURL(file);

            // Set image file extension (and move to a separate method)
            const fileExtension = this.getFileExtension(file);
            if (fileExtension) {
                this.view.setImageFileExtension(fileExtension);
            }
        } else {
            this.view.setImageUrl("");
            this.imageBytes = new Uint8Array();
        }
    }

    private getFileExtension(file: File): string | undefined {
        return file.name.split(".").pop();
    }
}