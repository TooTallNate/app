/** @jsx jsx */
import { jsx } from "@emotion/core";
import ButtonSelector from "../components/ButtonSelector";
import { Fragment, useState, useEffect, FormEventHandler } from "react";
import service from "../service";

const ANIMALS = {
  MKT_PIGS: {
    title: "Market Pigs",
    value: "MKT_PIGS"
  },
  GDU_PIGS: {
    title: "GDU Pigs",
    value: "GDU_PIGS"
  },
  SOWS: {
    title: "Sows",
    value: "SOWS"
  }
};

const config: {
  [key: string]: {
    title: string;
    animals: {
      title: string;
      value: string;
    }[];
    fields: {
      animal: boolean;
      toFromAnimal: boolean;
      group: boolean;
      toFromGroup: boolean;
      price: boolean;
    };
  };
} = {
  wean: {
    title: "Wean",
    animals: [ANIMALS.MKT_PIGS, ANIMALS.GDU_PIGS],
    fields: {
      animal: true,
      toFromAnimal: false,
      group: true,
      toFromGroup: false,
      price: true
    }
  },
  purchase: {
    title: "Purchase",
    animals: [ANIMALS.MKT_PIGS, ANIMALS.GDU_PIGS, ANIMALS.SOWS],
    fields: {
      animal: true,
      toFromAnimal: false,
      group: true,
      toFromGroup: false,
      price: false
    }
  },
  mortality: {
    title: "Mortality",
    animals: [ANIMALS.MKT_PIGS, ANIMALS.GDU_PIGS, ANIMALS.SOWS],
    fields: {
      animal: true,
      toFromAnimal: false,
      group: true,
      toFromGroup: false,
      price: false
    }
  },
  move: {
    title: "Move",
    animals: [ANIMALS.MKT_PIGS, ANIMALS.GDU_PIGS],
    fields: {
      animal: false,
      toFromAnimal: true,
      group: false,
      toFromGroup: true,
      price: false
    }
  },
  gradeoff: {
    title: "Grade-off",
    animals: [ANIMALS.MKT_PIGS, ANIMALS.GDU_PIGS],
    fields: {
      animal: true,
      toFromAnimal: false,
      group: true,
      toFromGroup: false,
      price: false
    }
  },
  adjustment: {
    title: "Adjustment",
    animals: [ANIMALS.MKT_PIGS, ANIMALS.GDU_PIGS, ANIMALS.SOWS],
    fields: {
      animal: true,
      toFromAnimal: false,
      group: true,
      toFromGroup: false,
      price: false
    }
  }
};

interface FormInputs {
  action?: string;
  animal?: string;
  fromAnimal?: string;
  toAnimal?: string;
  group?: string;
  fromGroup?: string;
  toGroup?: string;
  quantity?: number;
  weight?: number;
  price?: number;
}

const PigMovementsView: React.FC = () => {
  const [formInputs, setFormInputs] = useState<FormInputs>({});
  const [jobs, setJobs] = useState<string[]>([]);

  useEffect(() => {
    service
      .getJobList()
      .then(setJobs)
      .catch(() => setJobs([]));
    return () => setJobs([]);
  }, []);

  const {
    action,
    animal,
    fromAnimal,
    toAnimal,
    group,
    fromGroup,
    toGroup,
    quantity,
    weight,
    price
  } = formInputs;

  const groups = jobs.map(job => ({ title: job, value: job }));
  const formConfig = action && config[action];

  const onSubmit: FormEventHandler = e => {
    e.preventDefault();
    console.log(formInputs);
  };

  return (
    <div>
      <h1>Pig Movements</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Action</label>
          <ButtonSelector
            items={Object.entries(config).map(([key, { title }]) => ({
              value: key,
              title
            }))}
            value={action}
            onChange={action => {
              setFormInputs(inputs => ({ action }));
            }}
          />
        </div>
        {!!formConfig && (
          <Fragment>
            {!!formConfig.fields.animal && (
              <div>
                <label>Animal</label>
                <ButtonSelector
                  items={Object.values(formConfig.animals)}
                  value={animal}
                  onChange={animal => {
                    setFormInputs(inputs => ({ ...inputs, animal }));
                  }}
                />
              </div>
            )}
            {!!formConfig.fields.toFromAnimal && (
              <Fragment>
                <div>
                  <label>From Animal</label>
                  <ButtonSelector
                    items={Object.values(formConfig.animals)}
                    value={fromAnimal}
                    onChange={fromAnimal => {
                      setFormInputs(inputs => ({ ...inputs, fromAnimal }));
                    }}
                  />
                </div>
                <div>
                  <label>To Animal</label>
                  <ButtonSelector
                    items={Object.values(formConfig.animals)}
                    value={toAnimal}
                    onChange={toAnimal => {
                      setFormInputs(inputs => ({ ...inputs, toAnimal }));
                    }}
                  />
                </div>
              </Fragment>
            )}
            {!!formConfig.fields.group && (
              <div>
                <label>Group</label>
                <ButtonSelector
                  items={groups}
                  value={group}
                  onChange={group => {
                    setFormInputs(inputs => ({ ...inputs, group }));
                  }}
                />
              </div>
            )}
            {!!formConfig.fields.toFromAnimal && (
              <Fragment>
                <div>
                  <label>From Group</label>
                  <ButtonSelector
                    items={groups}
                    value={fromGroup}
                    onChange={fromGroup => {
                      setFormInputs(inputs => ({ ...inputs, fromGroup }));
                    }}
                  />
                </div>
                <div>
                  <label>To Group</label>
                  <ButtonSelector
                    items={groups}
                    value={toGroup}
                    onChange={toGroup => {
                      setFormInputs(inputs => ({ ...inputs, toGroup }));
                    }}
                  />
                </div>
              </Fragment>
            )}
            <div>
              <label>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={e => {
                  const quantity = e.target.valueAsNumber;
                  setFormInputs(inputs => ({ ...inputs, quantity }));
                }}
              />
            </div>
            <div>
              <label>Weight</label>
              <input
                type="number"
                value={weight}
                onChange={e => {
                  const weight = e.target.valueAsNumber;
                  setFormInputs(inputs => ({ ...inputs, weight }));
                }}
              />
            </div>
            {!!formConfig.fields.price && (
              <div>
                <label>Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={e => {
                    const price = e.target.valueAsNumber;
                    setFormInputs(inputs => ({ ...inputs, price }));
                  }}
                />
              </div>
            )}
            <div>
              <button>Submit</button>
            </div>
          </Fragment>
        )}
      </form>
    </div>
  );
};

export default PigMovementsView;
