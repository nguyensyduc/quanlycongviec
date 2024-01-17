import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screens/HomeScreen'
import MyWork from '../Screens/MyWork'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import MainStyle from '../MainStyle'
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from 'react-native'
import Members from '../Screens/Members'
import Setting from '../Screens/Setting'
import { useCallback, useEffect, useRef } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useFocusEffect } from '@react-navigation/native'
const Tab = createBottomTabNavigator()

const BottomTab = (navigation: NativeStackScreenProps<any>) => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 80,
                    paddingTop: 15,
                    paddingHorizontal: 15,
                    borderTopWidth: 1,
                }
            }}>
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={[focused ? styles.focusView : null]}>
                                <AntDesign name='home' size={30} color={focused ? MainStyle.mainBackground : 'gray'} />
                                {focused ? <Text style={[styles.textLabel, { color: focused ? MainStyle.mainBackground : 'gray' }]}>{`Trang chủ`}</Text> : null}
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name='MyWork'
                component={MyWork}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={[focused ? styles.focusView : null]}>
                                <MaterialIcons name='work-outline' size={30} color={focused ? MainStyle.mainBackground : 'gray'} />
                                {focused ? <Text style={[styles.textLabel, { color: focused ? MainStyle.mainBackground : 'gray' }]}>{`Việc của tôi`}</Text> : null}
                            </View>
                        )
                    }
                }} />
            <Tab.Screen
                name='Members'
                component={Members}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={[focused ? styles.focusView : null]}>
                                <Feather name='users' size={30} color={focused ? MainStyle.mainBackground : 'gray'} />
                                {focused ? <Text style={[styles.textLabel, { color: focused ? MainStyle.mainBackground : 'gray' }]}>{`Thành viên`}</Text> : null}
                            </View>
                        )
                    }
                }} />
            <Tab.Screen
                name='Setting'
                component={Setting}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={[focused ? styles.focusView : null]}>
                                <AntDesign name='setting' size={30} color={focused ? MainStyle.mainBackground : 'gray'} />
                                {focused ? <Text style={[styles.textLabel, { color: focused ? MainStyle.mainBackground : 'gray' }]}>{`Cài đặt`}</Text> : null}
                            </View>
                        )
                    }
                }} />
        </Tab.Navigator >
    )
}

export default BottomTab

const styles = StyleSheet.create({
    textLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        marginLeft: 5
    },
    focusView: {
        backgroundColor: MainStyle.mainColor,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        height: 55,
        padding: 10
    }
})