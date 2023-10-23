// Login.js (React Native)
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { AuthContext } from "../../contexts/AuthProvider";
import api from "../../services/api";
import styles from "./styles";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const storedLogin = AsyncStorage.getItem("login")
    const storedPassword = AsyncStorage.getItem("password");

    if (storedLogin && storedPassword) {
      setLogin(storedLogin);
      setPassword(storedPassword);
      setRememberPassword(true);
    }
  }, []);

  const handleLogin = async () => {
    if (!login) {
      setMsg("Preencha o login");
    } else if (!password) {
      setMsg("Preencha a senha");
    } else {
      try {
        const response = await api.post("/auth", {
          login,
          password,
        });
        const { token, idUsers } = response.data;
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("idUsers", String(idUsers));
        AsyncStorage.setItem("login", login);
        setUser({
          token,
          idUsers,
          login,
        });
        const userObj = {
          token,
          idUsers,
          login,
        };

        AsyncStorage.setItem("user", JSON.stringify(userObj));
        // Salvar os dados do usuário no AsyncStorage (ou outro método)
        // Lembrar de importar AsyncStorage do 'react-native' e usar AsyncStorage.setItem

        setSuccess(true);
        setMsg("Login feito com sucesso!");
        setTimeout(() => {
          navigation.navigate("Home"); // Você precisa configurar a navegação no React Native
        }, 1500);
      } catch (err) {
        if (err.response.status === 400) {
          setMsg("Login ou senha incorretos!");
        } else {
          setMsg("Ocorreu um erro no servidor. Tente novamente mais tarde.");
        }
      }
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  }

  const handleRememberPasswordChange = () => {
    setRememberPassword(!rememberPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>SELETIVO NEKI</Text>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Login"
          value={login}
          onChangeText={(text) => setLogin(text)}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.passwordToggle}>
              {showPassword ? "👁️" : "👁️"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Salvar dados</Text>
          <TouchableOpacity
            onPress={handleRememberPasswordChange}
            style={styles.checkbox}
          >
            {rememberPassword ? (
              <Text style={styles.checkboxText}>✔</Text>
            ) : null}
          </TouchableOpacity>
        </View>
        <Text style={styles.labelMsg(success)}>{msg}</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.labelSignup}>
          <Text style={styles.labelText}>Não tem uma conta?</Text>
          <TouchableWithoutFeedback style={styles.labelText} onPress={handleRegister}>
            <Text style={styles.strongText}>
              Registre-se
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}
