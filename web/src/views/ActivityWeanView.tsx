/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect } from "react";
import { Title, View } from "../components/styled";
import { NumberInput, MultilineTextInput } from "../components/ui/text-inputs";
import { Animal } from "../entities";
import { RouteComponentProps } from "react-router";
import { usePigActivityQuery, usePostPigWeanMutation } from "../graphql";
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
  quantity: number;
  weight: number;
  price: number;
  comments?: string;
}

const ActivityWeanView: React.FC<RouteComponentProps> = ({ history }) => {
  const formContext = useForm<FormData>();
  const { data, loading } = usePigActivityQuery();
  const [post] = usePostPigWeanMutation();
  const { setMessage } = useFlash();
  const { getValues, setValue } = formContext;

  // Set price with default only if not already set.
  useEffect(() => {
    if (!getValues().price && data && data.pigActivity.defaultPrice) {
      setValue("price", data.pigActivity.defaultPrice);
    }
  }, [data, getValues, setValue]);

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
        <Title>Wean</Title>
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
          <FormSubmit />
        </Form>
      </View>
    );
};

export default ActivityWeanView;
