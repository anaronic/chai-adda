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
} from '@chakra-ui/react';
import {
  FiStar,
  FiAward,
  FiArrowRight,
  FiCoffee,
  FiCheck,
  FiX,
  FiRotateCcw,
} from 'react-icons/fi';
import teaQuizzesData from '../data/teaQuizzes.json';

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const quiz = teaQuizzesData.find(q => q.id === id);
    setCurrentQuiz(quiz);
  }, [id]);

  if (!currentQuiz) {
    return (
      <Box minH="100vh" bg="gray.50" pb="80px">
        <Container maxW="container.sm" px={4} py={8}>
          <VStack spacing={4}>
            <Text>Quiz not found</Text>
            <Button onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  const isPersonalityQuiz = currentQuiz.id === 'which-tea-are-you';
  const totalQuestions = currentQuiz.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    
    if (isPersonalityQuiz) {
      setAnswers({ ...answers, [currentQuestion]: answer.value });
    } else {
      const isCorrect = answer.value === 'correct';
      if (isCorrect) {
        setScore(score + 1);
      }
      setAnswers({ ...answers, [currentQuestion]: answer.value });
    }

    // Wait a moment to show the selection, then move to next question
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
        onOpen();
      }
    }, 1000);
  };

  const getPersonalityResult = () => {
    const answerCounts = {};
    Object.values(answers).forEach(answer => {
      answerCounts[answer] = (answerCounts[answer] || 0) + 1;
    });
    
    const mostCommon = Object.keys(answerCounts).reduce((a, b) => 
      answerCounts[a] > answerCounts[b] ? a : b
    );
    
    return currentQuiz.results[mostCommon];
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
    setSelectedAnswer(null);
    onClose();
  };

  const currentQ = currentQuiz.questions[currentQuestion];

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
              🎯 {currentQuiz.title}
            </Heading>
            <Text
              fontSize="sm"
              color="gray.600"
              textAlign="center"
            >
              {currentQuiz.description}
            </Text>
          </VStack>

          {/* Progress */}
          <Card bg="white">
            <CardBody p={4}>
              <VStack spacing={3}>
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color="gray.600">
                    Question {currentQuestion + 1} of {totalQuestions}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {Math.round(progress)}%
                  </Text>
                </HStack>
                <Progress
                  value={progress}
                  colorScheme="brand"
                  size="lg"
                  borderRadius="full"
                  w="full"
                />
              </VStack>
            </CardBody>
          </Card>

          {/* Question */}
          <Card bg="white">
            <CardBody p={6}>
              <VStack spacing={6}>
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  color="gray.800"
                  textAlign="center"
                >
                  {currentQ.q}
                </Text>

                <VStack spacing={3} w="full">
                  {currentQ.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === option ? "solid" : "outline"}
                      colorScheme={selectedAnswer === option ? "brand" : "gray"}
                      size="lg"
                      w="full"
                      h="auto"
                      p={4}
                      onClick={() => handleAnswer(option)}
                      isDisabled={selectedAnswer !== null}
                      _hover={{
                        transform: selectedAnswer === null ? "translateY(-1px)" : "none",
                        shadow: selectedAnswer === null ? "md" : "none"
                      }}
                      transition="all 0.2s"
                    >
                      <Text textAlign="center">
                        {option.text}
                      </Text>
                    </Button>
                  ))}
                </VStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Navigation */}
          <HStack spacing={3}>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              flex={1}
            >
              Back to Home
            </Button>
            <Button
              variant="outline"
              onClick={resetQuiz}
              leftIcon={<FiRotateCcw />}
              flex={1}
            >
              Restart Quiz
            </Button>
          </HStack>
        </VStack>
      </Container>

      {/* Results Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader textAlign="center">
            {isPersonalityQuiz ? 'Your Tea Personality' : 'Quiz Results'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={6}>
              {isPersonalityQuiz ? (
                // Personality Quiz Results
                <>
                  <Box
                    w="80px"
                    h="80px"
                    borderRadius="full"
                    bg="brand.100"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={FiAward} boxSize={8} color="brand.500" />
                  </Box>
                  
                  <VStack spacing={3}>
                    <Text fontSize="xl" fontWeight="bold" color="brand.600" textAlign="center">
                      {getPersonalityResult().title}
                    </Text>
                    <Text fontSize="md" color="gray.700" textAlign="center">
                      {getPersonalityResult().description}
                    </Text>
                    <Badge colorScheme="brand" size="lg">
                      {getPersonalityResult().badge}
                    </Badge>
                  </VStack>
                </>
              ) : (
                // Trivia Quiz Results
                <>
                  <Box
                    w="80px"
                    h="80px"
                    borderRadius="full"
                    bg={score >= 3 ? "green.100" : "orange.100"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon 
                      as={score >= 3 ? FiCheck : FiX} 
                      boxSize={8} 
                      color={score >= 3 ? "green.500" : "orange.500"} 
                    />
                  </Box>
                  
                  <VStack spacing={3}>
                    <Text fontSize="xl" fontWeight="bold" color="gray.800" textAlign="center">
                      You scored {score} out of {totalQuestions}!
                    </Text>
                    <Text fontSize="md" color="gray.600" textAlign="center">
                      {score >= 3 
                        ? "Great job! You're a tea expert!" 
                        : "Keep learning about tea - you'll get there!"
                      }
                    </Text>
                    <Badge 
                      colorScheme={score >= 3 ? "green" : "orange"} 
                      size="lg"
                    >
                      {score >= 3 ? "Tea Expert" : "Tea Learner"}
                    </Badge>
                  </VStack>
                </>
              )}

              <VStack spacing={3} w="full">
                <Button
                  colorScheme="brand"
                  onClick={resetQuiz}
                  w="full"
                >
                  Take Quiz Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  w="full"
                >
                  Back to Home
                </Button>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Quiz; 