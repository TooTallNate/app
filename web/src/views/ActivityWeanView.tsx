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

const ActivityWeanView: React.FC<RouteComponentProps> = ({ history }) => {
  const formContext = useForm<FormData>();
  const { user } = useAuth();
  const [
    {
      defaults: { price: defaultPrice },
      loading: loadingDefaults
    },
    setDefaults
  ] = useDefaults();
  const [postItem] = usePostItemMutation();
  const { setMessage } = useFlash();
  const { getValues, setValue } = formContext;

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
            template: ItemTemplate.Wean,
            batch: ItemBatch.Wean,
            entryType: EntryType.Positive,
            item: data.animal,
            job: data.job.number,
            quantity: data.quantity,
            weight: data.weight,
            document: getDocumentNumber("WEAN", user.username),
            amount: data.price,
            description: data.comments,
            date: new Date(),
            location: data.job.site,
            prodPostingGroup: "WEAN PIGS",
            costCenterCode: "213",
            entityType: "2"
          }
        }
      });
      if (data.price !== defaultPrice) {
        await setDefaults({ price: data.price });
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
      <Title>Wean</Title>
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

export default ActivityWeanView;
