import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo
} from "react";
import { useHistory } from "react-router-dom";
import {
  useSaveScorecardMutation,
  useNurseryFinisherScorecardLazyQuery
} from "../graphql";

export interface GrowFinishContextValue {
  job?: string;
  formState: FormValues;
  formConfig: FormPage[];
  setJob(job?: string): void;
  updateForm(values?: FormValues): void;
  submit(): Promise<void>;
}

export interface FormValues {}

export interface FormPage {
  title?: string | null;
  elements: {
    label: string;
    code: string;
  }[];
}

const GrowFinishContext = createContext<GrowFinishContextValue | null>(null);

const GrowFinishScorecardProvider: React.FC = ({ children }) => {
  const jobLoaded = useRef(true);
  const [job, setJobInternal] = useState<string | undefined>();

  const [loadJob, { data }] = useNurseryFinisherScorecardLazyQuery();
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
  const setJob = useCallback(
    (job?: string) => {
      jobLoaded.current = false;
      setJobInternal(job);
      if (job) {
        loadJob({ variables: { job } });
      }
      jobLoaded.current = true;
    },
    [loadJob]
  );

  const submit = useCallback(async () => {
    // await submitMethod(formState);
    history.push("/");
  }, [history]);

  const formConfig = useMemo<FormPage[]>(
    () => (data && data.scorecardPages) || [],
    [data]
  );

  return (
    <GrowFinishContext.Provider
      value={{ job, formState, formConfig, updateForm, submit, setJob }}
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
