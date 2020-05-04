import React from "react";
import FormField from "../../components/form/FormField";
import FormFieldLabel from "../../components/form/FormFieldLabel";
import FormFieldInput from "../../components/form/FormFieldInput";
import MultilineTextInput from "../../components/input/MultilineTextInput";
import FormFieldErrors from "../../components/form/FormFieldErrors";

const CommentsField: React.FC = () => {
  return (
    <FormField name="comments">
      <FormFieldLabel>Comments</FormFieldLabel>
      <FormFieldInput>
        <MultilineTextInput maxLength={50} />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export default CommentsField;
