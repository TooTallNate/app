/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, FormEventHandler, useEffect } from "react";
import { Button, Title, Group } from "../components/styled";
import { NumberInput, TextInput } from "../components/ui/text-inputs";
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
      defaults: { price: defaultPrice, job: defaultJob },
      loading: loadingDefaults
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

  return loadingDefaults ? (
    <FullPageSpinner>Loading Defaults...</FullPageSpinner>
  ) : (
    <div
      css={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Title>Move</Title>
      <form
        css={{
          overflowX: "auto",
          minHeight: 0,
          flexGrow: 1,
          padding: "0 16px calc(100vh - 289px) 16px"
        }}
        onSubmit={onSubmit}
      >
        <Group
          css={{
            marginTop: 0,
            display: "flex"
          }}
        >
          <Field
            label="From Animal"
            name="from-animal"
            css={{
              width: "100%",
              marginRight: 16
            }}
          >
            <StackedButtonInput
              value={formState.fromAnimal}
              onChange={fromAnimal =>
                setFormState({ ...formState, fromAnimal })
              }
            >
              <StackedButton value={Animal.MARKET_PIGS}>
                Market Pigs
              </StackedButton>
              <StackedButton value={Animal.GDU_PIGS}>GDU Pigs</StackedButton>
            </StackedButtonInput>
          </Field>
          <Field
            label="To Animal"
            name="to-animal"
            css={{
              width: "100%"
            }}
          >
            <StackedButtonInput
              value={formState.toAnimal}
              onChange={toAnimal => setFormState({ ...formState, toAnimal })}
            >
              <StackedButton value={Animal.MARKET_PIGS}>
                Market Pigs
              </StackedButton>
              <StackedButton value={Animal.GDU_PIGS}>GDU Pigs</StackedButton>
              <StackedButton value={Animal.SOWS}>Sows</StackedButton>
            </StackedButtonInput>
          </Field>
        </Group>
        <Group
          css={{
            marginTop: 0,
            display: "flex"
          }}
        >
          <Field
            label="From Job"
            name="from-job"
            css={{
              width: "100%",
              marginRight: 16
            }}
          >
            <JobSelector
              value={formState.fromJob}
              onChange={fromJob => {
                setFormState({ ...formState, fromJob });
              }}
            />
          </Field>
          <Field
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
          </Field>
        </Group>
        <Field name="quantity" label="Quantity">
          <NumberInput
            value={formState.quantity}
            onChange={quantity => setFormState({ ...formState, quantity })}
          />
        </Field>
        <Field name="weight" label="Weight">
          <NumberInput
            value={formState.weight}
            onChange={weight => setFormState({ ...formState, weight })}
          />
        </Field>
        <Field name="price" label="Price">
          <NumberInput
            value={formState.price}
            onChange={price => setFormState({ ...formState, price })}
          />
        </Field>
        <Field name="comments" label="Comments">
          <TextInput
            multiline
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
    </div>
  );
};

export default MoveFormView;
