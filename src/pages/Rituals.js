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
  Progress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import {
  FiClock,
  FiPlay,
  FiPause,
  FiRotateCcw,
  FiHeart,
  FiStar,
  FiFeather,
  FiCoffee,
  FiMusic,
  FiSun,
  FiMoon,
  FiCheckCircle,
  FiArrowRight,
  FiActivity,
} from 'react-icons/fi';
import ritualsData from '../data/rituals.json';
import quotesData from '../data/quotes.json';

const Rituals = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRitual, setSelectedRitual] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(null);

  useEffect(() => {
    // Set random quote
    const randomQuote = quotesData[Math.floor(Math.random() * quotesData.length)];
    setCurrentQuote(randomQuote);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && isRunning) {
      setIsRunning(false);
      onOpen();
    }
    return () => clearInterval(interval);
  }, [isRunning, timer, onOpen]);

  const startTimer = (duration) => {
    const minutes = parseInt(duration);
    setTimer(minutes * 60);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimer(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (!selectedRitual) return 0;
    const totalSeconds = parseInt(selectedRitual.duration) * 60;
    return ((totalSeconds - timer) / totalSeconds) * 100;
  };

  const wellnessFeatures = [
    {
      icon: FiSun,
      title: 'Morning Ritual',
      description: 'Start your day with energy',
      color: 'brand.500',
      duration: '5 minutes',
    },
    {
      icon: FiMoon,
      title: 'Evening Wind Down',
      description: 'Relax and reflect',
      color: 'ocean.500',
      duration: '7 minutes',
    },
    {
      icon: FiHeart,
      title: 'Mindful Breathing',
      description: 'Find your center',
      color: 'tea.500',
      duration: '3 minutes',
    },
    {
      icon: FiMusic,
      title: 'Sound Therapy',
      description: 'Ambient tea sounds',
      color: 'purple.500',
      duration: '10 minutes',
    },
  ];

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
              🌱 Tea Rituals
            </Heading>
            <Text
              fontSize="sm"
              color="gray.600"
              textAlign="center"
              fontFamily="bengali"
            >
              Mindful moments with your favorite brew
            </Text>
          </VStack>

          {/* Tea Timer */}
          <Card bg="white" border="1px" borderColor="brand.200">
            <CardHeader pb={4}>
              <HStack spacing={3}>
                <Icon as={FiClock} color="brand.500" boxSize={6} />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="semibold" color="gray.800">
                    Tea Timer
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Perfect brewing every time
                  </Text>
                </VStack>
              </HStack>
            </CardHeader>
            <CardBody pt={0}>
              <VStack spacing={4}>
                {timer > 0 ? (
                  <>
                    <Text fontSize="4xl" fontWeight="bold" color="brand.600" fontFamily="mono">
                      {formatTime(timer)}
                    </Text>
                    <Progress
                      value={getProgress()}
                      colorScheme="brand"
                      size="lg"
                      borderRadius="full"
                      w="full"
                    />
                    <HStack spacing={3}>
                      <Button
                        colorScheme="brand"
                        onClick={isRunning ? pauseTimer : () => setIsRunning(true)}
                        leftIcon={isRunning ? <FiPause /> : <FiPlay />}
                      >
                        {isRunning ? 'Pause' : 'Resume'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={resetTimer}
                        leftIcon={<FiRotateCcw />}
                      >
                        Reset
                      </Button>
                    </HStack>
                  </>
                ) : (
                  <SimpleGrid columns={2} spacing={3} w="full">
                    {[3, 4, 5, 7].map((minutes) => (
                      <Button
                        key={minutes}
                        variant="outline"
                        colorScheme="brand"
                        onClick={() => startTimer(minutes)}
                        size="lg"
                      >
                        {minutes} min
                      </Button>
                    ))}
                  </SimpleGrid>
                )}
              </VStack>
            </CardBody>
          </Card>

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

          {/* Wellness Features */}
          <VStack spacing={4}>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              color="gray.700"
              textAlign="center"
            >
              Wellness Features
            </Text>
            
            <SimpleGrid columns={2} spacing={3} w="full">
              <Card
                cursor="pointer"
                onClick={() => navigate('/tea-timer')}
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                transition="all 0.3s"
                bg="white"
              >
                <CardBody p={4}>
                  <VStack spacing={3}>
                    <Icon as={FiClock} boxSize={6} color="brand.500" />
                    <VStack spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold" textAlign="center">
                        Tea Timer
                      </Text>
                      <Text fontSize="xs" color="gray.500" textAlign="center">
                        Perfect brewing guide
                      </Text>
                      <Badge colorScheme="brand" size="sm" variant="subtle">
                        Smart Timer
                      </Badge>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>

              <Card
                cursor="pointer"
                onClick={() => navigate('/meditation-ritual')}
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                transition="all 0.3s"
                bg="white"
              >
                <CardBody p={4}>
                  <VStack spacing={3}>
                    <Icon as={FiHeart} boxSize={6} color="tea.500" />
                    <VStack spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold" textAlign="center">
                        Tea Meditation
                      </Text>
                      <Text fontSize="xs" color="gray.500" textAlign="center">
                        Mindful tea practice
                      </Text>
                      <Badge colorScheme="brand" size="sm" variant="subtle">
                        15 min
                      </Badge>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>

              <Card
                cursor="pointer"
                onClick={() => navigate('/wellness-ritual')}
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                transition="all 0.3s"
                bg="white"
              >
                <CardBody p={4}>
                  <VStack spacing={3}>
                    <Icon as={FiActivity} boxSize={6} color="ocean.500" />
                    <VStack spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold" textAlign="center">
                        Wellness Rituals
                      </Text>
                      <Text fontSize="xs" color="gray.500" textAlign="center">
                        Yoga & tea pairing
                      </Text>
                      <Badge colorScheme="brand" size="sm" variant="subtle">
                        Guided
                      </Badge>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>

              <Card
                cursor="pointer"
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                transition="all 0.3s"
                bg="white"
              >
                <CardBody p={4}>
                  <VStack spacing={3}>
                    <Icon as={FiMusic} boxSize={6} color="purple.500" />
                    <VStack spacing={1}>
                      <Text fontSize="sm" fontWeight="semibold" textAlign="center">
                        Sound Therapy
                      </Text>
                      <Text fontSize="xs" color="gray.500" textAlign="center">
                        Ambient tea sounds
                      </Text>
                      <Badge colorScheme="brand" size="sm" variant="subtle">
                        10 min
                      </Badge>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>

          {/* Tea Rituals */}
          <VStack spacing={4}>
            <Text
              fontSize="lg"
              fontWeight="semibold"
              color="gray.700"
              textAlign="center"
            >
              Guided Rituals
            </Text>
            
            <VStack spacing={3} w="full">
              {ritualsData.map((ritual) => (
                <Card
                  key={ritual.id}
                  cursor="pointer"
                  onClick={() => {
                    setSelectedRitual(ritual);
                    startTimer(parseInt(ritual.duration));
                  }}
                  _hover={{ transform: 'translateY(-1px)', shadow: 'md' }}
                  transition="all 0.2s"
                  bg="white"
                >
                  <CardBody p={4}>
                    <HStack spacing={4}>
                      <Box
                        w="50px"
                        h="50px"
                        borderRadius="full"
                        bg="tea.100"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={FiFeather} color="tea.500" boxSize={5} />
                      </Box>
                      
                      <VStack align="start" spacing={1} flex={1}>
                        <Text fontWeight="semibold" color="gray.800">
                          {ritual.title}
                        </Text>
                        <Text fontSize="sm" color="gray.600" noOfLines={2}>
                          {ritual.description}
                        </Text>
                        <HStack spacing={2}>
                          <Badge colorScheme="brand" size="sm">
                            {ritual.duration}
                          </Badge>
                          <Icon as={FiArrowRight} color="gray.400" boxSize={4} />
                        </HStack>
                      </VStack>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </VStack>

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
              Explore Cultural Stories
            </Button>
          </VStack>
        </VStack>
      </Container>

      {/* Timer Complete Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader textAlign="center">Time for Reflection</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={6}>
              <Box
                w="80px"
                h="80px"
                borderRadius="full"
                bg="brand.100"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FiCoffee} boxSize={8} color="brand.500" />
              </Box>
              
              <VStack spacing={3}>
                <Text fontSize="lg" fontWeight="semibold" textAlign="center">
                  Your tea is ready!
                </Text>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  Take a moment to breathe deeply and enjoy your perfect brew.
                </Text>
              </VStack>

              {currentQuote && (
                <Card bg="brand.50" w="full">
                  <CardBody p={4}>
                    <Text
                      fontSize="sm"
                      fontStyle="italic"
                      color="gray.700"
                      textAlign="center"
                      fontFamily="bengali"
                    >
                      "{currentQuote.text}"
                    </Text>
                  </CardBody>
                </Card>
              )}

              <Button
                colorScheme="brand"
                onClick={onClose}
                w="full"
              >
                Enjoy Your Tea
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Rituals; 