import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "../../components/Button";
import styles from "./styles";

const Register = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passConf, setPassConf] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!login) {
      setMsg("Preencha o login!");
    } else if (!password) {
      setMsg("Preencha o password!");
    } else if (!passConf) {
      setMsg("Preencha a confirmação de password!");
    } else if (password !== passConf) {
      setMsg("Os passwords não são iguais!");
    } else {
      // Você precisa implementar a lógica de registro em seu aplicativo React Native
      setSuccess(true);
      setMsg("Usuário cadastrado com sucesso!");
      setTimeout(() => {
        navigation.navigate("Login"); // Navegue para a tela de login
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SELETIVO NEKI</Text>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Login"
          value={login}
          onChangeText={(text) => [setLogin(text), setMsg("")]}
        />
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            placeholder="Password"
            value={password}
            onChangeText={(text) => [setPassword(text), setMsg("")]}
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text>{showPassword ? "👁️" : "👁️"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={!showConfPassword}
            placeholder="Confirme seu password"
            value={passConf}
            onChangeText={(text) => [setPassConf(text), setMsg("")]}
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setShowConfPassword(!showConfPassword)}
          >
            <Text>{showConfPassword ? "👁️" : "👁️"}</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.labelMsg, { color: success ? "green" : "red" }]}>{msg}</Text>
        <Button Text="Inscrever-se" onClick={handleRegister} />
        <View style={styles.labelSignin}>
          <Text>Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.strong}>Entre</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;
