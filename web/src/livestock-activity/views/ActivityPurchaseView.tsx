import React, { useEffect } from "react";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import { useParams, useHistory } from "react-router";
import {
  useLivestockPurchaseQuery,
  useSaveLivestockPurchaseMutation,
  usePostLivestockPurchaseMutation
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
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";
import QuantityAndSmallsField from "../components/QuantityAndSmallsField";
import FormField from "../../common/components/form/FormField";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import DateInput from "../../common/components/input/DateInput";

interface FormData {
  event: string;
  postingDate: string;
  quantity: number;
  smallLivestockQuantity?: number;
  totalWeight: number;
  comments?: string;
}

interface ViewParams {
  job: string;
}

const ActivityPurchaseView: React.FC = () => {
  const history = useHistory();
  const params = useParams<ViewParams>();

  const formContext = useForm<FormData>();
  const { loading, data } = useLivestockPurchaseQuery({
    variables: {
      job: params.job
    },
    onCompleted({ livestockPurchase, livestockPurchaseEventTypes }) {
      const { setValue } = formContext;
      if (livestockPurchaseEventTypes.length === 1) {
        setValue("event", livestockPurchaseEventTypes[0].code);
      } else if (livestockPurchase.event)
        setValue("event", livestockPurchase.event.code);
      if (livestockPurchase.quantity)
        setValue("quantity", livestockPurchase.quantity);
      if (livestockPurchase.smallLivestockQuantity)
        setValue(
          "smallLivestockQuantity",
          livestockPurchase.smallLivestockQuantity
        );
      if (livestockPurchase.totalWeight)
        setValue("totalWeight", livestockPurchase.totalWeight);
      if (livestockPurchase.postingDate)
        setValue("postingDate", livestockPurchase.postingDate);
      if (livestockPurchase.postingDate)
        setValue("postingDate", livestockPurchase.postingDate);
      if (livestockPurchase.comments)
        setValue("comments", livestockPurchase.comments);
    }
  });
  const [post] = usePostLivestockPurchaseMutation();
  const [save] = useSaveLivestockPurchaseMutation();
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

  useEffect(() => {
    if (formState.isSubmitted) {
      triggerValidation("smallLivestockQuantity");
    }
  }, [triggerValidation, quantity, formState.isSubmitted]);

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Purchase</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data && (
          <Form context={formContext} onSubmit={onSubmit}>
            <JobField
              number={data.livestockPurchase.job.number}
              description={data.livestockPurchase.job.description}
            />
            <InventoryField
              inventory={data.livestockPurchase.job.inventory || 0}
              deadQuantity={data.livestockPurchase.job.deadQuantity || 0}
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
                  items={data.livestockPurchaseEventTypes.map(event => ({
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
              name="smallLivestockQuantity"
              label="Smalls"
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

export default ActivityPurchaseView;
