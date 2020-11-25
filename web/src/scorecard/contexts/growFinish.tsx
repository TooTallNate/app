import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo
} from "react";
import {
  useNurseryFinisherScorecardLazyQuery,
  useSaveScorecardMutation
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

export interface FormValues {
  [id: string]:
    | undefined
    | {
        numericValue?: number;
        stringValue?: string;
      };
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
  const [jobNumber, setJob] = useState<string | undefined>();
  const [formState, setFormState] = useState<FormValues>({});

  const [
    loadJob,
    { data, loading: loadingJob }
  ] = useNurseryFinisherScorecardLazyQuery({
    onCompleted(data) {
      const state: FormValues = {};
      if (data.scorecard) {
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
      setFormState(state);
    }
  });

  const [save] = useSaveScorecardMutation({});

  const saveProgress = useCallback(
    async (values: Partial<FormValues> = {}) => {
      if (jobNumber) {
        setFormState(prev => ({ ...prev, ...values }));
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

  useEffect(() => {
    if (jobNumber) {
      loadJob({ variables: { job: jobNumber } });
    } else {
      setFormState({});
    }
  }, [jobNumber, loadJob]);

  const submit = useCallback(async () => {
    // await submitMethod(formState);
  }, []);

  const job = useMemo(
    () =>
      data && data.job
        ? {
            number: data.job.number,
            location: data.job.location.code,
            caretaker: data.job.personResponsible.number
          }
        : undefined,
    [data]
  );

  const formConfig = useMemo<FormPage[]>(
    () => (data && data.scorecardPages) || [],
    [data]
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
