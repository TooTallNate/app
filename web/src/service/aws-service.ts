import S3 from "react-aws-s3";
import { AwsImageType } from "./aws-types";

const AWS_CONFIG = {
  bucketName: process.env.AWS_BUCKET_NAME,
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION
};

const ReactS3Client = new S3(AWS_CONFIG);

interface UploadFileProps {
  file: File | null;
  filename: string | null;
  uploadedImages: AwsImageType[];
}

interface DeleteFileProps {
  url: string | null;
}

const uploadFile = async ({
  file,
  filename,
  uploadedImages
}: UploadFileProps) => {
  return ReactS3Client.uploadFile(file, filename)
    .then((data: any) => {
      const appendList: AwsImageType[] = uploadedImages[0]
        ? uploadedImages
        : [];
      if (appendList) {
        const { status, location, key } = data;
        if (status >= 200 && status < 300 && location) {
          const newImageCount: number = appendList.push(data);
          return { appendList, newImageCount, status };
        } else {
          throw new Error("Aws Upload Error.");
        }
      }
    })
    .catch(() => {
      throw new Error("Error uploading image.");
    });
};

const deleteFile = async ({ url }: DeleteFileProps) => {
  return ReactS3Client.uploadFile()
    .then(() => {})
    .catch(() => {
      throw new Error("Error deleting image.");
    });
};

export default { uploadFile, deleteFile };
