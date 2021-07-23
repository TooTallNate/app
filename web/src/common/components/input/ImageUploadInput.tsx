import { PencilIcon, TrashIcon, UploadIcon } from "@heroicons/react/solid";
import React, { ChangeEvent, ComponentProps, useState } from "react";
import { useFlash } from "../../contexts/flash";
import { useCombinedRefs } from "../../useSharedRef";
import { useField } from "../form/FormField";
import Button from "./Button";
import S3 from "react-aws-s3";

const IMAGE_LIMIT = 5;

type AwsImageType = {
  bucket: string;
  key: string;
  location: string;
  status: number;
};

interface ImageUploadInputProps
  extends Omit<ComponentProps<"input">, "value" | "onChange"> {
  value?: AwsImageType[];
  location?: string;
  onChange(value: AwsImageType[]): void;
}

const ImageUploadInput = React.forwardRef<
  HTMLInputElement,
  ImageUploadInputProps
>(function ImageUploadInput(
  { className, onChange, maxLength, value, ...props },
  ref
) {
  const { setMessage } = useFlash();
  const fieldConfig = useField();
  const pickerRef = React.useRef(null);
  const formRef = useCombinedRefs(ref, pickerRef);

  const AWS_CONFIG = {
    bucketName: process.env.AWS_BUCKET_NAME,
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION
  };
  const ReactS3Client = new S3(AWS_CONFIG);

  const [uploading, setUploading] = useState(false);
  const [imageCount, setImageCount] = useState(0);

  const [uploadedImages, setUploadedImages] = useState(
    new Array<AwsImageType>()
  );

  const labelId =
    props["aria-labelledby"] || (fieldConfig && fieldConfig.labelId);
  const name = props.name || (fieldConfig && fieldConfig.name);

  function handleImageSelect(e: ChangeEvent<HTMLInputElement>) {
    try {
      let awsError = "";
      const FILE = e.target.files && e.target.files[0];
      const FILENAME = e.target.files && e.target.files[0].name;
      ReactS3Client.uploadFile(FILE, FILENAME)
        .then((data: any) => {
          const appendList = uploadedImages[0] ? uploadedImages : [];
          if (appendList) {
            const { status, location, key } = data;
            if (status >= 200 && status < 300 && location) {
              const newImageCount = appendList.push(data);
              setImageCount(newImageCount);
              setUploadedImages(appendList);
              onChange(appendList);
            } else {
              awsError = data;
              throw new Error("Aws Upload Error.");
            }
          }
        })
        .catch(() => {
          setMessage({
            message: "Error uploading image.",
            level: "error",
            timeout: 4000
          });
        });
    } catch (e) {
      setMessage({
        message: "Unable to select image file.",
        level: "error",
        timeout: 4000
      });
    } finally {
      setUploading(false);
    }
  }

  async function handleClick() {
    try {
      setUploading(true);
      return formRef.current && formRef.current.click();
    } catch (e) {
      setMessage({
        message: "Unable to image picker.",
        level: "error",
        timeout: 4000
      });
      setUploading(false);
    }
  }

  const ImageList: React.FC = () => (
    <ul className="my-5 divide-y divide-gray-200">
      {uploadedImages.map((image, i) => (
        <li
          className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
          key={`image-upload-${i}`}
        >
          <div className="w-0 flex-1 flex items-center">
            <div className="md:flex-shrink-0 w-10 overflow-hidden">
              <img
                className="h-full w-full"
                src={image.location}
                alt={image.key}
              />
            </div>
            <span className="ml-2 flex-1 w-0 truncate">{image.key}</span>
          </div>
          <div className="ml-4 flex-shrink-0 flex space-x-4">
            <button
              type="button"
              className="bg-white rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => console.log(`Edit ${image.key}`)}
            >
              <PencilIcon className="flex-shrink-0 h-5 w-5 text-gray-800" />
            </button>
            <button
              type="button"
              className="bg-white rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => console.log(`Delete ${image.key}`)}
            >
              <TrashIcon className="flex-shrink-0 h-5 w-5 text-red-500" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="bg-white border border-gray-500 px-4 rounded-lg">
      {imageCount > 0 && <ImageList />}
      <div className="flex flex-col items-center py-5 space-y-5">
        {imageCount === 0 && (
          <>
            <UploadIcon className="h-8 w-8 mt-3 text-gray-900" />
            <span className="text-center">
              Optionally, upload images from your device.
            </span>
          </>
        )}
        <Button onClick={handleClick} disabled={uploading} loading={uploading}>
          {uploading
            ? "Please wait ... "
            : `Upload an image ${imageCount > 0 ? ` (${imageCount})` : ""}`}
        </Button>
        <input
          {...props}
          className="w-full"
          ref={formRef}
          aria-labelledby={labelId}
          name={name}
          type="file"
          accept="image/*,.pdf"
          onChange={handleImageSelect}
          /* Make the file input element invisible */
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
});

export default ImageUploadInput;
