import React from "react";
import { FormGroup, Output } from "../components/styled";
import Title from "../components/view/ViewTitle";
import View from "../components/view/View";
import ViewHeader from "../components/view/ViewHeader";
import NumberInput from "../components/input/NumberInput";
import MultilineTextInput from "../components/input/MultilineTextInput";
import { Animal } from "../entities";
import { RouteComponentProps } from "react-router";
import {
  usePigWeanQuery,
  useSavePigWeanMutation,
  usePostPigWeanMutation
} from "../graphql";
import StackedButtonInput, {
  StackedButton
} from "../components/input/StackedButtonInput";
import { useFlash } from "../contexts/flash";
import Form from "../components/form/Form";
import FormField from "../components/form/FormField";
import FormFieldLabel from "../components/form/FormFieldLabel";
import FormFieldErrors from "../components/form/FormFieldErrors";
import FormFieldInput from "../components/form/FormFieldInput";
import FormSubmit from "../components/form/FormSubmit";
import { OnSubmit, useForm } from "react-hook-form";
import Button from "../components/input/Button";
import BackButton from "../components/view/BackButton";
import ViewContent from "../components/view/ViewContent";

interface FormData {
  animal: string;
  quantity: number;
  smallPigQuantity?: number;
  weight: number;
  price: number;
  comments?: string;
}

const ActivityWeanView: React.FC<RouteComponentProps<{ job: string }>> = ({
  history,
  match
}) => {
  const formContext = useForm<FormData>();
  const { loading, data } = usePigWeanQuery({
    variables: {
      job: match.params.job
    },
    onCompleted({ pigWean, pigActivityDefaults }) {
      const { setValue } = formContext;
      if (pigWean.animal) setValue("animal", pigWean.animal);
      if (pigWean.quantity) setValue("quantity", pigWean.quantity);
      if (pigWean.weight) setValue("weight", pigWean.weight);
      if (pigWean.price) setValue("price", pigWean.price);
      else if (pigActivityDefaults.price)
        setValue("price", pigActivityDefaults.price);
      if (pigWean.comments) setValue("comments", pigWean.comments);
    }
  });
  const [post] = usePostPigWeanMutation();
  const [save] = useSavePigWeanMutation();
  const { setMessage } = useFlash();
  const { getValues, watch, triggerValidation, formState } = formContext;

  const onSubmit: OnSubmit<FormData> = async data => {
    try {
      await post({
        variables: {
          input: {
            ...data,
            job: match.params.job
          }
        }
      });
      setMessage({
        message: "Entry recorded successfully.",
        level: "success",
        timeout: 2000
      });
      history.push("/");
    } catch (e) {
      setMessage({
        message: e.toString(),
        level: "error"
      });
    }
  };

  const onSave = async () => {
    try {
      await save({
        variables: {
          input: {
            ...getValues(),
            job: match.params.job
          }
        }
      });
      setMessage({
        message: "Entry saved successfully.",
        level: "success",
        timeout: 2000
      });
      history.push("/");
    } catch (e) {
      setMessage({
        message: e.toString(),
        level: "error"
      });
    }
  };

  const { quantity = 0, smallPigQuantity = 0 } = watch([
    "quantity",
    "smallPigQuantity"
  ]);
  const smallPigRatio =
    100 * Math.min(1, quantity ? smallPigQuantity / quantity : 0);
  const smallPigPercent = `${smallPigRatio.toFixed(2)}%`;

  // Validate small pig quantity if total quantity changes.
  useEffect(() => {
    if (formState.isSubmitted) {
      triggerValidation("smallPigQuantity");
    }
  }, [triggerValidation, quantity, formState.isSubmitted]);

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Wean</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data && (
          <Form context={formContext} onSubmit={onSubmit}>
            <FormField name="job">
              <FormFieldLabel>Job</FormFieldLabel>
              <FormFieldInput>
                <Output>
                  {data.pigWean.job.number} {data.pigWean.job.description}
                </Output>
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormField
              name="animal"
              rules={{ required: "The animal field is required." }}
            >
              <FormFieldLabel>Animal</FormFieldLabel>
              <FormFieldInput>
                <StackedButtonInput orientation="vertical">
                  <StackedButton value={Animal.MARKET_PIGS}>
                    Market Pigs
                  </StackedButton>
                  <StackedButton value={Animal.GDU_PIGS}>
                    GDU Pigs
                  </StackedButton>
                </StackedButtonInput>
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormField
              name="quantity"
              rules={{
                required: "The quantity field is required."
              }}
            >
              <FormFieldLabel>Quantity</FormFieldLabel>
              <FormFieldInput>
                <NumberInput />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormField
              name="smallPigQuantity"
              rules={{
                validate: (value: number = 0) =>
                  value <= (getValues().quantity || 0) ||
                  "The small pig quantity field must not be more than the total quantity."
              }}
            >
              <FormFieldLabel>Small Pig Quantity</FormFieldLabel>
              <div className="flex items-center">
                <FormFieldInput className="flex-grow">
                  <NumberInput />
                </FormFieldInput>
                <div className="ml-4">{smallPigPercent}</div>
              </div>
              <FormFieldErrors />
            </FormField>
            <FormField
              name="weight"
              rules={{
                required: "The total weight field is required."
              }}
            >
              <FormFieldLabel>Total Weight</FormFieldLabel>
              <FormFieldInput>
                <NumberInput />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormField
              name="price"
              rules={{
                required: "The price field is required."
              }}
            >
              <FormFieldLabel>Price/pig</FormFieldLabel>
              <FormFieldInput>
                <NumberInput />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormField name="comments">
              <FormFieldLabel>Comments</FormFieldLabel>
              <FormFieldInput>
                <MultilineTextInput maxLength={50} />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormGroup>
              <Button className="mr-4 w-full" type="button" onClick={onSave}>
                Save
              </Button>
              <FormSubmit />
            </FormGroup>
          </Form>
        )}
      </ViewContent>
    </View>
  );
};

export default ActivityWeanView;
