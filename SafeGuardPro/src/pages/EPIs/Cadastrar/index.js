import React, { useEffect, useState } from "react"
import { ImageBackground, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Button } from 'react-native'
import * as Animar from 'react-native-animatable'
import { corPrincipal, corBranco, corTitulo, meusEstilos } from "../../../styles/meusEstilos"
import { Cadastrar_EditarEpi, CallBuscarColaboradores, CallListColaboradores } from "../../../components/api_call";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import Veincular from "../../../components/modal_veincular";

const Cad_EPIs = ({ navigation, route }) => {
    const [ModalVeincular, setModalVeincular] = useState(false);

    const [Id, setId] = useState()
    const [Nome, setNome] = useState("")
    const [Categoria, setCategoria] = useState("")
    const [Descricao, setDescricao] = useState("")
    const [Foto, setFoto] = useState("https://beautyrepublicfdl.com/wp-content/uploads/2020/06/placeholder-image.jpg")
    const [Validade, setValidade] = useState(0)

    const Finalizar = async () => {

        const data = {
            "nome_epi": Nome,
            "categoria": Categoria,
            "descricao": Descricao,
            "foto": Foto,
            "validade": parseInt(Validade),
        }

        const id = route.params ? route.params.epi.id : null

        try {
            const resp = await Cadastrar_EditarEpi(data, id, !!id);
            navigation.goBack()
        } catch (error) {
            console.error('Erro ao cadastrar/alterar epi:', error.message);
            // Trate o erro conforme necessário (exibir mensagem de erro, etc.)
        }
    }

    useEffect(() => {
        if (route.params) {
            const { epi } = route.params

            setId(epi.id)
            setValidade(epi.validade.toString())
            setNome(epi.nome_epi)
            setCategoria(epi.categoria)
            setDescricao(epi.descricao)
            setFoto(epi.foto)
        }
    }, [])

    return (
        <ImageBackground source={require('../../../assets/bg.png')} resizeMode="cover" style={meusEstilos.ScreenBody}>
            <Animar.View animation={'fadeInUp'} style={[meusEstilos.conteudoCorpo, { padding: 20, paddingTop: 20, borderRadius: 25 }]}>
                <ScrollView style={{ paddingHorizontal: 20 }}>

                    <View>
                        <Text>Nome:</Text>
                        <TextInput
                            placeholder="Nome..."
                            style={styles.inputLogin}
                            value={Nome}
                            onChangeText={setNome}
                        />
                    </View>

                    <View>
                        <Text>Categoria:</Text>
                        <TextInput
                            placeholder="Categoria..."
                            style={styles.inputLogin}
                            value={Categoria}
                            onChangeText={setCategoria}
                        />
                    </View>

                    <View>
                        <Text>Descrição:</Text>
                        <View style={{ flexDirection: 'row', position: "relative" }}>
                            <TextInput
                                placeholder="Descrição..."
                                style={styles.inputLogin}
                                value={Descricao}
                                onChangeText={setDescricao}
                            />
                        </View>
                    </View>

                    <View>
                        <Text>Validade em dias:</Text>
                        <View style={{ flexDirection: 'row', position: "relative" }}>
                            <TextInput
                                placeholder="Validade..."
                                style={styles.inputLogin}
                                value={Validade}
                                onChangeText={setValidade}
                            />
                        </View>
                    </View>

                    <View>
                        <Text>Link da imagem:</Text>
                        <View style={{ flexDirection: 'row', position: "relative" }}>
                            <TextInput
                                placeholder="Foto..."
                                style={styles.inputLogin}
                                value={Foto}
                                onChangeText={setFoto}
                            />
                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }} >
                        <Image style={{ width: 200, height: 200 }} resizeMode="stretch" source={{
                            uri: Foto,
                        }} />
                    </View>

                </ScrollView>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20 }}>
                    <TouchableOpacity style={[styles.botao, { backgroundColor: corPrincipal }]} onPress={Finalizar} >
                        <Text style={[meusEstilos.textoBotao, { color: corBranco }]}> {route.params ? "Atualizar" : "Cadastrar"} </Text>
                    </TouchableOpacity>
                    {
                        route.params ? (
                            <TouchableOpacity style={[styles.botao, { backgroundColor: corPrincipal }]} onPress={() => setModalVeincular(true)} >
                                <Text style={[meusEstilos.textoBotao, { color: corBranco }]}> Veincular </Text>
                            </TouchableOpacity>
                        ) : null
                    }
                </View>

            </Animar.View>


            <Veincular Visibility = {ModalVeincular} SetVisibility = {setModalVeincular} NomeEPI = {Nome} IdEpi = {Id} currentUser = {route.params.colaborador.id} />

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    botao: {
        backgroundColor: corBranco,
        borderRadius: 4,
        paddingVertical: 8,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: corBranco
    },
    logo: {
        width: 30,
        height: 30,
        marginRight: 20
    },
    picker: {
        backgroundColor: corBranco,
        height: 40,
        justifyContent: 'center',
        borderBottomWidth: 1,
    },
    label: {
        fontSize: 20,
        marginTop: 28
    },
    inputLogin: {
        width: '100%',
        borderBottomWidth: 1,
        height: 40,
        fontSize: 16,
        marginBottom: 15
    },
})

export default Cad_EPIs