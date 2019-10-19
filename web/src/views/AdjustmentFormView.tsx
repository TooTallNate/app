/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, FormEventHandler } from "react";
import NumberInput from "../components/ui/NumberInput";
import ButtonInput from "../components/ui/ButtonInput";
import ViewTitle from "../components/ui/ViewTitle";
import { Animal, ItemTemplate, ItemBatch, EntryType } from "../entities";
import { RouteComponentProps } from "react-router";
import AnimalSelector from "../components/AnimalSelector";
import JobSelector from "../components/JobSelector";
import { getDocumentNumber } from "../utils";
import { useAuth } from "../contexts/auth";
import MultilineTextInput from "../components/ui/MultilineTextInput";
import FormField from "../components/ui/FormField";
import { usePostItemMutation, Job } from "../graphql";

const ANIMALS = [Animal.MARKET_PIGS, Animal.GDU_PIGS];

interface FormState {
  animal?: Animal;
  job?: Job;
  quantity?: number;
  weight?: number;
  price?: number;
  comments?: string;
}

const AdjustmentFormView: React.FC<RouteComponentProps> = ({ history }) => {
  const { user } = useAuth();
  const [formState, setFormState] = useState<FormState>({});
  const [postItem, { loading }] = usePostItemMutation();

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
            template: ItemTemplate.Adjustment,
            batch: ItemBatch.Default,
            entryType:
              formState.quantity >= 0 ? EntryType.Positive : EntryType.Negative,
            item: formState.animal,
            job: formState.job.number,
            quantity: Math.abs(formState.quantity),
            weight: formState.weight,
            document: getDocumentNumber("ADJ", user.username),
            amount: formState.price,
            description: formState.comments,
            date: new Date(),
            location: formState.job.site
          }
        }
      });
      history.push("/");
    } catch (e) {
      alert(`failed to post, ${e}`);
    }
  };

  return (
    <div
      css={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <ViewTitle>Adjustment</ViewTitle>
      <form
        css={{
          overflowX: "auto",
          minHeight: 0,
          flexGrow: 1,
          padding: "0 16px calc(100vh - 289px) 16px"
        }}
        onSubmit={onSubmit}
      >
        <FormField label="Animal" name="animal">
          <AnimalSelector
            name="animal"
            animals={ANIMALS}
            value={formState.animal}
            onChange={animal => {
              setFormState({ ...formState, animal });
            }}
          />
        </FormField>
        <FormField label="Job" name="job">
          <JobSelector
            value={formState.job}
            onChange={job => {
              setFormState({ ...formState, job });
            }}
          />
        </FormField>
        <FormField label="Quantity" name="quantity">
          <NumberInput
            value={formState.quantity}
            onChange={value => setFormState({ ...formState, quantity: value })}
          />
        </FormField>
        <FormField label="Weight" name="weight">
          <NumberInput
            value={formState.weight}
            onChange={weight => setFormState({ ...formState, weight })}
          />
        </FormField>
        <FormField label="Price" name="price">
          <NumberInput
            value={formState.price}
            onChange={price => setFormState({ ...formState, price })}
          />
        </FormField>
        <FormField label="Comments" name="comments">
          <MultilineTextInput
            value={formState.comments}
            maxLength={50}
            onChange={e =>
              setFormState({ ...formState, comments: e.target.value })
            }
          />
        </FormField>
        <ButtonInput
          type="submit"
          css={{
            marginTop: 44
          }}
          disabled={loading}
        >
          Submit
        </ButtonInput>
      </form>
    </div>
  );
};

export default AdjustmentFormView;
