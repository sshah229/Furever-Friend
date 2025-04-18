import { Box, Image, Text, Button } from '@chakra-ui/react';
import { Dog } from '../api/dogs';

interface Props {
  dog: Dog;
  onToggleFavorite: (id: string) => void;
  isFavorited: boolean;
}

export function DogCard({ dog, onToggleFavorite, isFavorited }: Props) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Image src={dog.img} alt={dog.name} boxSize="200px" objectFit="cover" mx="auto" />
      <Text fontWeight="bold" mt={2}>{dog.name}</Text>
      <Text>Breed: {dog.breed}</Text>
      <Text>Age: {dog.age}</Text>
      <Text>ZIP: {dog.zip_code}</Text>
      <Button
        mt={3}
        size="sm"
        colorScheme={isFavorited ? 'red' : 'teal'}
        onClick={() => onToggleFavorite(dog.id)}
      >
        {isFavorited ? 'Unfavorite' : 'Favorite'}
      </Button>
    </Box>
  );
}
