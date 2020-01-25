/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect } from "react";
import { Title, View, Group } from "../components/styled";
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
  fromAnimal: Animal;
  toAnimal: Animal;
  fromJob: Job;
  toJob: Job;
  quantity: number;
  weight: number;
  price: number;
  comments?: string;
}

const ActivityMoveView: React.FC<RouteComponentProps> = ({ history }) => {
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
    if (!getValues().fromJob && defaultJob) {
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
            template: ItemTemplate.Move,
            batch: ItemBatch.Move,
            entryType: EntryType.Negative,
            item: data.fromAnimal,
            job: data.fromJob.number,
            quantity: data.quantity,
            weight: data.weight,
            document: getDocumentNumber("MOVE", user.username),
            amount: data.price,
            description: data.comments,
            date: new Date(),
            location: data.fromJob.site,
            costCenterCode: data.fromJob.dimensions.costCenter,
            entityType: data.fromJob.dimensions.entity
          }
        }
      });
      await postItem({
        variables: {
          input: {
            template: ItemTemplate.Move,
            batch: ItemBatch.Move,
            entryType: EntryType.Positive,
            item: data.toAnimal,
            job: data.toJob.number,
            quantity: data.quantity,
            weight: data.weight,
            document: getDocumentNumber("MOVE", user.username),
            amount: data.price,
            description: data.comments,
            date: new Date(),
            location: data.toJob.site,
            costCenterCode: data.toJob.dimensions.costCenter,
            entityType: data.toJob.dimensions.entity
          }
        }
      });
      if (data.fromJob !== defaultJob || data.price !== defaultPrice) {
        await setDefaults({ pigJob: data.fromJob, price: data.price });
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
      <Title>Move</Title>
      <Form context={formContext} onSubmit={onSubmit}>
        <Group className="flex mt-0">
          <FormField
            className="w-full mr-4"
            name="fromAnimal"
            rules={{ required: "The from animal field is required." }}
          >
            <FormFieldLabel>From Animal</FormFieldLabel>
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
            className="w-full ml-4"
            name="toAnimal"
            rules={{ required: "The to animal field is required." }}
          >
            <FormFieldLabel>To Animal</FormFieldLabel>
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
        </Group>
        <Group className="flex mt-0">
          <FormField
            className="w-full mr-4"
            name="fromJob"
            rules={{ required: "The from job field is required." }}
          >
            <FormFieldLabel>From Job</FormFieldLabel>
            <FormFieldInput>
              <PigJobSelector />
            </FormFieldInput>
            <FormFieldErrors />
          </FormField>
          <FormField
            className="w-full ml-4"
            name="toJob"
            rules={{ required: "The to job field is required." }}
          >
            <FormFieldLabel>To Job</FormFieldLabel>
            <FormFieldInput>
              <PigJobSelector />
            </FormFieldInput>
            <FormFieldErrors />
          </FormField>
        </Group>
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

export default ActivityMoveView;
