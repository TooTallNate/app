import React, { useEffect } from "react";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import { useParams, useHistory } from "react-router";
import {
  usePigMoveQuery,
  useSavePigMoveMutation,
  usePostPigMoveMutation
} from "../graphql";
import StackedInput from "../../common/components/input/StackedInput";
import StackedRadioButton from "../../common/components/input/StackedRadioButton";
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
import PriceField from "../components/PriceField";
import TotalWeightField from "../components/TotalWeightField";
import QuantityAndSmallsField from "../components/QuantityAndSmallsField";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";
import FormGroupContent from "../../common/components/form/FormGroupContent";
import FormGroupLabel from "../../common/components/form/FormGroupLabel";
import FormGroup from "../../common/components/form/FormGroup";

interface FormData {
  fromAnimal: string;
  toAnimal: string;
  toJob: string;
  quantity: number;
  smallPigQuantity?: number;
  totalWeight: number;
  price: number;
  comments?: string;
}

interface ViewParams {
  job: string;
  barnType: string;
}

const ActivityMoveView: React.FC = () => {
  const history = useHistory();
  const params = useParams<ViewParams>();
  const isSowFarm = params.barnType === "sow-farm";
  const isNurseryFinisher = params.barnType === "nursery-finisher";

  const formContext = useForm<FormData>();
  const { loading, data } = usePigMoveQuery({
    variables: {
      job: params.job
    },
    onCompleted({ pigMove, pigActivityDefaults }) {
      const { setValue } = formContext;
      if (isSowFarm && pigMove.fromAnimal)
        setValue("fromAnimal", pigMove.fromAnimal as any);
      if (isSowFarm && pigMove.toAnimal)
        setValue("toAnimal", pigMove.toAnimal as any);
      if (pigMove.toJob) setValue("toJob", pigMove.toJob.number);
      if (pigMove.quantity) setValue("quantity", pigMove.quantity);
      if (pigMove.totalWeight) setValue("totalWeight", pigMove.totalWeight);
      if (pigMove.price) setValue("price", pigMove.price);
      else if (pigActivityDefaults.price)
        setValue("price", pigActivityDefaults.price);
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
            ...(isNurseryFinisher && { fromAnimal: "01", toAnimal: "01" }),
            fromJob: params.job
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
            fromJob: params.job
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

  const quantity = watch("quantity") || 0;

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
        <Title>Move</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data && (
          <Form context={formContext} onSubmit={onSubmit}>
            <FormField name="fromJob">
              <FormFieldLabel>From Job</FormFieldLabel>
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
            <FormField
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
            {isSowFarm && (
              <FormGroup>
                <FormGroupLabel>Animal</FormGroupLabel>
                <FormGroupContent>
                  <div className="flex">
                    <FormField
                      name="fromAnimal"
                      rules={{ required: "The from animal field is required." }}
                    >
                      <FormFieldLabel>From</FormFieldLabel>
                      <FormFieldInput>
                        <StackedInput orientation="vertical">
                          {data.pigTypes.map(type => (
                            <StackedRadioButton
                              value={type.number}
                              key={type.number}
                            >
                              {type.description}
                            </StackedRadioButton>
                          ))}
                        </StackedInput>
                      </FormFieldInput>
                      <FormFieldErrors />
                    </FormField>
                    <HorizontalSpacer />
                    <FormField
                      name="toAnimal"
                      rules={{ required: "The to animal field is required." }}
                    >
                      <FormFieldLabel>To</FormFieldLabel>
                      <FormFieldInput>
                        <StackedInput orientation="vertical">
                          {data.pigTypes.map(type => (
                            <StackedRadioButton
                              value={type.number}
                              key={type.number}
                            >
                              {type.description}
                            </StackedRadioButton>
                          ))}
                        </StackedInput>
                      </FormFieldInput>
                      <FormFieldErrors />
                    </FormField>
                  </div>
                </FormGroupContent>
              </FormGroup>
            )}
            <QuantityAndSmallsField />
            <TotalWeightField />
            <PriceField />
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
