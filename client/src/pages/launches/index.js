import React, { Fragment } from 'react';
import { Query } from 'react-apollo';

import { queries } from '../../store'

import { LaunchTile, Header, Button, Loading } from '../../components';

const { GET_LAUNCHES } = queries

export const Launches = () => {
  return (
    <Query query={GET_LAUNCHES}>
      {({ data, loading, error, fetchMore }) => {
        if (loading) return <Loading />;
        if (error) return <p>ERROR</p>;

        return (
          <Fragment>
            <Header />
            {data.launches &&
              data.launches.launches &&
              data.launches.launches.map(launch => (
                <LaunchTile key={launch.id} launch={launch} />
              ))}
            {data.launches &&
              data.launches.hasMore && (
                <Button
                  onClick={() =>
                    fetchMore({
                      variables: {
                        after: data.launches.cursor,
                      },
                      updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                        if (!fetchMoreResult) return prev;
                        return {
                          ...fetchMoreResult,
                          launches: {
                            ...fetchMoreResult.launches,
                            launches: [
                              ...prev.launches.launches,
                              ...fetchMoreResult.launches.launches,
                            ],
                          },
                        };
                      },
                    })
                  }
                >
                  Load More
                </Button>
              )}
          </Fragment>
        );
      }}
    </Query>
  );
}
