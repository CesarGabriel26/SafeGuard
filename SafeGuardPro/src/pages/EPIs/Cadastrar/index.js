import React, { useEffect, useState } from "react"
import { ImageBackground, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Button } from 'react-native'
import * as Animar from 'react-native-animatable'
import { corPrincipal, corBranco, corTitulo, meusEstilos } from "../../../styles/meusEstilos"
import { Cadastrar_EditarEpi, CallBuscarColaboradores, CallListColaboradores, DeletarEPI } from "../../../components/api_call";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const Cad_EPIs = ({ navigation, route }) => {
    const [Id, setId] = useState()
    const [Nome, setNome] = useState("")
    const [Categoria, setCategoria] = useState("Proteção da cabeça")
    const [Descricao, setDescricao] = useState("")
    const [Foto, setFoto] = useState("https://beautyrepublicfdl.com/wp-content/uploads/2020/06/placeholder-image.jpg")
    const [Validade, setValidade] = useState("0")

    const Finalizar = async () => {

        const data = {
            "nome_epi": Nome,
            "categoria": Categoria,
            "descricao": Descricao,
            "foto": Foto,
            "validade": parseInt(Validade),
        }

        const id = route.params.epi ? route.params.epi.id : null

        try {
            const resp = await Cadastrar_EditarEpi(data, id, !!id);
            navigation.goBack()
        } catch (error) {
            console.error('Erro ao cadastrar/alterar epi:', error.message);
            // Trate o erro conforme necessário (exibir mensagem de erro, etc.)
        }
    }

    const Deletar = async () => {
        try {

            let resp = await DeletarEPI(Id)
            Alert.alert(resp.message)
            alert(resp.message)
            navigation.goBack()

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (route.params.epi) {
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

                <View style={{ marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botao2}>
                        <Image resizeMode="stretch" style={{ width: '100%', height: '100%' }} source={require('../../../assets/ProjetoEPI_voltar.png')} />
                    </TouchableOpacity>
                    {
                        route.params.epi ? (
                            <TouchableOpacity style={styles.botao2} onPress={Deletar}>
                                <MaterialIcons name="delete" size={25} color={corBranco} />
                            </TouchableOpacity>
                        ) : null
                    }

                </View>

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
                        <Picker
                            selectedValue={Categoria}
                            onValueChange={setCategoria}
                            style={styles.inputLogin}
                        >
                            <Picker.Item label="Proteção da cabeça" value="proteção da cabeça" />
                            <Picker.Item label="Proteção ocular e facial" value="Proteção ocular e facial" />
                            <Picker.Item label="Proteção respiratória" value="proteção respiratória" />
                            <Picker.Item label="Proteção auricular" value="proteção auricular" />
                            <Picker.Item label="Proteção das mãos e braços" value="proteção das mãos e braços" />
                            <Picker.Item label="Proteção dos pés e pernas" value="proteção dos pés e pernas" />
                            <Picker.Item label="Proteção do corpo" value="proteção do corpo" />
                        </Picker>
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
                        <Text style={[meusEstilos.textoBotao, { color: corBranco }]}> {route.params.epi ? "Atualizar" : "Cadastrar"} </Text>
                    </TouchableOpacity>
                    {
                        route.params.epi ? (
                            <TouchableOpacity style={[styles.botao, { backgroundColor: corPrincipal }]} onPress={() => navigation.navigate('VeincularEPI', {
                                currentUser: route.params.colaborador.id,
                                IdEpi: Id,
                                NomeEPI: Nome
                            })} >
                                <Text style={[meusEstilos.textoBotao, { color: corBranco }]}> Veincular </Text>
                            </TouchableOpacity>
                        ) : null
                    }
                </View>

            </Animar.View>

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
    botao2: {
        backgroundColor: corPrincipal,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10

    }
})

export default Cad_EPIs