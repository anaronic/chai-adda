import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FiHome,
  FiShoppingBag,
  FiHeart,
  FiBookOpen,
  FiUsers,
  FiUser,
} from 'react-icons/fi';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const navItems = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/shop', label: 'Shop', icon: FiShoppingBag },
    { path: '/rituals', label: 'Rituals', icon: FiHeart },
    { path: '/culture', label: 'Culture', icon: FiBookOpen },
    { path: '/adda', label: 'Adda', icon: FiUsers },
    { path: '/profile', label: 'Profile', icon: FiUser },
  ];

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg={bgColor}
      borderTop="1px"
      borderColor={borderColor}
      zIndex="1000"
      px={2}
      py={2}
    >
      <Flex justify="space-around" align="center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;
          
          return (
            <Flex
              key={item.path}
              direction="column"
              align="center"
              cursor="pointer"
              onClick={() => navigate(item.path)}
              py={2}
              px={3}
              borderRadius="lg"
              bg={isActive ? 'brand.50' : 'transparent'}
              _hover={{ bg: 'brand.50' }}
              transition="all 0.2s"
              flex={1}
            >
              <Icon
                as={IconComponent}
                boxSize={5}
                color={isActive ? 'brand.500' : 'gray.500'}
                mb={1}
              />
              <Text
                fontSize="xs"
                color={isActive ? 'brand.500' : 'gray.500'}
                fontWeight={isActive ? 'semibold' : 'normal'}
              >
                {item.label}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export default Navigation; 