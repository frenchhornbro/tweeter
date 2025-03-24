import { ChangeEvent } from "react";
import { AuthenticationPresenter, AuthenticationView } from "./AuthenticationPresenter";
import { Buffer } from "buffer";

export interface RegisterView extends AuthenticationView {
    displayErrorMessage: (message: string) => void;
    setImageUrl: (imageUrl: string) => void;
    setImageFileExtension: (imageFileExtension: string) => void;
}

export class RegisterPresenter extends AuthenticationPresenter<RegisterView> {
    private imageBytes: Uint8Array;

    public constructor(view: RegisterView) {
        super(view);
        this.imageBytes = new Uint8Array();
    }

    public async doRegister(firstName: string, lastName: string, alias: string, password: string, imageFileExtension: string) {
        await this.doAuthenticationOperation(() => this.serverFacade.register({
            firstName: firstName,
            lastName: lastName,
            alias: alias,
            password: password,
            userImageBytes: this.imageBytes,
            imageFileExtension: imageFileExtension
        }), () => this.view.navigate('/'), 'register user');
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