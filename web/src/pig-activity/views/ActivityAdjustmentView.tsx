import React, { useState } from "react";
import { OnSubmit, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import Form from "../../common/components/form/Form";
import FormField from "../../common/components/form/FormField";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormSubmit from "../../common/components/form/FormSubmit";
import Button from "../../common/components/input/Button";
import DateInput from "../../common/components/input/DateInput";
import NumberInput from "../../common/components/input/NumberInput";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";
import BackButton from "../../common/components/view/BackButton";
import View from "../../common/components/view/View";
import ViewContent from "../../common/components/view/ViewContent";
import ViewHeader from "../../common/components/view/ViewHeader";
import Title from "../../common/components/view/ViewTitle";
import { useFlash } from "../../common/contexts/flash";
import CommentsField from "../components/CommentsField";
import InventoryField from "../components/InventoryField";
import JobField from "../components/JobField";
import TotalWeightField from "../components/TotalWeightField";
import {
  usePigAdjustmentQuery,
  usePostPigAdjustmentMutation,
  useSavePigAdjustmentMutation
} from "../graphql";

interface FormData {
  event: string;
  postingDate: string;
  quantity: number;
  totalWeight: number;
  comments?: string;
}

interface ViewParams {
  job: string;
  barnType: string;
}

const ActivityAdjustmentView: React.FC = () => {
  const history = useHistory();
  const params = useParams<ViewParams>();

  const [quantitySign, setQuantitySign] = useState(1);
  const formContext = useForm<FormData>();
  const { loading, data } = usePigAdjustmentQuery({
    variables: {
      job: params.job
    },
    onCompleted({ pigAdjustment, pigAdjustmentEventTypes }) {
      const { setValue } = formContext;
      if (pigAdjustmentEventTypes.length === 1) {
        setValue("event", pigAdjustmentEventTypes[0].code);
      } else if (pigAdjustment.event)
        setValue("event", pigAdjustment.event.code);
      if (pigAdjustment.postingDate) {
        setValue("postingDate", pigAdjustment.postingDate);
      }
      if (pigAdjustment.quantity) {
        setValue("quantity", Math.abs(pigAdjustment.quantity));
        setQuantitySign(pigAdjustment.quantity >= 0 ? 1 : -1);
      }
      if (pigAdjustment.totalWeight)
        setValue("totalWeight", pigAdjustment.totalWeight);
      if (pigAdjustment.comments) setValue("comments", pigAdjustment.comments);
    }
  });
  const [post] = usePostPigAdjustmentMutation();
  const [save] = useSavePigAdjustmentMutation();
  const { setMessage } = useFlash();
  const { getValues } = formContext;

  const onSubmit: OnSubmit<FormData> = async data => {
    try {
      await post({
        variables: {
          input: {
            ...getValues(),
            quantity: quantitySign * data.quantity,
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

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Adjustment</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data && (
          <Form context={formContext} onSubmit={onSubmit}>
            <JobField
              number={data.pigAdjustment.job.number}
              description={data.pigAdjustment.job.description}
            />
            <InventoryField
              inventory={data.pigAdjustment.job.inventory || 0}
              deadQuantity={data.pigAdjustment.job.deadQuantity || 0}
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
                  items={data.pigAdjustmentEventTypes.map(event => ({
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
            <FormField
              name="quantity"
              rules={{
                required: "The quantity field is required."
              }}
            >
              <FormFieldLabel>Total Quantity</FormFieldLabel>
              <div className="flex">
                <Button
                  id="quantity-sign"
                  className="mr-4 w-11"
                  onClick={() => setQuantitySign(sign => -1 * sign)}
                  aria-label={quantitySign > 0 ? "Positive" : "Negative"}
                >
                  {quantitySign > 0 ? "+" : "-"}
                </Button>
                <FormFieldInput>
                  <NumberInput
                    aria-describedby="quantity-sign"
                    className="w-24"
                  />
                </FormFieldInput>
              </div>
              <FormFieldErrors />
            </FormField>
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

export default ActivityAdjustmentView;
