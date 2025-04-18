import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  VStack,
  useColorModeValue,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await login({ name, email });
    navigate('/search');
  };

  const bg = useColorModeValue('white', 'gray.700');

  return (
    <Flex height="100vh" align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Box
        bg={bg}
        p={8}
        rounded="xl"
        shadow="lg"
        maxW="md"
        w="100%"
      >
        <VStack spacing={6} align="stretch">
          <Heading textAlign="center" size="lg">Welcome Back</Heading>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="teal"
            size="lg"
            w="full"
            onClick={handleSubmit}
            isDisabled={!name || !email}
          >
            Log In
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
