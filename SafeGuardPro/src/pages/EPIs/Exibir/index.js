import React, { useEffect, useState } from "react"
import { ImageBackground, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Button } from 'react-native'
import * as Animar from 'react-native-animatable'
import { corPrincipal, corBranco, corTitulo, meusEstilos, corPreto } from "../../../styles/meusEstilos"
import { CallBuscaEpi } from "../../../components/api_call";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const ExibirEPI = ({ navigation, route }) => {
    const [Nome, setNome] = useState("")
    const [Categoria, setCategoria] = useState("")
    const [Descricao, setDescricao] = useState("")
    const [Foto, setFoto] = useState("https://beautyrepublicfdl.com/wp-content/uploads/2020/06/placeholder-image.jpg")
    const [Validade, setValidade] = useState(0)

    const buscarEPI = async () => {
        try {
            const { epi } = route.params
            console.log(epi);

            let data = await CallBuscaEpi(epi.id_epi)

            setNome(data.nome_epi)
            setCategoria(data.categoria)
            setDescricao(data.descricao)
            setValidade(data.validade)
            setFoto(data.foto)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarEPI()
    }, [])

    return (
        <ImageBackground source={require('../../../assets/bg.png')} resizeMode="cover" style={meusEstilos.ScreenBody}>
            <Animar.View animation={'fadeInUp'} style={[meusEstilos.conteudoCorpo, { padding: 20, paddingTop: 20, borderRadius: 25, backgroundColor: 'transparent' }]}>

                <View style={{ flex: 1, flexDirection : 'column', justifyContent : 'space-between' }}>
                    <View style={[styles.cell, { flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }]}>
                        <View style={styles.cell}>
                            <Text>Nome:</Text>
                            <Text numberOfLines={1} style={{ maxWidth: 100 }} >{Nome}</Text>
                          </View>

                        <View style={styles.cell}>
                            <Text>Categoria:</Text>
                            <Text numberOfLines={1} style={{ maxWidth: 100 }} >{Categoria}</Text>
                        </View>

                        <View style={styles.cell}>
                            <Text>Validade em dias:</Text>
                            <Text>{Validade}</Text>
                        </View>

                    </View>

                    <View style={[styles.cell, { justifyContent: 'center', alignItems: 'center', width: '100%' }]} >
                        <Image style={{ width: 200, height: 200 }} resizeMode="stretch" source={{
                            uri: Foto,
                        }} />
                    </View>

                    <View style={[styles.cell, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                        <Text style={{ textAlign: 'left', marginBottom : 15 }}>Descrição:</Text>
                        <Text>{Descricao}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20 }}>
                        <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()} >
                            <Text style={[meusEstilos.textoBotao, { color: corPreto }]}> Voltar </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Animar.View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    cell: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: corBranco,
        borderRadius: 10,
        width: '100%'
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

})

export default ExibirEPI