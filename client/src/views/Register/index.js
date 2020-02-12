import React from "react";

import {
  Wrapper,
  Form,
  Button,
  Input,
  Card,
  Linkton,
  Box
} from "bushido-strap";

// import Loading from "../../components/Loading";
// if (loading) return <Loading />;

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
    <Wrapper jc_center>
      <Card>
        <Card invert stretch>
          <Linkton to="/" stretch orange>
            Go to home
          </Linkton>
          {/* <Linkton to="/users" stretch green>
            Go to users
          </Linkton> */}
        </Card>
        <Box sqr="5rem" bg="red" />
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
            <h6>Register New User:</h6>
            <Box h="2rem" />
            <Input
              name="id"
              type="number"
              placeholder="id"
              onChange={handleInputChange}
            />
            <Box h="2rem" />
            <Input
              name="username"
              type="text"
              placeholder="username"
              onChange={handleInputChange}
            />
            <Box h="2rem" />
            <Input
              name="password"
              type="password"
              placeholder="password"
              onChange={handleInputChange}
            />
            <Button type="submit" pink>
              Submit
            </Button>
          </Card>
        </Form>
      </Card>
    </Wrapper>
  );
}
