import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headerView: {
        width: '100%',
        borderTopWidth: 0,
        backgroundColor: '#fff',
        borderWidth: 0.45,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 11,
        padding: 20
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label:{
        width: '40%',
        fontWeight: 'bold',
        fontSize: 16
    },
    content:{
        fontSize: 16
    }
})

export default styles