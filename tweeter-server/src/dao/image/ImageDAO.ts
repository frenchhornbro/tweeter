export interface ImageDAO {
    putImage: (fileName: string, imageStringBase64Encoded: string, imageFileExtension: string) => Promise<string>;
}