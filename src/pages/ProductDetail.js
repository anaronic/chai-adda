import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  Flex,
  Badge,
  useColorModeValue,
  Heading,
  Card,
  CardBody,
  Divider,
  Icon,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import {
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiEye,
  FiArrowLeft,
  FiShare2,
  FiCoffee,
} from 'react-icons/fi';
import productsData from '../data/products.json';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === id);
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return (
      <Box minH="100vh" bg="gray.50" pb="80px">
        <Container maxW="container.sm" px={4} py={8}>
          <VStack spacing={4}>
            <Text>Product not found</Text>
            <Button onClick={() => navigate('/shop')}>
              Back to Shop
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  const getTagColor = (tag) => {
    switch (tag) {
      case 'bestseller':
        return 'brand';
      case 'premium':
        return 'purple';
      case 'spiced':
        return 'orange';
      case 'antioxidant':
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <Box minH="100vh" bg="gray.50" pb="80px">
      <Container maxW="container.sm" px={4} py={6}>
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <HStack justify="space-between" align="center">
            <Button
              variant="ghost"
              leftIcon={<FiArrowLeft />}
              onClick={() => navigate('/shop')}
              size="sm"
            >
              Back
            </Button>
            <HStack spacing={2}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsWishlisted(!isWishlisted)}
                color={isWishlisted ? 'red.500' : 'gray.500'}
              >
                <FiHeart />
              </Button>
              <Button variant="ghost" size="sm">
                <FiShare2 />
              </Button>
            </HStack>
          </HStack>

          {/* Product Image */}
          <Card bg="white" overflow="hidden">
            <Box
              h="250px"
              bg="gray.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              <Icon as={FiCoffee} boxSize={16} color="brand.400" />
              {product.tags.includes('bestseller') && (
                <Badge
                  position="absolute"
                  top={4}
                  right={4}
                  colorScheme="brand"
                  size="lg"
                >
                  Bestseller
                </Badge>
              )}
            </Box>
          </Card>

          {/* Product Info */}
          <VStack spacing={4} align="stretch">
            <VStack spacing={2} align="stretch">
              <Heading size="lg" color="gray.800">
                {product.name}
              </Heading>
              
              <HStack justify="space-between" align="center">
                <Text fontSize="2xl" fontWeight="bold" color="brand.600">
                  ₹{product.price}
                </Text>
                <HStack spacing={1}>
                  <Icon as={FiStar} color="yellow.400" />
                  <Text fontWeight="semibold">{product.rating}</Text>
                  <Text color="gray.500">({Math.floor(Math.random() * 100) + 50} reviews)</Text>
                </HStack>
              </HStack>

              <HStack spacing={2} flexWrap="wrap">
                {product.tags.map((tag) => (
                  <Badge
                    key={tag}
                    colorScheme={getTagColor(tag)}
                    variant="subtle"
                    size="sm"
                  >
                    {tag}
                  </Badge>
                ))}
              </HStack>
            </VStack>

            {/* Quick Info */}
            <SimpleGrid columns={2} spacing={4}>
              <HStack spacing={2}>
                <Icon as={FiMapPin} color="gray.500" />
                <VStack align="start" spacing={0}>
                  <Text fontSize="xs" color="gray.500">Origin</Text>
                  <Text fontSize="sm" fontWeight="medium">{product.origin}</Text>
                </VStack>
              </HStack>
              
              <HStack spacing={2}>
                <Icon as={FiClock} color="gray.500" />
                <VStack align="start" spacing={0}>
                  <Text fontSize="xs" color="gray.500">Brew Time</Text>
                  <Text fontSize="sm" fontWeight="medium">{product.brewTime}</Text>
                </VStack>
              </HStack>
            </SimpleGrid>

            <Divider />

            {/* Description */}
            <VStack spacing={3} align="stretch">
              <Heading size="md" color="gray.800">
                Description
              </Heading>
              <Text color="gray.600" lineHeight="tall">
                {product.description}
              </Text>
            </VStack>

            {/* Ingredients */}
            <VStack spacing={3} align="stretch">
              <Heading size="md" color="gray.800">
                Ingredients
              </Heading>
              <List spacing={2}>
                {product.ingredients.map((ingredient, index) => (
                  <ListItem key={index}>
                    <ListIcon as={FiCheckCircle} color="green.500" />
                    {ingredient}
                  </ListItem>
                ))}
              </List>
            </VStack>

            {/* AR Preview */}
            <Card bg="ocean.50" border="1px" borderColor="ocean.200">
              <CardBody p={6}>
                <VStack spacing={4}>
                  <Icon as={FiEye} boxSize={8} color="ocean.500" />
                  <VStack spacing={2}>
                    <Text fontWeight="semibold" color="ocean.700">
                      AR Preview
                    </Text>
                    <Text fontSize="sm" color="ocean.600" textAlign="center">
                      See how this tea looks in your space
                    </Text>
                  </VStack>
                  <Button
                    variant="outline"
                    colorScheme="ocean"
                    onClick={onOpen}
                    size="sm"
                  >
                    Try AR Preview
                  </Button>
                </VStack>
              </CardBody>
            </Card>

            {/* Add to Cart Section */}
            <Card bg="white" border="1px" borderColor="brand.200">
              <CardBody p={6}>
                <VStack spacing={4}>
                  <HStack spacing={4} w="full">
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" color="gray.600">Quantity</Text>
                      <NumberInput
                        value={quantity}
                        onChange={(value) => setQuantity(parseInt(value) || 1)}
                        min={1}
                        max={10}
                        size="sm"
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </VStack>
                    
                    <VStack align="start" spacing={1} flex={1}>
                      <Text fontSize="sm" color="gray.600">Total</Text>
                      <Text fontSize="lg" fontWeight="bold" color="brand.600">
                        ₹{product.price * quantity}
                      </Text>
                    </VStack>
                  </HStack>

                  <Button
                    size="lg"
                    colorScheme="brand"
                    leftIcon={<FiShoppingCart />}
                    w="full"
                  >
                    Add to Cart - ₹{product.price * quantity}
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </VStack>
      </Container>

      {/* AR Preview Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>AR Preview - {product.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} py={8}>
              <Box
                h="300px"
                bg="gray.100"
                w="full"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <VStack spacing={4}>
                  <Icon as={FiEye} boxSize={12} color="gray.400" />
                  <Text color="gray.500" textAlign="center">
                    AR Preview Coming Soon
                  </Text>
                  <Text fontSize="sm" color="gray.400" textAlign="center">
                    Point your camera at a flat surface to see this tea in your space
                  </Text>
                </VStack>
              </Box>
              
              <Button
                colorScheme="brand"
                onClick={onClose}
                w="full"
              >
                Close Preview
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductDetail; 