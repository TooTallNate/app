/** @jsx jsx */
import { jsx } from "@emotion/core";
import FormLabel from "../../components/FormLabel";
import Selector from "../../components/Selector";
import { ACTIONS } from "./config";
import { useState, useEffect } from "react";
import TypeaheadInput from "../../components/TypeaheadInput";
import service from "../../service";
import NumberInput from "../../components/NumberInput";
import ButtonInput from "../../components/ButtonInput";
import ViewTitle from "../../components/ViewTitle";

const config = ACTIONS.MOVE;

interface FormState {
  fromAnimal?: string;
  toAnimal?: string;
  fromGroup?: string;
  toGroup?: string;
  quantity?: number;
  weight?: number;
  price?: number;
}

const MoveFormView: React.FC = () => {
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

  const onSubmit = () => {};

  return (
    <div
      css={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <ViewTitle>Pigs - Move</ViewTitle>
      <form
        css={{
          overflowX: "auto",
          minHeight: 0,
          flexGrow: 1,
          padding: "0 16px calc(100vh - 289px) 16px"
        }}
        onSubmit={onSubmit}
      >
        <fieldset
          css={{
            border: "none",
            padding: 0,
            margin: 0
          }}
        >
          <legend
            css={{
              padding: 0,
              fontSize: "1rem",
              fontWeight: "bold",
              boxSizing: "border-box",
              height: 44,
              lineHeight: "44px"
            }}
          >
            Select From Animal
          </legend>
          <Selector
            items={config.animals}
            value={formState.fromAnimal}
            onChange={fromAnimal => {
              setFormState({ ...formState, fromAnimal });
            }}
          />
        </fieldset>
        <fieldset
          css={{
            border: "none",
            padding: 0,
            margin: 0
          }}
        >
          <legend
            css={{
              padding: 0,
              fontSize: "1rem",
              fontWeight: "bold",
              boxSizing: "border-box",
              height: 44,
              lineHeight: "44px"
            }}
          >
            Select To Animal
          </legend>
          <Selector
            items={config.animals}
            value={formState.toAnimal}
            onChange={toAnimal => {
              setFormState({ ...formState, toAnimal });
            }}
          />
        </fieldset>
        <FormLabel id="from-group-label">Select From Group</FormLabel>
        <TypeaheadInput
          labelId="from-group-label"
          items={groups}
          value={formState.fromGroup}
          onChange={fromGroup => {
            setFormState({ ...formState, fromGroup });
          }}
        />
        <FormLabel id="to-group-label">Select To Group</FormLabel>
        <TypeaheadInput
          labelId="to-group-label"
          items={groups}
          value={formState.toGroup}
          onChange={toGroup => {
            setFormState({ ...formState, toGroup });
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
        >
          Submit
        </ButtonInput>
      </form>
    </div>
  );
};

export default MoveFormView;
