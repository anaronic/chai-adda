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
  Input,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FiShoppingCart,
  FiTrash2,
  FiArrowLeft,
  FiCreditCard,
  FiCheck,
  FiCoffee,
} from 'react-icons/fi';

const Cart = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [promoCode, setPromoCode] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Mock cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 'darjeeling-first-flush',
      name: 'Darjeeling First Flush',
      price: 549,
      quantity: 1,
      image: null,
    },
    {
      id: 'masala-chai-classic',
      name: 'Classic Masala Chai',
      price: 299,
      quantity: 2,
      image: null,
    },
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 50;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    onOpen();
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      onClose();
      // In real app, redirect to payment gateway
    }, 3000);
  };

  if (cartItems.length === 0) {
    return (
      <Box minH="100vh" bg="gray.50" pb="80px">
        <Container maxW="container.sm" px={4} py={8}>
          <VStack spacing={6}>
            <Icon as={FiShoppingCart} boxSize={16} color="gray.400" />
            <VStack spacing={3}>
              <Heading size="lg" color="gray.600">
                Your cart is empty
              </Heading>
              <Text color="gray.500" textAlign="center">
                Add some delicious teas to get started!
              </Text>
            </VStack>
            <Button
              colorScheme="brand"
              size="lg"
              onClick={() => navigate('/shop')}
            >
              Explore Teas
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50" pb="80px">
      <Container maxW="container.sm" px={4} py={6}>
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <HStack justify="space-between" align="center">
            <Button
              variant="ghost"
              leftIcon={<FiArrowLeft />}
              onClick={() => navigate('/shop')}
              size="sm"
            >
              Back to Shop
            </Button>
            <VStack spacing={0}>
              <Heading size="lg" color="brand.600" fontFamily="heading">
                🛒 Cart
              </Heading>
              <Text fontSize="sm" color="gray.600">
                {cartItems.length} items
              </Text>
            </VStack>
            <Box />
          </HStack>

          {/* Cart Items */}
          <VStack spacing={4}>
            {cartItems.map((item) => (
              <Card key={item.id} bg="white">
                <CardBody p={4}>
                  <HStack spacing={4}>
                    <Box
                      w="60px"
                      h="60px"
                      bg="gray.100"
                      borderRadius="md"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FiCoffee} color="brand.400" boxSize={6} />
                    </Box>
                    
                    <VStack align="start" spacing={1} flex={1}>
                      <Text fontWeight="semibold" color="gray.800">
                        {item.name}
                      </Text>
                      <Text fontSize="lg" fontWeight="bold" color="brand.600">
                        ₹{item.price}
                      </Text>
                    </VStack>

                    <VStack spacing={2}>
                      <NumberInput
                        value={item.quantity}
                        onChange={(value) => updateQuantity(item.id, parseInt(value) || 0)}
                        min={0}
                        max={10}
                        size="sm"
                        w="80px"
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="red"
                        leftIcon={<FiTrash2 />}
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </Button>
                    </VStack>
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </VStack>

          {/* Promo Code */}
          <Card bg="white">
            <CardBody p={4}>
              <VStack spacing={3}>
                <Text fontWeight="semibold" color="gray.800">
                  Promo Code
                </Text>
                <HStack spacing={3} w="full">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    size="sm"
                  />
                  <Button size="sm" variant="outline" colorScheme="brand">
                    Apply
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Order Summary */}
          <Card bg="white">
            <CardHeader pb={3}>
              <Text fontWeight="semibold" color="gray.800">
                Order Summary
              </Text>
            </CardHeader>
            <CardBody pt={0}>
              <VStack spacing={3}>
                <HStack justify="space-between" w="full">
                  <Text color="gray.600">Subtotal</Text>
                  <Text fontWeight="semibold">₹{subtotal}</Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text color="gray.600">Shipping</Text>
                  <Text fontWeight="semibold">₹{shipping}</Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text color="gray.600">Tax (18% GST)</Text>
                  <Text fontWeight="semibold">₹{tax.toFixed(0)}</Text>
                </HStack>
                <Divider />
                <HStack justify="space-between" w="full">
                  <Text fontSize="lg" fontWeight="bold" color="gray.800">
                    Total
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="brand.600">
                    ₹{total.toFixed(0)}
                  </Text>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Checkout Button */}
          <Button
            size="lg"
            colorScheme="brand"
            leftIcon={<FiCreditCard />}
            onClick={handleCheckout}
            isLoading={isCheckingOut}
            loadingText="Processing..."
          >
            Proceed to Checkout - ₹{total.toFixed(0)}
          </Button>

          {/* Continue Shopping */}
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/shop')}
          >
            Continue Shopping
          </Button>
        </VStack>
      </Container>

      {/* Checkout Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader textAlign="center">Processing Order</ModalHeader>
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
                <Icon as={FiCheck} boxSize={8} color="brand.500" />
              </Box>
              
              <VStack spacing={3}>
                <Text fontSize="lg" fontWeight="semibold" textAlign="center">
                  Order Placed Successfully!
                </Text>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  Thank you for your order. You will receive a confirmation email shortly.
                </Text>
              </VStack>

              <Button
                colorScheme="brand"
                onClick={onClose}
                w="full"
              >
                Continue Shopping
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Cart; 