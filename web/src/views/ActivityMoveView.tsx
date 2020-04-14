import React, { useEffect } from "react";
import { FormGroup } from "../components/styled";
import Title from "../components/view/ViewTitle";
import View from "../components/view/View";
import ViewHeader from "../components/view/ViewHeader";
import NumberInput from "../components/input/NumberInput";
import MultilineTextInput from "../components/input/MultilineTextInput";
import { Animal } from "../entities";
import { RouteComponentProps } from "react-router";
import {
  usePigMoveQuery,
  useSavePigMoveMutation,
  usePostPigMoveMutation
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
import TypeaheadInput from "../components/input/TypeaheadInput";
import BackButton from "../components/view/BackButton";
import ViewContent from "../components/view/ViewContent";
import StaticValue from "../components/input/StaticValue";

interface FormData {
  fromAnimal: Animal;
  toAnimal: Animal;
  toJob: string;
  quantity: number;
  smallPigQuantity?: number;
  weight: number;
  price: number;
  comments?: string;
}

const ActivityMoveView: React.FC<RouteComponentProps<{ job: string }>> = ({
  history,
  match
}) => {
  const formContext = useForm<FormData>();
  const { loading, data } = usePigMoveQuery({
    variables: {
      job: match.params.job
    },
    onCompleted({ pigMove, pigActivityDefaults }) {
      const { setValue } = formContext;
      if (pigMove.fromAnimal) setValue("fromAnimal", pigMove.fromAnimal as any);
      if (pigMove.toAnimal) setValue("toAnimal", pigMove.toAnimal as any);
      if (pigMove.toJob) setValue("toJob", pigMove.toJob.number);
      if (pigMove.quantity) setValue("quantity", pigMove.quantity);
      if (pigMove.weight) setValue("weight", pigMove.weight);
      if (pigMove.price) setValue("price", pigMove.price);
      else if (pigActivityDefaults.price)
        setValue("price", pigActivityDefaults.price);
      if (pigMove.comments) setValue("comments", pigMove.comments);
    }
  });
  const [post] = usePostPigMoveMutation();
  const [save] = useSavePigMoveMutation();
  const { setMessage } = useFlash();
  const { getValues, watch, triggerValidation, formState } = formContext;

  const onSubmit: OnSubmit<FormData> = async data => {
    try {
      await post({
        variables: {
          input: {
            ...data,
            fromJob: match.params.job
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
            fromJob: match.params.job
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
        <Title>Move</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data && (
          <Form context={formContext} onSubmit={onSubmit}>
            <div className="flex">
              <FormField name="fromJob" className="w-full mr-4">
                <FormFieldLabel>From Job</FormFieldLabel>
                <FormFieldInput noRegister>
                  <StaticValue
                    value={`${data.pigMove.fromJob.number} ${data.pigMove.fromJob.description}`}
                  />
                </FormFieldInput>
                <FormFieldErrors />
              </FormField>
              <FormField
                className="w-full ml-4"
                name="toJob"
                rules={{ required: "The to job field is required." }}
              >
                <FormFieldLabel>To Job</FormFieldLabel>
                <FormFieldInput>
                  <TypeaheadInput
                    sort="desc"
                    items={data.pigActivityJobs.map(job => ({
                      value: job.number,
                      title: `${job.number} ${job.description}`
                    }))}
                  />
                </FormFieldInput>
                <FormFieldErrors />
              </FormField>
            </div>
            <div className="flex">
              <FormField
                className="w-full mr-4"
                name="fromAnimal"
                rules={{ required: "The from animal field is required." }}
              >
                <FormFieldLabel>From Animal</FormFieldLabel>
                <FormFieldInput>
                  <StackedButtonInput orientation="vertical">
                    <StackedButton value={Animal.MARKET_PIGS}>
                      Market Pigs
                    </StackedButton>
                    <StackedButton value={Animal.GDU_PIGS}>
                      GDU Pigs
                    </StackedButton>
                    <StackedButton value={Animal.SOWS}>Sows</StackedButton>
                  </StackedButtonInput>
                </FormFieldInput>
                <FormFieldErrors />
              </FormField>
              <FormField
                className="w-full ml-4"
                name="toAnimal"
                rules={{ required: "The to animal field is required." }}
              >
                <FormFieldLabel>To Animal</FormFieldLabel>
                <FormFieldInput>
                  <StackedButtonInput orientation="vertical">
                    <StackedButton value={Animal.MARKET_PIGS}>
                      Market Pigs
                    </StackedButton>
                    <StackedButton value={Animal.GDU_PIGS}>
                      GDU Pigs
                    </StackedButton>
                    <StackedButton value={Animal.SOWS}>Sows</StackedButton>
                  </StackedButtonInput>
                </FormFieldInput>
                <FormFieldErrors />
              </FormField>
            </div>
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
                <div className="ml-4">
                  <span className="sr-only">
                    Small Pig Percent of Total Quantity
                  </span>
                  <span>{smallPigPercent}</span>
                </div>
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

export default ActivityMoveView;
