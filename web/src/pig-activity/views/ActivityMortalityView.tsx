import React, { useEffect } from "react";
import { Output } from "../../common/components/styled";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import NumberInput from "../../common/components/input/NumberInput";
import { useParams, useHistory } from "react-router";
import {
  usePigMortalityQuery,
  useSavePigMortalityMutation,
  usePostPigMortalityMutation
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
import BackButton from "../../common/components/view/BackButton";
import ViewContent from "../../common/components/view/ViewContent";
import CommentsField from "../components/CommentsField";
import InventoryField from "../components/InventoryField";
import AnimalField from "../components/AnimalField";
import JobField from "../components/JobField";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";

interface FormData {
  animal: string;
  naturalQuantity: number;
  euthanizedQuantity: number;
  comments?: string;
}

interface ViewParams {
  job: string;
  barnType: string;
}

const ActivityMortalityView: React.FC = () => {
  const history = useHistory();
  const params = useParams<ViewParams>();
  const isSowFarm = params.barnType === "sow-farm";
  const isNurseryFinisher = params.barnType === "nursery-finisher";

  const formContext = useForm<FormData>();
  const { loading, data } = usePigMortalityQuery({
    variables: {
      job: params.job
    },
    onCompleted({ pigMortality }) {
      const { setValue } = formContext;
      if (isSowFarm && pigMortality.animal)
        setValue("animal", pigMortality.animal);
      if (pigMortality.naturalQuantity)
        setValue("naturalQuantity", pigMortality.naturalQuantity);
      if (pigMortality.euthanizedQuantity)
        setValue("euthanizedQuantity", pigMortality.euthanizedQuantity);
      if (pigMortality.comments) setValue("comments", pigMortality.comments);
    }
  });
  const [post] = usePostPigMortalityMutation();
  const [save] = useSavePigMortalityMutation();
  const { setMessage } = useFlash();
  const { getValues, watch, triggerValidation, formState } = formContext;

  const { euthanizedQuantity, naturalQuantity } = watch([
    "euthanizedQuantity",
    "naturalQuantity"
  ]);
  const totalQuantity = (euthanizedQuantity || 0) + (naturalQuantity || 0);

  // Validate quantities if one changes.
  useEffect(() => {
    if (formState.isSubmitted) {
      triggerValidation("euthanizedQuantity");
      triggerValidation("naturalQuantity");
    }
  }, [
    triggerValidation,
    formState.isSubmitted,
    naturalQuantity,
    euthanizedQuantity
  ]);

  const onSubmit: OnSubmit<FormData> = async data => {
    try {
      await post({
        variables: {
          input: {
            animal: isNurseryFinisher ? "01" : undefined,
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
            animal: isNurseryFinisher ? "01" : undefined,
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
      history.push("/");
    } catch (e) {
      setMessage({
        message: e.toString(),
        level: "error"
      });
    }
  };

  function quantityRequired(): boolean | string {
    const euthanizedQuantity = getValues("euthanizedQuantity");
    const naturalQuantity = getValues("naturalQuantity");
    return (
      euthanizedQuantity > 0 ||
      naturalQuantity > 0 ||
      "Either the natural quantity or euthanized quantity fields are required."
    );
  }

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Mortality</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data && (
          <Form context={formContext} onSubmit={onSubmit}>
            <JobField
              number={data.pigMortality.job.number}
              description={data.pigMortality.job.description}
            />
            <InventoryField
              inventory={data.pigMortality.job.inventory || 0}
              deadQuantity={data.pigMortality.job.deadQuantity || 0}
            />
            {isSowFarm && <AnimalField animals={data.animals} />}
            <FormField
              name="naturalQuantity"
              rules={{ validate: { required: quantityRequired } }}
            >
              <FormFieldLabel>Natural Death Quantity</FormFieldLabel>
              <FormFieldInput>
                <NumberInput />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormField
              name="euthanizedQuantity"
              rules={{ validate: { required: quantityRequired } }}
            >
              <FormFieldLabel>Euthanized Quantity</FormFieldLabel>
              <FormFieldInput>
                <NumberInput />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormField name="total-quantity">
              <FormFieldLabel>Total Quantity</FormFieldLabel>
              <FormFieldInput>
                <Output>{totalQuantity}</Output>
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
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

export default ActivityMortalityView;
