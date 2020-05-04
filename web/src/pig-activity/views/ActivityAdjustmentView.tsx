import React, { useState } from "react";
import { FormGroup } from "../../common/components/styled";
import View from "../../common/components/view/View";
import Title from "../../common/components/view/ViewTitle";
import ViewHeader from "../../common/components/view/ViewHeader";
import NumberInput from "../../common/components/input/NumberInput";
import { RouteComponentProps } from "react-router";
import {
  usePigAdjustmentQuery,
  useSavePigAdjustmentMutation,
  usePostPigAdjustmentMutation
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
import PriceField from "../components/PriceField";
import WeightField from "../components/WeightField";
import JobField from "../components/JobField";

interface FormData {
  animal: string;
  quantity: number;
  weight: number;
  price: number;
  comments?: string;
}

const ActivityAdjustmentView: React.FC<
  RouteComponentProps<{ job: string }>
> = ({ history, match }) => {
  const [quantitySign, setQuantitySign] = useState(1);
  const formContext = useForm<FormData>();
  const { loading, data } = usePigAdjustmentQuery({
    variables: {
      job: match.params.job
    },
    onCompleted({ pigAdjustment, pigActivityDefaults }) {
      const { setValue } = formContext;
      if (pigAdjustment.animal) setValue("animal", pigAdjustment.animal);
      if (pigAdjustment.quantity) {
        setValue("quantity", Math.abs(pigAdjustment.quantity));
        setQuantitySign(pigAdjustment.quantity >= 0 ? 1 : -1);
      }
      if (pigAdjustment.weight) setValue("weight", pigAdjustment.weight);
      if (pigAdjustment.price) setValue("price", pigAdjustment.price);
      else if (pigActivityDefaults.price)
        setValue("price", pigActivityDefaults.price);
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
            ...data,
            quantity: quantitySign * data.quantity,
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
            <AnimalField animals={data.pigTypes} />
            <FormField
              name="quantity"
              rules={{
                required: "The quantity field is required."
              }}
            >
              <FormFieldLabel>Quantity</FormFieldLabel>
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
                  <NumberInput aria-describedby="quantity-sign" />
                </FormFieldInput>
              </div>
              <FormFieldErrors />
            </FormField>
            <WeightField />
            {quantitySign > 0 && <PriceField />}
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

export default ActivityAdjustmentView;
