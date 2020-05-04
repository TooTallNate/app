import React from "react";
import FormField from "../../components/form/FormField";
import FormFieldLabel from "../../components/form/FormFieldLabel";
import FormFieldInput from "../../components/form/FormFieldInput";
import FormFieldErrors from "../../components/form/FormFieldErrors";
import StackedButtonInput, {
  StackedButton
} from "../../components/input/StackedButtonInput";
import { Animal } from "../../graphql";

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
