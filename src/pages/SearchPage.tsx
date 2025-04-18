import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Select,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  fetchBreeds,
  fetchDogsByIds,
  matchDogs,
  searchDogsCursor,
  Dog,
} from '../api/dogs';
import { DogCard } from '../components/DogCard';
import { FavoritesDrawer } from '../components/FavoritesDrawer';

export function SearchPage() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const [dogs, setDogs] = useState<Dog[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [matchId, setMatchId] = useState<string | null>(null);

  useEffect(() => {
    fetchBreeds().then(setBreeds);
  }, []);

  useEffect(() => {
    setDogs([]);
    setNextCursor(null);
    fetchPage();
  }, [selectedBreed, sortDir]);

  const fetchPage = async (cursor?: string) => {
    setLoading(true);
    const sr = await searchDogsCursor(
      cursor,
      cursor
        ? undefined
        : { breeds: selectedBreed ? [selectedBreed] : undefined, size: 12, sort: `breed:${sortDir}` }
    );
    const dogObjs = await fetchDogsByIds(sr.resultIds);
    setDogs(prev => (cursor ? [...prev, ...dogObjs] : dogObjs));
    setNextCursor(sr.next ?? null);
    setLoading(false);
  };

  const toggleFav = (id: string) =>
    setFavorites(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  const handleMatch = async () => {
    if (!favorites.length) return;
    const id = await matchDogs(favorites);
    setMatchId(id);
  };

  const bg = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box bg={bg} minH="100vh" py={10}>
      <Container maxW="container.xl">
        <Flex mb={6} align="center" justify="space-between">
          <Heading size="xl">Find Your Furever Friend</Heading>
          <FavoritesDrawer favoriteDogs={favorites} onMatch={handleMatch} />
        </Flex>

        {matchId && (
          <Box mb={4} p={4} bg="green.100" rounded="md">
            <Text>
              Your match is: <strong>{matchId}</strong>
            </Text>
          </Box>
        )}

        <HStack mb={6} spacing={4} flexWrap="wrap">
          <Select
            w="250px"
            placeholder="Filter by breed"
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
          >
            {breeds.map(b => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>

          <Button onClick={() => setSortDir(s => (s === 'asc' ? 'desc' : 'asc'))}>
            Sort: {sortDir === 'asc' ? 'A → Z' : 'Z → A'}
          </Button>
        </HStack>

        {loading && dogs.length === 0 ? (
          <Flex justify="center" py={20}>
            <Spinner size="xl" />
          </Flex>
        ) : (
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
            {dogs.map(d => (
              <DogCard
                key={d.id}
                dog={d}
                isFavorited={favorites.includes(d.id)}
                onToggleFavorite={toggleFav}
              />
            ))}
          </SimpleGrid>
        )}

        {nextCursor && (
          <Flex justify="center" mt={8}>
            <Button size="lg" onClick={() => fetchPage(nextCursor)}>
              Load More
            </Button>
          </Flex>
        )}
      </Container>
    </Box>
  );
}
