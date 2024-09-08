import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Onboarding({ navigation }) {
  const completeOnboarding = async () => {
    await AsyncStorage.setItem("isOnboardingCompleted", "true");
    navigation.replace("SignUp");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/Logo.png")} style={styles.logo} />
      <TouchableOpacity style={styles.button} onPress={completeOnboarding}>
        <Text style={styles.buttonText}>Let's Start</Text>
      </TouchableOpacity>
      <View style={styles.signIncontainer}>
        <Text style={styles.staticText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("SignIn")}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: "80%",
    resizeMode: "contain",
    marginBottom: 20,
  },
  button: {
    width: "80%",
    marginTop: 20,
    backgroundColor: "#A3CFFF",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderColor: "#94C7FF",
    borderWidth: 1,
    borderRadius: 32,
    shadowColor: "#A3CFFF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 16,
  },
  buttonText: {
    color: "#092A4D",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  signIncontainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
    marginBottom: 10,
  },
  staticText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Poppins_Medium",
  },
  signInText: {
    fontSize: 14,
    textDecorationLine: "underline",
    fontFamily: "Poppins_Bold",
  },
});
