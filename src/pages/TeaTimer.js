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
  Select,
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
  FiArrowLeft,
  FiVolume2,
  FiVolumeX,
} from 'react-icons/fi';

const TeaTimer = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTea, setSelectedTea] = useState('black');
  const [isMuted, setIsMuted] = useState(false);

  const teaTypes = [
    { id: 'black', name: 'Black Tea', time: 240, description: 'Strong and bold' },
    { id: 'green', name: 'Green Tea', time: 180, description: 'Light and fresh' },
    { id: 'oolong', name: 'Oolong Tea', time: 240, description: 'Complex and smooth' },
    { id: 'herbal', name: 'Herbal Tea', time: 300, description: 'Soothing and aromatic' },
    { id: 'white', name: 'White Tea', time: 180, description: 'Delicate and subtle' },
    { id: 'pu-erh', name: 'Pu-erh Tea', time: 300, description: 'Rich and earthy' },
  ];

  const currentTea = teaTypes.find(tea => tea.id === selectedTea);

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

  const startTimer = (seconds) => {
    setTimer(seconds);
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
    if (!currentTea) return 0;
    return ((currentTea.time - timer) / currentTea.time) * 100;
  };

  const brewingSteps = [
    "Heat water to the right temperature",
    "Pre-warm your teapot or cup",
    "Add tea leaves (1 tsp per cup)",
    "Pour hot water over leaves",
    "Steep for the recommended time",
    "Remove leaves and enjoy!"
  ];

  return (
    <Box minH="100vh" bg="gray.50" pb="80px">
      <Container maxW="container.sm" px={4} py={6}>
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <HStack justify="space-between" align="center">
            <Button
              variant="ghost"
              leftIcon={<FiArrowLeft />}
              onClick={() => navigate('/rituals')}
              size="sm"
            >
              Back to Rituals
            </Button>
            <VStack spacing={0}>
              <Heading size="lg" color="brand.600" fontFamily="heading">
                ⏱️ Tea Timer
              </Heading>
              <Text fontSize="sm" color="gray.600">
                Perfect brewing every time
              </Text>
            </VStack>
            <Box />
          </HStack>

          {/* Tea Type Selector */}
          <Card bg="white">
            <CardHeader pb={3}>
              <Text fontWeight="semibold" color="gray.800">
                Select Your Tea
              </Text>
            </CardHeader>
            <CardBody pt={0}>
              <Select
                value={selectedTea}
                onChange={(e) => setSelectedTea(e.target.value)}
                size="lg"
                bg="white"
              >
                {teaTypes.map(tea => (
                  <option key={tea.id} value={tea.id}>
                    {tea.name} ({formatTime(tea.time)})
                  </option>
                ))}
              </Select>
            </CardBody>
          </Card>

          {/* Timer Display */}
          <Card bg="white" border="2px" borderColor="brand.200">
            <CardBody p={8}>
              <VStack spacing={6}>
                {timer > 0 ? (
                  <>
                    <Text fontSize="6xl" fontWeight="bold" color="brand.600" fontFamily="mono">
                      {formatTime(timer)}
                    </Text>
                    <Progress
                      value={getProgress()}
                      colorScheme="brand"
                      size="lg"
                      borderRadius="full"
                      w="full"
                    />
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      {currentTea?.name} is brewing...
                    </Text>
                  </>
                ) : (
                  <>
                    <Icon as={FiClock} boxSize={16} color="brand.400" />
                    <VStack spacing={2}>
                      <Text fontSize="2xl" fontWeight="bold" color="brand.600">
                        {currentTea?.name}
                      </Text>
                      <Text fontSize="md" color="gray.600" textAlign="center">
                        {currentTea?.description}
                      </Text>
                      <Badge colorScheme="brand" size="lg">
                        {formatTime(currentTea?.time || 0)} brewing time
                      </Badge>
                    </VStack>
                  </>
                )}

                {/* Timer Controls */}
                <HStack spacing={4}>
                  {timer === 0 ? (
                    <Button
                      size="lg"
                      colorScheme="brand"
                      leftIcon={<FiPlay />}
                      onClick={() => startTimer(currentTea?.time || 240)}
                    >
                      Start Brewing
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="lg"
                        colorScheme="brand"
                        onClick={isRunning ? pauseTimer : () => setIsRunning(true)}
                        leftIcon={isRunning ? <FiPause /> : <FiPlay />}
                      >
                        {isRunning ? 'Pause' : 'Resume'}
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={resetTimer}
                        leftIcon={<FiRotateCcw />}
                      >
                        Reset
                      </Button>
                    </>
                  )}
                </HStack>

                {/* Sound Toggle */}
                <Button
                  variant="ghost"
                  leftIcon={isMuted ? <FiVolumeX /> : <FiVolume2 />}
                  onClick={() => setIsMuted(!isMuted)}
                  size="sm"
                >
                  {isMuted ? 'Unmute' : 'Mute'} Ambient Sounds
                </Button>
              </VStack>
            </CardBody>
          </Card>

          {/* Brewing Guide */}
          <Card bg="white">
            <CardHeader pb={3}>
              <HStack spacing={3}>
                <Icon as={FiCheckCircle} color="brand.500" boxSize={5} />
                <Text fontWeight="semibold" color="gray.800">
                  Brewing Guide
                </Text>
              </HStack>
            </CardHeader>
            <CardBody pt={0}>
              <List spacing={3}>
                {brewingSteps.map((step, index) => (
                  <ListItem key={index}>
                    <ListIcon as={FiCheckCircle} color="green.500" />
                    <Text fontSize="sm" color="gray.700">
                      {step}
                    </Text>
                  </ListItem>
                ))}
              </List>
            </CardBody>
          </Card>

          {/* Quick Timer Presets */}
          <Card bg="white">
            <CardHeader pb={3}>
              <Text fontWeight="semibold" color="gray.800">
                Quick Presets
              </Text>
            </CardHeader>
            <CardBody pt={0}>
              <SimpleGrid columns={3} spacing={3}>
                {[60, 120, 180, 240, 300, 360].map((seconds) => (
                  <Button
                    key={seconds}
                    variant="outline"
                    colorScheme="brand"
                    onClick={() => startTimer(seconds)}
                    size="sm"
                    isDisabled={timer > 0}
                  >
                    {formatTime(seconds)}
                  </Button>
                ))}
              </SimpleGrid>
            </CardBody>
          </Card>

          {/* Tea Tips */}
          <Card bg="brand.50" border="1px" borderColor="brand.200">
            <CardBody p={6}>
              <VStack spacing={3}>
                <Icon as={FiStar} color="brand.400" boxSize={5} />
                <Text fontWeight="semibold" color="brand.700" textAlign="center">
                  Pro Tip
                </Text>
                <Text fontSize="sm" color="brand.600" textAlign="center">
                  Use filtered water and avoid over-steeping. The perfect cup is just a timer away!
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>

      {/* Timer Complete Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader textAlign="center">Your Tea is Ready! ☕</ModalHeader>
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
                  Perfect {currentTea?.name} is ready!
                </Text>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  Take a moment to breathe deeply and enjoy your perfectly brewed tea.
                </Text>
              </VStack>

              <VStack spacing={3} w="full">
                <Button
                  colorScheme="brand"
                  onClick={onClose}
                  w="full"
                >
                  Enjoy Your Tea
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    onClose();
                    resetTimer();
                  }}
                  w="full"
                >
                  Brew Another Cup
                </Button>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TeaTimer; 