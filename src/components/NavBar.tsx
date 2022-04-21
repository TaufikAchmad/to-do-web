import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  let items = null;

  if (fetching) {
  } else if (!data?.me) {
    // not logged in
    items = (
      <>
        <NextLink href={'/login'}>
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href={'/register'}>
          <Link>register</Link>
        </NextLink>
      </>
    );
  } else {
    items = (
      <Flex>
        <Box mr={4}>Hi {data.me.username}!</Box>
        <Button
          isLoading={logoutFetching}
          onClick={() => logout()}
          color={'black'}
          variant={'link'}
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex p={4} bg={'skyblue'}>
      <Box ml={'auto'}>{items}</Box>
    </Flex>
  );
};
