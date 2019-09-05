const licenseMap = new Map<string, string>([
  ["Full License", "full"],
  ["Limited License", "limited"]
]);

class ServiceError extends Error {
  constructor(response: Response) {
    super(`${response.statusText} (${response.status})`);
  }
}

interface UserResult {
  fullName: string;
  license: string;
}

async function login({
  username,
  password
}: {
  username: string;
  password: string;
}): Promise<UserResult> {
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
    license: licenseMap.get(License_Type) || "unknown",
    fullName: Full_Name
  };
}

async function logout() {
  await fetch(`/api/logout`, { method: "POST" });
}

async function refresh(): Promise<UserResult | null> {
  const response = await fetch(`/api/refresh`, { method: "GET" });
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}

interface Job {
  number: string;
}
interface JobListBody {
  value: { No: string }[];
}

async function getJobList() {
  const url = `/api/Job_List?%24filter=Status%20eq%20'Open'&%24format=json&%24select=No`;
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

export default { login, logout, refresh, getJobList };
