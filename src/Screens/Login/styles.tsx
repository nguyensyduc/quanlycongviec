import { Platform, StyleSheet } from "react-native";
import MainStyle from "../../MainStyle";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    mainView: {
        flex: 1,
        backgroundColor: MainStyle.mainBackground,
        paddingBottom: 50
    },
    btnLogin: {
        alignSelf: 'center',
        borderRadius: 5
    },
    logoIcon: {
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 50
    },
    signUp: {
        alignSelf: 'center',
        margin: 20
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    radView: {
        width: 18,
        height: 18,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: MainStyle.mainColor,
        marginRight: 10
    },
    radCircle: {
        width: 12,
        height: 12,
        borderRadius: 10,
        backgroundColor: MainStyle.mainColor
    },
    labelView: {
        color: MainStyle.mainColor,
        position: 'absolute',
        backgroundColor: MainStyle.mainBackground,
        marginTop: -9,
        marginHorizontal: 10,
        paddingHorizontal: 5,
        fontSize: MainStyle.mainSizeText,
        fontWeight: 'bold'
    },
    inputView: {
        borderWidth: 0.5,
        borderColor: MainStyle.mainColor,
        borderRadius: 5,
        padding: 15,
        paddingVertical: Platform.OS == 'ios' ? 15 : 10,
        fontSize: MainStyle.mainSizeText,
        marginVertical: 15
    }
})

export default styles