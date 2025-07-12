import React, { useState } from 'react';
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
  List,
  ListItem,
  ListIcon,
  Divider,
} from '@chakra-ui/react';
import {
  FiHeart,
  FiStar,
  FiFeather,
  FiCoffee,
  FiMusic,
  FiSun,
  FiMoon,
  FiCheckCircle,
  FiArrowLeft,
  FiZap,
  FiActivity,
  FiTarget,
  FiAward,
  FiPlay,
} from 'react-icons/fi';

const WellnessRitual = () => {
  const navigate = useNavigate();
  const [selectedRitual, setSelectedRitual] = useState('morning');

  const wellnessRituals = [
    {
      id: 'morning',
      title: 'Morning Energy',
      icon: FiSun,
      color: 'brand.500',
      duration: '10 minutes',
      description: 'Start your day with vitality and purpose',
      tea: 'Assam Orthodox',
      poses: [
        { name: 'Sun Salutation', duration: '3 min', benefits: 'Energizes body and mind' },
        { name: 'Warrior Pose', duration: '2 min', benefits: 'Builds strength and focus' },
        { name: 'Tree Pose', duration: '2 min', benefits: 'Improves balance and concentration' },
        { name: 'Child\'s Pose', duration: '3 min', benefits: 'Relaxes and centers' }
      ]
    },
    {
      id: 'afternoon',
      title: 'Afternoon Reset',
      icon: FiActivity,
      color: 'tea.500',
      duration: '8 minutes',
      description: 'Recharge and refocus for the rest of the day',
      tea: 'Green Tea Wellness',
      poses: [
        { name: 'Cat-Cow Stretch', duration: '2 min', benefits: 'Releases tension in spine' },
        { name: 'Seated Twist', duration: '2 min', benefits: 'Improves digestion' },
        { name: 'Forward Fold', duration: '2 min', benefits: 'Calms the nervous system' },
        { name: 'Corpse Pose', duration: '2 min', benefits: 'Deep relaxation' }
      ]
    },
    {
      id: 'evening',
      title: 'Evening Wind Down',
      icon: FiMoon,
      color: 'ocean.500',
      duration: '12 minutes',
      description: 'Prepare your mind and body for restful sleep',
      tea: 'Chamomile Blend',
      poses: [
        { name: 'Legs Up the Wall', duration: '3 min', benefits: 'Reduces stress and anxiety' },
        { name: 'Butterfly Pose', duration: '2 min', benefits: 'Opens hips and relaxes' },
        { name: 'Seated Meditation', duration: '4 min', benefits: 'Quiets the mind' },
        { name: 'Savasana', duration: '3 min', benefits: 'Complete relaxation' }
      ]
    }
  ];

  const currentRitual = wellnessRituals.find(ritual => ritual.id === selectedRitual);

  const wellnessTips = [
    "Practice deep breathing throughout your routine",
    "Listen to your body and modify poses as needed",
    "Keep your tea nearby for mindful sips",
    "Create a peaceful environment with soft lighting",
    "Focus on the present moment during each pose"
  ];

  const teaBenefits = [
    "Antioxidants for cellular health",
    "L-theanine for mental clarity",
    "Caffeine for gentle energy boost",
    "Polyphenols for heart health",
    "Amino acids for stress reduction"
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
                🌿 Wellness Rituals
              </Heading>
              <Text fontSize="sm" color="gray.600">
                Yoga poses paired with perfect teas
              </Text>
            </VStack>
            <Box />
          </HStack>

          {/* Ritual Selector */}
          <Card bg="white">
            <CardHeader pb={3}>
              <Text fontWeight="semibold" color="gray.800">
                Choose Your Wellness Ritual
              </Text>
            </CardHeader>
            <CardBody pt={0}>
              <SimpleGrid columns={3} spacing={3}>
                {wellnessRituals.map((ritual) => (
                  <Card
                    key={ritual.id}
                    cursor="pointer"
                    onClick={() => setSelectedRitual(ritual.id)}
                    bg={selectedRitual === ritual.id ? `${ritual.color}10` : 'white'}
                    border={selectedRitual === ritual.id ? `2px solid ${ritual.color}` : '1px solid gray.200'}
                    _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                    transition="all 0.2s"
                  >
                    <CardBody p={4} textAlign="center">
                      <VStack spacing={2}>
                        <Icon as={ritual.icon} boxSize={6} color={ritual.color} />
                        <Text fontSize="sm" fontWeight="semibold" color="gray.800">
                          {ritual.title}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {ritual.duration}
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </CardBody>
          </Card>

          {/* Selected Ritual Details */}
          {currentRitual && (
            <Card bg="white" border="1px" borderColor={`${currentRitual.color}20`}>
              <CardBody p={6}>
                <VStack spacing={4}>
                  <HStack spacing={3}>
                    <Box
                      w="60px"
                      h="60px"
                      borderRadius="full"
                      bg={`${currentRitual.color}20`}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={currentRitual.icon} boxSize={6} color={currentRitual.color} />
                    </Box>
                    <VStack align="start" spacing={1}>
                      <Text fontSize="lg" fontWeight="bold" color="gray.800">
                        {currentRitual.title}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        {currentRitual.description}
                      </Text>
                      <Badge colorScheme="brand" size="sm">
                        {currentRitual.duration}
                      </Badge>
                    </VStack>
                  </HStack>

                  <Divider />

                  <VStack spacing={3} align="stretch">
                    <Text fontWeight="semibold" color="gray.800">
                      Recommended Tea: {currentRitual.tea}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Brew your tea before starting the ritual for the perfect pairing.
                    </Text>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Content Tabs */}
          <Tabs variant="soft-rounded" colorScheme="brand">
            <TabList>
              <Tab>Yoga Poses</Tab>
              <Tab>Tea Benefits</Tab>
              <Tab>Wellness Tips</Tab>
            </TabList>

            <TabPanels>
              {/* Yoga Poses Tab */}
              <TabPanel px={0}>
                <VStack spacing={4}>
                  {currentRitual?.poses.map((pose, index) => (
                    <Card key={index} bg="white">
                      <CardBody p={4}>
                        <HStack spacing={4}>
                          <Box
                            w="50px"
                            h="50px"
                            borderRadius="full"
                            bg="brand.100"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Text fontSize="lg" fontWeight="bold" color="brand.600">
                              {index + 1}
                            </Text>
                          </Box>
                          
                          <VStack align="start" spacing={1} flex={1}>
                            <Text fontWeight="semibold" color="gray.800">
                              {pose.name}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              {pose.benefits}
                            </Text>
                            <Badge colorScheme="brand" size="sm" variant="subtle">
                              {pose.duration}
                            </Badge>
                          </VStack>
                        </HStack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              </TabPanel>

              {/* Tea Benefits Tab */}
              <TabPanel px={0}>
                <VStack spacing={4}>
                  <Card bg="tea.50" border="1px" borderColor="tea.200">
                    <CardBody p={6}>
                      <VStack spacing={4}>
                        <Icon as={FiCoffee} boxSize={8} color="tea.500" />
                        <VStack spacing={2}>
                          <Text fontWeight="semibold" color="tea.700">
                            Tea & Wellness Benefits
                          </Text>
                          <Text fontSize="sm" color="tea.600" textAlign="center">
                            How tea enhances your wellness practice
                          </Text>
                        </VStack>
                      </VStack>
                    </CardBody>
                  </Card>

                  <List spacing={3}>
                    {teaBenefits.map((benefit, index) => (
                      <ListItem key={index}>
                        <ListIcon as={FiCheckCircle} color="tea.500" />
                        <Text fontSize="sm" color="gray.700">
                          {benefit}
                        </Text>
                      </ListItem>
                    ))}
                  </List>
                </VStack>
              </TabPanel>

              {/* Wellness Tips Tab */}
              <TabPanel px={0}>
                <VStack spacing={4}>
                  <Card bg="ocean.50" border="1px" borderColor="ocean.200">
                    <CardBody p={6}>
                      <VStack spacing={4}>
                        <Icon as={FiTarget} boxSize={8} color="ocean.500" />
                        <VStack spacing={2}>
                          <Text fontWeight="semibold" color="ocean.700">
                            Wellness Practice Tips
                          </Text>
                          <Text fontSize="sm" color="ocean.600" textAlign="center">
                            Make the most of your wellness ritual
                          </Text>
                        </VStack>
                      </VStack>
                    </CardBody>
                  </Card>

                  <List spacing={3}>
                    {wellnessTips.map((tip, index) => (
                      <ListItem key={index}>
                        <ListIcon as={FiCheckCircle} color="ocean.500" />
                        <Text fontSize="sm" color="gray.700">
                          {tip}
                        </Text>
                      </ListItem>
                    ))}
                  </List>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/* Start Ritual Button */}
          <Button
            size="lg"
            colorScheme="brand"
            leftIcon={<FiPlay />}
            onClick={() => navigate('/meditation-ritual')}
          >
            Start {currentRitual?.title} Ritual
          </Button>

          {/* Quick Actions */}
          <VStack spacing={3}>
            <Button
              variant="outline"
              size="lg"
              w="full"
              onClick={() => navigate('/tea-timer')}
              leftIcon={<FiCoffee />}
            >
              Brew Perfect Tea
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              w="full"
              onClick={() => navigate('/rituals')}
              rightIcon={<FiArrowLeft />}
            >
              Explore More Rituals
            </Button>
          </VStack>

          {/* Wellness Quote */}
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
                  "স্বাস্থ্যই সম্পদ।"
                </Text>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  "Health is wealth."
                </Text>
                <Text fontSize="xs" color="brand.500" fontWeight="medium">
                  - Bengali Proverb
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};

export default WellnessRitual; 