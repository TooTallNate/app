import React, { useState } from "react";
import View from "../../common/components/view/View";
import Title from "../../common/components/view/ViewTitle";
import ViewHeader from "../../common/components/view/ViewHeader";
import NumberInput from "../../common/components/input/NumberInput";
import { useParams, useHistory } from "react-router";
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
import TotalWeightField from "../components/TotalWeightField";
import JobField from "../components/JobField";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";

interface FormData {
  animal: string;
  quantity: number;
  totalWeight: number;
  price: number;
  comments?: string;
}

interface ViewParams {
  job: string;
  barnType: string;
}

const ActivityAdjustmentView: React.FC = () => {
  const history = useHistory();
  const params = useParams<ViewParams>();
  const isSowFarm = params.barnType === "sow-farm";
  const isNurseryFinisher = params.barnType === "nursery-finisher";

  const [quantitySign, setQuantitySign] = useState(1);
  const formContext = useForm<FormData>();
  const { loading, data } = usePigAdjustmentQuery({
    variables: {
      job: params.job
    },
    onCompleted({ pigAdjustment, pigActivityDefaults }) {
      const { setValue } = formContext;
      if (isSowFarm && pigAdjustment.animal)
        setValue("animal", pigAdjustment.animal);
      if (pigAdjustment.quantity) {
        setValue("quantity", Math.abs(pigAdjustment.quantity));
        setQuantitySign(pigAdjustment.quantity >= 0 ? 1 : -1);
      }
      if (pigAdjustment.totalWeight)
        setValue("totalWeight", pigAdjustment.totalWeight);
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
            ...(isNurseryFinisher && { animal: "01" }),
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
            {isSowFarm && <AnimalField animals={data.pigTypes} />}
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
            {quantitySign > 0 && <PriceField />}
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
