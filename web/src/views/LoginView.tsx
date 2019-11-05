/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import { useAuth } from "../contexts/auth";
import { Button, Title, FormGroup } from "../components/styled";
import { TextInput } from "../components/ui/text-inputs";
import Field from "../components/ui/Field";

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
          <FormGroup>
            <div css={{ color: "red" }}>Username or password are invalid.</div>
          </FormGroup>
        )}
        <Field name="username" label="Username">
          <TextInput
            value={username}
            onChange={username => setCredentials(old => ({ ...old, username }))}
          />
        </Field>
        <Field name="password" label="Password">
          <TextInput
            type="password"
            value={password}
            onChange={password => setCredentials(old => ({ ...old, password }))}
          />
        </Field>
        <FormGroup>
          <Button type="submit">Log In</Button>
        </FormGroup>
      </form>
    </div>
  );
};

export default LoginView;
