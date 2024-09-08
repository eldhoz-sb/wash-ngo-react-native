import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SignIn({ navigation }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("https://tor.appdevelopers.mobi/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = data.data;
        await AsyncStorage.setItem("userToken", JSON.stringify(userData.id));
        await AsyncStorage.setItem("userName", userData.name);
        navigation.replace("Home");
      } else {
        Alert.alert(
          "Login Failed",
          data.message || "Please check your credentials and try again."
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("An error occurred", "Please try again later.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Image source={require("../assets/Logo.png")} style={styles.logo} />
          <Text style={styles.heading}>Sign In</Text>
          <Text style={styles.paraText}>
            Hi! Welcome back, you have been missed
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.showPassword}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.signIncontainer}>
            <Text style={styles.staticText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace("SignUp")}>
              <Text style={styles.signInText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>
            By logging in or signing up, you agree to our terms of use and
            privacy policy
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 150,
    resizeMode: "contain",
    marginBottom: 10,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Poppins_Bold",
    alignSelf: "baseline",
  },
  paraText: {
    alignSelf: "baseline",
    marginBottom: 20,
    fontSize: 16,
    color: "#808080",
    paddingTop: 10,
    fontFamily: "Poppins_Medium",
  },
  inputContainer: {
    width: "100%",
  },
  label: {
    paddingBottom: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Poppins_Bold",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    fontFamily: "Poppins_Medium",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  showPassword: {
    marginLeft: -50,
    marginTop: -15,
    color: "#1E90FF",
  },
  button: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "#A3CFFF",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderColor: "#94C7FF",
    borderWidth: 1,
    borderRadius: 32,
    shadowColor: "#A3CFFF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  buttonText: {
    color: "#092A4D",
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Inter_Bold",
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
  footerText: {
    fontSize: 14,
    color: "#808080",
    paddingTop: 10,
    textAlign: "center",
    fontFamily: "Poppins_Medium",
  },
});
