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
  formConfig?: FormConfig;
  formState: FormValues;
  setJob(job?: string): void;
  updateForm(values?: FormValues): void;
  submit(): Promise<void>;
}

export interface FormConfig {
  //form title
  //list of pages
}

export interface FormValues {}

const GrowFinishContext = createContext<GrowFinishContextValue | null>(null);

const GrowFinishScorecardProvider: React.FC = ({ children }) => {
  const jobLoaded = useRef(true);
  const [job, setJobInternal] = useState<string | undefined>();

  // Lazy query hook for the scorecard job and pages.

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
    if (jobLoaded.current && job) {
      saveMethod({
        variables: {
          input: {
            ...formState,
            job: job
          }
        }
      });
    }
  }, [formState, job, history, saveMethod]);

  // add this to the context
  const setJob = useCallback((job?: string) => {
    jobLoaded.current = false;
    // Set the job state
    setJobInternal(job);
    //call function returned from useLazyNFQuery here
    // Load the form config
    // Load the form state
    jobLoaded.current = true;
  }, []);

  const submit = useCallback(async () => {
    // await submitMethod(formState);
    history.push("/");
  }, [history]);

  // Add formconfig to provider.
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
