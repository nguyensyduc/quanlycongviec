import { Dimensions, StyleSheet } from "react-native";
import MainStyle from "../../MainStyle";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    stateJobs: {
        marginTop: 30,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        minHeight: 100,
        maxHeight: Dimensions.get('window').height * 0.6,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 5
    },
    taskStyle: {
        backgroundColor: '#fff',
        borderRadius: 5,
        marginVertical: 5,
        padding: 10,
        borderWidth: 0.5
    },
    timeLineStyle: {
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        borderRadius: 5
    },
    textCalendar: {
        fontSize: 13,
        color: '#000',
        marginLeft: 10
    },
    headerStatus: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginHorizontal: -5
    },
    textHeaderStatus: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    nameJobs: {
        fontSize: 16,
        width: '85%',
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: 1.2
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    btnThreeDot: {
        width: '10%',
        alignItems: 'center',
        padding: 5,
    },
    btnAddJob: {
        backgroundColor: '#e1e1e1',
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 10,
        marginTop: 10
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
    btnAddImg: {
        borderRadius: 10,
        borderWidth:1,
        borderStyle:'dashed',
        padding:15,
        alignItems:'center'
    }
})

export default styles