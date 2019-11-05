/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import { useAuth } from "../contexts/auth";
import { Button, Label, Title, TextInput } from "../components/styled";

interface Credentials {
  username?: string;
  password?: string;
}

const LoginView: React.FC = () => {
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
      <Title>Login</Title>
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
            } catch {
              setInvalid(true);
            }
          }
        }}
      >
        {isInvalid && (
          <div css={{ color: "red" }}>Username or password are invalid.</div>
        )}
        <Label htmlFor="username">Username</Label>
        <TextInput
          id="username"
          value={username}
          onChange={e => {
            setCredentials(old => ({ ...old, username: e.target.value }));
          }}
        />
        <Label htmlFor="password">Password</Label>
        <TextInput
          id="password"
          type="password"
          value={password}
          onChange={e => {
            setCredentials(old => ({ ...old, password: e.target.value }));
          }}
        />
        <Button css={{ marginTop: 32 }} type="submit">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LoginView;
