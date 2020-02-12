import React from "react";

import { Wrapper, Card, Linkton } from "bushido-strap";

import { Query } from "react-apollo";
import gql from "graphql-tag";

export default function Dashboard() {
  return (
    <Wrapper jc_center>
      <Card>
        <Query
          query={gql`
            {
              hello(name: "world")
              users {
                id
                username
                posts {
                  id
                  title
                  body
                }
              }
            }
          `}
        >
          {({ data }) => {
            console.log(data);
            return (
              <Card invert>
                <Linkton to="/" stretch="true" purple="true">
                  Go here
                </Linkton>
                <h3>A message from GraphQL to you!</h3>
                <strong>{data?.hello}</strong>
                {data?.users?.map(item => (
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
            );
          }}
        </Query>
      </Card>
    </Wrapper>
  );
}
