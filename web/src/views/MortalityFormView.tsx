/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, FormEventHandler } from "react";
import { useCreateItemEntry } from "../service";
import NumberInput from "../components/ui/NumberInput";
import ButtonInput from "../components/ui/ButtonInput";
import ViewTitle from "../components/ui/ViewTitle";
import { RouteComponentProps } from "react-router";
import { ItemTemplate, EntryType, Animal, ItemBatch, Job } from "../entities";
import AnimalSelector from "../components/AnimalSelector";
import JobSelector from "../components/JobSelector";
import { getDocumentNumber } from "../utils";
import { useAuth } from "../contexts/auth";
import StaticValue from "../components/ui/StaticValue";
import MultilineTextInput from "../components/ui/MultilineTextInput";
import FormField from "../components/ui/FormField";

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
  const { createItemEntry, loading } = useCreateItemEntry();

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
        await createItemEntry({
          template: ItemTemplate.Mortality,
          batch: ItemBatch.Mortality,
          entryType: EntryType.Negative,
          animal: formState.animal,
          job: formState.job,
          quantity: formState.naturalQuantity,
          weight: formState.weight,
          document: getDocumentNumber("MORT", user.username),
          price: formState.price,
          comments: formState.comments
        });
      }
      if (formState.euthanizedQuantity > 0) {
        await createItemEntry({
          template: ItemTemplate.Mortality,
          batch: ItemBatch.Mortality,
          entryType: EntryType.Negative,
          animal: formState.animal,
          job: formState.job,
          quantity: formState.euthanizedQuantity,
          weight: formState.weight,
          document: getDocumentNumber("MORT", user.username),
          price: formState.price,
          comments: formState.comments
        });
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
      <ViewTitle>Mortality</ViewTitle>
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
              <StaticValue
                id="quantity"
                css={{
                  paddingLeft: 0
                }}
              >
                {(formState.euthanizedQuantity || 0) +
                  (formState.naturalQuantity || 0)}
              </StaticValue>
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

export default MortalityFormView;