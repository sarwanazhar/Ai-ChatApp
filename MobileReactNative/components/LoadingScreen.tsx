import { ActivityIndicator, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";

export default function LoadingScreen() {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in smoothly to prevent jarring flash
    Animated.timing(opacity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <ActivityIndicator color="#fff" size="small" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f", // dark background to match your app
    justifyContent: "center",
    alignItems: "center",
  },
});
