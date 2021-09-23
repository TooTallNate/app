import React from "react";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import MultilineTextInput from "../../common/components/input/MultilineTextInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";

const CommentsField: React.FC = () => {
  return (
    <FormField name="comments">
      <FormFieldLabel>Comments</FormFieldLabel>
      <FormFieldInput>
        <MultilineTextInput rows={2} maxLength={50} />
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export default CommentsField;
