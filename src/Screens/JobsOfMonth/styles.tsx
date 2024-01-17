import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textNameJob: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    listView:{
        height: '100%',
        flex:1,
        marginHorizontal:5,
    },
    itemJob:{
        backgroundColor:'green',
        padding:5,
        borderRadius: 10,
        marginBottom:10
    },
    btnFilter:{
        marginBottom:10
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
})

export default styles