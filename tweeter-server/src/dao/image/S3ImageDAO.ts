import { ObjectCannedACL, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { ImageDAO } from "./ImageDAO";
import { BUCKET, REGION } from "../../config";

export class S3ImageDAO implements ImageDAO {
    public async putImage(fileName: string, imageStringBase64Encoded: string): Promise<string> {
        const decodedImageBuffer: Buffer = Buffer.from(imageStringBase64Encoded, "base64");
        const params = {
            Bucket: BUCKET,
            Key: `image/${fileName}`,
            Body: decodedImageBuffer,
            ContentType: "image/png",
            ACL: ObjectCannedACL.public_read
        };
        const client = new S3Client({region: REGION});
        try {
            await client.send(new PutObjectCommand(params));
            return `https://${BUCKET}.s3.${REGION}.amazonaws.com/image/${fileName}`;
        }
        catch {
            throw Error("S3 ");
        }
    }
}