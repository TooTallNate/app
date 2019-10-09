/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, FormEventHandler } from "react";
import { useCreateItemEntry } from "../service";
import NumberInput from "../components/ui/NumberInput";
import ButtonInput from "../components/ui/ButtonInput";
import ViewTitle from "../components/ui/ViewTitle";
import { RouteComponentProps } from "react-router";
import { Animal, ItemTemplate, ItemBatch, EntryType, Job } from "../entities";
import AnimalSelector from "../components/AnimalSelector";
import JobSelector from "../components/JobSelector";
import { useAuth } from "../contexts/auth";
import { getDocumentNumber } from "../utils";
import MultilineTextInput from "../components/ui/MultilineTextInput";
import FormField from "../components/ui/FormField";

const ANIMALS = [Animal.MARKET_PIGS, Animal.GDU_PIGS];

interface FormState {
  animal?: Animal;
  job?: Job;
  quantity?: number;
  weight?: number;
  price?: number;
  comments?: string;
}

const GradeOffFormView: React.FC<RouteComponentProps> = ({ history }) => {
  const { user } = useAuth();
  const [formState, setFormState] = useState<FormState>({});
  const { createItemEntry, loading } = useCreateItemEntry();

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
      await createItemEntry({
        template: ItemTemplate.GradeOff,
        batch: ItemBatch.Default,
        entryType: EntryType.Negative,
        animal: formState.animal,
        job: formState.job,
        quantity: formState.quantity,
        weight: formState.weight,
        document: getDocumentNumber("GRDOFF", user.username),
        price: formState.price,
        comments: formState.comments
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
      <ViewTitle>Grade Off</ViewTitle>
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
        <FormField name="quantity" label="Quantity">
          <NumberInput
            value={formState.quantity}
            onChange={value => setFormState({ ...formState, quantity: value })}
          />
        </FormField>
        <FormField name="weight" label="Weight">
          <NumberInput
            value={formState.weight}
            onChange={weight => setFormState({ ...formState, weight })}
          />
        </FormField>
        <FormField name="price" label="Price">
          <NumberInput
            value={formState.price}
            onChange={price => setFormState({ ...formState, price })}
          />
        </FormField>
        <FormField name="comments" label="Comments">
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

export default GradeOffFormView;
