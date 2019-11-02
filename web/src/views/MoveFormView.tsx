/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, FormEventHandler, useEffect } from "react";
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
import useDefaults from "../contexts/defaults";

const FROM_ANIMALS = [Animal.MARKET_PIGS, Animal.GDU_PIGS];
const TO_ANIMALS = [Animal.MARKET_PIGS, Animal.GDU_PIGS, Animal.SOWS];

interface FormState {
  fromAnimal?: Animal;
  toAnimal?: Animal;
  fromJob?: Job;
  toJob?: Job;
  quantity?: number;
  weight?: number;
  price?: number;
  comments?: string;
}

const MoveFormView: React.FC<RouteComponentProps> = ({ history }) => {
  const { user } = useAuth();
  const [formState, setFormState] = useState<FormState>({});
  const [
    {
      defaults: { price: defaultPrice, job: defaultJob }
    },
    setDefaults
  ] = useDefaults();
  const [postItem, { loading }] = usePostItemMutation();

  // Set job with default only if not already set.
  useEffect(() => {
    if (!formState.fromJob && defaultJob) {
      setFormState(formState => ({
        ...formState,
        fromJob: defaultJob
      }));
    }
  }, [defaultJob, formState.fromJob]);

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
        !formState.toAnimal ||
        !formState.toJob ||
        !formState.fromAnimal ||
        !formState.fromJob ||
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
            template: ItemTemplate.Move,
            batch: ItemBatch.Move,
            entryType: EntryType.Negative,
            item: formState.fromAnimal,
            job: formState.fromJob.number,
            quantity: formState.quantity,
            weight: formState.weight,
            document: getDocumentNumber("MOVE", user.username),
            amount: formState.price,
            description: formState.comments,
            date: new Date(),
            location: formState.fromJob.site,
            costCenterCode: formState.fromJob.dimensions.costCenter,
            entityType: formState.fromJob.dimensions.entity
          }
        }
      });
      await postItem({
        variables: {
          input: {
            template: ItemTemplate.Move,
            batch: ItemBatch.Move,
            entryType: EntryType.Positive,
            item: formState.toAnimal,
            job: formState.toJob.number,
            quantity: formState.quantity,
            weight: formState.weight,
            document: getDocumentNumber("MOVE", user.username),
            amount: formState.price,
            description: formState.comments,
            date: new Date(),
            location: formState.toJob.site,
            costCenterCode: formState.toJob.dimensions.costCenter,
            entityType: formState.toJob.dimensions.entity
          }
        }
      });
      if (formState.fromJob !== defaultJob) {
        await setDefaults({ job: formState.fromJob });
      }
      if (formState.price !== defaultPrice) {
        await setDefaults({ price: formState.price });
      }
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
        <div
          css={{
            display: "flex"
          }}
        >
          <FormField
            label="From Animal"
            name="from-animal"
            css={{
              width: "100%",
              margin: "0 16px 0 0"
            }}
          >
            <AnimalSelector
              animals={FROM_ANIMALS}
              value={formState.fromAnimal}
              onChange={fromAnimal => {
                setFormState({ ...formState, fromAnimal });
              }}
            />
          </FormField>
          <FormField
            label="To Animal"
            name="to-animal"
            css={{
              width: "100%"
            }}
          >
            <AnimalSelector
              animals={TO_ANIMALS}
              value={formState.toAnimal}
              onChange={toAnimal => {
                setFormState({ ...formState, toAnimal });
              }}
            />
          </FormField>
        </div>
        <div
          css={{
            display: "flex"
          }}
        >
          <FormField
            label="From Job"
            name="from-job"
            css={{
              width: "100%",
              margin: "0 16px 0 0"
            }}
          >
            <JobSelector
              value={formState.fromJob}
              onChange={fromJob => {
                setFormState({ ...formState, fromJob });
              }}
            />
          </FormField>
          <FormField
            label="To Job"
            name="to-job"
            css={{
              width: "100%"
            }}
          >
            <JobSelector
              value={formState.toJob}
              onChange={toJob => {
                setFormState({ ...formState, toJob });
              }}
            />
          </FormField>
        </div>
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

export default MoveFormView;
