/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, FormEventHandler, useEffect } from "react";
import { Button, Title, Group, View } from "../components/styled";
import { NumberInput, MultilineTextInput } from "../components/ui/text-inputs";
import { RouteComponentProps } from "react-router";
import { ItemTemplate, EntryType, Animal, ItemBatch } from "../entities";
import JobSelector from "../components/JobSelector";
import { getDocumentNumber } from "../utils";
import { useAuth } from "../contexts/auth";
import { Output } from "../components/styled";
import Field from "../components/ui/Field";
import { usePostItemMutation, Job } from "../graphql";
import useDefaults from "../contexts/defaults";
import StackedButtonInput, {
  StackedButton
} from "../components/ui/StackedButtonInput";
import tw from "tailwind.macro";
import FullPageSpinner from "../components/FullPageSpinner";

interface FormState {
  animal?: Animal;
  job?: Job;
  naturalQuantity?: number;
  euthanizedQuantity?: number;
  weight?: number;
  price?: number;
  comments?: string;
}

const ActivityMortalityView: React.FC<RouteComponentProps> = ({ history }) => {
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
        !formState.naturalQuantity ||
        !formState.euthanizedQuantity ||
        !formState.weight ||
        !formState.price ||
        !user
      ) {
        return;
      }
      if (formState.naturalQuantity > 0) {
        await postItem({
          variables: {
            input: {
              template: ItemTemplate.Mortality,
              batch: ItemBatch.Mortality,
              entryType: EntryType.Negative,
              item: formState.animal,
              job: formState.job.number,
              quantity: formState.naturalQuantity,
              weight: formState.weight,
              document: getDocumentNumber("MORT", user.username),
              amount: formState.price,
              description: formState.comments,
              date: new Date(),
              location: formState.job.site,
              costCenterCode: formState.job.dimensions.costCenter,
              entityType: formState.job.dimensions.entity
            }
          }
        });
      }
      if (formState.euthanizedQuantity > 0) {
        await postItem({
          variables: {
            input: {
              template: ItemTemplate.Mortality,
              batch: ItemBatch.Mortality,
              entryType: EntryType.Negative,
              item: formState.animal,
              job: formState.job.number,
              quantity: formState.euthanizedQuantity,
              weight: formState.weight,
              document: getDocumentNumber("MORT", user.username),
              amount: formState.price,
              description: formState.comments,
              date: new Date(),
              location: formState.job.site,
              costCenterCode: formState.job.dimensions.costCenter,
              entityType: formState.job.dimensions.entity
            }
          }
        });
      }
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

  return loadingDefaults ? (
    <FullPageSpinner>Loading Defaults...</FullPageSpinner>
  ) : (
    <View>
      <Title>Mortality</Title>
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
            <StackedButton value={Animal.SOWS}>Sows</StackedButton>
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
        <Group
          css={{
            display: "flex"
          }}
        >
          <Field css={tw`flex-1`} name="natural-quantity" label="Natrual">
            <NumberInput
              value={formState.naturalQuantity}
              onChange={naturalQuantity =>
                setFormState({ ...formState, naturalQuantity })
              }
            />
          </Field>
          <div
            css={tw`flex-auto flex-grow-0 w-8 text-center leading-none mt-16 pt-1`}
          >
            +
          </div>
          <Field css={tw`flex-1`} name="euthanized-quantity" label="Euthanized">
            <NumberInput
              value={formState.euthanizedQuantity}
              onChange={euthanizedQuantity =>
                setFormState({ ...formState, euthanizedQuantity })
              }
            />
          </Field>
          <div
            css={tw`flex-auto flex-grow-0 w-8 text-center leading-none mt-16 pt-1`}
          >
            =
          </div>
          <Field css={{ width: 72 }} name="quantity" label="Quantity">
            <Output
              id="quantity"
              css={{
                paddingLeft: 0
              }}
            >
              {(formState.euthanizedQuantity || 0) +
                (formState.naturalQuantity || 0)}
            </Output>
          </Field>
        </Group>
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

export default ActivityMortalityView;