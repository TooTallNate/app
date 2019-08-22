/** @jsx jsx */
import { jsx } from "@emotion/core";
import SelectAction from "../components/SelectAction";
import SelectAnimal from "../components/SelectAnimal";
import { Route, RouteComponentProps, Redirect } from "react-router-dom";
import { useState } from "react";

interface FormState {
  action?: string;
  animal?: string;
}

const PigMovementsView: React.FC<RouteComponentProps> = ({
  match,
  location,
  history
}) => {
  const [{ action, animal }, setFormState] = useState<FormState>({});

  return (
    <div>
      <Route
        path={`${match.path}/action`}
        render={() => (
          <SelectAction
            action={action}
            onChange={newAction => {
              setFormState({
                action: newAction
              });
              history.push(`${match.url}/animal`);
            }}
          />
        )}
      />
      <Route
        path={`${match.path}/animal`}
        render={() =>
          action ? (
            <SelectAnimal
              action={action}
              animal={animal}
              onChange={newAnimal => {
                setFormState(state => ({
                  ...state,
                  animal: newAnimal
                }));
                history.push(`${match.url}/animal`);
              }}
            />
          ) : (
            <Redirect to={`${match.url}/action`} />
          )
        }
      />
      <p>Action: {action}</p>
      <p>Animal: {animal}</p>
    </div>
  );
};

export default PigMovementsView;
