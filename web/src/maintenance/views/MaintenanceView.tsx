import { map, uniqBy } from "lodash";
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
import DecimalInput from "../../common/components/input/DecimalInput";
import StaticValue from "../../common/components/input/StaticValue";
import TypeaheadInput from "../../common/components/input/TypeaheadInput";
import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";
import BackButton from "../../common/components/view/BackButton";
import FullPageSlideover from "../../common/components/view/FullPageSlideover";
import View from "../../common/components/view/View";
import ViewContent from "../../common/components/view/ViewContent";
import ViewHeader from "../../common/components/view/ViewHeader";
import ViewTitle from "../../common/components/view/ViewTitle";
import { useFlash } from "../../common/contexts/flash";
import CommentsField from "../../livestock-activity/components/CommentsField";
import {
  useMaintenanceAssetQuery,
  useMaintenanceHistoryAssetQuery,
  usePostMaintenanceMutation
} from "../graphql";
import MainentanceHistoryView from "./MainentanceHistoryView";

interface ViewParams {
  asset: string;
}

interface FormData {
  asset: string;
  postingDate?: string;
  type: string;
  mileage?: number;
  workHours: number;
  comments?: string;
}

const MaintenanceView: React.FC = () => {
  const [showHistory, setShowHistory] = useState(true);
  const [totalCostState, setTotalCostState] = useState("  ");
  const history = useHistory();
  const params = useParams<ViewParams>();
  const formContext = useForm<FormData>();
  const [itemCost, setItemCost] = useState(0);
  const { loading, data } = useMaintenanceAssetQuery({
    variables: {
      number: params.asset
    }
  });

  const {
    loading: historyLoading,
    error: historyError,
    data: historyData
  } = useMaintenanceHistoryAssetQuery({
    variables: { number: params.asset }
  });

  const { maintenanceHistoryAsset } = historyData || {};

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
      setTotalCostState((Math.round(total * 100) / 100).toFixed(2));
    }
  }, [workHours, data]);

  const maintenanceTypes = uniqBy(
    map(maintenanceHistoryAsset || [], a => ({
      value: a.maintenanceCode || "",
      title: a.codeDescription || ""
    })),
    "value"
  );

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
                {`${data.maintenanceAsset.number} - ${data.maintenanceAsset.description}`}
              </FormFieldLabel>
              <FormFieldErrors />
            </FormField>
            <FormFieldLabel className="p-0">
              <a
                className="font-medium underline text-yellow-700 hover:text-yellow-600"
                onClick={() => setShowHistory(true)}
              >
                View Asset History
              </a>
            </FormFieldLabel>
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
              <FormField name="AssetHistory"></FormField>
              <FormFieldInput>
                <TypeaheadInput items={maintenanceTypes} />
              </FormFieldInput>
              <FormFieldErrors />
            </FormField>
            <FormField name="mileage">
              <FormFieldLabel>Current Miles/Hours</FormFieldLabel>
              <FormFieldInput>
                <DecimalInput decimalPlaces={2} step=".01" className="w-32" />
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
                <DecimalInput decimalPlaces={2} step=".01" className="w-32" />
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
      <FullPageSlideover
        toggle={setShowHistory}
        open={showHistory}
        title="Maintenance History"
        loading={historyLoading}
      >
        <MainentanceHistoryView
          maintenanceHistoryAsset={maintenanceHistoryAsset}
          maintenanceTypes={maintenanceTypes}
        />
      </FullPageSlideover>
    </View>
  );
};

export default MaintenanceView;
