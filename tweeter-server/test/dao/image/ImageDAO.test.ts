import { S3ImageDAO } from "../../../src/dao/image/S3ImageDAO";

describe("S3ImageDAO", () => {
    it("works", async() => {
        await uploadToS3();
    });
});

async function uploadToS3() {
    const s3ImageDAO = new S3ImageDAO();
    const userImageBytes: Uint8Array = new Uint8Array([1, 2, 3]);
    const imageStringBase64: string = Buffer.from(userImageBytes).toString("base64");
    await s3ImageDAO.putImage(`ImageDAOTest${new Date().toString()}`, imageStringBase64, "testExt");
}