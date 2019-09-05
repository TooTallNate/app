/** @jsx jsx */
import { jsx } from "@emotion/core";
import FormLabel from "../../components/FormLabel";
import Selector from "../../components/Selector";
import { ACTIONS } from "./config";
import { useState, useEffect } from "react";
import TypeaheadInput from "../../components/TypeaheadInput";
import service from "../../service";
import TextInput from "../../components/TextInput";
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
        setGroups(jobs.map(job => ({ value: job.number })));
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
          paddingBottom: "calc(100vh - 289px)"
        }}
        onSubmit={onSubmit}
      >
        <FormLabel>Select Animal</FormLabel>
        <Selector
          items={config.animals}
          value={formState.animal}
          onChange={animal => setFormState({ ...formState, animal })}
        />
        <FormLabel>Select Group</FormLabel>
        <TypeaheadInput
          items={groups}
          value={formState.group}
          onChange={group => setFormState({ ...formState, group })}
        />
        <FormLabel>Quantity</FormLabel>
        <TextInput
          type="number"
          value={formState.quantity}
          onChange={e =>
            setFormState({ ...formState, quantity: parseInt(e.target.value) })
          }
        />
        <FormLabel>Weight</FormLabel>
        <TextInput
          type="number"
          value={formState.weight}
          onChange={e =>
            setFormState({ ...formState, weight: parseFloat(e.target.value) })
          }
        />
        <FormLabel>Price</FormLabel>
        <TextInput
          type="number"
          value={formState.price}
          onChange={e =>
            setFormState({ ...formState, price: parseFloat(e.target.value) })
          }
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
