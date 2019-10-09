/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import ButtonInput from "../components/ui/ButtonInput";
import FormLabel from "../components/ui/FormLabel";
import ViewTitle from "../components/ui/ViewTitle";
import TextInput from "../components/ui/TextInput";

interface Credentials {
  username?: string;
  password?: string;
}

const LoginView: React.FC<RouteComponentProps> = ({ history }) => {
  const { login } = useAuth();
  const [isInvalid, setInvalid] = useState<boolean>(false);
  const [{ username, password }, setCredentials] = useState<Credentials>({
    username: "",
    password: ""
  });

  return (
    <div
      css={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <ViewTitle>Login</ViewTitle>
      <form
        css={{
          display: "flex",
          flexDirection: "column",
          padding: "0 16px"
        }}
        onSubmit={async e => {
          e.preventDefault();
          if (username && password) {
            try {
              setInvalid(false);
              login && (await login(username, password));
              history.replace("/form/action");
            } catch {
              setInvalid(true);
            }
          }
        }}
      >
        {isInvalid && (
          <div css={{ color: "red" }}>Username or password are invalid.</div>
        )}
        <FormLabel htmlFor="username">Username</FormLabel>
        <TextInput
          id="username"
          value={username}
          onChange={username => {
            setCredentials(old => ({ ...old, username }));
          }}
        />
        <FormLabel htmlFor="password">Password</FormLabel>
        <TextInput
          id="password"
          type="password"
          value={password}
          onChange={password => {
            setCredentials(old => ({ ...old, password }));
          }}
        />
        <ButtonInput css={{ marginTop: 32 }} type="submit">
          Log In
        </ButtonInput>
      </form>
    </div>
  );
};

export default LoginView;
