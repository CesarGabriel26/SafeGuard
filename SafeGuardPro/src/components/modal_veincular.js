import React, { useEffect, useState } from "react";
import { Modal, Alert, View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, ScrollView } from "react-native";

import { corBranco, corPrincipal, meusEstilos } from "../styles/meusEstilos";
import { CallBuscarColaboradores, CallListColaboradores, Cadastrar_EditarRelacao } from "./api_call";

export default function Veincular({ Visibility, SetVisibility, NomeEPI, IdEpi, currentUser }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState("");
    const [colaboradores, setColaboradores] = useState([]);
    const [inputPesquisa, setInputPesquisa] = useState("");

    const buscarColaboradores = async () => {
        try {
            let data = [];

            if (inputPesquisa === "") {
                data = await CallListColaboradores();
            } else {
                data = await CallBuscarColaboradores(inputPesquisa);
            }

            setColaboradores(data);
        } catch (error) {
            console.error('Erro ao buscar colaboradores:', error);
        }
    };

    useEffect(() => {
        buscarColaboradores();
    }, [inputPesquisa]);

    const handleSelect = (item) => {
        setSelectedUser(item.id);
        setSelectedUserName(item.nome);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => handleSelect(item)}
        >
            <Text>{item.nome}</Text>
        </TouchableOpacity>
    );

    const finalizar = async () => {

        try {

            let data = await Cadastrar_EditarRelacao({
                "id_EPIs": IdEpi,
                "id_colaborador": selectedUser,
                "id_colaborador_supervisor": currentUser
            })

            Alert.alert('EPI Veinculado');
            alert('EPI Veinculado')

            SetVisibility(!Visibility);
        } catch (error) {
            
        }

    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={Visibility}
            onRequestClose={() => {
                Alert.alert('Operação cancelada');
                alert('Operação cancelada')
                SetVisibility(!Visibility);
            }}
        >
            <View style={[meusEstilos.ScreenBody, { backgroundColor: 'transparent' }]}>
                <View style={[meusEstilos.conteudoCorpo, { padding: 20, paddingTop: 20, borderRadius: 25, justifyContent: 'center' }]}>
                    <Text style={{ marginBottom: 15, textAlign: 'center' }}>Selecione um Colaborador</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Pesquisar colaborador..."
                        value={inputPesquisa}
                        onChangeText={(text) => setInputPesquisa(text)}
                    />

                    <FlatList
                        data={colaboradores}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />

                    <View>
                        <Text style={{ marginBottom: 15, textAlign: 'center' }}>Epi {NomeEPI} será vinculado a </Text>
                        <Text style={{ marginBottom: 15, textAlign: 'center' }}>
                            {selectedUserName}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.botao, { backgroundColor: corPrincipal }]}
                        onPress={() => SetVisibility(!Visibility)}
                    >
                        <Text style={[meusEstilos.textoBotao, { color: corBranco }]}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.botao, { backgroundColor: corPrincipal }]}
                        onPress={() => finalizar()}
                    >
                        <Text style={[meusEstilos.textoBotao, { color: corBranco }]}>
                            Vincular
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    botao: {
        backgroundColor: corBranco,
        borderRadius: 4,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 2,
    },
});
