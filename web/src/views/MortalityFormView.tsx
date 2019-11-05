/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, FormEventHandler, useEffect } from "react";
import NumberInput from "../components/ui/NumberInput";
import { Button } from "../components/styled";
import { Title } from "../components/styled";
import { RouteComponentProps } from "react-router";
import { ItemTemplate, EntryType, Animal, ItemBatch } from "../entities";
import AnimalSelector from "../components/AnimalSelector";
import JobSelector from "../components/JobSelector";
import { getDocumentNumber } from "../utils";
import { useAuth } from "../contexts/auth";
import { Output } from "../components/styled";
import { Textarea } from "../components/styled";
import FormField from "../components/ui/FormField";
import { usePostItemMutation, Job } from "../graphql";
import useDefaults from "../contexts/defaults";

const ANIMALS = [Animal.MARKET_PIGS, Animal.GDU_PIGS, Animal.SOWS];

interface FormState {
  animal?: Animal;
  job?: Job;
  naturalQuantity?: number;
  euthanizedQuantity?: number;
  weight?: number;
  price?: number;
  comments?: string;
}

const MortalityFormView: React.FC<RouteComponentProps> = ({ history }) => {
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

  return (
    <div
      css={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Title>Mortality</Title>
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
        <div
          css={{
            display: "flex"
          }}
        >
          <div
            css={{
              flex: "1 1 0"
            }}
          >
            <FormField name="natural-quantity" label="Natrual">
              <NumberInput
                value={formState.naturalQuantity}
                onChange={naturalQuantity =>
                  setFormState({ ...formState, naturalQuantity })
                }
              />
            </FormField>
          </div>
          <div
            css={{
              flex: "0 0 auto",
              width: 32,
              textAlign: "center",
              paddingTop: 45,
              lineHeight: "44px"
            }}
          >
            +
          </div>
          <div
            css={{
              flex: "1 1 0"
            }}
          >
            <FormField name="euthanized-quantity" label="Euthanized">
              <NumberInput
                value={formState.euthanizedQuantity}
                onChange={euthanizedQuantity =>
                  setFormState({ ...formState, euthanizedQuantity })
                }
              />
            </FormField>
          </div>
          <div
            css={{
              flex: "0 0 auto",
              width: 32,
              textAlign: "center",
              paddingTop: 45,
              lineHeight: "44px"
            }}
          >
            =
          </div>
          <div
            css={{
              width: 72
            }}
          >
            <FormField name="quantity" label="Quantity">
              <Output
                id="quantity"
                css={{
                  paddingLeft: 0
                }}
              >
                {(formState.euthanizedQuantity || 0) +
                  (formState.naturalQuantity || 0)}
              </Output>
            </FormField>
          </div>
        </div>
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
          <Textarea
            value={formState.comments}
            maxLength={50}
            onChange={e =>
              setFormState({ ...formState, comments: e.target.value })
            }
          />
        </FormField>
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

export default MortalityFormView;
