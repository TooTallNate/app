import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from "react";
import {
  useNurseryFinisherScorecardLazyQuery,
  useSaveScorecardMutation,
  NurseryFinisherScorecardQuery
} from "../graphql";

export interface GrowFinishContextValue {
  job?: Job;
  loadingJob: boolean;
  formState: FormValues;
  formConfig: FormPage[];
  setJob(job?: string): void;
  saveProgress(values?: FormValues): Promise<void>;
  submit(): Promise<void>;
}

export interface Job {
  number: string;
  location: string;
  caretaker: string;
}

export interface FormValue {
  numericValue?: number;
  stringValue?: string;
}

export interface FormValues {
  [id: string]: FormValue | undefined;
}

export interface FormPage {
  title?: string | null;
  elements: {
    id: string;
    label: string;
    code: string;
    order: number;
  }[];
}

const GrowFinishContext = createContext<GrowFinishContextValue | null>(null);

const GrowFinishScorecardProvider: React.FC = ({ children }) => {
  const lastFormState = useRef<FormValues>({});
  const [jobNumber, setJob] = useState<string | undefined>();
  const [formState, setFormState] = useState<FormValues>(lastFormState.current);

  const [
    loadJob,
    { data: scorecardResult, loading: loadingJob }
  ] = useNurseryFinisherScorecardLazyQuery();

  // Only use the lazy query result if it matches the selected job number.
  // There is some delay until the results are loaded.
  let data: NurseryFinisherScorecardQuery | undefined;
  if (
    scorecardResult &&
    scorecardResult.job &&
    scorecardResult.job.number === jobNumber
  ) {
    data = scorecardResult;
  }

  const [save] = useSaveScorecardMutation({});

  // Update the from state when a new scorecard is loaded.
  useEffect(() => {
    const state: FormValues = {};
    if (data && data.scorecard) {
      data.scorecard.data.forEach(({ elementId, ...entry }) => {
        state[elementId] = {
          numericValue:
            typeof entry.numericValue === "number"
              ? entry.numericValue
              : undefined,
          stringValue:
            typeof entry.stringValue === "string"
              ? entry.stringValue
              : undefined
        };
      });
    }
    lastFormState.current = state;
    setFormState(state);
  }, [data]);

  // Load job information when the job number changes.
  useEffect(() => {
    if (jobNumber) {
      loadJob({ variables: { job: jobNumber } });
    }
  }, [jobNumber, loadJob]);

  const submit = useCallback(async () => {
    // await submitMethod(formState);
  }, []);

  const saveProgress = useCallback(
    async (values: Partial<FormValues> = {}) => {
      setFormState(prev => ({ ...prev, ...values }));
      if (jobNumber) {
        await save({
          variables: {
            input: {
              job: jobNumber,
              data: Object.entries(formState).map(([key, value]) => ({
                elementId: key,
                ...value
              }))
            }
          }
        });
      }
    },
    [formState, jobNumber, save]
  );

  const job = useMemo(
    () =>
      jobNumber && data && data.job
        ? {
            number: data.job.number,
            location: data.job.location.code,
            caretaker: data.job.personResponsible.number
          }
        : undefined,
    [data, jobNumber]
  );

  const formConfig = useMemo<FormPage[]>(
    () => (jobNumber && data && data.scorecardPages) || [],
    [data, jobNumber]
  );

  return (
    <GrowFinishContext.Provider
      value={{
        job,
        loadingJob,
        formState,
        formConfig,
        saveProgress,
        submit,
        setJob
      }}
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
