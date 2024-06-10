import React, { useEffect, useState } from "react"
import { ImageBackground, View, Text, StyleSheet, Image, TouchableOpacity, Switch } from 'react-native'
import * as Animar from 'react-native-animatable'
import { corPrincipal, corBranco, corTitulo, meusEstilos, corSecundaria } from "../../../styles/meusEstilos"
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage"


const IconSize = 30

const Settings = ({ navigation, route }) => {
    const [Pfp, setPfp] = useState('https://scfoods.fbitsstatic.net/img/p/melancia-mini-unidade-70680/257182.jpg?w=800&h=800&v=no-change&qs=ignore')
    const [isEnabled, toggleSwitch] = useState(false)

    useEffect(() => {
        setPfp(route.params.contribuidor.foto)
    }, [])

    return (

        <ImageBackground source={require('../../../assets/bg.png')} resizeMode="cover" style={meusEstilos.ScreenBody}>

            <View style={styles.cell}>
                <View style={{ flexDirection: 'row', width: "100%",justifyContent: 'space-between'}}>
                    <View style={{ flexDirection: 'row' }} >
                        <Image resizeMode="cover" style={{ width: 50, height: 50, borderRadius: '50%' }} source={{ uri: Pfp }} />
                        <View style={[styles.cell2, { justifyContent: 'space-between', alignItems: 'flex-start' }]}>
                            <Text>Nome: {route.params.contribuidor.nome}</Text>
                            <Text>Cargo:{route.params.contribuidor.cargo}</Text>
                        </View>
                    </View>

                    <View style={styles.logout}>
                        <TouchableOpacity style={styles.cell} onPress={async () => {
                            await AsyncStorage.removeItem('UsuarioLogado')
                            navigation.navigate("Login")
                        }}>
                            <MaterialIcons name={'logout'} size={IconSize} color={corPrincipal} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.cell}>

                <View style={styles.container}>

                    <View style={styles.cell}>
                        <MaterialIcons name={'translate'} size={IconSize} color={corPrincipal} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, marginRight: 15 }} > Idioma </Text>
                            <MaterialIcons name={'arrow-drop-down'} size={IconSize} color={corPrincipal} />
                        </View>
                    </View>

                    <View style={styles.cell}>
                        <MaterialIcons name={'contrast'} size={IconSize} color={corPrincipal} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, marginRight: 15 }} > Tema </Text>
                            <Switch
                                trackColor={{ false: corSecundaria, true: corPrincipal }}
                                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </View>

                    <View style={styles.cell}>
                        <MaterialIcons name={'security'} size={IconSize} color={corPrincipal} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, marginRight: 15 }} > Privacidade </Text>
                            <MaterialIcons name={'arrow-drop-down'} size={IconSize} color={corPrincipal} />
                        </View>
                    </View>

                    <View style={styles.cell}>
                        <MaterialIcons name={'notifications-active'} size={IconSize} color={corPrincipal} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, marginRight: 15 }} > Notificações </Text>
                            <MaterialIcons name={'arrow-drop-down'} size={IconSize} color={corPrincipal} />
                        </View>
                    </View>

                    <View style={styles.cell}>
                        <MaterialIcons name={'help'} size={IconSize} color={corPrincipal} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, marginRight: 15 }} > Suporte e Ajuda </Text>
                            <MaterialIcons name={'arrow-drop-down'} size={IconSize} color={corPrincipal} />
                        </View>
                    </View>

                    <View style={styles.cell}>
                        <MaterialIcons name={'devices'} size={IconSize} color={corPrincipal} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, marginRight: 15 }} > Permissões do dis... </Text>
                            <MaterialIcons name={'arrow-drop-down'} size={IconSize} color={corPrincipal} />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.cell} onPress={async () => {
                        let data = await AsyncStorage.getItem("Logo")
                        if (data == '1') {
                            await AsyncStorage.setItem("Logo", "2")
                        } else {
                            await AsyncStorage.setItem("Logo", "1")
                        }


                    }} >
                        <MaterialIcons name={'bug-report'} size={IconSize} color={corPrincipal} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, marginRight: 15 }} > Debug mode </Text>
                            <MaterialIcons name={'arrow-drop-down'} size={IconSize} color={corPrincipal} />
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        borderRadius: 10,
        flex: 1,
        gap: 15
    },
    cell: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: corBranco,
        borderRadius: 10
    },
    cell2: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: corBranco,
        borderRadius: 10
    },
    logout: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    }
})

export default Settings