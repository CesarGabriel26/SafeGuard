import React from "react";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { corPrincipal, corBranco, corTitulo, meusEstilos } from "../../styles/meusEstilos"

//$ Importando telas
import Lista_EPIs from "../EPIs/List";
import Home from "../Colaboradores/Home";
import Settings from "../Colaboradores/Settings";
import Listar from "../Colaboradores/List";
import { cargosAutorizados } from "../../components/api_call";

const Tab = createBottomTabNavigator()


const BottomNav = ({ route }) => {

    const { contribuidor } = route.params;

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: corPrincipal,
                tabBarInactiveTintColor: "gray",
                tabBarStyle: [
                    {
                        "display": "flex"
                    },
                    null
                ]
            }}
        >

            <Tab.Screen
                name="Home"
                component={Home}
                initialParams={{ contribuidor: contribuidor }}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="home" size={size} color={color} />
                    ),
                }}
            />

            {
                cargosAutorizados.includes(contribuidor.cargo) ? (
                    <Tab.Screen
                        name="Colaboradores"
                        component={Listar}
                        initialParams={{ contribuidor: contribuidor }}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                            tabBarIcon: ({ size, color }) => (
                                <MaterialIcons name="groups" size={size} color={color} />
                            ),
                        }}
                    />
                ) : null
            }

            <Tab.Screen
                name="EPI"
                component={Lista_EPIs}
                initialParams={{ contribuidor: contribuidor, userOnly: !cargosAutorizados.includes(contribuidor.cargo) }}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="headphones" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Settings"
                component={Settings}
                initialParams={{ contribuidor: contribuidor }}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="settings" size={size} color={color} />
                    ),
                }}
            />

        </Tab.Navigator>
    )
}

export default BottomNav