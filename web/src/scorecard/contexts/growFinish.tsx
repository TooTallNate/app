import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef
} from "react";
import { useHistory } from "react-router-dom";
import { useSaveScorecardMutation } from "../graphql";

export interface GrowFinishContextValue {
  job?: string;
  formState: FormValues;
  setJob(job?: string): void;
  updateForm(values?: FormValues): void;
  submit(): Promise<void>;
}

export interface FormValues {
  job?: string;
  date?: Date;
  personResponsible?: String;
}

const GrowFinishContext = createContext<GrowFinishContextValue | null>(null);

const GrowFinishScorecardProvider: React.FC = ({ children }) => {
  const jobLoaded = useRef(true);
  const [job, setJobInternal] = useState<string | undefined>();

  const [saveMethod] = useSaveScorecardMutation();
  // const [submitMethod] = postScorecard();
  // const [formConfig, setFormConfig] = useState<object>({});
  const [formState, setFormState] = useState<FormValues>({});
  const history = useHistory();

  const updateForm = useCallback(
    (values: Partial<FormValues> = {}) =>
      setFormState(prev => ({ ...prev, ...values })),
    []
  );

  //does this need to be async()?
  useEffect(() => {
    if (jobLoaded.current) {
      // saveMethod(formState);
    }
  }, [formState, saveMethod]);

  // add this to the context
  const setJob = useCallback((job?: string) => {
    jobLoaded.current = false;
    // Set the job state
    setJobInternal(job);
    // Load the form config
    // Load the form state
    jobLoaded.current = true;
  }, []);

  //import these
  // add these to the context
  //move this up to the useEffect
  // const save = useCallback(async () => {
  //   await saveMethod(formState);
  // }, [formState, history, saveMethod]);
  // //execute save request to send to server

  const submit = useCallback(async () => {
    // await submitMethod(formState);
    history.push("/");
  }, [history]);

  return (
    <GrowFinishContext.Provider
      value={{ job, formState, updateForm, submit, setJob }}
    >
      {children}
    </GrowFinishContext.Provider>
  );
};

const useGrowFinish = () => {
  const context = useContext(GrowFinishContext);
  if (!context) {
    throw new Error(
      "useGrowFinish must be a descendant of GrowFinishScorecardProvider."
    );
  }
  return context;
};

export { GrowFinishScorecardProvider, useGrowFinish };
