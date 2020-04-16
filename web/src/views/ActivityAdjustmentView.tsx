import React from "react";
import { FormGroup } from "../components/styled";
import View from "../components/view/View";
import Title from "../components/view/ViewTitle";
import ViewHeader from "../components/view/ViewHeader";
import NumberInput from "../components/input/NumberInput";
import MultilineTextInput from "../components/input/MultilineTextInput";
import { Animal } from "../entities";
import { RouteComponentProps } from "react-router";
import {
  usePigAdjustmentQuery,
  useSavePigAdjustmentMutation,
  usePostPigAdjustmentMutation
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
import StaticValue from "../components/input/StaticValue";

interface FormData {
  animal: string;
  quantity: number;
  weight: number;
  price: number;
  comments?: string;
}

const ActivityAdjustmentView: React.FC<
  RouteComponentProps<{ job: string }>
> = ({ history, match }) => {
  const formContext = useForm<FormData>();
  const { loading, data } = usePigAdjustmentQuery({
    variables: {
      job: match.params.job
    },
    onCompleted({ pigAdjustment, pigActivityDefaults }) {
      const { setValue } = formContext;
      if (pigAdjustment.animal) setValue("animal", pigAdjustment.animal);
      if (pigAdjustment.quantity) setValue("quantity", pigAdjustment.quantity);
      if (pigAdjustment.weight) setValue("weight", pigAdjustment.weight);
      if (pigAdjustment.price) setValue("price", pigAdjustment.price);
      else if (pigActivityDefaults.price)
        setValue("price", pigActivityDefaults.price);
      if (pigAdjustment.comments) setValue("comments", pigAdjustment.comments);
    }
  });
  const [post] = usePostPigAdjustmentMutation();
  const [save] = useSavePigAdjustmentMutation();
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
        <Title>Adjustment</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data && (
          <Form context={formContext} onSubmit={onSubmit}>
            <FormField name="job">
              <FormFieldLabel>Job</FormFieldLabel>
              <FormFieldInput noRegister>
                <StaticValue
                  value={`${data.pigAdjustment.job.number} ${data.pigAdjustment.job.description}`}
                />
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

export default ActivityAdjustmentView;
