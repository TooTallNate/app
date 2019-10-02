import session from "express-session";
import passport from "passport";
import storeBuilder from "connect-mongo";
import mongoose from "mongoose";
import { Strategy as LocalStrategy } from "passport-local";
import { getUser } from "../util";

const MongoStore = storeBuilder(session);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      Full_Name: string;
      License_Type: string;
      username: string;
      password: string;
    }
  }
}

export function initPassport() {
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
}

export function sessions() {
  // Initialize sessions and authentication
  return [
    session({
      secret: process.env.SESSION_SECRET || "",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        touchAfter: 24 * 3600
      })
    }),
    passport.initialize(),
    passport.session()
  ];
}
