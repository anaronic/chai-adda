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
  Divider,
} from '@chakra-ui/react';
import {
  FiHeart,
  FiPlay,
  FiPause,
  FiRotateCcw,
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
  FiEye,
  FiZap,
} from 'react-icons/fi';

const MeditationRitual = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const meditationSteps = [
    {
      title: "Prepare Your Space",
      duration: 60,
      instruction: "Find a quiet place and sit comfortably with your tea",
      icon: FiEye,
      color: "brand.500"
    },
    {
      title: "Mindful Breathing",
      duration: 120,
      instruction: "Take deep breaths, inhaling the tea's aroma",
      icon: FiHeart,
      color: "tea.500"
    },
    {
      title: "Tea Preparation",
      duration: 180,
      instruction: "Brew your tea mindfully, observing each step",
      icon: FiCoffee,
      color: "ocean.500"
    },
    {
      title: "Gratitude Practice",
      duration: 90,
      instruction: "Express gratitude for this moment and your tea",
      icon: FiStar,
      color: "purple.500"
    },
    {
      title: "Mindful Sipping",
      duration: 300,
      instruction: "Sip slowly, savoring each moment",
      icon: FiFeather,
      color: "cream.500"
    }
  ];

  const currentMeditation = meditationSteps[currentStep];

  useEffect(() => {
    let interval = null;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && isRunning) {
      setIsRunning(false);
      if (currentStep < meditationSteps.length - 1) {
        setCurrentStep(currentStep + 1);
        setTimer(meditationSteps[currentStep + 1].duration);
        setIsRunning(true);
      } else {
        onOpen();
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timer, currentStep, meditationSteps, onOpen]);

  const startMeditation = () => {
    setCurrentStep(0);
    setTimer(meditationSteps[0].duration);
    setIsRunning(true);
  };

  const pauseMeditation = () => {
    setIsRunning(false);
  };

  const resetMeditation = () => {
    setIsRunning(false);
    setTimer(0);
    setCurrentStep(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalSteps = meditationSteps.length;
    return ((currentStep + 1) / totalSteps) * 100;
  };

  const getStepProgress = () => {
    if (!currentMeditation) return 0;
    return ((currentMeditation.duration - timer) / currentMeditation.duration) * 100;
  };

  const breathingExercises = [
    "4-7-8 Breathing: Inhale for 4, hold for 7, exhale for 8",
    "Box Breathing: Equal inhale, hold, exhale, hold",
    "Tea Aroma Breathing: Inhale tea fragrance deeply",
    "Mindful Breathing: Focus on natural breath rhythm"
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
                🧘 Tea Meditation
              </Heading>
              <Text fontSize="sm" color="gray.600">
                Mindful tea ritual for inner peace
              </Text>
            </VStack>
            <Box />
          </HStack>

          {/* Current Meditation Step */}
          {timer > 0 && (
            <Card bg="white" border="2px" borderColor="brand.200">
              <CardBody p={6}>
                <VStack spacing={4}>
                  <HStack spacing={3}>
                    <Box
                      w="60px"
                      h="60px"
                      borderRadius="full"
                      bg={`${currentMeditation.color}20`}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={currentMeditation.icon} boxSize={6} color={currentMeditation.color} />
                    </Box>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold" color="gray.800">
                        {currentMeditation.title}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Step {currentStep + 1} of {meditationSteps.length}
                      </Text>
                    </VStack>
                  </HStack>

                  <Text fontSize="lg" fontWeight="bold" color="brand.600" fontFamily="mono">
                    {formatTime(timer)}
                  </Text>

                  <Progress
                    value={getStepProgress()}
                    colorScheme="brand"
                    size="lg"
                    borderRadius="full"
                    w="full"
                  />

                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    {currentMeditation.instruction}
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Overall Progress */}
          {timer > 0 && (
            <Card bg="white">
              <CardBody p={4}>
                <VStack spacing={3}>
                  <Text fontSize="sm" color="gray.600">
                    Overall Progress
                  </Text>
                  <Progress
                    value={getProgress()}
                    colorScheme="tea"
                    size="md"
                    borderRadius="full"
                    w="full"
                  />
                  <Text fontSize="xs" color="gray.500">
                    {currentStep + 1} of {meditationSteps.length} steps completed
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Meditation Controls */}
          {timer === 0 ? (
            <Card bg="white">
              <CardBody p={6}>
                <VStack spacing={4}>
                  <Icon as={FiHeart} boxSize={12} color="brand.400" />
                  <VStack spacing={2}>
                    <Text fontSize="xl" fontWeight="bold" color="brand.600">
                      Tea Meditation Ritual
                    </Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      A guided 15-minute meditation with your favorite tea
                    </Text>
                  </VStack>
                  <Button
                    size="lg"
                    colorScheme="brand"
                    leftIcon={<FiPlay />}
                    onClick={startMeditation}
                  >
                    Begin Meditation
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          ) : (
            <Card bg="white">
              <CardBody p={4}>
                <HStack spacing={3} justify="center">
                  <Button
                    colorScheme="brand"
                    onClick={isRunning ? pauseMeditation : () => setIsRunning(true)}
                    leftIcon={isRunning ? <FiPause /> : <FiPlay />}
                  >
                    {isRunning ? 'Pause' : 'Resume'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetMeditation}
                    leftIcon={<FiRotateCcw />}
                  >
                    Reset
                  </Button>
                </HStack>
              </CardBody>
            </Card>
          )}

          {/* Breathing Exercises */}
          <Card bg="white">
            <CardHeader pb={3}>
              <HStack spacing={3}>
                <Icon as={FiZap} color="tea.500" boxSize={5} />
                <Text fontWeight="semibold" color="gray.800">
                  Breathing Exercises
                </Text>
              </HStack>
            </CardHeader>
            <CardBody pt={0}>
              <List spacing={3}>
                {breathingExercises.map((exercise, index) => (
                  <ListItem key={index}>
                    <ListIcon as={FiCheckCircle} color="tea.500" />
                    <Text fontSize="sm" color="gray.700">
                      {exercise}
                    </Text>
                  </ListItem>
                ))}
              </List>
            </CardBody>
          </Card>

          {/* Meditation Steps Preview */}
          <Card bg="white">
            <CardHeader pb={3}>
              <Text fontWeight="semibold" color="gray.800">
                Meditation Journey
              </Text>
            </CardHeader>
            <CardBody pt={0}>
              <VStack spacing={3}>
                {meditationSteps.map((step, index) => (
                  <HStack key={index} spacing={3} w="full">
                    <Box
                      w="40px"
                      h="40px"
                      borderRadius="full"
                      bg={index <= currentStep ? "brand.100" : "gray.100"}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon 
                        as={step.icon} 
                        boxSize={4} 
                        color={index <= currentStep ? "brand.500" : "gray.400"} 
                      />
                    </Box>
                    <VStack align="start" spacing={0} flex={1}>
                      <Text fontSize="sm" fontWeight="medium" color="gray.800">
                        {step.title}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {formatTime(step.duration)}
                      </Text>
                    </VStack>
                    {index <= currentStep && (
                      <Icon as={FiCheckCircle} color="green.500" boxSize={4} />
                    )}
                  </HStack>
                ))}
              </VStack>
            </CardBody>
          </Card>

          {/* Sound Toggle */}
          <Card bg="white">
            <CardBody p={4}>
              <Button
                variant="ghost"
                leftIcon={isMuted ? <FiVolumeX /> : <FiVolume2 />}
                onClick={() => setIsMuted(!isMuted)}
                w="full"
              >
                {isMuted ? 'Unmute' : 'Mute'} Meditation Sounds
              </Button>
            </CardBody>
          </Card>

          {/* Meditation Tips */}
          <Card bg="tea.50" border="1px" borderColor="tea.200">
            <CardBody p={6}>
              <VStack spacing={3}>
                <Icon as={FiStar} color="tea.400" boxSize={5} />
                <Text fontWeight="semibold" color="tea.700" textAlign="center">
                  Meditation Tip
                </Text>
                <Text fontSize="sm" color="tea.600" textAlign="center">
                  Focus on the present moment. Let each sip of tea bring you back to awareness.
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>

      {/* Meditation Complete Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader textAlign="center">Meditation Complete 🧘</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={6}>
              <Box
                w="80px"
                h="80px"
                borderRadius="full"
                bg="tea.100"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FiHeart} boxSize={8} color="tea.500" />
              </Box>
              
              <VStack spacing={3}>
                <Text fontSize="lg" fontWeight="semibold" textAlign="center">
                  Beautiful meditation completed!
                </Text>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  You've taken time for yourself and your tea. Carry this peace with you.
                </Text>
              </VStack>

              <VStack spacing={3} w="full">
                <Button
                  colorScheme="tea"
                  onClick={onClose}
                  w="full"
                >
                  Thank You
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    onClose();
                    resetMeditation();
                  }}
                  w="full"
                >
                  Start Another Session
                </Button>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MeditationRitual; 