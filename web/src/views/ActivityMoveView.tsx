import React from "react";
import { FormGroup, Output, Group } from "../components/styled";
import Title from "../components/ui/ViewTitle";
import View from "../components/ui/View";
import ViewHeader from "../components/ui/ViewHeader";
import NumberInput from "../components/ui/NumberInput";
import MultilineTextInput from "../components/ui/MultilineTextInput";
import { Animal } from "../entities";
import { RouteComponentProps } from "react-router";
import {
  usePigMoveQuery,
  useSavePigMoveMutation,
  usePostPigMoveMutation
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
import Button from "../components/ui/Button";
import TypeaheadInput from "../components/ui/TypeaheadInput";
import BackButton from "../components/ui/BackButton";

interface FormData {
  fromAnimal: Animal;
  toAnimal: Animal;
  toJob: string;
  quantity: number;
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
  const { getValues } = formContext;

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

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Move</Title>
      </ViewHeader>
      {loading || !data ? (
        <FullPageSpinner />
      ) : (
        <Form context={formContext} onSubmit={onSubmit}>
          <Group className="flex mt-0">
            <FormField name="fromJob" className="w-full mr-4">
              <FormFieldLabel>From Job</FormFieldLabel>
              <FormFieldInput>
                <Output>
                  {data.pigMove.fromJob.number}{" "}
                  {data.pigMove.fromJob.description}
                </Output>
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

export default ActivityMoveView;
