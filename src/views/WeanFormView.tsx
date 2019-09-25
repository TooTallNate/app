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
import MultilineTextInput from "../components/ui/MultilineTextInput";

const ANIMALS = [Animal.MARKET_PIGS, Animal.GDU_PIGS];

interface FormState {
  animal?: Animal;
  job?: Job;
  quantity?: number;
  weight?: number;
  price?: number;
  comments?: string;
}

const WeanFormView: React.FC<RouteComponentProps> = ({ history }) => {
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
        template: ItemTemplate.Wean,
        batch: ItemBatch.Wean,
        entryType: EntryType.Positive,
        animal: formState.animal,
        job: formState.job,
        quantity: formState.quantity,
        weight: formState.weight,
        document: getDocumentNumber("WEAN", user.username),
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
      <ViewTitle>Wean</ViewTitle>
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
          title="Select Animal"
          name="animal"
          animals={ANIMALS}
          value={formState.animal}
          onChange={animal => {
            setFormState({ ...formState, animal });
          }}
        />
        <JobSelector
          title="Select Job"
          value={formState.job}
          onChange={job => {
            setFormState({ ...formState, job });
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
        <FormLabel htmlFor="price">Price</FormLabel>
        <NumberInput
          id="price"
          value={formState.price}
          onChange={price => setFormState({ ...formState, price })}
        />
        <FormLabel htmlFor="comments">Comments</FormLabel>
        <MultilineTextInput
          id="comments"
          name="comments"
          value={formState.comments}
          maxLength={50}
          onChange={e =>
            setFormState({ ...formState, comments: e.target.value })
          }
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

export default WeanFormView;
