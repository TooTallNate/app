/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect } from "react";
import { FormGroup } from "../components/styled";
import Title from "../components/ui/ViewTitle";
import View from "../components/ui/View";
import ViewHeader from "../components/ui/ViewHeader";
import NumberInput from "../components/ui/NumberInput";
import MultilineTextInput from "../components/ui/MultilineTextInput";
import { Animal } from "../entities";
import { RouteComponentProps } from "react-router";
import { usePostPigPurchaseMutation, usePigActivityQuery } from "../graphql";
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
import BackButton from "../components/ui/BackButton";

interface FormData {
  animal: string;
  job: string;
  quantity: number;
  weight: number;
  price: number;
  comments?: string;
}

const ActivityPurchaseView: React.FC<RouteComponentProps> = ({ history }) => {
  const formContext = useForm<FormData>();
  const { data, loading } = usePigActivityQuery();
  const [post] = usePostPigPurchaseMutation();
  const { setMessage } = useFlash();
  const { getValues, setValue } = formContext;

  // Set price with default only if not already set.
  useEffect(() => {
    if (!getValues().price && data && data.pigActivityDefaults.price) {
      setValue("price", data.pigActivityDefaults.price);
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
      <ViewHeader>
        <BackButton />
        <Title>Purchase</Title>
      </ViewHeader>
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
              sort="desc"
              items={data.pigActivityJobs.map(job => ({
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
        <FormGroup>
          <FormSubmit />
        </FormGroup>
      </Form>
    </View>
  );
};

export default ActivityPurchaseView;
