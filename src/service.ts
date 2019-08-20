async function getJobList() {
  const url = `/api/Job_List?%24filter=Status%20eq%20'Open'&%24format=json&%24select=No`;
  const response = await fetch(url, {
    method: "GET"
  });
  const data = (await response.json()) as { value: { No: string }[] };
  return data.value.map(job => job.No);
}

export default { getJobList };
