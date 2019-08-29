async function login({
  username,
  password
}: {
  username: string;
  password: string;
}): Promise<boolean> {
  const url = `/api/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  });
  return response.status === 204;
}

async function logout() {
  const url = `/api/logout`;
  const response = await fetch(url, { method: "POST" });
  return response.status === 204;
}

async function getJobList() {
  const url = `/api/Job_List?%24filter=Status%20eq%20'Open'&%24format=json&%24select=No`;
  const response = await fetch(url, {
    method: "GET"
  });
  const data = (await response.json()) as { value: { No: string }[] };
  return data.value.map(job => job.No);
}

export default { login, logout, getJobList };
