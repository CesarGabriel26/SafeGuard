import React, { useEffect, useState } from "react"
import { ImageBackground, View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { corBranco, meusEstilos, corSecundaria, corPrincipal } from "../../../styles/meusEstilos"
import { CallListEpi, CallBuscaEpiPorColaborador, CallBuscaEpiPorColaboradorEPorNome } from "../../../components/api_call"
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const Lista_EPIs = ({ navigation, route }) => {
    const [EpisLista, setEpisLista] = useState([])
    const [EpisListaTotal, setEpisListaTotal] = useState([])

    const [currentOrganization, setCurrentOrganization] = useState('az');
    const [inputPesquisa, setInputPesquisa] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10; // Número de itens por página

    const buscarEpis = async () => {
        try {
            let data = []

            if (route.params.userOnly) {
                data = await buscarEpisVeinculados(route.params.contribuidor, inputPesquisa) || []
                data = data ? data : []
            } else {
                data = await CallListEpi() || []
            }
           
            setEpisListaTotal(data);

        } catch (error) {
            console.error('Erro ao buscar EPIs:', error);
        }
    };

    const buscarEpisVeinculados = async (contribuidor, inputPesquisa) => {
        try {
            const data = (inputPesquisa == '') ? await CallBuscaEpiPorColaborador(contribuidor.id) : CallBuscaEpiPorColaboradorEPorNome(contribuidor.id,inputPesquisa)

            return data
        } catch (error) {
            console.error('Erro ao buscar EPIS:', error);
        }
    };

    const LoadList = () => {
        let sortedEpis = [...EpisListaTotal]

        // Paginação: calcular índices iniciais e finais
        const startIndex = (currentPage) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Aplicar a paginação na lista ordenada/filtrada
        sortedEpis = sortedEpis.slice(startIndex, endIndex);

        // Filtrar e ordenar a lista com base no critério selecionado

        if (currentOrganization === 'az') {
            sortedEpis.sort((a, b) => a.nome_epi.localeCompare(b.nome_epi));
        } else if (currentOrganization === 'za') {
            sortedEpis.sort((a, b) => b.nome_epi.localeCompare(a.nome_epi));
        } else if (currentOrganization === 'Validade <') {
            sortedEpis.sort((a, b) => a.validade - b.validade);
        } else if (currentOrganization === 'Validade >') {
            sortedEpis.sort((a, b) => b.validade - a.validade);
        }

        // Atualizar o estado com os colaboradores filtrados e ordenados
        setEpisLista(sortedEpis);
    };

    const renderizarItem = ({ item }) => {
        let validade = route.params.userOnly ? item.data_vencimento : `${item.validade} dias`

        if (route.params.userOnly) {
            const dataValidade = new Date(validade); // Converter a string em objeto Date
            const hoje = new Date(); // Obter a data atual

            const diffEmMilliseconds = dataValidade - hoje;
            const diferencaEmDias = Math.ceil(diffEmMilliseconds / (1000 * 60 * 60 * 24)); // Calcular a diferença em dias

            let mensagemValidade = diferencaEmDias

            if (diferencaEmDias <= 0) {
                mensagemValidade = 'Vencido';
            } else if (diferencaEmDias === 1) {
                mensagemValidade = 'Vence amanhã';
            } else {
                const diferencaEmMeses = Math.ceil(diferencaEmDias / 30);
                const diferencaEmAnos = Math.floor(diferencaEmMeses / 12);

                if (diferencaEmDias < 30) {
                    mensagemValidade = `${diferencaEmDias} dia(s)`;
                } else if (diferencaEmMeses < 12) {
                    mensagemValidade = `${diferencaEmMeses} mês(meses)`;
                } else {
                    if (diferencaEmAnos < 2) {
                        mensagemValidade = `${diferencaEmAnos} ano`;
                    } else {
                        mensagemValidade = `${diferencaEmAnos} anos`;
                    }
                }
            }
            validade = mensagemValidade; // Atualizar validade para o número de dias restantes
        }

        return (
            <TouchableOpacity style={styles.cell} onPress={() => {
                if (!route.params.userOnly) {
                    navigation.navigate('Cad_EPIs', { colaborador: route.params.contribuidor, epi: item })
                } else {
                    navigation.navigate('ExibirEPI', { epi: item })
                }
            }} >
                <Text style={{ textTransform: 'capitalize', maxWidth: 200 }} numberOfLines={1} >{item.nome_epi}</Text>
                <Text numberOfLines={1} style={{ maxWidth: 200 }} >{validade}</Text>
            </TouchableOpacity>
        );
    }

    useEffect(() => {
        buscarEpis();
    }, []);

    useEffect(() => {
        buscarEpis();
    }, [inputPesquisa]);

    useEffect(() => {
        LoadList();
    }, [EpisListaTotal, currentPage, currentOrganization]);

    const NextPage = () => {
        if (EpisListaTotal.length > itemsPerPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    const PrecedingPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <ImageBackground
            source={require('../../../assets/bg.png')}
            resizeMode="cover"
            style={meusEstilos.ScreenBody}
        >

            <View style={[styles.cell]}>
                <TextInput
                    placeholder="Nome do EPI"
                    value={inputPesquisa}
                    onChangeText={setInputPesquisa}
                    style={{ flex: 1 }}
                />
                <Picker
                    selectedValue={currentOrganization}
                    onValueChange={(itemValue, itemIndex) => {
                        setCurrentOrganization(itemValue)
                    }}
                    style={{ flex: 1 }}
                >
                    <Picker.Item label="A-Z" value="az" />
                    <Picker.Item label="Z-A" value="za" />
                    <Picker.Item label="Validade < a >," value="Validade <" />
                    <Picker.Item label="Validade > a <" value="Validade >" />
                </Picker>
            </View>

            <View style={styles.container} >
                <View style={[styles.cell, { borderBottomWidth: 1, borderColor: corSecundaria }]}>
                    <Text > {EpisListaTotal.length} Epi{EpisListaTotal.length > 1 ? "s" : null} encontrado{EpisListaTotal.length > 1 ? "s" : null} </Text>
                    {
                        !route.params.userOnly ? (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Cad_EPIs', { colaborador: route.params.contribuidor })
                            }}>
                                <MaterialIcons name="add-circle" size={20} color={corPrincipal} />
                            </TouchableOpacity>
                        ) : null
                    }
                </View>

                <View style={[styles.cell, { borderBottomWidth: 1, borderColor: corSecundaria }]} >
                    <Text>Nome</Text>
                    <Text>Validade</Text>
                </View>

                <FlatList
                    data={EpisLista}
                    renderItem={renderizarItem}
                    keyExtractor={(item) => item.id.toString()}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <TouchableOpacity
                        onPress={PrecedingPage}
                    >
                        <MaterialIcons name="arrow-back-ios" size={35} color={corPrincipal} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            buscarEpis()
                            LoadList()
                        }}
                    >
                        <MaterialIcons name="refresh" size={35} color={corPrincipal} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={NextPage}
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
    }

});

export default Lista_EPIs