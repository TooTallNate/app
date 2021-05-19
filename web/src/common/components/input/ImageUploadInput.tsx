import React, { ChangeEvent, ComponentProps } from "react";
import { useCombinedRefs } from "../../useSharedRef";
import { useField } from "../form/FormField";
import Button from "./Button";
import S3 from "react-aws-s3";

interface ImageUploadInputProps
  extends Omit<ComponentProps<"input">, "value" | "onChange"> {
  value?: any;
  location?: string;
  onChange?(value: any | null): void;
}

const ImageUploadInput = React.forwardRef<
  HTMLInputElement,
  ImageUploadInputProps
>(function ImageUploadInput(
  { className, onChange, maxLength, value, ...props },
  ref
) {
  const fieldConfig = useField();

  const AWS_CONFIG = {
    bucketName: process.env.AWS_BUCKET_NAME,
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION
  };

  const ReactS3Client = new S3(AWS_CONFIG);

  const [uploading, setUploading] = React.useState(false);
  const [image, setImage] = React.useState({});

  const labelId =
    props["aria-labelledby"] || (fieldConfig && fieldConfig.labelId);
  const name = props.name || (fieldConfig && fieldConfig.name);

  const pickerRef = React.useRef(null);
  const formRef = useCombinedRefs(ref, pickerRef);

  async function handleClick() {
    try {
      setUploading(true);
      return formRef.current && formRef.current.click();
    } catch (e) {
      console.log(e);
    } finally {
      setUploading(false);
    }
  }

  function handleImageSelect(e: ChangeEvent<HTMLInputElement>) {
    try {
      const FILE = e.target.files && e.target.files[0];
      const FILENAME = e.target.files && e.target.files[0].name;
      let awsError = "";
      ReactS3Client.uploadFile(FILE, FILENAME)
        .then((data: any) => {
          console.log("DATA::: ", data);
          const { status, location, key } = data;
          if (status === 204 && location) {
            if (onChange && location && key) {
              onChange(data);
            } else {
              throw new Error("Image upload failed. No location set.");
            }
          } else {
            awsError = data;
            throw new Error("Aws Upload Error.");
          }
        })
        .catch((e: any) => {
          console.log("AWS ERROR:: ", awsError || e);
          alert(`THERE WAS AN ERROR`);
        });
    } catch (e) {
      console.log(e);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-white border border-gray-500 sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {value ? value.key : "Upload image"}
              {value && <img src={value.location} />}
            </h3>
            {!value && (
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Optionally attach an image illustrating your request.</p>
              </div>
            )}
          </div>
          <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
            {value && (
              <Button
                className="border border-red-800 text-red-700 bg-white"
                onClick={() => alert("Remove Image")}
              >
                Delete
              </Button>
            )}
            {!value && (
              <Button
                disabled={uploading}
                onClick={handleClick}
                loading={uploading}
              >
                {uploading ? "Please wait ... " : "Upload an image"}
              </Button>
            )}
          </div>
        </div>
      </div>
      <input
        {...props}
        className="w-full"
        ref={formRef}
        aria-labelledby={labelId}
        name={name}
        type="file"
        accept="image/*,.pdf"
        onChange={handleImageSelect}
        // value={value || ""}
        style={{ display: "none" }} /* Make the file input element invisible */
      />
    </div>
  );
});

export default ImageUploadInput;

// <div>
//   <span className="relative z-0 inline-flex shadow-sm rounded-md">
//     <Button
//       className={`bg-white text-gray-900 ${value && "rounded-r-none"}`}
//       onClick={handleClick}
//     >
//       {value ? "View" : "Choose"} picture
//     </Button>
//     {value && (
//       <Button
//         className="bg-white text-gray-900 rounded-l-none"
//         onClick={() => alert("DELETE")}
//       >
//         Delete
//       </Button>
//     )}
//   </span>

// </div>
