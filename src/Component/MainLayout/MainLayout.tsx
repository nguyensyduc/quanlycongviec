import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native"
import Header from "../Header/Header"
import { ReactNode, useEffect } from "react"
import MainStyle from "../../MainStyle"

const MainLayout = ({
    title,
    children,
    icon,
    iconEvent,
    iconRight,
    iconRightEvent,
    iconRightSecond,
    iconRightSecondEvent,
}: {
    title?: string,
    children: ReactNode,
    icon?: string,
    iconEvent?: () => void,
    iconRight?: string,
    iconRightEvent?: () => void,
    iconRightSecond?: string,
    iconRightSecondEvent?: () => void
}) => {

    useEffect(() => {
        StatusBar.setBarStyle('light-content')
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={MainStyle.mainColor}/>
            <Header
                icon={icon}
                iconEvent={iconEvent}
                iconRight={iconRight}
                iconRightEvent={iconRightEvent}
                iconRightSecond={iconRightSecond}
                iconRightSecondEvent={iconRightSecondEvent}
                title={title} />
            <View style={styles.container}>
                {children}
            </View>
        </View>
    )
}

export default MainLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})