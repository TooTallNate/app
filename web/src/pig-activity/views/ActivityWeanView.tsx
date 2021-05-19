import React, { useEffect } from "react";
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
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";
import BackButton from "../../common/components/view/BackButton";
import View from "../../common/components/view/View";
import ViewContent from "../../common/components/view/ViewContent";
import ViewHeader from "../../common/components/view/ViewHeader";
import Title from "../../common/components/view/ViewTitle";
import { useFlash } from "../../common/contexts/flash";
import CommentsField from "../components/CommentsField";
import ImageUploadField from "../components/ImageUploadField";
import InventoryField from "../components/InventoryField";
import JobField from "../components/JobField";
import QuantityAndSmallsField from "../components/QuantityAndSmallsField";
import TotalWeightField from "../components/TotalWeightField";
import {
  usePigWeanQuery,
  usePostPigWeanMutation,
  useSavePigWeanMutation
} from "../graphql";

const IMAGE =
  "https://www.treehugger.com/thmb/aOmgLLmSXABYpnuiPvPwrM9SZc8=/1365x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/duckling-close-up-500315849-572917c93df78ced1f0b99ec.jpg";
interface FormData {
  event: string;
  postingDate: string;
  quantity: number;
  smallPigQuantity?: number;
  totalWeight: number;
  comments?: string;
}

interface ViewParams {
  job: string;
}

const ActivityWeanView: React.FC = () => {
  const history = useHistory();
  const params = useParams<ViewParams>();

  const formContext = useForm<FormData>();
  const { loading, data } = usePigWeanQuery({
    variables: {
      job: params.job
    },
    onCompleted({ pigWean, pigWeanEventTypes }) {
      const { setValue } = formContext;
      if (pigWeanEventTypes.length === 1) {
        setValue("event", pigWeanEventTypes[0].code);
      } else if (pigWean.event) setValue("event", pigWean.event.code);
      if (pigWean.quantity) setValue("quantity", pigWean.quantity);
      if (pigWean.totalWeight) setValue("totalWeight", pigWean.totalWeight);
      if (pigWean.postingDate) setValue("postingDate", pigWean.postingDate);
      if (pigWean.comments) setValue("comments", pigWean.comments);
    }
  });
  const [post] = usePostPigWeanMutation();
  const [save] = useSavePigWeanMutation();
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

  // Validate small pig quantity if total quantity changes.
  useEffect(() => {
    if (formState.isSubmitted) {
      triggerValidation("smallPigQuantity");
    }
  }, [triggerValidation, quantity, formState.isSubmitted]);

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Wean</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data && (
          <Form context={formContext} onSubmit={onSubmit}>
            <ImageUploadField />
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

export default ActivityWeanView;
