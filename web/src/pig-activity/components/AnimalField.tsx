import React from "react";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import StackedInput from "../../common/components/input/StackedInput";
import StackedRadioButton from "../../common/components/input/StackedRadioButton";
import { Animal } from "../../user/graphql";

export interface AnimalFieldProps {
  className?: string;
  animals: Animal[];
}

const AnimalField: React.FC<AnimalFieldProps> = ({ animals }) => {
  return (
    <FormField
      name="animal"
      rules={{ required: "The animal field is required." }}
    >
      <FormFieldLabel>Animal</FormFieldLabel>
      <FormFieldInput>
        <StackedInput orientation="vertical">
          {animals.map(type => (
            <StackedRadioButton value={type.number} key={type.number}>
              {type.description}
            </StackedRadioButton>
          ))}
        </StackedInput>
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export default AnimalField;
