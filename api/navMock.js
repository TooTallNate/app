module.exports = async function(url, { method = "get" } = {}) {
  const path = url.slice(process.env.NAV_BASE_URL.length);
  console.log(`Mocking ${method.toUpperCase()} ${path}`);

  if (/^\/User/.test(path) && method === "get") {
    return {
      statusCode: 200,
      body: JSON.stringify({
        value: [
          {
            Full_Name: "Adrian Rocke",
            License_Type: "Full License"
          }
        ]
      })
    };
  } else {
    throw new Error("Route not mocked");
  }
};
