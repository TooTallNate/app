import session from "express-session";
import passport from "passport";
import storeBuilder from "connect-mongo";
import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface SessionUser {
      username: string;
      name: string;
      securityId: string;
    }

    interface Session {
      user?: SessionUser;
    }
  }
}

const MongoStore = storeBuilder(session);

export function initPassport() {
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
