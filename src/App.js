import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import theme from './theme';

// Components
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Rituals from './pages/Rituals';
import TeaTimer from './pages/TeaTimer';
import MeditationRitual from './pages/MeditationRitual';
import WellnessRitual from './pages/WellnessRitual';
import Culture from './pages/Culture';
import Adda from './pages/Adda';
import Profile from './pages/Profile';
import Quiz from './pages/Quiz';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -16 },
};
const pageTransition = { type: 'tween', ease: 'anticipate', duration: 0.15 };

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <Home />
          </motion.div>
        } />
        <Route path="/shop" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <Shop />
          </motion.div>
        } />
        <Route path="/product/:id" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <ProductDetail />
          </motion.div>
        } />
        <Route path="/cart" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <Cart />
          </motion.div>
        } />
        <Route path="/rituals" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <Rituals />
          </motion.div>
        } />
        <Route path="/tea-timer" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <TeaTimer />
          </motion.div>
        } />
        <Route path="/meditation-ritual" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <MeditationRitual />
          </motion.div>
        } />
        <Route path="/wellness-ritual" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <WellnessRitual />
          </motion.div>
        } />
        <Route path="/culture" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <Culture />
          </motion.div>
        } />
        <Route path="/adda" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <Adda />
          </motion.div>
        } />
        <Route path="/profile" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <Profile />
          </motion.div>
        } />
        <Route path="/quiz/:id" element={
          <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <Quiz />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navigation />
        <AnimatedRoutes />
      </Router>
    </ChakraProvider>
  );
}

export default App; 