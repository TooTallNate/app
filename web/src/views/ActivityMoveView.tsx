/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect } from "react";
import { Title, View, Group, FormGroup } from "../components/styled";
import NumberInput from "../components/ui/NumberInput";
import MultilineTextInput from "../components/ui/MultilineTextInput";
import { Animal } from "../entities";
import { RouteComponentProps } from "react-router";
import { usePostPigMoveMutation, usePigActivityQuery } from "../graphql";
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
  fromAnimal: Animal;
  toAnimal: Animal;
  fromJob: string;
  toJob: string;
  quantity: number;
  weight: number;
  price: number;
  comments?: string;
}

const ActivityMoveView: React.FC<RouteComponentProps> = ({ history }) => {
  const formContext = useForm<FormData>();
  const { data, loading } = usePigActivityQuery();
  const [post] = usePostPigMoveMutation();
  const { setMessage } = useFlash();
  const { getValues, setValue } = formContext;

  // Set job with default only if not already set.
  useEffect(() => {
    if (!getValues().fromJob && data && data.pigActivityDefaults.job) {
      setValue("fromJob", data.pigActivityDefaults.job.number);
    }
  }, [data, getValues, setValue]);

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
      <Title>Move</Title>
      <Form context={formContext} onSubmit={onSubmit}>
        <Group className="flex mt-0">
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
                <StackedButton value={Animal.GDU_PIGS}>GDU Pigs</StackedButton>
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
                <StackedButton value={Animal.GDU_PIGS}>GDU Pigs</StackedButton>
                <StackedButton value={Animal.SOWS}>Sows</StackedButton>
              </StackedButtonInput>
            </FormFieldInput>
            <FormFieldErrors />
          </FormField>
        </Group>
        <Group className="flex mt-0">
          <FormField
            className="w-full mr-4"
            name="fromJob"
            rules={{ required: "The from job field is required." }}
          >
            <FormFieldLabel>From Job</FormFieldLabel>
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
        </Group>
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

export default ActivityMoveView;
