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
} from '@chakra-ui/react';
import {
  FiCoffee,
  FiFeather,
  FiStar,
  FiArrowRight,
  FiClock,
  FiUsers,
} from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const bgGradient = useColorModeValue(
    'linear(to-br, brand.50, cream.50)',
    'linear(to-br, gray.900, gray.800)'
  );

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour < 12) {
      setGreeting('সুপ্রভাত! Good Morning!');
    } else if (hour < 17) {
      setGreeting('শুভ অপরাহ্ন! Good Afternoon!');
    } else {
      setGreeting('শুভ সন্ধ্যা! Good Evening!');
    }

    setCurrentTime(now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }));
  }, []);

  const features = [
    {
      icon: FiCoffee,
      title: 'Explore Teas',
      description: 'Discover premium Golden Tips teas',
      color: 'brand.500',
      path: '/shop',
    },
    {
      icon: FiFeather,
      title: 'Free Lifestyle',
      description: 'Rituals, content, and community',
      color: 'tea.500',
      path: '/rituals',
    },
    {
      icon: FiClock,
      title: 'Tea Timer',
      description: 'Perfect brewing every time',
      color: 'ocean.500',
      path: '/rituals',
    },
    {
      icon: FiUsers,
      title: 'Join Adda',
      description: 'Connect with tea lovers',
      color: 'cream.500',
      path: '/adda',
    },
  ];

  return (
    <Box minH="100vh" bgGradient={bgGradient} pb="80px">
      <Container maxW="container.sm" px={4} py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header Section */}
          <VStack spacing={4} textAlign="center">
            <Box
              w="80px"
              h="80px"
              borderRadius="full"
              bg="brand.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="lg"
            >
              <Icon as={FiCoffee} boxSize={8} color="white" />
            </Box>
            
            <VStack spacing={2}>
              <Heading
                size="lg"
                color="brand.600"
                fontFamily="heading"
                fontSize={{ base: 'xl', md: '2xl' }}
              >
                ChaiAdda
              </Heading>
              <Text
                fontSize="sm"
                color="gray.600"
                fontFamily="bengali"
              >
                by Golden Tips
              </Text>
            </VStack>

            <VStack spacing={2}>
              <Text
                fontSize="lg"
                fontWeight="semibold"
                color="gray.700"
                fontFamily="bengali"
              >
                {greeting}
              </Text>
              <Text
                fontSize="md"
                color="gray.500"
              >
                Time for a ChaiAdda break? {currentTime}
              </Text>
            </VStack>
          </VStack>

          {/* Main Action Cards */}
          <SimpleGrid columns={2} spacing={4}>
            <Card
              cursor="pointer"
              onClick={() => navigate('/shop')}
              _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
              transition="all 0.3s"
              bg="white"
              border="2px"
              borderColor="brand.200"
            >
              <CardBody textAlign="center" py={6}>
                <Icon as={FiCoffee} boxSize={8} color="brand.500" mb={3} />
                <Text fontWeight="semibold" color="brand.600" mb={2}>
                  ☕ Explore Teas
                </Text>
                <Text fontSize="xs" color="gray.600">
                  Premium e-commerce
                </Text>
              </CardBody>
            </Card>

            <Card
              cursor="pointer"
              onClick={() => navigate('/rituals')}
              _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
              transition="all 0.3s"
              bg="white"
              border="2px"
              borderColor="tea.200"
            >
              <CardBody textAlign="center" py={6}>
                <Icon as={FiFeather} boxSize={8} color="tea.500" mb={3} />
                <Text fontWeight="semibold" color="tea.600" mb={2}>
                  🌱 Free Lifestyle
                </Text>
                <Text fontSize="xs" color="gray.600">
                  Rituals & content
                </Text>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Quick Features */}
          <VStack spacing={4}>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              color="gray.700"
              textAlign="center"
            >
              What's Brewing Today?
            </Text>
            
            <SimpleGrid columns={2} spacing={3} w="full">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  cursor="pointer"
                  onClick={() => navigate(feature.path)}
                  _hover={{ transform: 'translateY(-1px)', shadow: 'md' }}
                  transition="all 0.2s"
                  bg="white"
                  size="sm"
                >
                  <CardBody p={4}>
                    <VStack spacing={2}>
                      <Icon as={feature.icon} boxSize={5} color={feature.color} />
                      <Text fontSize="sm" fontWeight="medium" textAlign="center">
                        {feature.title}
                      </Text>
                      <Text fontSize="xs" color="gray.500" textAlign="center">
                        {feature.description}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>

          {/* Daily Quote */}
          <Card bg="white" border="1px" borderColor="brand.100">
            <CardBody p={6}>
              <VStack spacing={3}>
                <Icon as={FiStar} boxSize={5} color="brand.400" />
                <Text
                  fontSize="md"
                  fontStyle="italic"
                  color="gray.700"
                  textAlign="center"
                  fontFamily="bengali"
                >
                  "চা হল জীবনের একটি ক্ষুদ্র আনন্দ।"
                </Text>
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  "Tea is a small joy of life."
                </Text>
                <Text fontSize="xs" color="brand.500" fontWeight="medium">
                  - Rabindranath Tagore
                </Text>
              </VStack>
            </CardBody>
          </Card>

          {/* Quick Actions */}
          <VStack spacing={3}>
            <Button
              size="lg"
              colorScheme="brand"
              w="full"
              onClick={() => navigate('/quiz/which-tea-are-you')}
              leftIcon={<FiStar />}
            >
              Take Tea Personality Quiz
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              w="full"
              onClick={() => navigate('/culture')}
              rightIcon={<FiArrowRight />}
            >
              Explore Bengali Culture
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home; 