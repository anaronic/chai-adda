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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  Divider,
} from '@chakra-ui/react';
import {
  FiBookOpen,
  FiStar,
  FiHeart,
  FiShare2,
  FiCalendar,
  FiCoffee,
  FiMusic,
  FiUsers,
  FiArrowRight,
} from 'react-icons/fi';
import storiesData from '../data/stories.json';
import quotesData from '../data/quotes.json';
import calendarData from '../data/calendar.json';

const Culture = () => {
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState(null);

  useEffect(() => {
    // Set random quote
    const randomQuote = quotesData[Math.floor(Math.random() * quotesData.length)];
    setCurrentQuote(randomQuote);
  }, []);

  const getCurrentEvents = () => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    
    return calendarData.filter(event => {
      const eventDate = new Date(event.date);
      const eventMonth = eventDate.getMonth() + 1;
      const eventDay = eventDate.getDate();
      
      // Show events within 30 days
      const daysDiff = Math.abs((eventMonth - currentMonth) * 30 + (eventDay - currentDay));
      return daysDiff <= 30;
    });
  };

  const currentEvents = getCurrentEvents();

  return (
    <Box minH="100vh" bg="gray.50" pb="80px">
      <Container maxW="container.sm" px={4} py={6}>
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <VStack spacing={3}>
            <Heading
              size="lg"
              color="brand.600"
              fontFamily="heading"
              textAlign="center"
            >
              📚 Cultural Stories
            </Heading>
            <Text
              fontSize="sm"
              color="gray.600"
              textAlign="center"
              fontFamily="bengali"
            >
              Bengali heritage through tea and tales
            </Text>
          </VStack>

          {/* Daily Quote */}
          {currentQuote && (
            <Card bg="brand.50" border="1px" borderColor="brand.200">
              <CardBody p={6}>
                <VStack spacing={3}>
                  <Icon as={FiStar} color="brand.400" boxSize={5} />
                  <Text
                    fontSize="md"
                    fontStyle="italic"
                    color="gray.700"
                    textAlign="center"
                    fontFamily="bengali"
                  >
                    "{currentQuote.text}"
                  </Text>
                  {currentQuote.translation && (
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      "{currentQuote.translation}"
                    </Text>
                  )}
                  <Text fontSize="xs" color="brand.500" fontWeight="medium">
                    - {currentQuote.author}
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Upcoming Events */}
          {currentEvents.length > 0 && (
            <VStack spacing={4}>
              <Text
                fontSize="lg"
                fontWeight="semibold"
                color="gray.700"
                textAlign="center"
              >
                Upcoming Events
              </Text>
              
              <VStack spacing={3} w="full">
                {currentEvents.slice(0, 3).map((event) => (
                  <Card key={event.id} bg="white">
                    <CardBody p={4}>
                      <HStack spacing={4}>
                        <Box
                          w="50px"
                          h="50px"
                          borderRadius="full"
                          bg="ocean.100"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon as={FiCalendar} color="ocean.500" boxSize={5} />
                        </Box>
                        
                        <VStack align="start" spacing={1} flex={1}>
                          <Text fontWeight="semibold" color="gray.800">
                            {event.event}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            {new Date(event.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric'
                            })}
                          </Text>
                          <HStack spacing={2}>
                            <Badge colorScheme="brand" size="sm">
                              {event.suggestedTea}
                            </Badge>
                            <Badge colorScheme="gray" size="sm">
                              {event.category}
                            </Badge>
                          </HStack>
                        </VStack>
                      </HStack>
                    </CardBody>
                  </Card>
                ))}
              </VStack>
            </VStack>
          )}

          {/* Content Tabs */}
          <Tabs variant="soft-rounded" colorScheme="brand">
            <TabList>
              <Tab>Stories</Tab>
              <Tab>Quotes</Tab>
              <Tab>Music</Tab>
            </TabList>

            <TabPanels>
              {/* Stories Tab */}
              <TabPanel px={0}>
                <VStack spacing={4}>
                  {storiesData.map((story) => (
                    <Card key={story.id} bg="white" cursor="pointer">
                      <CardBody p={4}>
                        <VStack spacing={3} align="stretch">
                          <HStack justify="space-between">
                            <Text fontWeight="semibold" color="gray.800">
                              {story.title}
                            </Text>
                            <Badge colorScheme="brand" size="sm">
                              {story.language}
                            </Badge>
                          </HStack>
                          
                          <Text
                            fontSize="sm"
                            color="gray.600"
                            noOfLines={3}
                            fontFamily={story.language === 'bengali' ? 'bengali' : 'body'}
                          >
                            {story.content}
                          </Text>
                          
                          <HStack justify="space-between">
                            <Text fontSize="xs" color="gray.500">
                              By {story.author}
                            </Text>
                            <HStack spacing={2}>
                              <Button size="xs" variant="ghost">
                                <FiHeart />
                              </Button>
                              <Button size="xs" variant="ghost">
                                <FiShare2 />
                              </Button>
                            </HStack>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              </TabPanel>

              {/* Quotes Tab */}
              <TabPanel px={0}>
                <VStack spacing={4}>
                  {quotesData.map((quote) => (
                    <Card key={quote.id} bg="white">
                      <CardBody p={6}>
                        <VStack spacing={3}>
                          <Icon as={FiStar} color="brand.400" boxSize={5} />
                          <Text
                            fontSize="md"
                            fontStyle="italic"
                            color="gray.700"
                            textAlign="center"
                            fontFamily={quote.language === 'bengali' ? 'bengali' : 'body'}
                          >
                            "{quote.text}"
                          </Text>
                          {quote.translation && (
                            <Text fontSize="sm" color="gray.600" textAlign="center">
                              "{quote.translation}"
                            </Text>
                          )}
                          <Text fontSize="xs" color="brand.500" fontWeight="medium">
                            - {quote.author}
                          </Text>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              </TabPanel>

              {/* Music Tab */}
              <TabPanel px={0}>
                <VStack spacing={4}>
                  <Card bg="ocean.50" border="1px" borderColor="ocean.200">
                    <CardBody p={6}>
                      <VStack spacing={4}>
                        <Icon as={FiMusic} boxSize={8} color="ocean.500" />
                        <VStack spacing={2}>
                          <Text fontWeight="semibold" color="ocean.700">
                            Rabindra Sangeet
                          </Text>
                          <Text fontSize="sm" color="ocean.600" textAlign="center">
                            Classical Bengali music to accompany your tea
                          </Text>
                        </VStack>
                        <Button
                          variant="outline"
                          colorScheme="ocean"
                          size="sm"
                        >
                          Play Music
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bg="purple.50" border="1px" borderColor="purple.200">
                    <CardBody p={6}>
                      <VStack spacing={4}>
                        <Icon as={FiMusic} boxSize={8} color="purple.500" />
                        <VStack spacing={2}>
                          <Text fontWeight="semibold" color="purple.700">
                            Lo-Fi Bengali Indie
                          </Text>
                          <Text fontSize="sm" color="purple.600" textAlign="center">
                            Modern beats with traditional Bengali influences
                          </Text>
                        </VStack>
                        <Button
                          variant="outline"
                          colorScheme="purple"
                          size="sm"
                        >
                          Play Music
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bg="tea.50" border="1px" borderColor="tea.200">
                    <CardBody p={6}>
                      <VStack spacing={4}>
                        <Icon as={FiMusic} boxSize={8} color="tea.500" />
                        <VStack spacing={2}>
                          <Text fontWeight="semibold" color="tea.700">
                            Ambient Tea Sounds
                          </Text>
                          <Text fontSize="sm" color="tea.600" textAlign="center">
                            Nature sounds from Darjeeling and Assam
                          </Text>
                        </VStack>
                        <Button
                          variant="outline"
                          colorScheme="tea"
                          size="sm"
                        >
                          Play Music
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/* Quick Actions */}
          <VStack spacing={3}>
            <Button
              size="lg"
              colorScheme="brand"
              w="full"
              onClick={() => navigate('/adda')}
              leftIcon={<FiUsers />}
            >
              Join Cultural Adda
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              w="full"
              onClick={() => navigate('/quiz/which-tea-are-you')}
              rightIcon={<FiArrowRight />}
            >
              Discover Your Tea Personality
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Culture; 