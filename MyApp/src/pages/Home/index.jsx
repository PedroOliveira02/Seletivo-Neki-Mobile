import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "../../components/Modal";
import { AuthContext } from "../../contexts/AuthProvider";
import api from "../../services/api";
import styles from "./styles";

const Home = () => {
  const { logout, user } = useContext(AuthContext);
//   const idUsers = AsyncStorage.getItem("idUsers");
//   const idUsers = parseInt(storedIdUsers, 10);

  const [userSkills, setUserSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const token = AsyncStorage.getItem("token");
  const login = user.login;
  const [openModal, setOpenModal] = useState(false);
  const storedIdUsers = AsyncStorage.getItem("idUsers");
        const idUsers = parseInt(storedIdUsers);

  const navigation = useNavigation();

  const closeSkillsModal = () => {
    setShowModal(false);
  };

  const config = {
    headers: {
      Authorization: token ? `${token}` : "",
    },
  };

  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        const storedIdLong = await AsyncStorage.getItem("idLong");
const idUsers = storedIdLong ? parseInt(storedIdLong, 10) : null;
        const response = await api.get(`/users/user-skills/${idUsers}`, config);
        setUserSkills(response.data);
      } catch (error) {
        console.error("Erro ao buscar as skills do usuário", error);
      }
    };
    fetchUserSkills();
  }, [idUsers]);

  const [editMode, setEditMode] = useState(false);


  const handleLevelChange = async (newLevel, skill) => {
    try {
      await api.put(
        `/user-skills/${skill.idUserSkills}`,
        { level: newLevel },
        config
      );
      setUserSkills((prevState) =>
        prevState.map((s) =>
          s.idUserSkills === skill.idUserSkills ? { ...s, level: newLevel } : s
        )
      );
      setEditMode(false);
    } catch (error) {
      if (newLevel < 1 || newLevel > 10) {
        alert("Insira um level entre 1 e 10!");
      }
    }
  };

  const handleToggleEditMode = () => {
    setEditMode((prevMode) => !prevMode);
  };

  const handleRemoveSkill = async (skillId) => {
    try {
      alert("Skill excluída com sucesso!");
      setTimeout(() => {}, 1500);

      await api.delete(`/user-skills/${skillId}`, config);
      setUserSkills((prevState) => prevState.filter((s) => s.idUserSkills !== skillId));
    } catch (error) {
      console.error("Erro ao remover a habilidade", error);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.page}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>SELETIVO NEKI SKILLS</Text>
          <Text>Skills do usuário, {login} !</Text>

          {userSkills.length === 0 ? (
            <Text style={styles.title}>Usuário sem Skills</Text>
          ) : (
            userSkills.map((skill) => (
              <View key={skill.idUserSkills}>
                <View style={styles.largeBox}>
                  <View style={styles.nomeBox}>
                    <Text style={styles.boxLabel}>Nome</Text>
                    <Text style={styles.boxText}>{skill.nome}</Text>
                  </View>
                  <View style={styles.descBox}>
                    <Text style={styles.boxLabel}>Descrição</Text>
                    <Text style={styles.boxText}>{skill.descricao}</Text>
                  </View>
                  <View style={styles.levelBox}>
                    <Text style={styles.boxLabel}>Level</Text>
                    <Text style={styles.boxText}>
                      {editMode ? (
                        <Text
                          style={styles.editableText}
                          onBlur={(e) => handleLevelChange(e, skill)}
                        >
                          {skill.level}
                        </Text>
                      ) : (
                        skill.level
                      )}
                    </Text>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={handleToggleEditMode}
                    >
                      <Text style={styles.editButtonText}>
                        {editMode ? "Salvar" : "Editar"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.excluirBox}>
                    <Text style={styles.boxLabel}>Excluir</Text>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveSkill(skill.idUserSkills)}
                    >
                      <Text style={styles.removeButtonText}>X</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setOpenModal(true)}>
          <Text style={styles.buttonText}>Adicionar skill</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar novo usuário</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => [logout(), navigation.navigate("Login")]}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      {showModal && <Modal show={showModal} onClose={closeSkillsModal} skills={userSkills} />}
    </View>
  );
};

export default Home;
