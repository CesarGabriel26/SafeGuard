import React, { useEffect, useState } from "react"
import { ImageBackground, View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import { CallBuscaEpi, CallBuscaEpiPorColaborador, CallGetNotificacoes } from "../../../components/api_call"
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import * as Animar from 'react-native-animatable'

import { corPreto, corBranco, ScreenPadding, meusEstilos, corSecundaria, corPrincipal } from "../../../styles/meusEstilos"

const Home = ({ navigation, route }) => {
    const [episVeinculados, setEpisVeinculados] = useState([])
    const [notificacoes, setNotificacoes] = useState([])
    const { contribuidor } = route.params

    const buscarEpis = async () => {
        try {
            const data = await CallBuscaEpiPorColaborador(contribuidor.id);
    
            const episDataPromises = data.map(async (epi, i) => {
                const dt = await CallBuscaEpi(epi.id_EPIs);
                return {
                    id: epi.id,
                    nome: dt.nome_epi,
                    validade: epi.data_vencimento
                };
            });
    
            const episData = await Promise.all(episDataPromises);

            setEpisVeinculados(episData);
        } catch (error) {
            console.error('Erro ao buscar EPIS:', error);
        }
    };

    const renderizarItemEPI = ({ item }) => {
        const hoje = new Date();
        const validade = new Date(item.validade);
        const diferencaEmDias = Math.ceil((validade - hoje) / (1000 * 60 * 60 * 24));

        let mensagemValidade;
        if (diferencaEmDias <= 0) {
            mensagemValidade = 'Vencido';
        } else if (diferencaEmDias === 1) {
            mensagemValidade = 'Vence amanhã';
        } else {
            const diferencaEmMeses = Math.ceil(diferencaEmDias / 30);
            const diferencaEmAnos = Math.floor(diferencaEmMeses / 12);
    
            if (diferencaEmDias < 30) {
                mensagemValidade = `Vence em ${diferencaEmDias} dia(s)`;
            } else if (diferencaEmMeses < 12) {
                mensagemValidade = `Vence em ${diferencaEmMeses} mês(meses)`;
            } else {
                if (diferencaEmAnos < 2) {
                    mensagemValidade = `Vence em ${diferencaEmAnos} ano`;
                } else {
                    mensagemValidade = `Vence em ${diferencaEmAnos} anos`;
                }
            }
        }

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ExibirEPI', { epi: item })} style={[styles.cell, styles.cellType2]}>
                <Text style={styles.nomeEPI}>{item.nome}</Text>
                <Text style={styles.validadeEPI}>{mensagemValidade}</Text>
            </TouchableOpacity>
        );
    };

    const buscarNotificacoes = async () => {
        try {
            const data = await CallGetNotificacoes(contribuidor.id);
            setNotificacoes(data)
        } catch (error) {
            console.error('Erro ao buscar EPIS:', error);
        }
    }

    const renderizarItemNotificacao = ({ item }) => {
        let icon = "error"
        let color = "red"

        if (item.descricao.includes("Novo")) {
            icon = "warning"
            color = corPrincipal
        } else if (item.descricao.includes("Requisição")) {
            icon = "add-circle"
            color = "green"
        }

        return (
            <View style={[styles.cell, styles.cellType2]}>
                <MaterialIcons name={icon} size={20} color={color} />
                <Text style={styles.validadeEPI}> {item.descricao} </Text>
            </View>
        );
    };

    useEffect(() => {
        buscarEpis()
        buscarNotificacoes()
    },[])

    return (
        <ImageBackground
            source={require('../../../assets/bg.png')}
            resizeMode="cover"
            style={meusEstilos.ScreenBody}
        >
            <View style={styles.cell}>
                <Text > Colaborador: </Text>
                <Text > {contribuidor.nome} </Text>
            </View>

            <View style={styles.container} >
                <View style={[styles.cell, { borderBottomWidth: 1, borderColor: corSecundaria }]}>
                    <Text > EPI’s vinculadas {episVeinculados.length} </Text>
                    <TouchableOpacity >
                        <Text>Ver mais</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={episVeinculados} 
                    renderItem={renderizarItemEPI}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

            <View style={styles.container} >
                <View style={[styles.cell, { borderBottomWidth: 1, borderColor: corSecundaria }]}>
                    <Text style={styles.texto}> Notificação {notificacoes.length} </Text>
                    <TouchableOpacity >
                        <Text>Ver mais</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={notificacoes} 
                    renderItem={renderizarItemNotificacao}
                    keyExtractor={(item) => item.id.toString()} 
                />
            </View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: corBranco,
        borderRadius: 10,
        flex : 1,
        gap : 5
    },
    cell: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: corBranco,
        borderRadius: 10
    },
    cellType2 : {
        borderBottomWidth: 1, 
        borderColor: corSecundaria,
    },
    nomeEPI: {
        fontSize: 16,
        textTransform: 'capitalize',
        color: corPreto,
    },
    validadeEPI: {
        fontSize: 14,
        color: corPreto,
    },
});

export default Home