import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../contexts/AuthProvider";

const PrivateRoutes = ({ children }) => {
  const { authenticated, loading } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (loading) {
      // Exibir um indicador de carregamento enquanto verifica a autenticação.
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (!authenticated) {
      // Redirecionar para a tela de login ou qualquer outra tela de autenticação.
      navigation.navigate("Login");
      return null;
    }

    return children;
  }, [authenticated, loading, navigation, children]);

  return children;
};

export default PrivateRoutes;
