/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, FormEventHandler, useEffect } from "react";
import { Button, Title, View } from "../components/styled";
import { NumberInput, MultilineTextInput } from "../components/ui/text-inputs";
import { Animal, ItemTemplate, ItemBatch, EntryType } from "../entities";
import { RouteComponentProps } from "react-router";
import PigJobSelector from "../components/PigJobSelector";
import { getDocumentNumber } from "../utils";
import { useAuth } from "../contexts/auth";
import Field from "../components/ui/Field";
import { usePostItemMutation, Job } from "../graphql";
import useDefaults from "../contexts/defaults";
import StackedButtonInput, {
  StackedButton
} from "../components/ui/StackedButtonInput";
import FullPageSpinner from "../components/FullPageSpinner";
import { useFlash } from "../contexts/flash";
import useForm from "react-hook-form";
import FieldLabel from "../components/ui/FieldLabel";
import FieldErrors from "../components/ui/FieldErrors";

interface FormData {
  animal: string;
  quantity: number;
  weight: number;
  price: number;
}

// TODO:
// - get text fields selectors and sliders working with form hooks
// - figure out how to get number fields to work as numbers
// - figure out how to get errors into the field error component without having to pass it
//     Maybe pass errors into form component which uses context?
// - handle submit

const ActivityAdjustmentView: React.FC<RouteComponentProps> = ({ history }) => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const { user } = useAuth();
  const [
    {
      defaults: { price: defaultPrice, pigJob: defaultJob },
      loading: loadingDefaults
    },
    setDefaults
  ] = useDefaults();
  const [postItem, { loading }] = usePostItemMutation();
  const { setMessage } = useFlash();

  // // Set job with default only if not already set.
  // useEffect(() => {
  //   if (!formState.job && defaultJob) {
  //     setFormState(formState => ({
  //       ...formState,
  //       job: defaultJob
  //     }));
  //   }
  // }, [defaultJob, formState.job]);

  // // Set price with default only if not already set.
  // useEffect(() => {
  //   if (
  //     typeof formState.price === "undefined" &&
  //     typeof defaultPrice === "number"
  //   ) {
  //     setFormState(formState => ({
  //       ...formState,
  //       price: defaultPrice
  //     }));
  //   }
  // }, [defaultPrice, formState.price]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    // e.preventDefault();
    // try {
    //   if (
    //     !formState.animal ||
    //     !formState.job ||
    //     !formState.quantity ||
    //     !formState.weight ||
    //     !formState.price ||
    //     !user
    //   ) {
    //     return;
    //   }
    //   await postItem({
    //     variables: {
    //       input: {
    //         template: ItemTemplate.Adjustment,
    //         batch: ItemBatch.Default,
    //         entryType:
    //           formState.quantity >= 0 ? EntryType.Positive : EntryType.Negative,
    //         item: formState.animal,
    //         job: formState.job.number,
    //         quantity: Math.abs(formState.quantity),
    //         weight: formState.weight,
    //         document: getDocumentNumber("ADJ", user.username),
    //         amount: formState.price,
    //         description: formState.comments,
    //         date: new Date(),
    //         location: formState.job.site,
    //         costCenterCode: formState.job.dimensions.costCenter,
    //         entityType: formState.job.dimensions.entity
    //       }
    //     }
    //   });
    //   if (formState.job !== defaultJob) {
    //     await setDefaults({ pigJob: formState.job });
    //   }
    //   if (formState.price !== defaultPrice) {
    //     await setDefaults({ price: formState.price });
    //   }
    //   setMessage({
    //     message: "Entry recorded successfully.",
    //     level: "success",
    //     timeout: 2000
    //   });
    //   history.push("/");
    // } catch (e) {
    //   setMessage({
    //     message: e.toString(),
    //     level: "error"
    //   });
    // }
  };

  return loadingDefaults ? (
    <FullPageSpinner>Loading Defaults...</FullPageSpinner>
  ) : (
    <View>
      <Title>Adjustment</Title>
      <form
        css={{
          overflowX: "auto",
          minHeight: 0,
          flexGrow: 1,
          padding: "0 16px 16px 16px"
        }}
        onSubmit={handleSubmit(data => {
          console.log(data);
        })}
      >
        <Field
          name="animal"
          validation={register({ required: "The animal field is required." })}
        >
          <FieldLabel>Animal</FieldLabel>
          <FieldErrors errors={errors} />
          <StackedButtonInput orientation="vertical">
            <StackedButton value={Animal.MARKET_PIGS}>
              Market Pigs
            </StackedButton>
            <StackedButton value={Animal.GDU_PIGS}>GDU Pigs</StackedButton>
          </StackedButtonInput>
        </Field>
        <Field label="Job" name="job">
          <PigJobSelector
          // value={formState.job}
          // onChange={job => {
          //   setFormState({ ...formState, job });
          // }}
          />
        </Field>
        <Field
          name="quantity"
          validation={register({
            required: "The quantity field is required."
          })}
        >
          <FieldLabel>Quantity</FieldLabel>
          <FieldErrors errors={errors} />
          <NumberInput />
        </Field>
        <Field
          name="weight"
          validation={register({
            required: "The total weight field is required."
          })}
        >
          <FieldLabel>Total Weight</FieldLabel>
          <FieldErrors errors={errors} />
          <NumberInput />
        </Field>
        <Field
          name="price"
          validation={register({
            required: "The price field is required."
          })}
        >
          <FieldLabel>Price/pig</FieldLabel>
          <FieldErrors errors={errors} />
          <NumberInput />
        </Field>
        <Field label="Comments" name="comments">
          <MultilineTextInput
          // value={formState.comments}
          // maxLength={50}
          // onChange={comments => setFormState({ ...formState, comments })}
          />
        </Field>
        <Button
          type="submit"
          css={{
            marginTop: 44
          }}
          // disabled={loading}
        >
          Submit
        </Button>
      </form>
    </View>
  );
};

export default ActivityAdjustmentView;
