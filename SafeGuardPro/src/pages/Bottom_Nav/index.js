import React from "react";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { corPrincipal, corBranco, corTitulo, meusEstilos } from "../../styles/meusEstilos"

//$ Importando telas
import EPIs from "../EPIs/List";
import Home from "../Colaboradores/Home";
import Settings from "../Colaboradores/Settings";
import Listar from "../Colaboradores/List";

const Tab = createBottomTabNavigator()

const BottomNav = ({ route }) => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: corPrincipal, // Cor dos ícones ativos
                inactiveTintColor: 'gray', // Cor dos ícones inativos
            }}
        >

            <Tab.Screen 
                name="Home" component={Home} options={{ 
                    headerShown : false,
                    tabBarShowLabel : false,
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="home" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen 
                name="Colaboradores" component={Listar} options={{ 
                    headerShown : false,
                    tabBarShowLabel : false,
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="headphones" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen 
                name="EPI" component={EPIs} options={{ 
                    headerShown : false,
                    tabBarShowLabel : false,
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="headphones" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen 
                name="Settings" component={Settings} options={{ 
                    headerShown : false,
                    tabBarShowLabel : false,
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="settings" size={size} color={color} />
                    ),
                }}
            />

        </Tab.Navigator>
    )
}

export default BottomNav