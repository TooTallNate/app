import React, { useEffect } from "react";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import { useParams, useHistory } from "react-router";
import {
  usePigMoveQuery,
  useSavePigMoveMutation,
  usePostPigMoveMutation,
  usePigJobLazyQuery
} from "../graphql";
import { useFlash } from "../../common/contexts/flash";
import Form from "../../common/components/form/Form";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormSubmit from "../../common/components/form/FormSubmit";
import { OnSubmit, useForm } from "react-hook-form";
import Button from "../../common/components/input/Button";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import BackButton from "../../common/components/view/BackButton";
import ViewContent from "../../common/components/view/ViewContent";
import StaticValue from "../../common/components/input/StaticValue";
import CommentsField from "../components/CommentsField";
import InventoryField from "../components/InventoryField";
import TotalWeightField from "../components/TotalWeightField";
import QuantityAndSmallsField from "../components/QuantityAndSmallsField";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";
import DateInput from "../../common/components/input/DateInput";

interface FormData {
  event: string;
  postingDate: string;
  toJob: string;
  quantity: number;
  smallPigQuantity?: number;
  totalWeight: number;
  comments?: string;
}

interface ViewParams {
  fromJob: string;
  toJob: string;
  barnType: string;
}

const ActivityMoveView: React.FC = () => {
  const history = useHistory();
  const params = useParams<ViewParams>();
  const formContext = useForm<FormData>();
  const [loadJobs, { data: toJobData }] = usePigJobLazyQuery();
  const { loading, data } = usePigMoveQuery({
    variables: {
      job: params.fromJob
    },
    onCompleted({ pigMove, pigMoveEventTypes }) {
      const { setValue } = formContext;
      if (pigMoveEventTypes.length === 1) {
        setValue("event", pigMoveEventTypes[0].code);
      } else if (pigMove.event) setValue("event", pigMove.event.code);
      if (pigMove.quantity) setValue("quantity", pigMove.quantity);
      if (pigMove.smallPigQuantity)
        setValue("smallPigQuantity", pigMove.smallPigQuantity);
      if (pigMove.postingDate) setValue("postingDate", pigMove.postingDate);
      if (pigMove.totalWeight) setValue("totalWeight", pigMove.totalWeight);
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
            fromJob: params.fromJob,
            toJob: params.toJob
          }
        }
      });
      setMessage({
        message: "Entry recorded successfully.",
        level: "success",
        timeout: 2000
      });
      history.push("/pig-activity");
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
            fromJob: params.fromJob,
            toJob: params.toJob
          }
        }
      });
      setMessage({
        message: "Entry saved successfully.",
        level: "success",
        timeout: 2000
      });
      history.push("/pig-activity");
    } catch (e) {
      setMessage({
        message: e.toString(),
        level: "error"
      });
    }
  };

  const quantity = watch("quantity") || 0;

  // Validate small pig quantity if total quantity changes.
  useEffect(() => {
    if (formState.isSubmitted) {
      triggerValidation("smallPigQuantity");
    }
  }, [triggerValidation, quantity, formState.isSubmitted]);

  useEffect(() => {
    if (params.toJob) {
      loadJobs({ variables: { job: params.toJob } });
    }
    // if (toJobData && toJobData.job) {
    //   console.log(toJobData.job);
    // }
  }, [loadJobs, params.toJob, toJobData]);

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Move</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data && (
          <Form context={formContext} onSubmit={onSubmit}>
            <FormField name="fromJob">
              <FormFieldLabel>From Group</FormFieldLabel>
              <FormFieldInput noRegister>
                <StaticValue
                  value={`${data.pigMove.fromJob.number} ${data.pigMove.fromJob.description}`}
                />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <InventoryField
              className="w-full mr-4"
              inventory={data.pigMove.fromJob.inventory || 0}
              deadQuantity={data.pigMove.fromJob.deadQuantity || 0}
            />
            <FormField name="toJob">
              <FormFieldLabel>To Group</FormFieldLabel>
              <FormFieldInput noRegister>
                <StaticValue
                  value={
                    toJobData && toJobData.job
                      ? `${toJobData.job.number} ${toJobData.job.description}`
                      : ""
                  }
                />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <InventoryField
              className="w-full mr-4"
              inventory={
                toJobData && toJobData.job && toJobData.job.inventory
                  ? toJobData.job.inventory
                  : 0
              }
              deadQuantity={
                toJobData && toJobData.job && toJobData.job.deadQuantity
                  ? toJobData.job.deadQuantity
                  : 0
              }
            />
            <FormField
              name="event"
              rules={{
                required: "The event field is required."
              }}
            >
              <FormFieldLabel>Event</FormFieldLabel>
              <FormFieldInput>
                <TypeaheadInput
                  items={data.pigMoveEventTypes.map(event => ({
                    value: event.code,
                    title: event.description
                  }))}
                />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormField name="postingDate">
              <FormFieldLabel>Activity Date</FormFieldLabel>
              <FormFieldInput>
                <DateInput />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <QuantityAndSmallsField />
            <TotalWeightField />
            <CommentsField />
            <div className="flex">
              <Button className="w-full" type="button" onClick={onSave}>
                Save
              </Button>
              <HorizontalSpacer />
              <FormSubmit />
            </div>
          </Form>
        )}
      </ViewContent>
    </View>
  );
};

export default ActivityMoveView;
