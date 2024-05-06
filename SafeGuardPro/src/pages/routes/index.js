import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "react-native";
import { corPrincipal, corBranco, corTitulo, meusEstilos } from "../../styles/meusEstilos"

// Telas
import Inicio from "../Inicio";
import Login from "../Login";
import BottomNav from "../Bottom_Nav";
import Cad_EPIs from "../EPIs/Cadastrar";
import Cadastro from "../Colaboradores/Cadastro";
import ExibirEPI from "../EPIs/Exibir";


const Stack = createNativeStackNavigator()

const Rotas = () => {
    return (
        <NavigationContainer>

            <StatusBar backgroundColor={corPrincipal} />

            <Stack.Navigator>
                <Stack.Screen name="BemVindo" component={Inicio} options={{ headerShown : false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown : false }} />
                <Stack.Screen name="BottomNav" component={BottomNav} options={{ headerShown : false }} />

                {/* Cadastros */}

                <Stack.Screen name="Cad_EPIs" component={Cad_EPIs} options={{ headerShown : false }} />
                <Stack.Screen name="Cad_Colab" component={Cadastro} options={{ headerShown : false }} />

                {/* Exibirção */}

                <Stack.Screen name="ExibirEPI" component={ExibirEPI} options={{ headerShown : false }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Rotas