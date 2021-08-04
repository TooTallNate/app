import React from "react";
import FormField from "../../common/components/form/FormField";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import ImageUploadInput from "../../common/components/input/ImageUploadInput";

const ImageUploadField: React.FC<{}> = () => {
  return (
    <FormField name="imagesUID" className="mb-6">
      <FormFieldInput>
        <ImageUploadInput />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};
export default ImageUploadField;
