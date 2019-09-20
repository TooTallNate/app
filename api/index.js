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
const navMock = require("./navMock");

// Make a request to a NAV server using NTLM.
function ntlmRequest({ url, domainUsername, password, method, body, headers }) {
  console.log(`NAV PROXY ${url}`);
  if (process.env.MOCK_NAV === "true") {
    return navMock(url, { method });
  } else {
    const [domain, username] = domainUsername.split("\\");
    return new Promise((resolve, reject) =>
      request[method](
        { url, domain, username, password, body, headers },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      )
    );
  }
}

async function getUser(username, password) {
  // Get the user info from NAV. If we succeed, the user is logged in.
  const url = `${process.env.NAV_BASE_URL}/User?$filter=User_Name eq '${username}'&$select=Full_Name,License_Type`;
  const { body, statusCode } = await ntlmRequest({
    url,
    domainUsername: username,
    password,
    method: "get"
  });
  const parsedBody = body ? JSON.parse(body) : {};
  if (statusCode === 200 && parsedBody.value.length === 1) {
    return { ...parsedBody.value[0] };
  } else {
    const error = new Error("Login failed");
    error.status = 401;
    throw error;
  }
}

// Configure passport to use NAV windows authentication and sessions.
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await getUser(username, password);
      done(null, { ...user, username, password });
    } catch (error) {
      done(error);
    }
  })
);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Log handled URLS.
app.use((req, res, next) => {
  console.log(`REQUEST ${req.url}`);
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
app.get("/api/refresh", async (req, res) => {
  if (req.user) {
    const { Full_Name, License_Type, username: Username } = req.user;
    res.status(200).json({ Full_Name, License_Type, Username });
  } else {
    res.status(403).end();
  }
});

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  const { Full_Name, License_Type, username: Username } = req.user;
  res.status(200).json({ Full_Name, License_Type, Username });
});

app.post("/api/logout", (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    else res.status(204).end();
  });
});

// Proxy requests to the NAV server using the auth information in the session.
app.use("/api", async (req, res, next) => {
  const { username, password } = req.user;
  try {
    const { body, statusCode } = await ntlmRequest({
      domainUsername: username,
      password,
      url: `${process.env.NAV_BASE_URL}/${req.url}`,
      method: req.method.toLowerCase(),
      ...(["POST", "PUT", "PATCH"].includes(req.method) && {
        body: JSON.stringify(req.body),
        headers: {
          "content-type": "application/json"
        }
      })
    });
    res.status(statusCode).send(body);
  } catch (error) {
    next(error);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`proxy listening on port ${port}`));

module.exports = app;
