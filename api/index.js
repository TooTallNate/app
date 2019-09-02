const path = require("path");
require("dotenv").config(path.resolve(__dirname, "../.env"));
const app = require("express")();
const request = require("httpntlm");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const session = require("express-session");
const uuid = require("uuid/v4");
const FileStore = require("session-file-store")(session);

// Make a request to a NAV server using NTLM.
function ntlmRequest({ url, domainUsername, password, method }) {
  const [domain, username] = domainUsername.split("\\");
  return new Promise((resolve, reject) =>
    request[method]({ url, domain, username, password }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    })
  );
}

// Configure passport to use NAV windows authentication and sessions.
passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log(username);
    // Get the user info from NAV. If we succeed, the user is logged in.
    const url = `${process.env.NAV_BASE_URL}/User?$filter=User_Name eq '${username}'`;
    try {
      const { body } = await ntlmRequest({
        url,
        domainUsername: username,
        password,
        method: "get"
      });
      done(null, { ...JSON.parse(body).value[0], password });
    } catch (error) {
      done(error);
    }
  })
);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Log handled URLS.
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(bodyParser.json());

// Initialize sessions and authentication
app.use(
  session({
    genid: uuid,
    store: new FileStore(),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Authentication routes.
app.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.status(204).end();
});

app.post("/api/logout", (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    else res.status(204).end();
  });
});

// Proxy requests to the NAV server using the auth information in the session.
app.use("/api", async (req, res, next) => {
  const { User_Name: domainUsername, password } = req.user;
  try {
    const { body, statusCode } = await ntlmRequest({
      domainUsername,
      password,
      url: `${process.env.NAV_BASE_URL}/${req.url}`,
      method: "get"
    });
    res.status(statusCode).send(body);
  } catch (error) {
    next(error);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`proxy listening on port ${port}`));

module.exports = app;
