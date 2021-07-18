import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { OnSubmit, useForm } from "react-hook-form";
import Form from "../../common/components/form/Form";
import FormField from "../../common/components/form/FormField";
import FormFieldErrors from "../../common/components/form/FormFieldErrors";
import FormFieldInput from "../../common/components/form/FormFieldInput";
import FormFieldLabel from "../../common/components/form/FormFieldLabel";
import FormSubmit from "../../common/components/form/FormSubmit";
import DateInput from "../../common/components/input/DateInput";
import NumberInput from "../../common/components/input/NumberInput";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";
import BackButton from "../../common/components/view/BackButton";
import View from "../../common/components/view/View";
import ViewContent from "../../common/components/view/ViewContent";
import ViewHeader from "../../common/components/view/ViewHeader";
import ViewTitle from "../../common/components/view/ViewTitle";
import CommentsField from "../../pig-activity/components/CommentsField";
import {
  useMaintenanceAssetQuery,
  usePostMaintenanceMutation
} from "../graphql";
import { useFlash } from "../../common/contexts/flash";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import StaticValue from "../../common/components/input/StaticValue";

interface ViewParams {
  asset: string;
}

interface FormData {
  asset: string;
  postingDate?: string;
  type: string;
  mileage: number;
  workHours: number;
  comments?: string;
}

const MaintenanceView: React.FC = () => {
  const [totalCostState, setTotalCostState] = useState(0);
  const history = useHistory();
  const params = useParams<ViewParams>();
  const formContext = useForm<FormData>();
  const [itemCost, setItemCost] = useState(0);
  const { loading, data } = useMaintenanceAssetQuery({
    variables: {
      number: params.asset
    }
  });

  const { setMessage } = useFlash();
  const { watch } = formContext;
  const [post] = usePostMaintenanceMutation();

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
      console.log(JSON.stringify(data, null, 2));
      setMessage({
        message: "Entry recorded successfully.",
        level: "success",
        timeout: 2000
      });
      history.push("/maintenance");
    } catch (e) {
      setMessage({
        message: e.toString(),
        level: "error",
        timeout: 3000
      });
    }
  };

  useEffect(() => {
    if (data && data.item && data.item.cost) {
      setItemCost(data.item.cost);
    }
  }, [data]);

  const workHours = watch("workHours") || 0;

  useEffect(() => {
    if (data && data.item && data.item.cost) {
      const total: number = workHours * data.item.cost;
      setTotalCostState(Math.round(total * 100) / 100);
    }
  }, [workHours, data]);

  return (
    <View>
      <ViewHeader>
        <BackButton />
        <ViewTitle>Maintenance</ViewTitle>
      </ViewHeader>
      <ViewContent loading={loading}>
        {data && data.maintenanceAsset && (
          <Form context={formContext} onSubmit={onSubmit}>
            <FormField name="asset">
              <FormFieldLabel className="text-xl">
                {data.maintenanceAsset.description}
              </FormFieldLabel>
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
              name="type"
              rules={{
                required: "A maintenance type is required"
              }}
            >
              <FormFieldLabel>Maintenance Type</FormFieldLabel>
              <FormFieldInput>
                <TypeaheadInput
                  items={((data && data.maintenanceIntervals) || []).map(
                    interval => ({
                      value: interval.code || "",
                      title: interval.code || ""
                    })
                  )}
                />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormField
              name="mileage"
              rules={{ required: "Number of miles field is required." }}
            >
              <FormFieldLabel>Current Miles/Hours</FormFieldLabel>
              <FormFieldInput>
                <NumberInput className="w-32" />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormField
              name="workHours"
              rules={{ required: "Number of work hours field is required." }}
            >
              <FormFieldLabel>Work Hours</FormFieldLabel>
              <span className="ml-2">@ ${itemCost.toFixed(2)}</span>
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
            <CommentsField />
            <HorizontalSpacer />
            <FormSubmit />
          </Form>
        )}
      </ViewContent>
    </View>
  );
};

export default MaintenanceView;
