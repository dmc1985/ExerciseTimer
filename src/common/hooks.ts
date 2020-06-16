import { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { DRAWER_WIDTH } from './components/AnimatedDrawer';

interface UseAnimatedDrawerResult {
  toggleDrawer: () => void;
  animatedValue: Animated.AnimatedInterpolation;
  opacityAnimation: Animated.Value;
  reverseOpacityAnimation: Animated.Value;
  isDrawerOpen: boolean;
}

export function useAnimatedDrawer(): UseAnimatedDrawerResult {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const [opacityAnimation] = useState(new Animated.Value(0));
  const [reverseOpacityAnimation] = useState(new Animated.Value(0));
  const animatedValue = opacityAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-DRAWER_WIDTH, 0],
  });

  useEffect(() => {
    Animated.timing(opacityAnimation, {
      toValue: isDrawerOpen ? 1 : 0,
      duration: 500,
    }).start();

    Animated.timing(reverseOpacityAnimation, {
      toValue: isDrawerOpen ? 0 : 1,
      duration: 500,
    }).start();
  }, [isDrawerOpen, opacityAnimation, reverseOpacityAnimation]);

  return {
    toggleDrawer,
    animatedValue,
    opacityAnimation,
    reverseOpacityAnimation,
    isDrawerOpen,
  };
}
