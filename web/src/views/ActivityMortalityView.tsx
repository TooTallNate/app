/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect } from "react";
import { Title, View, Output } from "../components/styled";
import { NumberInput, MultilineTextInput } from "../components/ui/text-inputs";
import { Animal } from "../entities";
import { RouteComponentProps } from "react-router";
import { usePostPigMortalityMutation, usePigActivityQuery } from "../graphql";
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
import TypeaheadInput from "../components/ui/TypeaheadInput";

interface FormData {
  animal: string;
  job: string;
  naturalQuantity: number;
  euthanizedQuantity: number;
  weight: number;
  price: number;
  comments?: string;
}

const ActivityMortalityView: React.FC<RouteComponentProps> = ({ history }) => {
  const formContext = useForm<FormData>();
  const { data, loading } = usePigActivityQuery();
  const [post] = usePostPigMortalityMutation();
  const { setMessage } = useFlash();
  const { getValues, setValue, watch } = formContext;

  // Set job with default only if not already set.
  useEffect(() => {
    if (!getValues().job && data && data.pigActivity.defaultJob) {
      setValue("job", data.pigActivity.defaultJob.number);
    }
  }, [data, getValues, setValue]);

  // Set price with default only if not already set.
  useEffect(() => {
    if (!getValues().price && data && data.pigActivity.defaultPrice) {
      setValue("price", data.pigActivity.defaultPrice);
    }
  }, [data, getValues, setValue]);

  const { euthanizedQuantity, naturalQuantity } = watch([
    "euthanizedQuantity",
    "naturalQuantity"
  ]);
  const totalQuantity = (euthanizedQuantity || 0) + (naturalQuantity || 0);

  const onSubmit: OnSubmit<FormData> = async data => {
    try {
      await post({ variables: { input: data } });
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

  return loading || !data ? (
    <FullPageSpinner>Loading Defaults...</FullPageSpinner>
  ) : (
    <View>
      <Title>Mortality</Title>
      <Form context={formContext} onSubmit={onSubmit}>
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
          name="job"
          rules={{ required: "The job field is required." }}
        >
          <FormFieldLabel>Job</FormFieldLabel>
          <FormFieldInput>
            <TypeaheadInput
              items={data.pigActivity.jobs.map(job => ({
                value: job.number,
                title: `${job.number} ${job.description}`
              }))}
            />
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
        <FormSubmit />
      </Form>
    </View>
  );
};

export default ActivityMortalityView;
