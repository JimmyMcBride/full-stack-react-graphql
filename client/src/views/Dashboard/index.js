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
            }
          `}
        >
          {({ data }) => {
            console.log(data);
            return (
              <Card invert>
                <h6>A message from GraphQL to you!</h6>
                <strong>{data?.hello}</strong>
              </Card>
            );
          }}
        </Query>
      </Card>
    </Wrapper>
  );
}
