import React, { useState, useEffect } from "react"
import { ImageBackground, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import * as Animar from 'react-native-animatable'
import { Picker } from '@react-native-picker/picker';
import { corPrincipal, corBranco, corTitulo, meusEstilos } from "../../styles/meusEstilos"
import { CallLogin } from "../../components/api_call";
import Checkbox from "expo-checkbox"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Login = ({ navigation }) => {
    const [tipoAcesso, setTipoAcesso] = useState('Colaborador')
    const [Usuario, setUsuario] = useState("Pimentinha@safenet.com")
    const [Senha, setSenha] = useState("1234")

    const [manterConectado, setmanterConectado] = useState(false)

    const login = async () => {
        let Contribuidor = await CallLogin(Usuario, Senha)

        if (Contribuidor) {
            if (Contribuidor.cargo == tipoAcesso) {
                
                finalizarLogin(Contribuidor)
            } else {
                Alert.alert("Este colaborador não possui esse tipo de acesso")
                alert("Este colaborador não possui esse tipo de acesso")
            }
        }
    }

    const finalizarLogin = async (json) => {
        if (manterConectado) {
            await AsyncStorage.setItem("UsuarioLogado", JSON.stringify(json))
        }

        navigation.navigate('BottomNav', { contribuidor: json, acesso: tipoAcesso })
    }

    const checarUsuarioLogado = async () => {
        let data = await AsyncStorage.getItem("UsuarioLogado")
        if (data) {
            data = JSON.parse(data)

            navigation.navigate('BottomNav', { contribuidor: data, acesso: data.cargo })
        }
    }

    useEffect(() => {
        checarUsuarioLogado()
    },[])

    return (
        <ImageBackground source={require('../../assets/bg.png')} resizeMode="cover" style={meusEstilos.conteudoHeader}>
            <Animar.View animation='fadeInLeft' delay={500} style={styles.header} >
                <Image source={require('../../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain" />
                <Text style={styles.headerText}>Bem-vindo(a) </Text>
            </Animar.View>
            <Animar.View animation={'fadeInUp'} style={meusEstilos.conteudoCorpo}>

                <Text style={styles.label}> Email:</Text>
                <TextInput
                    placeholder="Digite seu Email..."
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

                <Text style={styles.label}> Cargo:</Text>
                <Picker
                    selectedValue={tipoAcesso}
                    onValueChange={setTipoAcesso}
                    style={styles.inputLogin}
                >
                    <Picker.Item label="Colaborador" value="Colaborador" />
                    <Picker.Item label="Administrador" value="Administrador" />
                </Picker>

                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                    <Checkbox value={manterConectado} onChange={setmanterConectado} />
                    <Text>Permanecer conectado</Text>
                </View>

                <TouchableOpacity style={[meusEstilos.botao, { backgroundColor: corPrincipal }]} onPress={login}>
                    <Text style={[meusEstilos.textoBotao, { color: corBranco }]}> Acessar </Text>
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: corBranco
    },
    logo: {
        width: 70,
        height: 70,
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