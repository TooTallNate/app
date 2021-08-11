import React, { useEffect } from "react";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import { useParams, useHistory } from "react-router";
import {
  usePigPurchaseQuery,
  useSavePigPurchaseMutation,
  usePostPigPurchaseMutation
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
import ImageUploadField from "../components/ImageUploadField";

interface FormData {
  event: string;
  postingDate: string;
  quantity: number;
  smallPigQuantity?: number;
  totalWeight: number;
  comments?: string;
  imagesUID?: string;
}

interface ViewParams {
  job: string;
}

const ActivityPurchaseView: React.FC = () => {
  const history = useHistory();
  const params = useParams<ViewParams>();

  const formContext = useForm<FormData>();
  const { loading, data } = usePigPurchaseQuery({
    variables: {
      job: params.job
    },
    onCompleted({ pigPurchase, pigPurchaseEventTypes }) {
      const { setValue } = formContext;
      if (pigPurchaseEventTypes.length === 1) {
        setValue("event", pigPurchaseEventTypes[0].code);
      } else if (pigPurchase.event) setValue("event", pigPurchase.event.code);
      if (pigPurchase.quantity) setValue("quantity", pigPurchase.quantity);
      if (pigPurchase.smallPigQuantity)
        setValue("smallPigQuantity", pigPurchase.smallPigQuantity);
      if (pigPurchase.totalWeight)
        setValue("totalWeight", pigPurchase.totalWeight);
      if (pigPurchase.postingDate)
        setValue("postingDate", pigPurchase.postingDate);
      if (pigPurchase.postingDate)
        setValue("postingDate", pigPurchase.postingDate);
      if (pigPurchase.comments) setValue("comments", pigPurchase.comments);
      if (pigPurchase.imagesUID) {
        setValue("imagesUID", pigPurchase.imagesUID);
      }
    }
  });
  const [post] = usePostPigPurchaseMutation();
  const [save] = useSavePigPurchaseMutation();
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
            job: params.job
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

  useEffect(() => {
    if (formState.isSubmitted) {
      triggerValidation("smallPigQuantity");
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
              number={data.pigPurchase.job.number}
              description={data.pigPurchase.job.description}
            />
            <InventoryField
              inventory={data.pigPurchase.job.inventory || 0}
              deadQuantity={data.pigPurchase.job.deadQuantity || 0}
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
                  items={data.pigPurchaseEventTypes.map(event => ({
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
            <ImageUploadField />
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
