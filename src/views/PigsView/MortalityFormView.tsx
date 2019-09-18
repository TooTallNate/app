/** @jsx jsx */
import { jsx } from "@emotion/core";
import FormLabel from "../../components/ui/FormLabel";
import { useState, useEffect, FormEventHandler } from "react";
import TypeaheadInput from "../../components/ui/TypeaheadInput";
import service from "../../service";
import NumberInput from "../../components/ui/NumberInput";
import ButtonInput from "../../components/ui/ButtonInput";
import ViewTitle from "../../components/ui/ViewTitle";
import { RouteComponentProps } from "react-router";
import { ItemTemplate, EntryType, Animal } from "../../entities";
import AnimalSelector from "../../components/AnimalSelector";

const ANIMALS = [Animal.MARKET_PIGS, Animal.GDU_PIGS, Animal.SOWS];

interface FormState {
  animal?: Animal;
  group?: string;
  quantity?: number;
  weight?: number;
  price?: number;
}

const MortalityFormView: React.FC<RouteComponentProps> = ({ history }) => {
  const [groups, setGroups] = useState<any[]>([]);
  const [formState, setFormState] = useState<FormState>({});

  useEffect(() => {
    const effect = async () => {
      try {
        const jobs = await service.getJobList();
        setGroups(jobs.map(job => ({ value: job.number, title: job.number })));
      } catch (error) {
        console.log(error);
      }
    };
    effect();
  }, []);

  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    try {
      if (!formState.animal) {
        return;
      }
      await service.postItemEntry({
        template: ItemTemplate.Mortality,
        entryType: EntryType.Negative,
        animal: formState.animal
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
      <ViewTitle>Pigs - Mortality</ViewTitle>
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
          animals={ANIMALS}
          value={formState.animal}
          onChange={animal => {
            setFormState({ ...formState, animal });
          }}
        />
        <FormLabel id="group-label">Select Group</FormLabel>
        <TypeaheadInput
          labelId="group-label"
          items={groups}
          value={formState.group}
          onChange={group => {
            setFormState({ ...formState, group });
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
        <FormLabel>Euthanized</FormLabel>
        <div>TODO</div>
        <ButtonInput
          type="submit"
          css={{
            marginTop: 44
          }}
        >
          Submit
        </ButtonInput>
      </form>
    </div>
  );
};

export default MortalityFormView;
