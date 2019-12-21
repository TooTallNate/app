/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, FormEventHandler, useEffect } from "react";
import { Button, Title, Group, View } from "../components/styled";
import { NumberInput, MultilineTextInput } from "../components/ui/text-inputs";
import { Animal, ItemTemplate, ItemBatch, EntryType } from "../entities";
import { RouteComponentProps } from "react-router";
import PigJobSelector from "../components/PigJobSelector";
import { getDocumentNumber } from "../utils";
import { useAuth } from "../contexts/auth";
import Field from "../components/ui/Field";
import { usePostItemMutation, Job } from "../graphql";
import useDefaults from "../contexts/defaults";
import StackedButtonInput, {
  StackedButton
} from "../components/ui/StackedButtonInput";
import FullPageSpinner from "../components/FullPageSpinner";
import { useFlash } from "../contexts/flash";
import tw from "tailwind.macro";

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

const ActivityMoveView: React.FC<RouteComponentProps> = ({ history }) => {
  const { user } = useAuth();
  const [formState, setFormState] = useState<FormState>({});
  const [
    {
      defaults: { price: defaultPrice, pigJob: defaultJob },
      loading: loadingDefaults
    },
    setDefaults
  ] = useDefaults();
  const [postItem, { loading }] = usePostItemMutation();
  const { setMessage } = useFlash();

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
        await setDefaults({ pigJob: formState.fromJob });
      }
      if (formState.price !== defaultPrice) {
        await setDefaults({ price: formState.price });
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
      <form
        css={{
          overflowX: "auto",
          minHeight: 0,
          flexGrow: 1,
          padding: "0 16px 16px 16px"
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
            css={tw`w-full mr-4 mt-0`}
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
          <Field label="To Animal" name="to-animal" css={tw`w-full mt-0`}>
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
          <Field label="From Job" name="from-job" css={tw`w-full mr-4 mt-0`}>
            <PigJobSelector
              value={formState.fromJob}
              onChange={fromJob => {
                setFormState({ ...formState, fromJob });
              }}
            />
          </Field>
          <Field label="To Job" name="to-job" css={tw`w-full mt-0`}>
            <PigJobSelector
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
        <Field name="comments" label="Comments">
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

export default ActivityMoveView;
