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
  usePigPurchaseQuery,
  useSavePigPurchaseMutation,
  usePostPigPurchaseMutation
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
  quantity: number;
  weight: number;
  price: number;
  comments?: string;
}

const ActivityPurchaseView: React.FC<RouteComponentProps<{ job: string }>> = ({
  history,
  match
}) => {
  const formContext = useForm<FormData>();
  const { loading, data } = usePigPurchaseQuery({
    variables: {
      job: match.params.job
    },
    onCompleted({ pigPurchase, pigActivityDefaults }) {
      const { setValue } = formContext;
      if (pigPurchase.animal) setValue("animal", pigPurchase.animal);
      if (pigPurchase.quantity) setValue("quantity", pigPurchase.quantity);
      if (pigPurchase.weight) setValue("weight", pigPurchase.weight);
      if (pigPurchase.price) setValue("price", pigPurchase.price);
      else if (pigActivityDefaults.price)
        setValue("price", pigActivityDefaults.price);
      if (pigPurchase.comments) setValue("comments", pigPurchase.comments);
    }
  });
  const [post] = usePostPigPurchaseMutation();
  const [save] = useSavePigPurchaseMutation();
  const { setMessage } = useFlash();
  const { getValues } = formContext;

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
        <Title>Purchase</Title>
      </ViewHeader>
      {loading || !data ? (
        <FullPageSpinner />
      ) : (
        <Form context={formContext} onSubmit={onSubmit}>
          <FormField name="job">
            <FormFieldLabel>Job</FormFieldLabel>
            <FormFieldInput>
              <Output>
                {data.pigPurchase.job.number} {data.pigPurchase.job.description}
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

export default ActivityPurchaseView;
