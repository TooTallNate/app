/** @jsx jsx */
import { jsx } from "@emotion/core";
import FormLabel from "../components/ui/FormLabel";
import { useState, FormEventHandler } from "react";
import { useCreateItemEntry } from "../service";
import NumberInput from "../components/ui/NumberInput";
import ButtonInput from "../components/ui/ButtonInput";
import ViewTitle from "../components/ui/ViewTitle";
import { Animal, ItemTemplate, ItemBatch, EntryType, Job } from "../entities";
import { RouteComponentProps } from "react-router";
import AnimalSelector from "../components/AnimalSelector";
import JobSelector from "../components/JobSelector";
import { getDocumentNumber } from "../utils";
import { useAuth } from "../contexts/auth";

const ANIMALS = [Animal.MARKET_PIGS, Animal.GDU_PIGS, Animal.SOWS];

interface FormState {
  fromAnimal?: Animal;
  toAnimal?: Animal;
  fromJob?: Job;
  toJob?: Job;
  quantity?: number;
  weight?: number;
  price?: number;
}

const MoveFormView: React.FC<RouteComponentProps> = ({ history }) => {
  const { user } = useAuth();
  const [formState, setFormState] = useState<FormState>({});
  const { createItemEntry, loading } = useCreateItemEntry();

  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    try {
      if (
        !formState.toAnimal ||
        !formState.toJob ||
        !formState.fromAnimal ||
        !formState.fromJob ||
        !formState.quantity ||
        !formState.weight ||
        !user
      ) {
        return;
      }
      await createItemEntry({
        template: ItemTemplate.Move,
        batch: ItemBatch.Move,
        entryType: EntryType.Negative,
        animal: formState.fromAnimal,
        job: formState.fromJob,
        quantity: formState.quantity,
        weight: formState.weight,
        document: getDocumentNumber("MOVE", user.username)
      });
      await createItemEntry({
        template: ItemTemplate.Move,
        batch: ItemBatch.Move,
        entryType: EntryType.Positive,
        animal: formState.toAnimal,
        job: formState.toJob,
        quantity: formState.quantity,
        weight: formState.weight,
        document: getDocumentNumber("MOVE", user.username)
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
      <ViewTitle>Move</ViewTitle>
      <form
        css={{
          overflowX: "auto",
          minHeight: 0,
          flexGrow: 1,
          padding: "0 16px calc(100vh - 289px) 16px"
        }}
        onSubmit={onSubmit}
      >
        <AnimalSelector
          title="Select From Animal"
          name="fromAnimal"
          animals={ANIMALS}
          value={formState.fromAnimal}
          onChange={fromAnimal => {
            setFormState({ ...formState, fromAnimal });
          }}
        />
        <AnimalSelector
          title="Select To Animal"
          name="toAnimal"
          animals={ANIMALS}
          value={formState.toAnimal}
          onChange={toAnimal => {
            setFormState({ ...formState, toAnimal });
          }}
        />
        <JobSelector
          title="Select From Job"
          value={formState.fromJob}
          onChange={fromJob => {
            setFormState({ ...formState, fromJob });
          }}
        />
        <JobSelector
          title="Select To Job"
          value={formState.toJob}
          onChange={toJob => {
            setFormState({ ...formState, toJob });
          }}
        />
        <FormLabel htmlFor="quantity">Quantity</FormLabel>
        <NumberInput
          id="quantity"
          value={formState.quantity}
          onChange={value => setFormState({ ...formState, quantity: value })}
        />
        <FormLabel htmlFor="weight">Weight</FormLabel>
        <NumberInput
          id="weight"
          value={formState.weight}
          onChange={weight => setFormState({ ...formState, weight })}
        />
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

export default MoveFormView;
