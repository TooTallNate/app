import React, { useEffect } from "react";
import { FormGroup } from "../../components/styled";
import Title from "../../components/view/ViewTitle";
import View from "../../components/view/View";
import ViewHeader from "../../components/view/ViewHeader";
import { RouteComponentProps } from "react-router";
import {
  usePigWeanQuery,
  useSavePigWeanMutation,
  usePostPigWeanMutation
} from "../graphql";
import { useFlash } from "../../contexts/flash";
import Form from "../../components/form/Form";
import FormSubmit from "../../components/form/FormSubmit";
import { OnSubmit, useForm } from "react-hook-form";
import Button from "../../components/input/Button";
import BackButton from "../../components/view/BackButton";
import ViewContent from "../../components/view/ViewContent";
import CommentsField from "../components/CommentsField";
import InventoryField from "../components/InventoryField";
import AnimalField from "../components/AnimalField";
import PriceField from "../components/PriceField";
import WeightField from "../components/WeightField";
import QuantityField from "../components/QuantityField";
import JobField from "../components/JobField";
import SmallPigField from "../components/SmallPigField";

interface FormData {
  animal: string;
  quantity: number;
  smallPigQuantity?: number;
  weight: number;
  price: number;
  comments?: string;
}

const ActivityWeanView: React.FC<RouteComponentProps<{ job: string }>> = ({
  history,
  match
}) => {
  const formContext = useForm<FormData>();
  const { loading, data } = usePigWeanQuery({
    variables: {
      job: match.params.job
    },
    onCompleted({ pigWean, pigActivityDefaults }) {
      const { setValue } = formContext;
      if (pigWean.animal) setValue("animal", pigWean.animal);
      if (pigWean.quantity) setValue("quantity", pigWean.quantity);
      if (pigWean.weight) setValue("weight", pigWean.weight);
      if (pigWean.price) setValue("price", pigWean.price);
      else if (pigActivityDefaults.price)
        setValue("price", pigActivityDefaults.price);
      if (pigWean.comments) setValue("comments", pigWean.comments);
    }
  });
  const [post] = usePostPigWeanMutation();
  const [save] = useSavePigWeanMutation();
  const { setMessage } = useFlash();
  const { getValues, watch, triggerValidation, formState } = formContext;

  const onSubmit: OnSubmit<FormData> = async data => {
    try {
      await post({
        variables: {
          input: {
            ...data,
            job: match.params.job
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
            job: match.params.job
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

  const { quantity = 0, smallPigQuantity = 0 } = watch([
    "quantity",
    "smallPigQuantity"
  ]);

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
            <AnimalField
              animals={data.pigTypes.filter(type => type.number !== "03")}
            />
            <QuantityField />
            <SmallPigField
              totalQuantity={quantity}
              smallPigQuantity={smallPigQuantity}
            />
            <WeightField />
            <PriceField />
            <CommentsField />
            <FormGroup>
              <Button className="mr-4 w-full" type="button" onClick={onSave}>
                Save
              </Button>
              <FormSubmit />
            </FormGroup>
          </Form>
        )}
      </ViewContent>
    </View>
  );
};

export default ActivityWeanView;
