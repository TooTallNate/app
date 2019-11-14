/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, FormEventHandler, useEffect } from "react";
import { Button, Title, View } from "../components/styled";
import { NumberInput, MultilineTextInput } from "../components/ui/text-inputs";
import { Animal, ItemTemplate, ItemBatch, EntryType } from "../entities";
import { RouteComponentProps } from "react-router";
import JobSelector from "../components/JobSelector";
import { getDocumentNumber } from "../utils";
import { useAuth } from "../contexts/auth";
import Field from "../components/ui/Field";
import { usePostItemMutation, Job } from "../graphql";
import useDefaults from "../contexts/defaults";
import StackedButtonInput, {
  StackedButton
} from "../components/ui/StackedButtonInput";
import FullPageSpinner from "../components/FullPageSpinner";

interface FormState {
  animal?: Animal;
  job?: Job;
  quantity?: number;
  weight?: number;
  price?: number;
  comments?: string;
}

const ActivityPurchaseView: React.FC<RouteComponentProps> = ({ history }) => {
  const { user } = useAuth();
  const [formState, setFormState] = useState<FormState>({});
  const [
    {
      defaults: { price: defaultPrice },
      loading: loadingDefaults
    },
    setDefaults
  ] = useDefaults();
  const [postItem, { loading }] = usePostItemMutation();

  // Set price with default only if not already set.
  useEffect(() => {
    if (
      typeof formState.price === "undefined" &&
      typeof defaultPrice === "number"
    ) {
      setFormState(formState => ({
        ...formState,
        price: defaultPrice
      }));
    }
  }, [defaultPrice, formState.price]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    try {
      if (
        !formState.animal ||
        !formState.job ||
        !formState.quantity ||
        !formState.weight ||
        !formState.price ||
        !user
      ) {
        return;
      }
      await postItem({
        variables: {
          input: {
            template: ItemTemplate.Wean,
            batch: ItemBatch.Wean,
            entryType: EntryType.Positive,
            item: formState.animal,
            job: formState.job.number,
            quantity: formState.quantity,
            weight: formState.weight,
            document: getDocumentNumber("PURCH", user.username),
            amount: formState.price,
            description: formState.comments,
            date: new Date(),
            location: formState.job.site,
            costCenterCode: formState.job.dimensions.costCenter,
            entityType: formState.job.dimensions.entity
          }
        }
      });
      if (formState.price !== defaultPrice) {
        await setDefaults({ price: formState.price });
      }
      history.push("/");
    } catch (e) {
      alert(`failed to post, ${e}`);
    }
  };

  return loadingDefaults ? (
    <FullPageSpinner>Loading Defaults...</FullPageSpinner>
  ) : (
    <View>
      <Title>Purchase</Title>
      <form
        css={{
          overflowX: "auto",
          minHeight: 0,
          flexGrow: 1,
          padding: "0 16px 16px 16px"
        }}
        onSubmit={onSubmit}
      >
        <Field label="Animal" name="animal">
          <StackedButtonInput
            value={formState.animal}
            onChange={animal => setFormState({ ...formState, animal })}
          >
            <StackedButton value={Animal.MARKET_PIGS}>
              Market Pigs
            </StackedButton>
            <StackedButton value={Animal.GDU_PIGS}>GDU Pigs</StackedButton>
          </StackedButtonInput>
        </Field>
        <Field label="Job" name="job">
          <JobSelector
            value={formState.job}
            onChange={job => {
              setFormState({ ...formState, job });
            }}
          />
        </Field>
        <Field name="quantity" label="Quantity">
          <NumberInput
            value={formState.quantity}
            onChange={quantity => setFormState({ ...formState, quantity })}
          />
        </Field>
        <Field name="weight" label="Total Weight">
          <NumberInput
            value={formState.weight}
            onChange={weight => setFormState({ ...formState, weight })}
          />
        </Field>
        <Field name="price" label="Price/pig">
          <NumberInput
            value={formState.price}
            onChange={price => setFormState({ ...formState, price })}
          />
        </Field>
        <Field label="Comments" name="comments">
          <MultilineTextInput
            value={formState.comments}
            maxLength={50}
            onChange={comments => setFormState({ ...formState, comments })}
          />
        </Field>
        <Button
          type="submit"
          css={{
            marginTop: 44
          }}
          disabled={loading}
        >
          Submit
        </Button>
      </form>
    </View>
  );
};

export default ActivityPurchaseView;
