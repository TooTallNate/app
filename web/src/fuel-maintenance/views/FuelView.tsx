import React, { useEffect, useState } from "react";
import { OnSubmit, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import Form from "../../common/components/form/Form";
import FormField from "../../common/components/form/FormField";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormSubmit from "../../common/components/form/FormSubmit";
import DateInput from "../../common/components/input/DateInput";
import NumberInput from "../../common/components/input/NumberInput";
import StaticValue from "../../common/components/input/StaticValue";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";
import BackButton from "../../common/components/view/BackButton";
import View from "../../common/components/view/View";
import ViewContent from "../../common/components/view/ViewContent";
import ViewHeader from "../../common/components/view/ViewHeader";
import ViewTitle from "../../common/components/view/ViewTitle";
import { useFlash } from "../../common/contexts/flash";
import CommentsField from "../../pig-activity/components/CommentsField";
import { useFuelAssetQuery, usePostFuelMutation } from "../graphql";

interface ViewParams {
  asset: string;
}

interface FormData {
  asset: string;
  postingDate: string;
  gallons: number;
  mileage: number;
  comments?: string;
}

const FuelView: React.FC = () => {
  const [totalCostState, setTotalCostState] = useState(0);
  const history = useHistory();
  const params = useParams<ViewParams>();
  const formContext = useForm<FormData>();
  const { loading, data } = useFuelAssetQuery({
    variables: {
      number: params.asset
    }
  });

  const { fuelAsset } = data || {};
  const { setMessage } = useFlash();
  const { watch } = formContext;
  const [post] = usePostFuelMutation();

  const onSubmit: OnSubmit<FormData> = async data => {
    try {
      await post({
        variables: {
          input: {
            ...data,
            asset: params.asset
          }
        }
      });
      setMessage({
        message: "Entry recorded successfully.",
        level: "success",
        timeout: 2000
      });
      history.push("/fuel-maintenance");
    } catch (e) {
      setMessage({
        message: e.toString(),
        level: "error"
      });
    }
  };

  const gallons = watch("gallons") || 0;

  useEffect(() => {
    if (data && data.fuelAsset && data.fuelAsset.fuelCost) {
      const test: number = gallons * data.fuelAsset.fuelCost;
      setTotalCostState(Math.round(test * 100) / 100);
    }
  }, [gallons, data]);

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <ViewTitle>Fuel</ViewTitle>
      </ViewHeader>
      <ViewContent loading={loading}>
        {fuelAsset && (
          <Form context={formContext} onSubmit={onSubmit}>
            <FormField name="asset">
              <FormFieldLabel className="text-xl">
                {fuelAsset.description}
              </FormFieldLabel>
              <FormFieldErrors />
            </FormField>
            <FormField name="fuelType">
              <FormFieldLabel>Fuel Type: {fuelAsset.fuelType}</FormFieldLabel>
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
              name="gallons"
              rules={{
                required: "Number of gallons field is required."
              }}
            >
              <FormFieldLabel>
                # of Gallons at ${fuelAsset.fuelCost.toFixed(2)}
              </FormFieldLabel>
              <FormFieldInput>
                <NumberInput className="w-32" />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormField name="totalCost">
              <FormFieldLabel>Total Cost: ${totalCostState}</FormFieldLabel>
              <FormFieldInput>
                <StaticValue className="hidden" value={totalCostState} />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormField
              name="mileage"
              rules={{
                required: "Number of miles field is required."
              }}
            >
              <FormFieldLabel>Current Miles/Hours</FormFieldLabel>
              <FormFieldInput>
                <NumberInput className="w-32" />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <CommentsField />
            <HorizontalSpacer />
            <FormSubmit />
          </Form>
        )}
      </ViewContent>
    </View>
  );
};

export default FuelView;
