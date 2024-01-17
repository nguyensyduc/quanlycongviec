import { Dimensions, StyleSheet } from "react-native";
import MainStyle from "../../MainStyle";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemUser: {
        margin: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        minHeight: 70,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 7,
        elevation: 10,
        // width: Dimensions.get('screen').width*0.9,
    },
    textUser: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    userStyle: {
        flex: 2,
        backgroundColor: '#fff',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        // borderWidth: 0.2,
        shadowOffset: { width: 0, height: 7 },
        elevation: 5
    },
    horizontalView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userJobs: {
        backgroundColor: '#fff',
        paddingBottom:5,
        borderBottomWidth: 3,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    statusJob: {
        flex: 2,
        paddingVertical: 10,
        alignItems: 'flex-end',
    },
    borderStatus: {
        // borderWidth: 0.7,
        width: 60,
        paddingHorizontal: 10,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center'
    },
    noData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:5
    },
    textStatus: {
        color: '#fff'
    },
    rowView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    modalContainer: {
        width: '90%',
        padding: 10,
        paddingVertical: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 10
    },
    itemMember:{
        padding:10,
        paddingVertical: 20,
        borderBottomWidth: 0.5,
        borderColor: 'gray',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    btnAdd:{
        backgroundColor: MainStyle.mainColor,
        padding:12,
        alignSelf:'center',
        margin:10,
        borderRadius:10,
        paddingHorizontal:40,
    }

})

export default styles