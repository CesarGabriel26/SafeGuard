import React, { useState } from "react"
import { ImageBackground, View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import * as Animar from 'react-native-animatable'
import { Picker } from '@react-native-picker/picker';
import { corPrincipal, corBranco, corTitulo, meusEstilos } from "../../styles/meusEstilos"

const Login = ({ navigation }) => {
    const [tipoAcesso, setTipoAcesso] = useState('vendedor')
    const [Usuario, setUsuario] = useState('')
    const [Senha, setSenha] = useState('')

    const [MensagemLogin, setMensagemLogin] = useState('')


    return (
        <ImageBackground source={require('../../assets/bg.png')} resizeMode="cover" style={meusEstilos.conteudoHeader}>
            <Animar.View animation='fadeInLeft' delay={500} style={styles.header} >
                <Image source={require('../../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain" />
                <Text style={styles.headerText}>Bem-vindo(a) </Text>
            </Animar.View>
            <Animar.View animation={'fadeInUp'} style={meusEstilos.conteudoCorpo}>

                <Text style={styles.label}> Tipo acesso:</Text>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={tipoAcesso}
                        onValueChange={setTipoAcesso}
                    >
                        <Picker.Item label="Vendedor" value="vendedor" />
                        <Picker.Item label="Gerente" value="gerente" />
                    </Picker>
                </View>
                <Text style={styles.label}> Usuario:</Text>
                <TextInput
                    placeholder="Digite seu usuario..."
                    style={styles.inputLogin}
                    value={Usuario}
                    onChangeText={setUsuario}
                />

                <Text style={styles.label}> Senha:</Text>
                <TextInput
                    placeholder="Digite sua senha"
                    style={styles.inputLogin} secureTextEntry={true}
                    value={Senha}
                    onChangeText={setSenha}
                />

                <Text>{MensagemLogin}</Text>

                <TouchableOpacity style={meusEstilos.botao} onPress={() => navigation.navigate('BottomNav')}>
                    <Text style={meusEstilos.textoBotao}> Acessar </Text>
                </TouchableOpacity>
            </Animar.View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
        flexDirection: 'row'
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
        borderBottomWidth: 1,
        height: 40,
        fontSize: 16
    },
})

export default Login