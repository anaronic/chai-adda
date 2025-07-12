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
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import {
  FiUsers,
  FiHeart,
  FiShare2,
  FiMessageCircle,
  FiPlus,
  FiSearch,
  FiCoffee,
  FiCamera,
  FiHash,
  FiArrowRight,
} from 'react-icons/fi';

const Adda = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newPost, setNewPost] = useState('');
  const [selectedTab, setSelectedTab] = useState('trending');

  // Mock community posts
  const communityPosts = [
    {
      id: 1,
      user: {
        name: 'Arpita Sen',
        avatar: null,
        badge: 'Tea Taster'
      },
      content: 'Just tried the Darjeeling First Flush with honey. Pure magic! ☕✨ #BongAdda #ChaiMood',
      image: null,
      likes: 24,
      comments: 8,
      time: '2 hours ago',
      tags: ['#BongAdda', '#ChaiMood', '#Darjeeling']
    },
    {
      id: 2,
      user: {
        name: 'Rahul Das',
        avatar: null,
        badge: 'Spice Master'
      },
      content: 'My morning ritual: Masala chai + Tagore poetry. Perfect start to the day! 📚 #TeaRitual #BengaliPoetry',
      image: null,
      likes: 18,
      comments: 5,
      time: '4 hours ago',
      tags: ['#TeaRitual', '#BengaliPoetry', '#MorningVibes']
    },
    {
      id: 3,
      user: {
        name: 'Maya Banerjee',
        avatar: null,
        badge: 'Wellness Warrior'
      },
      content: 'Green tea meditation session in my balcony garden. Nature + tea = pure bliss 🌿 #GreenTea #Meditation #Wellness',
      image: null,
      likes: 31,
      comments: 12,
      time: '6 hours ago',
      tags: ['#GreenTea', '#Meditation', '#Wellness']
    }
  ];

  const trendingTopics = [
    { tag: '#BongAdda', posts: 156 },
    { tag: '#ChaiMood', posts: 89 },
    { tag: '#TeaRitual', posts: 67 },
    { tag: '#Darjeeling', posts: 45 },
    { tag: '#BengaliPoetry', posts: 34 }
  ];

  const handleCreatePost = () => {
    // Mock post creation
    console.log('Creating post:', newPost);
    setNewPost('');
    onClose();
  };

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
              👥 Chai Adda
            </Heading>
            <Text
              fontSize="sm"
              color="gray.600"
              textAlign="center"
              fontFamily="bengali"
            >
              Connect with fellow tea lovers
            </Text>
          </VStack>

          {/* Create Post Button */}
          <Button
            colorScheme="brand"
            leftIcon={<FiPlus />}
            onClick={onOpen}
            size="lg"
          >
            Share Your Tea Moment
          </Button>

          {/* Search */}
          <InputGroup>
            <InputLeftElement>
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search posts, hashtags..."
              bg="white"
              borderRadius="lg"
            />
          </InputGroup>

          {/* Trending Topics */}
          <Card bg="white">
            <CardHeader pb={3}>
              <Text fontWeight="semibold" color="gray.800">
                Trending Topics
              </Text>
            </CardHeader>
            <CardBody pt={0}>
              <SimpleGrid columns={2} spacing={2}>
                {trendingTopics.map((topic, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    justifyContent="space-between"
                    colorScheme="brand"
                  >
                    <Text fontSize="sm">{topic.tag}</Text>
                    <Badge colorScheme="brand" size="xs">
                      {topic.posts}
                    </Badge>
                  </Button>
                ))}
              </SimpleGrid>
            </CardBody>
          </Card>

          {/* Content Tabs */}
          <Tabs variant="soft-rounded" colorScheme="brand">
            <TabList>
              <Tab>Trending</Tab>
              <Tab>Recent</Tab>
              <Tab>Following</Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={0}>
                <VStack spacing={4}>
                  {communityPosts.map((post) => (
                    <Card key={post.id} bg="white">
                      <CardBody p={4}>
                        <VStack spacing={3} align="stretch">
                          {/* User Info */}
                          <HStack spacing={3}>
                            <Avatar
                              size="sm"
                              name={post.user.name}
                              bg="brand.500"
                            />
                            <VStack align="start" spacing={0} flex={1}>
                              <HStack spacing={2}>
                                <Text fontWeight="semibold" fontSize="sm">
                                  {post.user.name}
                                </Text>
                                <Badge colorScheme="brand" size="xs">
                                  {post.user.badge}
                                </Badge>
                              </HStack>
                              <Text fontSize="xs" color="gray.500">
                                {post.time}
                              </Text>
                            </VStack>
                          </HStack>

                          {/* Post Content */}
                          <Text fontSize="sm" color="gray.700">
                            {post.content}
                          </Text>

                          {/* Hashtags */}
                          <HStack spacing={1} flexWrap="wrap">
                            {post.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                colorScheme="brand"
                                variant="subtle"
                                size="sm"
                                cursor="pointer"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </HStack>

                          {/* Post Actions */}
                          <HStack justify="space-between">
                            <HStack spacing={4}>
                              <Button size="xs" variant="ghost" leftIcon={<FiHeart />}>
                                {post.likes}
                              </Button>
                              <Button size="xs" variant="ghost" leftIcon={<FiMessageCircle />}>
                                {post.comments}
                              </Button>
                              <Button size="xs" variant="ghost" leftIcon={<FiShare2 />}>
                                Share
                              </Button>
                            </HStack>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              </TabPanel>

              <TabPanel px={0}>
                <VStack spacing={4}>
                  <Text color="gray.500" textAlign="center">
                    Recent posts will appear here
                  </Text>
                </VStack>
              </TabPanel>

              <TabPanel px={0}>
                <VStack spacing={4}>
                  <Text color="gray.500" textAlign="center">
                    Posts from people you follow will appear here
                  </Text>
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
              leftIcon={<FiCoffee />}
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

      {/* Create Post Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share Your Tea Moment</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Textarea
                placeholder="What's brewing in your mind? Share your tea experience..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={4}
                resize="none"
              />
              
              <HStack spacing={3} w="full">
                <Button
                  variant="outline"
                  leftIcon={<FiCamera />}
                  size="sm"
                >
                  Add Photo
                </Button>
                <Button
                  variant="outline"
                  leftIcon={<FiHash />}
                  size="sm"
                >
                  Add Hashtags
                </Button>
              </HStack>

              <Button
                colorScheme="brand"
                onClick={handleCreatePost}
                w="full"
                isDisabled={!newPost.trim()}
              >
                Share Post
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Adda; 