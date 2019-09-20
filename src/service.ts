import { User, Job, ItemEntry } from "./entities";
import { useState, useEffect, useCallback } from "react";
import { formatDate } from "./utils";

class ServiceError extends Error {
  constructor(response: Response) {
    super(`${response.statusText} (${response.status})`);
  }
}

async function login({
  username,
  password
}: {
  username: string;
  password: string;
}): Promise<User> {
  const response = await fetch(`/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });
  if (response.status !== 200) {
    throw new ServiceError(response);
  }
  const { Full_Name, License_Type, Username } = await response.json();
  return {
    license: License_Type,
    fullName: Full_Name,
    username: Username
  };
}

async function logout() {
  await fetch(`/api/logout`, { method: "POST" });
}

async function refresh(): Promise<User | null> {
  const response = await fetch(`/api/refresh`, { method: "GET" });
  if (response.status === 200) {
    const { Full_Name, License_Type, Username } = await response.json();
    return {
      license: License_Type,
      fullName: Full_Name,
      username: Username
    };
  } else {
    return null;
  }
}

interface JobListBody {
  value: { No: string; Site: string }[];
}

interface ApiStatus {
  loading: boolean;
  error?: Error;
}

interface JobsResponse extends ApiStatus {
  jobs: Job[];
}

function useJobs(): JobsResponse {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [{ loading, error }, setStatus] = useState<ApiStatus>({
    loading: true
  });

  useEffect(() => {
    let isCancelled = false;
    async function effect() {
      const filter = [
        "Status eq 'Open'",
        [
          "(Job_Posting_Group eq 'MKT PIGS'",
          "Job_Posting_Group eq 'GDU'",
          "Job_Posting_Group eq 'SOWS')"
        ].join(" or ")
      ].join(" and ");
      const response = await fetch(
        `/api/Jobs?$filter=${filter}&$format=json&$select=No,Site&$orderby=No desc`
      );

      // Set job list if request succeeds and is not cancelled.
      if (response.status === 200) {
        const json = (await response.json()) as JobListBody;
        if (!isCancelled) {
          setJobs(
            json.value.map(job => ({
              number: job.No,
              location: job.Site
            }))
          );
          setStatus({ loading: false });
        }
      }
      // Set the error if request is not cancelled.
      else {
        if (!isCancelled) {
          setStatus({ loading: false, error: new ServiceError(response) });
        }
      }
    }
    effect();

    // Prevent data from loading if effect is cancelled.
    return () => {
      isCancelled = true;
    };
  }, []);

  return { jobs, loading, error };
}

function useCreateItemEntry() {
  const [{ loading, error }, setStatus] = useState<ApiStatus>({
    loading: false
  });

  const createItemEntry = useCallback(async (entry: ItemEntry) => {
    setStatus({
      loading: true
    });
    const response = await fetch(`/api/ItemJournal`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        Journal_Template_Name: entry.template,
        Journal_Batch_Name: entry.batch,
        Entry_Type: entry.entryType,
        Item_No: entry.animal,
        Job_No: entry.job.number,
        Quantity: entry.quantity,
        Weight: entry.weight,
        Location_Code: entry.job.location,
        Document_No: entry.document,
        Document_Date: formatDate(new Date(), "YYYY-MM-DD"),
        Posting_Date: formatDate(new Date(), "YYYY-MM-DD")
      })
    });
    if (response.status === 201) {
      setStatus({
        loading: false
      });
    } else {
      setStatus({
        loading: false,
        error: new ServiceError(response)
      });
    }
  }, []);

  return { createItemEntry, loading, error };
}

export { useJobs, useCreateItemEntry };
export default { login, logout, refresh };
