import { ChangeEvent } from "react";
import { UserService } from "../../model/service/UserService";
import { AuthenticationPresenter, AuthenticationView } from "./AuthenticationPresenter";
import { Buffer } from "buffer";

export class RegisterPresenter extends AuthenticationPresenter {
    private imageBytes: Uint8Array;
    private userService: UserService;
    private _firstName: string;
    private _lastName: string;
    private _imageUrl: string;
    private _imageFileExtension: string;

    public set firstName(value: string) {
        this._firstName = value;
    }

    public set lastName(value: string) {
        this._firstName = value;
    }

    public get imageUrl(): string {
        return this._imageUrl;
    }

    public get imageFileExtension(): string {
        return this._imageFileExtension;
    }

    public constructor(view: AuthenticationView) {
        super(view);
        this.imageBytes = new Uint8Array();
        this.userService = new UserService();
        this._firstName = "";
        this._lastName = "";
        this._imageUrl = "";
        this._imageFileExtension = "";
    }

    public checkSubmitButtonStatus(): boolean {
        return (
        !this._firstName ||
        !this._lastName ||
        !this.alias ||
        !this.password ||
        !this._imageUrl ||
        !this._imageFileExtension
        );
    }

    public async doRegister() {
        try {
            this.isLoading = true;
        
            const [user, authToken] = await this.userService.register(
                this._firstName,
                this._lastName,
                this.alias,
                this.password,
                this.imageBytes,
                this._imageFileExtension
            );
        
            this.view.updateUserInfo(user, user, authToken, this.rememberMe);
            this.view.navigate("/");
        } catch (error) {
            this.view.displayErrorMessage(`Failed to register user because of exception: ${error}`);
        } finally {
            this.isLoading = false;
        }
    }

    public handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        this.handleImageFile(file);
    }

    private handleImageFile(file: File | undefined) {
        if (file) {
            this._imageUrl = URL.createObjectURL(file);

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
                this._imageFileExtension = fileExtension;
            }
        } else {
            this._imageUrl = "";
            this.imageBytes = new Uint8Array();
        }
    }

    private getFileExtension(file: File): string | undefined {
        return file.name.split(".").pop();
    }
}