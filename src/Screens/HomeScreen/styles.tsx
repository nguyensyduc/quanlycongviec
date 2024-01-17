import { Dimensions, StyleSheet } from "react-native";
import MainStyle from "../../MainStyle";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        // backgroundColor: '#eee'
    },
    logoIcon: {
        padding: 5,
        paddingLeft: 12,
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.3 * 120 / 150,
        margin: 10,
        marginVertical: 5,
    },
    textMenu: {
        fontWeight: 'bold',
        fontSize: 13,
    },
    numberText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
        textAlign: 'center'
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    menuView: {
        backgroundColor: MainStyle.mainBackground,
        paddingHorizontal: 20,
        // borderRadius: 15,
        marginTop: 10,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        elevation: 10,
        marginBottom: 20,
        alignSelf: 'center',
        paddingBottom: 15
    },
    titleLabel: {
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 10
    },
    itemJobsView: {
        backgroundColor: MainStyle.secondColor,
        margin: 5,
        marginHorizontal: 10,
        padding: 20,
        paddingVertical: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    listView: {
        flex: 1,
        backgroundColor: MainStyle.mainBackground,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        elevation: 10,
        // marginBottom:10
    },
    textItem: {
        color: '#000',
        fontWeight: 'bold'
    }
})

export default styles