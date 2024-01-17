import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../Screens/Login'
import HomeScreen from '../Screens/HomeScreen'
import BottomTab from './BottomNavigator'
import MemberOfJob from '../Screens/MemberOfJob'
import JobsScreen from '../Screens/JobsScreen'
import DetailJobScreen from '../Screens/DetailJobScreen'
import RegisterScreen from '../Screens/Register'
import SummaryScreen from '../Screens/Summary'
import DetailDesScreen from '../Screens/DetailDes'
import JobsOfMonth from '../Screens/JobsOfMonth'
import TableSummary from '../Screens/TableSummary'
const Stack = createNativeStackNavigator()
const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
            <Stack.Screen
                name='HomeScreen'
                component={BottomTab}
                options={{ gestureEnabled: false }}
            />
            <Stack.Screen
                name='MemberOfJob'
                component={MemberOfJob}
                options={{ gestureEnabled: false }}
            />
            <Stack.Screen
                name='JobsScreen'
                component={JobsScreen}
                options={{ gestureEnabled: false }}
            />
            <Stack.Screen
                name='DetailJobScreen'
                component={DetailJobScreen}
                options={{ gestureEnabled: false }}
            />
            <Stack.Screen
                name='DetailDesScreen'
                component={DetailDesScreen}
                options={{ gestureEnabled: false }}
            />
            <Stack.Screen
                name='SummaryScreen'
                component={SummaryScreen}
                options={{ gestureEnabled: false }}
            />
            <Stack.Screen
                name='TableSummary'
                component={TableSummary}
                options={{ gestureEnabled: false }}
            />
            <Stack.Screen
                name='JobsOfMonth'
                component={JobsOfMonth}
                options={{ gestureEnabled: false }}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator