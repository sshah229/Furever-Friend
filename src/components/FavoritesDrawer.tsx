import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  useDisclosure,
  VStack,
  Text,
} from '@chakra-ui/react';

interface Props {
  favoriteDogs: string[];
  onMatch: () => Promise<void>;
}

export function FavoritesDrawer({ favoriteDogs, onMatch }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();  // v2 supports isOpen

  return (
    <>
      <Button onClick={onOpen} colorScheme="purple" m={4}>
        Favorites ({favoriteDogs.length})
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Your Favorites</DrawerHeader>
          <DrawerBody>
            <VStack spacing={3}>
              {favoriteDogs.map((id) => (
                <Text key={id}>{id}</Text>
              ))}
              <Button
                colorScheme="green"
                onClick={onMatch}
                isDisabled={!favoriteDogs.length}
              >
                Find My Match
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
