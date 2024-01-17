import { StyleProp, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native"
import MainStyle from "../../MainStyle"
import { ReactPropTypes } from "react"
import { ActivityIndicator } from "react-native"

interface IButton extends TouchableOpacityProps {
    title: string,
    styleButton?: StyleProp<ViewStyle>,
    loading?: boolean
}

const Button = (props: IButton) => {
    const {
        styleButton,
        title,
        loading,
        onPress,
        ...rest
    } = props
    return (
        <TouchableOpacity
            {...rest}
            style={[styles.buttonView, styleButton]}
            onPress={onPress}>
            {loading ?
                <ActivityIndicator size={'small'} color={'#fff'} />
                :
                <Text style={styles.btnText}>{title}</Text>
            }
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    buttonView: {
        backgroundColor: MainStyle.mainColor,
        padding: 15,
        paddingHorizontal: 25
    },
    btnText: {
        fontWeight: 'bold',
        fontSize: MainStyle.mainSizeText,
        color: MainStyle.mainBackground
    }
})