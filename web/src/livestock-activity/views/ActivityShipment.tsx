import React, { useEffect } from "react";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import { useParams, useHistory } from "react-router";
import {
  useLivestockShipmentQuery,
  useSaveLivestockShipmentMutation,
  usePostLivestockShipmentMutation
} from "../graphql";
import { useFlash } from "../../common/contexts/flash";
import Form from "../../common/components/form/Form";
import FormSubmit from "../../common/components/form/FormSubmit";
import { OnSubmit, useForm } from "react-hook-form";
import Button from "../../common/components/input/Button";
import BackButton from "../../common/components/view/BackButton";
import ViewContent from "../../common/components/view/ViewContent";
import CommentsField from "../components/CommentsField";
import InventoryField from "../components/InventoryField";
import TotalWeightField from "../components/TotalWeightField";
import JobField from "../components/JobField";
import QuantityAndSmallsField from "../components/QuantityAndSmallsField";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormField from "../../common/components/form/FormField";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import DateInput from "../../common/components/input/DateInput";
import { loggers } from "winston";

interface FormData {
  event: string;
  postingDate: string;
  quantity: number;
  deadsOnArrivalQuantity?: number;
  totalWeight: number;
  comments?: string;
}

interface ViewParams {
  job: string;
}

const ActivityShipmentView: React.FC = () => {
  const history = useHistory();
  const params = useParams<ViewParams>();

  const formContext = useForm<FormData>();
  const { loading, data } = useLivestockShipmentQuery({
    variables: {
      job: params.job
    },
    onCompleted({ livestockShipment, livestockShipmentEventTypes }) {
      const { setValue } = formContext;
      if (livestockShipmentEventTypes.length === 1) {
        setValue("event", livestockShipmentEventTypes[0].code);
      } else if (livestockShipment.event)
        setValue("event", livestockShipment.event.code);
      if (livestockShipment.quantity)
        setValue("quantity", livestockShipment.quantity);
      if (livestockShipment.totalWeight)
        setValue("totalWeight", livestockShipment.totalWeight);
      if (livestockShipment.postingDate)
        setValue("postingDate", livestockShipment.postingDate);
      if (livestockShipment.comments)
        setValue("comments", livestockShipment.comments);
    }
  });
  const [post] = usePostLivestockShipmentMutation();
  const [save] = useSaveLivestockShipmentMutation();
  const { setMessage } = useFlash();
  const { getValues, watch, triggerValidation, formState } = formContext;

  const quantity = watch("quantity") || 0;

  const onSubmit: OnSubmit<FormData> = async data => {
    try {
      await post({
        variables: {
          input: {
            ...data,
            job: params.job
          }
        }
      });
      setMessage({
        message: "Entry recorded successfully.",
        level: "success",
        timeout: 2000
      });
      history.push("/livestock-activity");
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
            job: params.job
          }
        }
      });
      setMessage({
        message: "Entry saved successfully.",
        level: "success",
        timeout: 2000
      });
      history.push("/livestock-activity");
    } catch (e) {
      setMessage({
        message: e.toString(),
        level: "error"
      });
    }
  };

  // Validate small livestock quantity if total quantity changes.
  useEffect(() => {
    if (formState.isSubmitted) {
      triggerValidation("deadsOnArrivalQuantity");
    }
  }, [triggerValidation, quantity, formState.isSubmitted]);

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Shipment</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data && (
          <Form context={formContext} onSubmit={onSubmit}>
            <JobField
              number={data.livestockShipment.job.number}
              description={data.livestockShipment.job.description}
            />
            <InventoryField
              inventory={data.livestockShipment.job.inventory || 0}
              deadQuantity={data.livestockShipment.job.deadQuantity || 0}
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
                  items={data.livestockShipmentEventTypes.map(event => ({
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
            <QuantityAndSmallsField
              name="deadsOnArrivalQuantity"
              label="Deads on Arrival"
            />
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

export default ActivityShipmentView;
