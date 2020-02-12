import React from "react";

import { Wrapper, Form, Button, Input, Card } from "bushido-strap";

import { useInputChange } from "../../hooks/useInputChange";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const REGISTER_USER = gql`
  mutation Register($id: ID!, $username: String!, $password: String!) {
    register(creds: { id: $id, username: $username, password: $password }) {
      Users {
        id
        username
        firstLetterOfUserName
      }
    }
  }
`;

export default function Register() {
  const [input, handleInputChange] = useInputChange();

  const [register, { data }] = useMutation(REGISTER_USER);

  return (
    <Wrapper>
      <Card>
        <Form
          onSubmit={e => {
            e.preventDefault();
            register({
              variables: {
                id: input.id,
                username: input.username,
                password: input.password
              }
            });
            input.id = "";
            input.username = "";
            input.password = "";
          }}
        >
          <Card invert p="3rem">
            <Input
              name="id"
              type="number"
              placeholder="id"
              onChange={handleInputChange}
            />
            <Input
              name="username"
              type="text"
              placeholder="username"
              onChange={handleInputChange}
            />
            <Input
              name="password"
              type="password"
              placeholder="password"
              onChange={handleInputChange}
            />
            <Button type="submit">Submit</Button>
          </Card>
        </Form>
      </Card>
    </Wrapper>
  );
}
