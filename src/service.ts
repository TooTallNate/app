import {
  User,
  Job,
  ItemEntry,
  ItemTemplate,
  EntryType,
  Animal
} from "./entities";

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
  const { Full_Name, License_Type } = await response.json();
  return {
    license: License_Type,
    fullName: Full_Name
  };
}

async function logout() {
  await fetch(`/api/logout`, { method: "POST" });
}

async function refresh(): Promise<User | null> {
  const response = await fetch(`/api/refresh`, { method: "GET" });
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}

interface JobListBody {
  value: { No: string }[];
}

async function getJobList(): Promise<Job[]> {
  const url = `/api/Jobs?$filter=Status eq 'Open'&$format=json&$select=No`;
  const response = await fetch(url, {
    method: "GET"
  });
  if (response.status === 200) {
    const data = (await response.json()) as JobListBody;
    return data.value.map(job => ({
      number: job.No
    }));
  } else {
    throw new ServiceError(response);
  }
}

interface ItemEntryBody {
  Journal_Template_Name: ItemTemplate;
  Journal_Batch_Name: ItemTemplate;
  Entry_Type: EntryType;
  Item_No: Animal;
}

async function postItemEntry(entry: ItemEntry) {
  const url = `/api/ItemJournal`;
  const body: ItemEntryBody = {
    Journal_Template_Name: entry.template,
    Journal_Batch_Name: entry.template,
    Entry_Type: entry.entryType,
    Item_No: entry.animal
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (response.status === 201) {
    return;
  } else {
    throw new ServiceError(response);
  }
}

export default { login, logout, refresh, getJobList, postItemEntry };
