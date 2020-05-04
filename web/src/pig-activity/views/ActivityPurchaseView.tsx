import React from "react";
import { FormGroup } from "../../components/styled";
import Title from "../../components/view/ViewTitle";
import View from "../../components/view/View";
import ViewHeader from "../../components/view/ViewHeader";
import { RouteComponentProps } from "react-router";
import {
  usePigPurchaseQuery,
  useSavePigPurchaseMutation,
  usePostPigPurchaseMutation
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

interface FormData {
  animal: string;
  quantity: number;
  weight: number;
  price: number;
  comments?: string;
}

const ActivityPurchaseView: React.FC<RouteComponentProps<{ job: string }>> = ({
  history,
  match
}) => {
  const formContext = useForm<FormData>();
  const { loading, data } = usePigPurchaseQuery({
    variables: {
      job: match.params.job
    },
    onCompleted({ pigPurchase, pigActivityDefaults }) {
      const { setValue } = formContext;
      if (pigPurchase.animal) setValue("animal", pigPurchase.animal);
      if (pigPurchase.quantity) setValue("quantity", pigPurchase.quantity);
      if (pigPurchase.weight) setValue("weight", pigPurchase.weight);
      if (pigPurchase.price) setValue("price", pigPurchase.price);
      else if (pigActivityDefaults.price)
        setValue("price", pigActivityDefaults.price);
      if (pigPurchase.comments) setValue("comments", pigPurchase.comments);
    }
  });
  const [post] = usePostPigPurchaseMutation();
  const [save] = useSavePigPurchaseMutation();
  const { setMessage } = useFlash();
  const { getValues } = formContext;

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
            <AnimalField animals={data.pigTypes} />
            <QuantityField />
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

export default ActivityPurchaseView;
