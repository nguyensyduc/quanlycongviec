import { ActivityIndicator, View } from "react-native"
import MainStyle from "../../MainStyle"

const Loading = () => {
    return (
        <View style={{ height: "100%", backgroundColor: 'rgba(52, 52, 52, 0.3)', position: 'absolute', top: 0, width: '100%', alignItems: 'center' }}>
            <View style={{ flex: 1, justifyContent:'center'}}>
                <ActivityIndicator size={'large'} color={'#000'} />
            </View>
        </View>
    )
}

export default Loading