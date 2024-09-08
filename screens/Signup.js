import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconCheckBox from "react-native-vector-icons/FontAwesome";

export default function SignUp({ navigation }) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (agree) {
      try {
        const response = await fetch(
          "https://tor.appdevelopers.mobi/api/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: phone,
              password: password,
              name: name,
            }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          Alert.alert("Success", "You have successfully signed up!");
          const userData = data.data;
          await AsyncStorage.setItem("userToken", JSON.stringify(userData.id));
          await AsyncStorage.setItem("userName", userData.name);
          navigation.navigate("Home");
        } else if (data.error.phone) {
          console.log(data.error);
          Alert.alert("Error", "The phone number has already been taken.");
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred. Please try again later.");
        console.error("SignUp Error:", error);
      }
    } else {
      Alert.alert("Warning", "You must agree to the terms and conditions.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Image source={require("../assets/Logo.png")} style={styles.logo} />
          <Text style={styles.heading}>Sign Up</Text>
          <Text style={styles.paraText}>
            Fill in the below form and add life to your car!
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
          </View>

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
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setAgree(!agree)}>
              <IconCheckBox
                name={agree ? "check-square" : "square-o"}
                size={30}
                color="#092A4D"
              />
            </TouchableOpacity>
            <Text style={styles.checkboxText}>
              Agree with{" "}
              <Text style={{ color: "gray", textDecorationLine: "underline" }}>
                Terms & Conditions
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.button, { opacity: agree ? 1 : 0.6 }]}
            onPress={handleSignUp}
            disabled={!agree}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.signIncontainer}>
            <Text style={styles.staticText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace("SignIn")}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.footerText}>
            By login or sign up, you agree to our terms of use and privacy
            policy
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
  },
  innerContainer: {
    width: "100%",
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
    alignSelf: "baseline",
    fontFamily: "Poppins_Bold",
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "baseline",
    paddingLeft: 10,
    marginBottom: 20,
    gap: 5,
  },
  checkboxText: {
    fontSize: 14,
    fontFamily: "Poppins_Medium",
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
