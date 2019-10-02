import path from "path";
import passport from "passport";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { ntlmRequest } from "./util";
import { initMongoose } from "./config/mongoose";
import { initPassport, sessions } from "./config/passport";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

initMongoose();
initPassport();

const app = express();

app.use((req, res, next) => {
  console.log(`REQUEST ${req.url}`);
  next();
});
app.use(bodyParser.json());
app.use(sessions());

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
  if (req.user) {
    const { Full_Name, License_Type, username: Username } = req.user;
    res.status(200).json({ Full_Name, License_Type, Username });
  } else {
    res.status(403).end();
  }
});

app.post("/api/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) next(err);
      else res.status(204).end();
    });
  } else {
    res.status(204).end();
  }
});

// Proxy requests to the NAV server using the auth information in the session.
app.use("/api", async (req, res, next) => {
  if (req.user) {
    const { username, password } = req.user;
    try {
      const { body, statusCode } = await ntlmRequest({
        domainUsername: username,
        password,
        url: `${process.env.NAV_BASE_URL}/${req.url}`,
        method: req.method.toLowerCase(),
        ...(["POST", "PUT", "PATCH"].includes(req.method) && {
          body: req.body,
          headers: {
            "content-type": "application/json"
          }
        })
      });
      res.status(statusCode).send(body);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(403).end();
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`proxy listening on port ${port}`));

module.exports = app;
