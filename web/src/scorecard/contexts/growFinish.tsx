import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect
} from "react";

export interface GrowFinishContextValue {
  formState: FormValues;
  updateForm(values?: FormValues): void;
}

export interface FormValues {
  job?: string;
  date?: Date;
  personResponsible?: String;
}

const GrowFinishContext = createContext<GrowFinishContextValue | null>(null);

const GrowFinishScorecardProvider: React.FC = ({ children }) => {
  const [job, setJob] = useState<string | null>(null);

  const [formConfig, setFormConfig] = useState<object>({});
  const [formState, setFormState] = useState<FormValues>({});

  const updateForm = useCallback(
    (values: Partial<FormValues> = {}) =>
      setFormState(prev => ({ ...prev, ...values })),
    []
  );

  // add this to the context
  const setJob = useCallback(() => {
    // Set the job state
    // Load the form config
    // Load the form state
  }, []);

  //import these
  // add these to the context
  const save = useCallback();
  //execute save request to send to server
  const submit = useCallback();
  //validate all values and execute submit to server

  return (
    <GrowFinishContext.Provider value={{ formState, updateForm }}>
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
