/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect } from "react";
import { Title, View } from "../components/styled";
import { NumberInput, MultilineTextInput } from "../components/ui/text-inputs";
import { Animal, ItemTemplate, ItemBatch, EntryType } from "../entities";
import { RouteComponentProps } from "react-router";
import PigJobSelector from "../components/PigJobSelector";
import { getDocumentNumber } from "../utils";
import { useAuth } from "../contexts/auth";
import { usePostItemMutation, Job } from "../graphql";
import useDefaults from "../contexts/defaults";
import StackedButtonInput, {
  StackedButton
} from "../components/ui/StackedButtonInput";
import FullPageSpinner from "../components/FullPageSpinner";
import { useFlash } from "../contexts/flash";
import Form from "../components/ui/Form";
import FormField from "../components/ui/FormField";
import FormFieldLabel from "../components/ui/FormFieldLabel";
import FormFieldErrors from "../components/ui/FormFieldErrors";
import FormFieldInput from "../components/ui/FormFieldInput";
import FormSubmit from "../components/ui/FormSubmit";
import { OnSubmit, useForm } from "react-hook-form";

interface FormData {
  animal: string;
  job: Job;
  quantity: number;
  weight: number;
  price: number;
  comments?: string;
}

const ActivityGradeOffView: React.FC<RouteComponentProps> = ({ history }) => {
  const formContext = useForm<FormData>();
  const { user } = useAuth();
  const [
    {
      defaults: { price: defaultPrice, pigJob: defaultJob },
      loading: loadingDefaults
    },
    setDefaults
  ] = useDefaults();
  const [postItem] = usePostItemMutation();
  const { setMessage } = useFlash();
  const { getValues, setValue } = formContext;

  // Set job with default only if not already set.
  useEffect(() => {
    if (!getValues().job && defaultJob) {
      setValue("job", defaultJob);
    }
  }, [defaultJob, getValues, setValue]);

  // Set price with default only if not already set.
  useEffect(() => {
    if (!getValues().price && defaultPrice) {
      setValue("price", defaultPrice);
    }
  }, [defaultPrice, getValues, setValue]);

  const onSubmit: OnSubmit<FormData> = async data => {
    try {
      if (!user) {
        return;
      }
      await postItem({
        variables: {
          input: {
            template: ItemTemplate.GradeOff,
            batch: ItemBatch.Default,
            entryType: EntryType.Negative,
            item: data.animal,
            job: data.job.number,
            quantity: data.quantity,
            weight: data.weight,
            document: getDocumentNumber("GRDOFF", user.username),
            amount: data.price,
            description: data.comments,
            date: new Date(),
            location: data.job.site,
            costCenterCode: data.job.dimensions.costCenter,
            entityType: data.job.dimensions.entity
          }
        }
      });
      if (data.job !== defaultJob || data.price !== defaultPrice) {
        await setDefaults({ pigJob: data.job, price: data.price });
      }
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

  return loadingDefaults ? (
    <FullPageSpinner>Loading Defaults...</FullPageSpinner>
  ) : (
    <View>
      <Title>Grade Off</Title>
      <Form context={formContext} onSubmit={onSubmit}>
        <FormField
          name="animal"
          rules={{ required: "The animal field is required." }}
        >
          <FormFieldLabel>Animal</FormFieldLabel>
          <FormFieldInput>
            <StackedButtonInput orientation="vertical">
              <StackedButton value={Animal.MARKET_PIGS}>
                Market Pigs
              </StackedButton>
              <StackedButton value={Animal.GDU_PIGS}>GDU Pigs</StackedButton>
            </StackedButtonInput>
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField
          name="job"
          rules={{ required: "The job field is required." }}
        >
          <FormFieldLabel>Job</FormFieldLabel>
          <FormFieldInput>
            <PigJobSelector />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField
          name="quantity"
          rules={{
            required: "The quantity field is required."
          }}
        >
          <FormFieldLabel>Quantity</FormFieldLabel>
          <FormFieldInput>
            <NumberInput />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField
          name="weight"
          rules={{
            required: "The total weight field is required."
          }}
        >
          <FormFieldLabel>Total Weight</FormFieldLabel>
          <FormFieldInput>
            <NumberInput />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField
          name="price"
          rules={{
            required: "The price field is required."
          }}
        >
          <FormFieldLabel>Price/pig</FormFieldLabel>
          <FormFieldInput>
            <NumberInput />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormField name="comments">
          <FormFieldLabel>Comments</FormFieldLabel>
          <FormFieldInput>
            <MultilineTextInput maxLength={50} />
          </FormFieldInput>
          <FormFieldErrors />
        </FormField>
        <FormSubmit />
      </Form>
    </View>
  );
};

export default ActivityGradeOffView;
