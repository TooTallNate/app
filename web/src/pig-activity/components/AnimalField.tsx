import React from "react";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import StackedButtonInput, {
  StackedButton
} from "../../common/components/input/StackedButtonInput";
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
        <StackedButtonInput orientation="vertical">
          {animals.map(type => (
            <StackedButton value={type.number} key={type.number}>
              {type.description}
            </StackedButton>
          ))}
        </StackedButtonInput>
      </FormFieldInput>
      <FormFieldErrors />
    </FormField>
  );
};

export default AnimalField;
