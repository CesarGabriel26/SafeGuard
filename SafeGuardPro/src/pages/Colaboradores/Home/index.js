import React, { useEffect, useState } from "react"
import { ImageBackground, View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import { CallBuscaEpi, CallBuscaEpiPorColaborador, CallCriarNotificacoes, CallGetNotificacoes } from "../../../components/api_call"
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import * as Notifications from "expo-notifications"

import { corPreto, corBranco, ScreenPadding, meusEstilos, corSecundaria, corPrincipal } from "../../../styles/meusEstilos"

const Home = ({ navigation, route }) => {
    const [episVeinculados, setEpisVeinculados] = useState([])
    const [notificacoes, setNotificacoes] = useState([])
    const { contribuidor, acesso } = route.params

    const buscarEpis = async () => {
        try {
            const data = await CallBuscaEpiPorColaborador(contribuidor.id);
            const episData = await Promise.all(data);

            setEpisVeinculados(episData);
        } catch (error) {
            console.error('Erro ao buscar EPIS:', error);
        }
    };

    const renderizarItemEPI = ({ item }) => {
        const hoje = new Date();
        const validade = new Date(item.data_vencimento);
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
                mensagemValidade = `Vence em ${diferencaEmDias} ${(diferencaEmDias > 1) ? "dias" : "dia"}`;
            } else if (diferencaEmMeses < 12) {
                mensagemValidade = `Vence em ${diferencaEmMeses} ${(diferencaEmMeses > 1) ? "mêses" : "mês"}`;
            } else {
                mensagemValidade = `Vence em ${diferencaEmAnos} ${(diferencaEmAnos > 1) ? "anos" : "ano"}`;
            }
        }

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ExibirEPI', { epi: item })} style={[styles.cell, styles.cellType2]}>
                <Text style={[styles.nomeEPI, { maxWidth: 100 }]} numberOfLines={1}>{item.nome_epi}</Text>
                <Text style={styles.validadeEPI}>{mensagemValidade}</Text>
            </TouchableOpacity>
        );
    };

    const buscarNotificacoes = async () => {
        try {
            const data = await CallGetNotificacoes(contribuidor.id);
            setNotificacoes(data)

            // data.forEach(notificacao => {
            //     criarNotificacaoLocal(notificacao.tipo,notificacao.descricao)
            // });

        } catch (error) {
            console.error('Erro ao buscar EPIS:', error);
        }
    }

    const renderizarItemNotificacao = ({ item }) => {
        let icon = item.tipo == 'new' ? "add-circle" : "warning"
        let color = corPrincipal

        return (
            <View style={[styles.cell, styles.cellType2]}>
                <MaterialIcons name={icon} size={20} color={color} />
                <Text style={styles.validadeEPI}> {item.descricao} </Text>
            </View>
        );
    };

    const criarNotificacaoLocal = async (title, body) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                data: {}
            },
            trigger: {
                seconds: 5
            }
        })
    }

    const sendNotification = () => {
        let notification = notificacoes[notificacoes.length - 1]
        if (notification) {
            criarNotificacaoLocal('Atenção', notification["descricao"])
        }
    }

    useEffect(() => {
        buscarEpis()
        buscarNotificacoes()
        CallCriarNotificacoes()
        sendNotification()
    }, [])

    return (
        <ImageBackground
            source={require('../../../assets/bg.png')}
            resizeMode="stretch"
            style={meusEstilos.ScreenBody}
        >
            <View style={styles.cell}>
                <Text > {acesso}: </Text>
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
    cellType2: {
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