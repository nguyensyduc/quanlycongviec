import { Dimensions, StyleSheet } from "react-native";
import MainStyle from "../../MainStyle";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    jobsView: {
        flex: 1,
        width: Dimensions.get('window').width - 20,
        alignSelf: 'center',
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 0 },
        backgroundColor: '#fff',
        shadowRadius: 10,
        elevation: 10,
        padding: 10,
        margin: 10,
        marginBottom: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    taskStyle: {
        marginBottom: 20,
        padding: 20,
        // borderRadius: 10,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: 'gray',
        justifyContent: 'space-between',
        marginHorizontal: 15
    },
    labelView: {
        backgroundColor: MainStyle.secondColor,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10,
        marginBottom: 10,
        margin: -5
    },
    textlabel: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold'
    },
    nameDetail: {
        marginBottom: 10,
        color: '#000'
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textDate: {
        fontSize: 12,
        color: '#000',
        marginLeft: 5
    },
    statusView: {
        width: '20%',
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStatus: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 13,
    },
    modalView: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: MainStyle.heightHeader + 10
    },
    modalContainer: {
        // flex: 1,
        paddingBottom: 30,
        // height: Dimensions.get('window').height - (MainStyle.heightHeader + 10),
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 10,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 10
    },
    dateModal: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 10,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 10,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemUser: {
        padding: 10,
        paddingVertical: 20,
        borderColor: 'gray',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default styles