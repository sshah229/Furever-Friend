import { useAuth } from '../contexts/AuthContext';
import { Flex, Heading, Button, Spacer, Box } from '@chakra-ui/react'

export function Header() {
  const { user, logout } = useAuth();
  return (
    <Flex p={4} bg="teal.500" color="white" align="center">
      <Heading size="md">🐶 Find Your Furever Friend</Heading>
      <Spacer />
      {user && (
        <>
          <Box mr={4}>{user.name}</Box>
          <Button onClick={logout} size="sm">Logout</Button>
        </>
      )}
    </Flex>
  );
}
