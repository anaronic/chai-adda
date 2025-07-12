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
  Avatar,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
} from '@chakra-ui/react';
import {
  FiUser,
  FiAward,
  FiHeart,
  FiShoppingBag,
  FiSettings,
  FiStar,
  FiCoffee,
  FiCalendar,
  FiArrowRight,
} from 'react-icons/fi';
import usersData from '../data/users.json';

const Profile = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('english');
  
  // Mock user data (in real app, this would come from auth context)
  const currentUser = usersData[0];

  const stats = [
    { label: 'Teas Tried', value: 12, icon: FiCoffee },
    { label: 'Rituals Completed', value: 8, icon: FiHeart },
    { label: 'Orders Placed', value: currentUser.totalOrders, icon: FiShoppingBag },
    { label: 'Days Active', value: 45, icon: FiCalendar },
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
              👤 Profile
            </Heading>
            <Text
              fontSize="sm"
              color="gray.600"
              textAlign="center"
              fontFamily="bengali"
            >
              Your tea journey
            </Text>
          </VStack>

          {/* User Info */}
          <Card bg="white">
            <CardBody p={6}>
              <VStack spacing={4}>
                <Avatar
                  size="xl"
                  name={currentUser.name}
                  bg="brand.500"
                />
                <VStack spacing={1}>
                  <Text fontSize="lg" fontWeight="semibold">
                    {currentUser.name}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Member since {new Date(currentUser.joinDate).toLocaleDateString()}
                  </Text>
                </VStack>
                
                <HStack spacing={2} flexWrap="wrap" justify="center">
                  {currentUser.badges.map((badge, index) => (
                    <Badge key={index} colorScheme="brand" size="sm">
                      {badge}
                    </Badge>
                  ))}
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Stats */}
          <SimpleGrid columns={2} spacing={4}>
            {stats.map((stat, index) => (
              <Card key={index} bg="white">
                <CardBody p={4} textAlign="center">
                  <VStack spacing={2}>
                    <Icon as={stat.icon} boxSize={6} color="brand.500" />
                    <Text fontSize="2xl" fontWeight="bold" color="brand.600">
                      {stat.value}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {stat.label}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          {/* Content Tabs */}
          <Tabs variant="soft-rounded" colorScheme="brand">
            <TabList>
              <Tab>Badges</Tab>
              <Tab>Favorites</Tab>
              <Tab>Settings</Tab>
            </TabList>

            <TabPanels>
              {/* Badges Tab */}
              <TabPanel px={0}>
                <VStack spacing={4}>
                  {currentUser.badges.map((badge, index) => (
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
                            <Icon as={FiAward} color="brand.500" boxSize={6} />
                          </Box>
                          <VStack align="start" spacing={1} flex={1}>
                            <Text fontWeight="semibold" color="gray.800">
                              {badge}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              Earned for your tea expertise
                            </Text>
                          </VStack>
                        </HStack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              </TabPanel>

              {/* Favorites Tab */}
              <TabPanel px={0}>
                <VStack spacing={4}>
                  <Text color="gray.500" textAlign="center">
                    Your favorite teas and stories will appear here
                  </Text>
                </VStack>
              </TabPanel>

              {/* Settings Tab */}
              <TabPanel px={0}>
                <VStack spacing={4}>
                  <Card bg="white" w="full">
                    <CardBody p={4}>
                      <VStack spacing={3} align="stretch">
                        <Text fontWeight="semibold" color="gray.800">
                          Language Preference
                        </Text>
                        <Select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          size="sm"
                        >
                          <option value="english">English</option>
                          <option value="bengali">বাংলা (Bengali)</option>
                        </Select>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bg="white" w="full">
                    <CardBody p={4}>
                      <VStack spacing={3} align="stretch">
                        <Text fontWeight="semibold" color="gray.800">
                          Notifications
                        </Text>
                        <Button variant="outline" size="sm" leftIcon={<FiSettings />}>
                          Manage Notifications
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bg="white" w="full">
                    <CardBody p={4}>
                      <VStack spacing={3} align="stretch">
                        <Text fontWeight="semibold" color="gray.800">
                          Account
                        </Text>
                        <Button variant="outline" size="sm">
                          Edit Profile
                        </Button>
                        <Button variant="outline" size="sm" colorScheme="red">
                          Sign Out
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
              onClick={() => navigate('/quiz/which-tea-are-you')}
              leftIcon={<FiStar />}
            >
              Take Tea Personality Quiz
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              w="full"
              onClick={() => navigate('/shop')}
              rightIcon={<FiArrowRight />}
            >
              Explore More Teas
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Profile; 