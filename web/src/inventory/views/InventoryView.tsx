import React from "react";
// import { OnSubmit, useForm } from "react-hook-form";
// import { useHistory, useParams } from "react-router-dom";
// import Form from "../../common/components/form/Form";
// import FormField from "../../common/components/form/FormField";
// import FormFieldErrors from "../../common/components/form/FormFieldErrors";
// import FormFieldInput from "../../common/components/form/FormFieldInput";
// import FormFieldLabel from "../../common/components/form/FormFieldLabel";
// import FormSubmit from "../../common/components/form/FormSubmit";
// import DateInput from "../../common/components/input/DateInput";
// import DecimalInput from "../../common/components/input/DecimalInput";
// import StaticValue from "../../common/components/input/StaticValue";
// import HorizontalSpacer from "../../common/components/layout/HorizontalSpacer";
// import BackButton from "../../common/components/view/BackButton";
// import FullPageSlideover from "../../common/components/view/FullPageSlideover";
// import View from "../../common/components/view/View";
// import ViewContent from "../../common/components/view/ViewContent";
// import ViewHeader from "../../common/components/view/ViewHeader";
// import ViewTitle from "../../common/components/view/ViewTitle";
// import { useFlash } from "../../common/contexts/flash";
// import CommentsField from "../../livestock-activity/components/CommentsField";
// import {
//   useFuelAssetQuery,
//   useFuelHistoryAssetQuery,
//   usePostFuelMutation
// } from "../graphql";
// import FuelHistoryView from "./FuelHistoryView";

// interface ViewParams {
//   item: string;
// }

// interface FormData {
//   item: string;
//   type: string;
//   postingDate: string;
//   quantity: number;
//   group: string;
//   comments?: string;
// }

const InventoryView: React.FC = () => {
  // const [totalCostState, setTotalCostState] = useState(0);
  // const history = useHistory();
  // const params = useParams<ViewParams>();
  // const formContext = useForm<FormData>();
  // const { loading, data } = useFuelAssetQuery({
  //   variables: {
  //     number: params.asset
  //   }
  // });

  // const {
  //   loading: historyLoading,
  //   error: historyError,
  //   data: historyData
  // } = useFuelHistoryAssetQuery({
  //   variables: {
  //     number: params.asset
  //   }
  // });

  // const { fuelAsset } = data || {};
  // const { fuelHistoryAsset } = historyData || {};

  // const { setMessage } = useFlash();
  // const { watch } = formContext;
  // const [post] = usePostFuelMutation();

  // const onSubmit: OnSubmit<FormData> = async data => {
  //   try {
  //     await post({
  //       variables: {
  //         input: {
  //           ...data,
  //           asset: params.asset
  //         }
  //       }
  //     });
  //     setMessage({
  //       message: "Entry recorded successfully.",
  //       level: "success",
  //       timeout: 2000
  //     });
  //     history.push("/fuel");
  //   } catch (e) {
  //     const error: any = e;
  //     setMessage({
  //       message: error.toString(),
  //       level: "error",
  //       timeout: 3000
  //     });
  //   }
  // };

  // const gallons = watch("gallons") || 0;

  // useEffect(() => {
  //   if (data && data.fuelAsset && data.fuelAsset.fuelCost) {
  //     const test: number = gallons * data.fuelAsset.fuelCost;
  //     setTotalCostState(Math.round(test * 100) / 100);
  //   }
  // }, [gallons, data]);

  // const costPerGallonString = `@ ${fuelAsset &&
  //   fuelAsset.fuelCost.toFixed(2)}/gal`;

  return (
    <div>hello world</div>
    // <View>
    //   <ViewHeader>
    //     <BackButton />
    //     <ViewTitle>Fuel</ViewTitle>
    //   </ViewHeader>
    //   <ViewContent loading={loading}>
    //     {fuelAsset && (
    //       <>
    //         <Form context={formContext} onSubmit={onSubmit}>
    //           <FormField name="asset">
    //             <FormFieldLabel className="text-xl">
    //               {`${fuelAsset.number} - ${fuelAsset.description}`}
    //             </FormFieldLabel>
    //             <FormFieldErrors />
    //           </FormField>
    //           <FormField name="fuelType">
    //             <FormFieldLabel className="p-0">
    //               Fuel Type: {fuelAsset.fuelType}
    //             </FormFieldLabel>
    //             <FormFieldErrors />
    //           </FormField>
    //           <FormField name="AssetHistory">
    //             <FormFieldLabel className="p-0">
    //               <a
    //                 className="font-medium underline text-yellow-700 hover:text-yellow-600"
    //                 onClick={() => setShowHistory(true)}
    //               >
    //                 View Asset History
    //               </a>
    //             </FormFieldLabel>
    //           </FormField>
    //           <FormField name="postingDate">
    //             <FormFieldLabel>Activity Date</FormFieldLabel>
    //             <FormFieldInput>
    //               <DateInput />
    //             </FormFieldInput>
    //             <FormFieldErrors />
    //           </FormField>
    //           <FormField
    //             name="gallons"
    //             rules={{
    //               required: "Number of gallons field is required."
    //             }}
    //           >
    //             <FormFieldLabel># of Gallons</FormFieldLabel>
    //             <FormFieldInput>
    //               <DecimalInput
    //                 decimalPlaces={2}
    //                 step=".01"
    //                 className="w-32"
    //                 addon={costPerGallonString}
    //               />
    //             </FormFieldInput>
    //             <FormFieldErrors />
    //           </FormField>
    //           <FormField name="totalCost">
    //             <FormFieldLabel>Total Cost: ${totalCostState}</FormFieldLabel>
    //             <FormFieldInput>
    //               <StaticValue className="hidden" value={totalCostState} />
    //             </FormFieldInput>
    //             <FormFieldErrors />
    //           </FormField>
    //           <FormField
    //             name="mileage"
    //             rules={{ required: "Number of miles field is required." }}
    //           >
    //             <FormFieldLabel>Current Miles/Hours</FormFieldLabel>
    //             <FormFieldInput>
    //               <DecimalInput decimalPlaces={2} step=".01" className="w-32" />
    //             </FormFieldInput>
    //             <FormFieldErrors />
    //           </FormField>
    //           <CommentsField />
    //           <HorizontalSpacer />
    //           <FormSubmit />
    //         </Form>
    //         <FullPageSlideover
    //           toggle={setShowHistory}
    //           open={showHistory}
    //           title="Fuel History"
    //           loading={historyLoading}
    //         >
    //           <FuelHistoryView
    //             fuelHistoryAsset={fuelHistoryAsset || []}
    //             fuelAsset={fuelAsset}
    //           />
    //         </FullPageSlideover>
    //       </>
    //     )}
    //   </ViewContent>
    // </View>
  );
};

export default InventoryView;
