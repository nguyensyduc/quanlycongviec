import { Dimensions, StyleSheet } from "react-native";
import MainStyle from "../../MainStyle";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    membersView: {
        margin: 10,
        padding: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 0 },
        backgroundColor:'#fff',
        shadowRadius: 10,
        elevation: 10
    }
})

export default styles