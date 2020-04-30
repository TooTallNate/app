import React from "react";
import { Output, FormGroup } from "../components/styled";
import Title from "../components/view/ViewTitle";
import View from "../components/view/View";
import ViewHeader from "../components/view/ViewHeader";
import NumberInput from "../components/input/NumberInput";
import MultilineTextInput from "../components/input/MultilineTextInput";
import { Animal } from "../entities";
import { RouteComponentProps } from "react-router";
import {
  usePigMortalityQuery,
  useSavePigMortalityMutation,
  usePostPigMortalityMutation
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
  naturalQuantity: number;
  euthanizedQuantity: number;
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
      <ViewContent loading={loading}>
        {data && (
          <Form context={formContext} onSubmit={onSubmit}>
            <FormField name="job">
              <FormFieldLabel>Job</FormFieldLabel>
              <FormFieldInput noRegister>
                <StaticValue
                  value={`${data.pigMortality.job.number} ${data.pigMortality.job.description}`}
                />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormField name="inventory">
              <FormFieldLabel>Current Inventory</FormFieldLabel>
              <FormFieldInput noRegister>
                <StaticValue
                  value={`${data.pigMortality.job.inventory || 0}, ${data
                    .pigMortality.job.deadQuantity || 0} deads`}
                />
              </FormFieldInput>
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

export default ActivityMortalityView;
