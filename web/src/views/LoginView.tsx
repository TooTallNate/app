/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import { useAuth } from "../contexts/auth";
import { Button, Title, Group, View } from "../components/styled";
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
    <View>
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
              await login(username, password);
            } catch {
              setInvalid(true);
            }
          }
        }}
      >
        {isInvalid && (
          <Group>
            <div css={{ color: "red" }}>Username or password are invalid.</div>
          </Group>
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
        <Group>
          <Button type="submit">Log In</Button>
        </Group>
      </form>
    </View>
  );
};

export default LoginView;
