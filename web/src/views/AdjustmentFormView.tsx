/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, FormEventHandler, useEffect } from "react";
import NumberInput from "../components/ui/NumberInput";
import { Button } from "../components/styled";
import { Title } from "../components/styled";
import { Animal, ItemTemplate, ItemBatch, EntryType } from "../entities";
import { RouteComponentProps } from "react-router";
import AnimalSelector from "../components/AnimalSelector";
import JobSelector from "../components/JobSelector";
import { getDocumentNumber } from "../utils";
import { useAuth } from "../contexts/auth";
import { Textarea } from "../components/styled";
import Field from "../components/ui/Field";
import { usePostItemMutation, Job } from "../graphql";
import useDefaults from "../contexts/defaults";

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
  const [
    {
      defaults: { price: defaultPrice, job: defaultJob }
    },
    setDefaults
  ] = useDefaults();
  const [postItem, { loading }] = usePostItemMutation();

  // Set job with default only if not already set.
  useEffect(() => {
    if (!formState.job && defaultJob) {
      setFormState(formState => ({
        ...formState,
        job: defaultJob
      }));
    }
  }, [defaultJob, formState.job]);

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
            location: formState.job.site,
            costCenterCode: formState.job.dimensions.costCenter,
            entityType: formState.job.dimensions.entity
          }
        }
      });
      if (formState.job !== defaultJob) {
        await setDefaults({ job: formState.job });
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
      <Title>Adjustment</Title>
      <form
        css={{
          overflowX: "auto",
          minHeight: 0,
          flexGrow: 1,
          padding: "0 16px calc(100vh - 289px) 16px"
        }}
        onSubmit={onSubmit}
      >
        <Field label="Animal" name="animal">
          <AnimalSelector
            name="animal"
            animals={ANIMALS}
            value={formState.animal}
            onChange={animal => {
              setFormState({ ...formState, animal });
            }}
          />
        </Field>
        <Field label="Job" name="job">
          <JobSelector
            value={formState.job}
            onChange={job => {
              setFormState({ ...formState, job });
            }}
          />
        </Field>
        <Field label="Quantity" name="quantity">
          <NumberInput
            value={formState.quantity}
            onChange={value => setFormState({ ...formState, quantity: value })}
          />
        </Field>
        <Field label="Weight" name="weight">
          <NumberInput
            value={formState.weight}
            onChange={weight => setFormState({ ...formState, weight })}
          />
        </Field>
        <Field label="Price" name="price">
          <NumberInput
            value={formState.price}
            onChange={price => setFormState({ ...formState, price })}
          />
        </Field>
        <Field label="Comments" name="comments">
          <Textarea
            value={formState.comments}
            maxLength={50}
            onChange={e =>
              setFormState({ ...formState, comments: e.target.value })
            }
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
    </div>
  );
};

export default AdjustmentFormView;
