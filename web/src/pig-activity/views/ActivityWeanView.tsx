import React, { useEffect } from "react";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import { useParams, useHistory } from "react-router";
import {
  usePigWeanQuery,
  useSavePigWeanMutation,
  usePostPigWeanMutation,
  PigWeanDocument
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
import AnimalField from "../components/AnimalField";
import PriceField from "../components/PriceField";
import TotalWeightField from "../components/TotalWeightField";
import JobField from "../components/JobField";
import QuantityAndSmallsField from "../components/QuantityAndSmallsField";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";

interface FormData {
  animal: string;
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

const ActivityWeanView: React.FC = () => {
  const history = useHistory();
  const params = useParams<ViewParams>();
  const isSowFarm = params.barnType === "sow-farm";
  const isNurseryFinisher = params.barnType === "nursery-finisher";

  const formContext = useForm<FormData>();
  const { loading, data } = usePigWeanQuery({
    variables: {
      job: params.job
    },
    onCompleted({ pigWean, pigActivityDefaults }) {
      const { setValue } = formContext;
      if (isSowFarm && pigWean.animal) setValue("animal", pigWean.animal);
      if (pigWean.quantity) setValue("quantity", pigWean.quantity);
      if (pigWean.totalWeight) setValue("totalWeight", pigWean.totalWeight);
      if (pigWean.price) setValue("price", pigWean.price);
      //default price is handled on click of pig type rather than on load
      //else if (pigActivityDefaults.price)
      //  setValue("price", pigActivityDefaults.price);
      if (pigWean.comments) setValue("comments", pigWean.comments);
    }
  });
  const [post] = usePostPigWeanMutation();
  const [save] = useSavePigWeanMutation();
  const { setMessage } = useFlash();
  const {
    getValues,
    setValue,
    watch,
    triggerValidation,
    formState
  } = formContext;

  const onSubmit: OnSubmit<FormData> = async data => {
    try {
      await post({
        variables: {
          input: {
            ...data,
            ...(isNurseryFinisher && { animal: "01" }),
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

  const animal = watch("animal");
  const quantity = watch("quantity") || 0;

  useEffect(() => {
    if (animal && data) {
      console.log(data.pigActivityDefaults);
      const priceEntry = data.pigActivityDefaults.pigList.find(
        n => n.pigType === animal
      );
      console.log("animal = " + animal);
      console.log(JSON.stringify(priceEntry));
      if (priceEntry && typeof priceEntry.price === "number") {
        console.log("inside the second if");
        setValue("price", priceEntry.price);
      }
    }
  }, [data, animal, setValue]);

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
            <JobField
              number={data.pigWean.job.number}
              description={data.pigWean.job.description}
            />
            <InventoryField
              inventory={data.pigWean.job.inventory || 0}
              deadQuantity={data.pigWean.job.deadQuantity || 0}
            />
            {isSowFarm && (
              <AnimalField
                animals={data.pigTypes.filter(type => type.number !== "03")}
              />
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

export default ActivityWeanView;
