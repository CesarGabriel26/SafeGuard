import React from "react"
import { ImageBackground, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as Animar from 'react-native-animatable'
import { corPrincipal, corBranco, corTitulo, meusEstilos } from "../../../styles/meusEstilos"
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const IconSize = 30

const Settings = ({ navigation }) => {
    return (
        <ImageBackground source={require('../../../assets/bg.png')} resizeMode="cover" style={meusEstilos.ScreenBody}>
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
                        <MaterialIcons name={'arrow-drop-down'} size={IconSize} color={corPrincipal} />
                    </View>
                </View>

                <View style={styles.cell}>
                    <MaterialIcons name={'lock'} size={IconSize} color={corPrincipal} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, marginRight: 15 }} > Privacidade </Text>
                        <MaterialIcons name={'arrow-drop-down'} size={IconSize} color={corPrincipal} />
                    </View>
                </View>

                <View style={styles.cell}>
                    <MaterialIcons name={'notifications'} size={IconSize} color={corPrincipal} />
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
                    <MaterialIcons name={'smartphone'} size={IconSize} color={corPrincipal} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text  style={{ fontSize: 20, marginRight: 15 }} > Permissões do dis... </Text>
                        <MaterialIcons name={'arrow-drop-down'} size={IconSize} color={corPrincipal} />
                    </View>
                </View>

                <TouchableOpacity style={styles.cell} onPress={() => navigation.navigate('BemVindo')}>
                    <MaterialIcons name={'logout'} size={IconSize} color={corPrincipal} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text  style={{ fontSize: 20, marginRight: 15 }} > Log Out </Text>
                        <MaterialIcons name={'arrow-drop-down'} size={IconSize} color={corPrincipal} />
                    </View>
                </TouchableOpacity>

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
})

export default Settings