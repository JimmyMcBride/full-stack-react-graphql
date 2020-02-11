import React from "react";

import { Wrapper, Card } from "bushido-strap";

import { Query } from "react-apollo";
import gql from "graphql-tag";

export default function Dashboard() {
  return (
    <Wrapper jc_center>
      <Card>
        <Query
          query={gql`
            {
              hello
              users {
                id
                username
                posts {
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
                <h3>A message from GraphQL to you!</h3>
                <strong>{data?.hello}</strong>
                {data?.users?.map(item => (
                  <Card stretch>
                    <h3>{item.username}</h3>
                    {item?.posts?.map(item => (
                      <Card invert stretch>
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
