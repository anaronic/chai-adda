import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiFilter,
  FiCoffee,
} from 'react-icons/fi';
import productsData from '../data/products.json';

const Shop = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['all', 'Darjeeling', 'Assam', 'Chai Blends', 'Wellness'];

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

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
          {/* Hero Section */}
          <Card bg="white" overflow="hidden">
            <Box
              h="200px"
              position="relative"
              bg="linear-gradient(135deg, brand.500 0%, ocean.500 100%)"
            >
              <Image
                src="https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&h=400&fit=crop&crop=center"
                alt="Premium Tea Collection"
                w="full"
                h="full"
                objectFit="cover"
                opacity="0.8"
                fallback={
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    h="full"
                    bg="linear-gradient(135deg, brand.500 0%, ocean.500 100%)"
                  >
                    <Icon as={FiCoffee} boxSize={12} color="white" />
                  </Box>
                }
              />
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="rgba(0,0,0,0.3)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <VStack spacing={2}>
                  <Heading
                    size="lg"
                    color="white"
                    fontFamily="heading"
                    textAlign="center"
                  >
                    ☕ Tea Shop
                  </Heading>
                  <Text
                    fontSize="sm"
                    color="white"
                    textAlign="center"
                    fontFamily="bengali"
                    opacity="0.9"
                  >
                    Premium Golden Tips Collection
                  </Text>
                </VStack>
              </Box>
            </Box>
          </Card>

          {/* Search and Filter */}
          <VStack spacing={4}>
            <InputGroup>
              <InputLeftElement>
                <Icon as={FiSearch} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search teas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg="white"
                borderRadius="lg"
              />
            </InputGroup>

            <HStack spacing={3} w="full">
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                bg="white"
                borderRadius="lg"
                size="sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </Select>

              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                bg="white"
                borderRadius="lg"
                size="sm"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Sort by Rating</option>
              </Select>
            </HStack>
          </VStack>

          {/* Featured Product */}
          <Card bg="white" overflow="hidden">
            <Box
              h="150px"
              position="relative"
              bg="gray.100"
            >
              <Image
                src="/images/Pure-Darjeeling-Tea---Royal-Brocade-Cloth-Bag_35e032f0-d3cf-4ef1-8ffc-a7d68fcd69af_1024x.webp"
                alt="Featured Tea"
                w="full"
                h="full"
                objectFit="cover"
                fallback={
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    h="full"
                    bg="gray.100"
                  >
                    <Icon as={FiCoffee} boxSize={8} color="brand.400" />
                  </Box>
                }
              />
              <Badge
                position="absolute"
                top={3}
                left={3}
                colorScheme="brand"
                size="lg"
              >
                Featured
              </Badge>
            </Box>
            <CardBody p={4}>
              <VStack spacing={3} align="stretch">
                <Text fontSize="lg" fontWeight="bold" color="gray.800">
                  Premium Darjeeling First Flush
                </Text>
                <Text fontSize="sm" color="gray.600" noOfLines={2}>
                  Experience the delicate aroma and bright flavor of spring-harvested Darjeeling tea from the misty hills.
                </Text>
                <HStack justify="space-between" align="center">
                  <Text fontSize="xl" fontWeight="bold" color="brand.600">
                    ₹1,200
                  </Text>
                  <Button size="sm" colorScheme="brand">
                    View Details
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Category Showcase */}
          <VStack spacing={4}>
            <Text fontSize="lg" fontWeight="semibold" color="gray.700" textAlign="center">
              Explore Tea Categories
            </Text>
            <SimpleGrid columns={2} spacing={3} w="full">
              {categories.filter(cat => cat !== 'all').map((category, index) => {
                const categoryImages = {
                  "Darjeeling": "/images/Pure-Darjeeling-Tea---Royal-Brocade-Cloth-Bag_35e032f0-d3cf-4ef1-8ffc-a7d68fcd69af_1024x.webp",
                  "Assam": "/images/Pure-Assam-Tea---Royal-Brocade-Cloth-Bag_05668c7b-b3a6-41dd-b4ec-6278d580347b_1024x.webp",
                  "Chai Blends": "/images/gt-439_2_-fotor-2024111311343_1024x.webp",
                  "Wellness": "/images/glt-60_2_1024x.webp"
                };
                
                return (
                  <Card
                    key={category}
                    cursor="pointer"
                    onClick={() => setSelectedCategory(category)}
                    _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                    transition="all 0.3s"
                    bg="white"
                    overflow="hidden"
                  >
                    <Box
                      h="80px"
                      position="relative"
                      bg="gray.100"
                    >
                      <Image
                        src={categoryImages[category]}
                        alt={category}
                        w="full"
                        h="full"
                        objectFit="cover"
                        fallback={
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            h="full"
                            bg="gray.100"
                          >
                            <Icon as={FiCoffee} boxSize={6} color="brand.400" />
                          </Box>
                        }
                      />
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg="rgba(0,0,0,0.4)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text
                          fontSize="sm"
                          fontWeight="semibold"
                          color="white"
                          textAlign="center"
                        >
                          {category}
                        </Text>
                      </Box>
                    </Box>
                  </Card>
                );
              })}
            </SimpleGrid>
          </VStack>

          {/* Category Tabs */}
          <Tabs variant="soft-rounded" colorScheme="brand">
            <TabList overflowX="auto" pb={2}>
              {categories.map(category => (
                <Tab
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  fontSize="sm"
                  whiteSpace="nowrap"
                >
                  {category === 'all' ? 'All' : category}
                </Tab>
              ))}
            </TabList>
          </Tabs>

          {/* Products Grid */}
          <SimpleGrid columns={2} spacing={4}>
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                cursor="pointer"
                onClick={() => navigate(`/product/${product.id}`)}
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                transition="all 0.3s"
                bg="white"
                overflow="hidden"
              >
                <Box
                  h="120px"
                  bg="gray.100"
                  position="relative"
                  overflow="hidden"
                >
                  <Image
                    src={(() => {
                      const productImages = {
                        "darjeeling-first-flush": "/images/Pure-Darjeeling-Tea---Royal-Brocade-Cloth-Bag_35e032f0-d3cf-4ef1-8ffc-a7d68fcd69af_1024x.webp",
                        "masala-chai-classic": "/images/gt-439_2_-fotor-2024111311343_1024x.webp",
                        "assam-orthodox": "/images/Pure-Assam-Tea---Royal-Brocade-Cloth-Bag_05668c7b-b3a6-41dd-b4ec-6278d580347b_1024x.webp",
                        "green-tea-wellness": "/images/glt-60_2_1024x.webp",
                        "cardamom-chai": "/images/Earl-Grey-Darjeeling-Black-Tea---Royal-Brocade-Cloth-Bag_bd844fd9-f9b4-46fb-8ddf-e1ec96629d55_1024x.webp",
                        "oolong-mountain": "/images/Oolong_Pyramid_tea_bags_1024x.webp"
                      };
                      return productImages[product.id] || `https://picsum.photos/300/120?random=${product.id}`;
                    })()}
                    alt={product.name}
                    w="full"
                    h="full"
                    objectFit="cover"
                    fallback={
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        h="full"
                        bg="gray.100"
                      >
                        <Icon as={FiCoffee} boxSize={8} color="brand.400" />
                      </Box>
                    }
                  />
                  {product.tags.includes('bestseller') && (
                    <Badge
                      position="absolute"
                      top={2}
                      right={2}
                      colorScheme="brand"
                      size="sm"
                    >
                      Bestseller
                    </Badge>
                  )}
                </Box>

                <CardBody p={4}>
                  <VStack spacing={2} align="stretch">
                    <Text
                      fontSize="sm"
                      fontWeight="semibold"
                      color="gray.800"
                      noOfLines={2}
                    >
                      {product.name}
                    </Text>

                    <HStack justify="space-between" align="center">
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="brand.600"
                      >
                        ₹{product.price}
                      </Text>
                      <HStack spacing={1}>
                        <Icon as={FiStar} boxSize={3} color="yellow.400" />
                        <Text fontSize="xs" color="gray.600">
                          {product.rating}
                        </Text>
                      </HStack>
                    </HStack>

                    <Text
                      fontSize="xs"
                      color="gray.500"
                      noOfLines={1}
                    >
                      {product.origin}
                    </Text>

                    <HStack spacing={1} flexWrap="wrap">
                      {product.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          colorScheme={getTagColor(tag)}
                          size="xs"
                          variant="subtle"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </HStack>

                    <Button
                      size="sm"
                      colorScheme="brand"
                      leftIcon={<FiShoppingCart />}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic here
                      }}
                    >
                      Add to Cart
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          {filteredProducts.length === 0 && (
            <VStack spacing={4} py={8}>
              <Icon as={FiSearch} boxSize={12} color="gray.400" />
              <Text color="gray.500" textAlign="center">
                No teas found matching your search.
              </Text>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </VStack>
          )}

          {/* Promotional Banner */}
          <Card bg="white" overflow="hidden">
            <Box
              h="120px"
              position="relative"
              bg="gray.100"
            >
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=240&fit=crop&crop=center"
                alt="Special Offer"
                w="full"
                h="full"
                objectFit="cover"
                fallback={
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    h="full"
                    bg="gray.100"
                  >
                    <Icon as={FiCoffee} boxSize={8} color="brand.400" />
                  </Box>
                }
              />
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="rgba(0,0,0,0.5)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <VStack spacing={2}>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color="white"
                    textAlign="center"
                  >
                    🎉 Special Offer
                  </Text>
                  <Text
                    fontSize="sm"
                    color="white"
                    textAlign="center"
                    opacity="0.9"
                  >
                    Get 20% off on all Darjeeling teas
                  </Text>
                  <Button size="sm" colorScheme="brand" variant="solid">
                    Shop Now
                  </Button>
                </VStack>
              </Box>
            </Box>
          </Card>

          {/* Quick Stats */}
          <Card bg="brand.50" border="1px" borderColor="brand.200">
            <CardBody p={4}>
              <HStack justify="space-around" textAlign="center">
                <VStack spacing={1}>
                  <Text fontSize="lg" fontWeight="bold" color="brand.600">
                    {products.length}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Total Teas
                  </Text>
                </VStack>
                <VStack spacing={1}>
                  <Text fontSize="lg" fontWeight="bold" color="brand.600">
                    {products.filter(p => p.tags.includes('bestseller')).length}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Bestsellers
                  </Text>
                </VStack>
                <VStack spacing={1}>
                  <Text fontSize="lg" fontWeight="bold" color="brand.600">
                    {categories.length - 1}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Categories
                  </Text>
                </VStack>
              </HStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};

export default Shop; 