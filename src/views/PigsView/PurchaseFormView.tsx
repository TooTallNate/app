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

const config = ACTIONS.PURCHASE;

interface FormState {
  animal?: string;
  group?: string;
  quantity?: number;
  weight?: number;
  price?: number;
}

const PurchaseFormView: React.FC = () => {
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
      <ViewTitle>Pigs - Purchase</ViewTitle>
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
            Select Animal
          </legend>
          <Selector
            items={config.animals}
            value={formState.animal}
            onChange={animal => {
              setFormState({ ...formState, animal });
            }}
          />
        </fieldset>
        <FormLabel id="group-label">Select Group</FormLabel>
        <TypeaheadInput
          labelId="group-label"
          items={groups}
          value={formState.group}
          onChange={group => {
            setFormState({ ...formState, group });
          }}
        />
        <FormLabel>Quantity</FormLabel>
        <NumberInput
          value={formState.quantity}
          onChange={value => setFormState({ ...formState, quantity: value })}
        />
        <FormLabel>Weight</FormLabel>
        <NumberInput
          value={formState.weight}
          onChange={weight => setFormState({ ...formState, weight })}
        />
        <FormLabel>Price</FormLabel>
        <NumberInput
          value={formState.price}
          onChange={price => setFormState({ ...formState, price })}
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

export default PurchaseFormView;
