/** @jsx jsx */
import { jsx } from "@emotion/core";
import TextInput from "../components/TextInput";
import { useState } from "react";
import ButtonInput from "../components/ButtonInput";
import FormLabel from "../components/FormLabel";
import service from "../service";
import { RouteComponentProps } from "react-router";

interface Credentials {
  username?: string;
  password?: string;
}

const LoginView: React.FC<RouteComponentProps> = ({ history }) => {
  const [{ username, password }, setCredentials] = useState<Credentials>({
    username: "",
    password: ""
  });

  return (
    <div css={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <h1>Login</h1>
      <form
        css={{
          display: "flex",
          flexDirection: "column"
        }}
        onSubmit={async e => {
          e.preventDefault();
          if (username && password) {
            await service.login({ username, password });
            history.push("/form/action");
          }
        }}
      >
        <FormLabel htmlFor="username">Username</FormLabel>
        <TextInput
          id="username"
          type="text"
          value={username}
          onChange={e => {
            const username = e.target.value;
            setCredentials(old => ({ ...old, username }));
          }}
        />
        <FormLabel htmlFor="password">Password</FormLabel>
        <TextInput
          id="password"
          type="password"
          value={password}
          onChange={e => {
            const password = e.target.value;
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
