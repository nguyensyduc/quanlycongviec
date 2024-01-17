import { Platform, StyleSheet, Text, TextInput, View } from "react-native"
import MainStyle from "../../MainStyle"
import { ReactNode } from "react"

const Input = ({
    label,
    placeholder,
    onChangeText,
    isPass,
    isChildren,
    children,
    isMulti,
    valueText
}: {
    label: string,
    placeholder?: string,
    onChangeText?: (text: string) => void,
    isPass?: boolean
    isChildren?: boolean,
    children?: ReactNode,
    isMulti?: boolean,
    valueText?: string
}) => {
    return (
        <View style={styles.inputView}>
            <Text style={styles.labelView}>{label}</Text>
            {!isChildren ?
                <TextInput
                    value={valueText}
                    style={[styles.txtInput, { minHeight: isMulti ? 100 : undefined }]}
                    secureTextEntry={isPass}
                    placeholderTextColor={MainStyle.placeColorText}
                    onChangeText={onChangeText}
                    multiline={isMulti ? true : false}
                    placeholder={placeholder} />
                :
                children
            }
        </View>
    )
}
export default Input

const styles = StyleSheet.create({
    inputView: {
        borderWidth: 0.5,
        borderColor: MainStyle.mainColor,
        borderRadius: 5,
        padding: 15,
        paddingVertical: Platform.OS == 'ios' ? 15 : 10,
        fontSize: MainStyle.mainSizeText,
        marginVertical: 15,
        backgroundColor:'#fff',
        zIndex: 99
    },
    labelView: {
        color: MainStyle.mainColor,
        position: 'absolute',
        backgroundColor: MainStyle.mainBackground,
        marginTop: -9,
        marginHorizontal: 10,
        paddingHorizontal: 5,
        fontSize: MainStyle.mainSizeText,
        fontWeight: 'bold'
    },
    txtInput: {
        color:'#000',
    }
})