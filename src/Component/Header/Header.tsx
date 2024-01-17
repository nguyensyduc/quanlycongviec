import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import MainStyle from "../../MainStyle"
import Icon from 'react-native-vector-icons/Ionicons'
const heghtHeader = Platform.OS == 'ios' ? 100 : 80
const Header = ({
    title,
    // notLog,
    icon,
    iconEvent,
    iconRight,
    iconRightEvent,
    iconRightSecond,
    iconRightSecondEvent,
}: {
    title?: string,
    icon?: string,
    iconEvent?: () => void,
    iconRight?: string,
    iconRightEvent?: () => void,
    iconRightSecond?: string,
    iconRightSecondEvent?: () => void,
}) => {
    return (
        <View
            onLayout={(event) => {
                var { x, y, width, height } = event.nativeEvent.layout;
                MainStyle.heightHeader = height

            }}
            style={[styles.viewHeader, { backgroundColor: title ? MainStyle.mainColor : 'transparent' }]}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                {icon ?
                    <View style={styles.rowView}>
                        <TouchableOpacity
                            style={{ marginRight: 10 }}
                            onPress={iconEvent}>
                            <Icon name={icon} size={30} color={MainStyle.mainBackground} />
                        </TouchableOpacity>
                        <View style={{ width: 30, height: 30 }}></View>
                    </View>
                    : <View style={{ width: 30, height: 30 }}></View>
                }
                <Text style={styles.textHeader}>{title}</Text>
                <View style={styles.rowView}>
                    {iconRightSecond ?
                        <TouchableOpacity
                            style={styles.btnRight}
                            onPress={iconRightSecondEvent}>
                            <Icon name={iconRightSecond} size={30} color={MainStyle.mainBackground} />
                        </TouchableOpacity>
                        :
                        <View style={{ width: 30, height: 30 }}></View>
                    }
                    {iconRight ?
                        <TouchableOpacity
                            style={[styles.btnRight, { marginLeft: 10 }]}
                            onPress={iconRightEvent}>
                            <Icon name={iconRight} size={30} color={MainStyle.mainBackground} />
                        </TouchableOpacity>
                        :
                        <View style={{ width: 30, height: 30 }}></View>
                    }
                </View>
            </View>
        </View>
    )
}
export default Header

const styles = StyleSheet.create({
    viewHeader: {
        height: heghtHeader,
        padding: 15,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        elevation: 10,
        marginBottom: 10
    },
    textHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        // position: 'absolute',
        // alignSelf: 'center',
        color: MainStyle.mainBackground,
        // paddingBottom: 15
    },
    btnRight: {
        alignSelf: 'flex-end',
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})