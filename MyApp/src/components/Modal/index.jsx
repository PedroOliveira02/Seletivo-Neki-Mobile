import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../../services/api';

const CustomModal = ({ isOpen, setModalOpen }) => {
  const [skills, setSkills] = useState([]);
  const token = AsyncStorage.getItem("token")
  const idUser = AsyncStorage.getItem("idUsers");

  const config = {
    headers: {
      Authorization: token ? `${token}` : "",
    },
  };

  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        const response = await api.get(`/skills`, config);
        setSkills(response.data);
      } catch (error) {
        console.error("Erro ao buscar as skills do usuário", error);
      }
    };
    fetchUserSkills();
  }, []);

  const handleAdicionar = async (skill) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Faça login para poder adicionar uma nova skill");
    } else {
      const data = {
        level: 1,
        usersDto: {
          idUsers: idUser,
        },
        skillsDto: {
          idSkills: skill.idSkills,
        },
      };
      console.log(idUser, skill.idSkills);

      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      try {
        await api.post("/user-skills", data, config);

        alert("Skill adicionada com sucesso!");
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          alert("Token inválido. Faça login novamente.");
        } else if (error.response.status === 400) {
          alert("Skill ja esta adicionada ao usuário");
        } else {
          alert("Ocorreu um erro no servidor. Tente novamente mais tarde.");
        }
      }
    }
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalOpen(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {skills.map((skill) => (
            <View style={styles.largeBox} key={skill.idUserSkills}>
              <View style={styles.imageBox}>
                <Image
                  source={{uri: `../../assets/images/${skill.nome}.jpg`}}
                  style={styles.skillImage}
                />
              </View>
              <View style={styles.nomeBox}>
                <Text style={styles.nomeText}>Nome</Text>
                <Text style={styles.skillText}>{skill.nome}</Text>
              </View>
              <View style={styles.descBox}>
                <Text style={styles.descText}>Descrição</Text>
                <Text style={styles.skillText}>{skill.descricao}</Text>
              </View>
              <View style={styles.addBox}>
                <Text style={styles.addText}>Adicionar</Text>
                <TouchableOpacity onPress={() => handleAdicionar(skill)}>
                  <View style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <Button title="Fechar" onPress={() => setModalOpen(false)} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    width: 850,
    maxHeight: '90%',
    alignItems: 'center',
    overflowY: 'auto',
    flexDirection: 'column',
  },
  largeBox: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#f0f2f5',
    width: 800,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 15,
    marginTop: 10,
    borderRadius: 10,
  },
  imageBox: {
    width: 150,
    padding: 10,
  },
  skillImage: {
    width: 120,
    marginLeft: 4,
  },
  nomeBox: {
    padding: 10,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    width: 150,
  },
  descBox: {
    padding: 10,
    borderRightWidth: 1,
    width: 350,
  },
  addBox: {
    padding: 10,
    width: 150,
  },
  nomeText: {
    height: 20,
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: 'bold',
    paddingTop: 2,
    marginBottom: 5,
  },
  skillText: {
    textAlign: 'center',
    fontSize: 17,
    marginTop: 10,
  },
  descText: {
    height: 20,
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: 'bold',
    paddingTop: 2,
    marginBottom: 5,
  },
  addText: {
    height: 20,
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: 'bold',
    paddingTop: 2,
    marginBottom: 12,
  },
  addButton: {
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 20,
    cursor: 'pointer',
    color: 'green',
  },
  addButtonText: {
    fontSize: 18,
  },
});

export default CustomModal;
