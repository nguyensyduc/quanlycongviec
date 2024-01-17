import { Dimensions, StyleSheet } from "react-native";
import MainStyle from "../../MainStyle";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
    },
    blockView: {
        paddingHorizontal: 10,
        padding: 2.5,
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    // btnThreeDot: {
    //     width: '10%',
    //     alignItems: 'center',
    //     padding: 5,
    // },
    labelJobView: {
        fontSize: 20,
        fontWeight: '600',
        width: '75%',
        color: '#000'
    },
    labelView: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold'
    },
    timeView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    inputStyle: {
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10
    },
    textCommentView: {
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 20,
        paddingHorizontal: 10
    },
    btnChange: {
        marginVertical: 5,
        padding: 5,
        paddingVertical: 10,
        borderRadius: 10,
        margin: 5,
        minWidth: '30%',
        alignItems: 'center'
        // borderWidth:1
    },
    txtStatus: {
        // color:'#fff',
        fontWeight: 'bold'
    },
    modalContainer: {
        // flex: 1,
        width: '100%',
        height: Dimensions.get('window').height * 0.6,
        padding: 10,
        paddingVertical: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: -5 },
        elevation: 10,
    },
    rateJob: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 99,
        width: 30,
        height: 30,
        borderWidth: 2,
        borderColor: MainStyle.mainColor
    },
    containerModalRate: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentRate: {
        width: Dimensions.get('screen').width * 0.95,
        height: Dimensions.get('screen').height * 0.75,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 10,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 10
    },
    textBtnRate: {
        fontSize: 16,
        color: '#fff'
    },
    reasonInput: {
        backgroundColor: 'lightgray',
        minHeight: 200,
        borderRadius: 10,
        padding: 10,
        color: '#000',
        fontSize: 15
    }
})

export default styles