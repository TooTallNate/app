import React from "react";
import { FormGroup, Output } from "../components/styled";
import Title from "../components/ui/ViewTitle";
import View from "../components/ui/View";
import ViewHeader from "../components/ui/ViewHeader";
import NumberInput from "../components/ui/NumberInput";
import MultilineTextInput from "../components/ui/MultilineTextInput";
import { Animal } from "../entities";
import { RouteComponentProps } from "react-router";
import {
  usePigMortalityQuery,
  useSavePigMortalityMutation,
  usePostPigMortalityMutation
} from "../graphql";
import StackedButtonInput, {
  StackedButton
} from "../components/ui/StackedButtonInput";
import FullPageSpinner from "../components/FullPageSpinner";
import { useFlash } from "../contexts/flash";
import Form from "../components/ui/Form";
import FormField from "../components/ui/FormField";
import FormFieldLabel from "../components/ui/FormFieldLabel";
import FormFieldErrors from "../components/ui/FormFieldErrors";
import FormFieldInput from "../components/ui/FormFieldInput";
import FormSubmit from "../components/ui/FormSubmit";
import { OnSubmit, useForm } from "react-hook-form";
import BackButton from "../components/ui/BackButton";
import Button from "../components/ui/Button";

interface FormData {
  animal: string;
  naturalQuantity: number;
  euthanizedQuantity: number;
  weight: number;
  price: number;
  comments?: string;
}

const ActivityMortalityView: React.FC<RouteComponentProps<{ job: string }>> = ({
  history,
  match
}) => {
  const formContext = useForm<FormData>();
  const { loading, data } = usePigMortalityQuery({
    variables: {
      job: match.params.job
    },
    onCompleted({ pigMortality, pigActivityDefaults }) {
      const { setValue } = formContext;
      if (pigMortality.animal) setValue("animal", pigMortality.animal);
      if (pigMortality.naturalQuantity)
        setValue("naturalQuantity", pigMortality.naturalQuantity);
      if (pigMortality.euthanizedQuantity)
        setValue("euthanizedQuantity", pigMortality.euthanizedQuantity);
      if (pigMortality.weight) setValue("weight", pigMortality.weight);
      if (pigMortality.price) setValue("price", pigMortality.price);
      else if (pigActivityDefaults.price)
        setValue("price", pigActivityDefaults.price);
      if (pigMortality.comments) setValue("comments", pigMortality.comments);
    }
  });
  const [post] = usePostPigMortalityMutation();
  const [save] = useSavePigMortalityMutation();
  const { setMessage } = useFlash();
  const { getValues, watch } = formContext;

  const { euthanizedQuantity, naturalQuantity } = watch([
    "euthanizedQuantity",
    "naturalQuantity"
  ]);
  const totalQuantity = (euthanizedQuantity || 0) + (naturalQuantity || 0);

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

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Mortality</Title>
      </ViewHeader>
      {loading || !data ? (
        <FullPageSpinner />
      ) : (
        <Form context={formContext} onSubmit={onSubmit}>
          <FormField name="job">
            <FormFieldLabel>Job</FormFieldLabel>
            <FormFieldInput>
              <Output>
                {data.pigMortality.job.number}{" "}
                {data.pigMortality.job.description}
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
                <StackedButton value={Animal.GDU_PIGS}>GDU Pigs</StackedButton>
                <StackedButton value={Animal.SOWS}>Sows</StackedButton>
              </StackedButtonInput>
            </FormFieldInput>
            <FormFieldErrors />
          </FormField>
          <FormField
            name="naturalQuantity"
            rules={{
              required: "The natural quantity field is required."
            }}
          >
            <FormFieldLabel>Natural Death Quantity</FormFieldLabel>
            <FormFieldInput>
              <NumberInput />
            </FormFieldInput>
            <FormFieldErrors />
          </FormField>
          <FormField
            name="euthanizedQuantity"
            rules={{
              required: "The euthanized quantity field is required."
            }}
          >
            <FormFieldLabel>Euthanized Quantity</FormFieldLabel>
            <FormFieldInput>
              <NumberInput />
            </FormFieldInput>
            <FormFieldErrors />
          </FormField>
          <FormField name="total-quantity">
            <FormFieldLabel>Total Quantity</FormFieldLabel>
            <FormFieldInput>
              <Output>{totalQuantity}</Output>
            </FormFieldInput>
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
    </View>
  );
};

export default ActivityMortalityView;
