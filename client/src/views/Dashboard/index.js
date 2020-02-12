import React, { useEffect } from "react";

import { Wrapper, Card, Linkton } from "bushido-strap";

import Loading from "../../components/Loading";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const HELLO_WORLD = gql`
  {
    Hello(name: "world")
    Users {
      id
      username
      posts {
        id
        title
        body
      }
    }
  }
`;

export default function Dashboard() {
  const { loading, data } = useQuery(HELLO_WORLD);
  useEffect(() => {}, []);
  if (loading) return <Loading />;
  console.log(data);
  return (
    <Wrapper jc_center>
      <Card>
        <Card invert>
          <Linkton to="/register" stretch="true" purple="true">
            Register here
          </Linkton>
          {/* <Linkton to="/users" stretch="true" pink="true">
            View users here
          </Linkton> */}
          <h3>A message from GraphQL to you!</h3>
          <strong>{data?.Hello}</strong>
          {data?.Users?.map(item => (
            <Card stretch key={item.id}>
              <h3>{item.username}</h3>
              {item?.posts?.map(item => (
                <Card invert stretch key={item.id}>
                  <h6>{item.title}</h6>
                  <p>{item.body}</p>
                </Card>
              ))}
            </Card>
          ))}
        </Card>
      </Card>
    </Wrapper>
  );
}
