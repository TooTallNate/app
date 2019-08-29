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

passport.use(
  new LocalStrategy((domainUsername, password, done) => {
    // Get the user info from NAV. If we succeed, the user is logged in.
    const [domain, username] = domainUsername.split("\\");
    const url = `${process.env.NAV_BASE_URL}/User?$filter=User_Name eq '${domainUsername}'`;
    console.log(url);
    request.get({ url, username, password, domain }, (err, result) => {
      if (err) return done(err);
      done(null, { ...JSON.parse(result.body).value[0], password });
    });
  })
);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use(bodyParser.json());
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
app.use("/api", (req, res, next) => {
  const [domain, username] = req.user.User_Name.split("\\");
  request.get(
    {
      url: `${process.env.NAV_BASE_URL}/${req.url}`,
      domain,
      username,
      password: req.user.password
    },
    (err, result) => {
      res.status(result.statusCode).send(result.body);
    }
  );
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`proxy listening on port ${port}`));

module.exports = app;
