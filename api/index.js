const app = require("express")();
require("../src/setupProxy")(app);

const port = process.env.PORT;
app.listen(port, () => console.log(`proxy listening on port ${port}`));

module.exports = app;
