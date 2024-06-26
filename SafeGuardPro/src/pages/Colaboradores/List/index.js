import React, { useEffect, useState } from "react"
import { ImageBackground, View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Button } from 'react-native'
import { corBranco, meusEstilos, corSecundaria, corPrincipal } from "../../../styles/meusEstilos"
import { CallListColaboradores, CallBuscarColaboradores } from "../../../components/api_call"
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import * as Animar from 'react-native-animatable'

const Listar = ({ navigation }) => {
    const [colaboradoresLista, setColaboradoresLista] = useState([])
    const [colaboradoresListaTotal, setcolaboradoresListaTotal] = useState([])

    const [currentOrganization, setCurrentOrganization] = useState('az');
    const [inputPesquisa, setInputPesquisa] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10; // Número de itens por página

    const buscarColaboradores = async () => {
        try {
            let data = []

            if (inputPesquisa == '') {
                data = await CallListColaboradores();
            } else {
                data = await CallBuscarColaboradores(inputPesquisa);
            }

            setcolaboradoresListaTotal(data);
        } catch (error) {
            console.error('Erro ao buscar colaboradores:', error);
        }
    };

    const LoadList = () => {
        let slicedColaboradores = [...colaboradoresListaTotal]

        // Filtrar e ordenar a lista com base no critério selecionado
        if (currentOrganization === 'az') {
            // Ordenar por nome A-Z
            slicedColaboradores.sort((a, b) => b.nome.localeCompare(b.nome));
        } else if (currentOrganization === 'za') {
            // Ordenar por nome Z-A
            slicedColaboradores.sort((a, b) => b.nome.localeCompare(a.nome));
        } else if (currentOrganization === 'setorAz') {
            // Ordenar por setor A-Z
            slicedColaboradores.sort((a, b) => a.cargo.localeCompare(b.cargo));
        } else if (currentOrganization === 'setorZa') {
            // Ordenar por setor Z-A
            slicedColaboradores.sort((a, b) => b.cargo.localeCompare(a.cargo));
        }

        // Paginação: calcular índices iniciais e finais
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Aplicar a paginação na lista ordenada/filtrada
        slicedColaboradores = slicedColaboradores.slice(startIndex, endIndex);

        // Atualizar o estado com os colaboradores filtrados e ordenados
        setColaboradoresLista(slicedColaboradores);
    };

    const renderizarItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.cell} onPress={() => navigation.navigate('Cad_Colab', { colaborador: item })} >
                <Text>{item.nome}</Text>
                <Text>{item.cargo}</Text>
            </TouchableOpacity>
        );
    }

    useEffect(() => {
        buscarColaboradores();
    }, []);

    useEffect(() => {
        buscarColaboradores();
    }, [inputPesquisa]);

    useEffect(() => {
        LoadList();
    }, [colaboradoresListaTotal, currentPage, currentOrganization]);

    return (
        <ImageBackground
            source={require('../../../assets/bg.png')}
            resizeMode="stretch"
            style={meusEstilos.ScreenBody}
        >

            <View style={[styles.cell]}>
                <TextInput
                    placeholder="Nome do colaborador"
                    value={inputPesquisa}
                    onChangeText={setInputPesquisa}
                    style={{ flex: 1 }}
                />
                <Picker
                    selectedValue={currentOrganization}
                    onValueChange={(itemValue, itemIndex) => {
                        setCurrentOrganization(itemValue)
                        LoadList()
                    }}
                    style={{ flex: 1 }}
                >
                    <Picker.Item label="A-Z" value="az" />
                    <Picker.Item label="Z-A" value="za" />
                    <Picker.Item label="Cargo A-Z" value="setorAz" />
                    <Picker.Item label="Cargo Z-A" value="setorZa" />
                </Picker>
            </View>

            <View style={styles.container} >
                <View style={[styles.cell, { borderBottomWidth: 1, borderColor: corSecundaria }]}>
                    <Text >
                        {colaboradoresListaTotal.length} Colaborador{colaboradoresListaTotal.length > 1 ? "es" : null} encontrado{colaboradoresListaTotal.length > 1 ? "s" : null}
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Cad_Colab')}>
                        <MaterialIcons name="add-circle" size={20} color={corPrincipal} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.cell, { borderBottomWidth: 1, borderColor: corSecundaria }]} >
                    <Text>Nome</Text>
                    <Text>Cargo</Text>
                </View>

                <FlatList
                    data={colaboradoresLista}
                    renderItem={renderizarItem}
                    keyExtractor={(item) => item.id.toString()}
                />


                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <TouchableOpacity
                        onPress={() => {
                            if (currentPage > 1) {
                                setCurrentPage(currentPage - 1)
                            }
                        }}
                    >
                        <MaterialIcons name="arrow-back-ios" size={35} color={corPrincipal} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            buscarColaboradores()
                            LoadList()
                        }}
                    >
                        <MaterialIcons name="refresh" size={35} color={corPrincipal} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            if (colaboradoresLista.length > itemsPerPage) {
                                setCurrentPage(currentPage + 1)
                            }
                        }}
                    >
                        <MaterialIcons name="arrow-forward-ios" size={35} color={corPrincipal} />
                    </TouchableOpacity>
                </View>

            </View>



        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: corBranco,
        borderRadius: 10,
        flex: 1,
        gap: 5
    },
    cell: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: corBranco,
        borderRadius: 10
    },
    botao: {
        backgroundColor: corPrincipal,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10
    }

});

export default Listar