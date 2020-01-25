/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect } from "react";
import { Title, View, Group, Output } from "../components/styled";
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
  naturalQuantity: number;
  euthanizedQuantity: number;
  weight: number;
  price: number;
  comments?: string;
}

const ActivityMortalityView: React.FC<RouteComponentProps> = ({ history }) => {
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
  const { getValues, setValue, watch } = formContext;

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

  const { euthanizedQuantity, naturalQuantity } = watch([
    "euthanizedQuantity",
    "naturalQuantity"
  ]);
  const totalQuantity = (euthanizedQuantity || 0) + (naturalQuantity || 0);

  const onSubmit: OnSubmit<FormData> = async data => {
    try {
      if (!user) {
        return;
      }
      if (data.naturalQuantity > 0) {
        await postItem({
          variables: {
            input: {
              template: ItemTemplate.Mortality,
              batch: ItemBatch.Mortality,
              entryType: EntryType.Negative,
              item: data.animal,
              job: data.job.number,
              quantity: data.naturalQuantity,
              weight: data.weight,
              document: getDocumentNumber("MORT", user.username),
              amount: data.price,
              description: data.comments,
              date: new Date(),
              location: data.job.site,
              costCenterCode: data.job.dimensions.costCenter,
              entityType: data.job.dimensions.entity
            }
          }
        });
      }
      if (data.euthanizedQuantity > 0) {
        await postItem({
          variables: {
            input: {
              template: ItemTemplate.Mortality,
              batch: ItemBatch.Mortality,
              entryType: EntryType.Negative,
              item: data.animal,
              job: data.job.number,
              quantity: data.euthanizedQuantity,
              weight: data.weight,
              document: getDocumentNumber("MORT", user.username),
              amount: data.price,
              description: data.comments,
              date: new Date(),
              location: data.job.site,
              costCenterCode: data.job.dimensions.costCenter,
              entityType: data.job.dimensions.entity
            }
          }
        });
      }
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
      <Title>Mortality</Title>
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
              <StackedButton value={Animal.SOWS}>Sows</StackedButton>
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
        <Group className="flex mt-0">
          <FormField
            className="flex-1"
            name="naturalQuantity"
            rules={{
              required: "The natural quantity field is required."
            }}
          >
            <FormFieldLabel>Natural</FormFieldLabel>
            <FormFieldInput>
              <NumberInput />
            </FormFieldInput>
            <FormFieldErrors />
          </FormField>
          <div className="flex-auto flex-grow-0 w-8 text-center leading-none mt-16">
            +
          </div>
          <FormField
            className="flex-1"
            name="euthanizedQuantity"
            rules={{
              required: "The euthanized quantity field is required."
            }}
          >
            <FormFieldLabel>Euthanized</FormFieldLabel>
            <FormFieldInput>
              <NumberInput />
            </FormFieldInput>
            <FormFieldErrors />
          </FormField>
          <div className="flex-auto flex-grow-0 w-8 text-center leading-none mt-16">
            =
          </div>
          <FormField className="w-18" name="total-quantity">
            <FormFieldLabel>Total</FormFieldLabel>
            <FormFieldInput>
              <output className="p-0 mt-2 h-6 text-base block">
                {totalQuantity}
              </output>
            </FormFieldInput>
            <FormFieldErrors />
          </FormField>
        </Group>
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

export default ActivityMortalityView;
