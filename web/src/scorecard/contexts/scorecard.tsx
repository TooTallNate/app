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
  useScorecardLazyQuery,
  useSaveScorecardMutation,
  ScorecardQuery,
  usePostScorecardMutation
} from "../graphql";

export interface ScorecardContextValue {
  job?: Job;
  loadingJob: boolean;
  formState: FormValues;
  formConfig: FormPage[];
  saveProgress(values?: FormValues): Promise<void>;
  submit(): Promise<void>;
}

export interface Job {
  number: string;
  location: string;
  caretaker: string;
  projectManager?: string;
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

const ScorecardContext = createContext<ScorecardContextValue | null>(null);

export interface ScorecardProviderProps {
  job: string;
}

const ScorecardProvider: React.FC<ScorecardProviderProps> = ({
  children,
  job: jobNumber
}) => {
  const lastFormState = useRef<FormValues>({});
  const [formState, setFormState] = useState<FormValues>(lastFormState.current);

  const [
    loadJob,
    { data: scorecardResult, loading: loadingJob }
  ] = useScorecardLazyQuery();

  const [save] = useSaveScorecardMutation();
  const [submitForm] = usePostScorecardMutation();

  // Only use the lazy query result if it matches the selected job number.
  // There is some delay until the results are loaded.
  let data: ScorecardQuery | undefined;
  if (
    scorecardResult &&
    scorecardResult.job &&
    scorecardResult.job.number === jobNumber
  ) {
    data = scorecardResult;
  }

  // Update the from state when a new scorecard is loaded.
  useEffect(() => {
    if (data && data.scorecard) {
      const state: FormValues = {};
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
      lastFormState.current = state;
      setFormState(state);
    }
  }, [data]);

  // Load job information when the job number changes.
  useEffect(() => {
    loadJob({ variables: { job: jobNumber } });
  }, [jobNumber, loadJob]);

  // When form state changes, save to server.
  useEffect(() => {
    if (jobNumber && lastFormState.current !== formState) {
      save({
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
      lastFormState.current = formState;
    }
  }, [formState, jobNumber, save]);

  const submit = useCallback(async () => {
    if (jobNumber) {
      await submitForm({
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
  }, [formState, jobNumber, submitForm]);

  const saveProgress = useCallback(async (values: Partial<FormValues> = {}) => {
    setFormState(prev => ({ ...prev, ...values }));
  }, []);

  const job = useMemo(
    () =>
      jobNumber && data && data.job
        ? {
            number: data.job.number,
            location: data.job.location.code,
            caretaker: data.job.personResponsible.number,
            projectManager: data.job.projectManager ? data.job.projectManager.username : undefined
          }
        : undefined,
    [data, jobNumber]
  );

  const formConfig = useMemo<FormPage[]>(
    () =>
      (jobNumber &&
        data &&
        data.scorecardConfig &&
        data.scorecardConfig.pages) ||
      [],
    [data, jobNumber]
  );

  return (
    <ScorecardContext.Provider
      value={{
        job,
        loadingJob,
        formState,
        formConfig,
        saveProgress,
        submit
      }}
    >
      {children}
    </ScorecardContext.Provider>
  );
};

const useScorecard = () => {
  const context = useContext(ScorecardContext);
  if (!context) {
    throw new Error("useScorecard must be a descendant of ScorecardProvider.");
  }
  return context;
};

export { ScorecardProvider, useScorecard };
