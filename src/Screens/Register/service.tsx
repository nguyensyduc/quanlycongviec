import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import address from "../../Address/ipa_address";
import { useDispatch } from "react-redux";
import { showMessage } from "react-native-flash-message";

export const useRegister = (navigation: NativeStackScreenProps<any>) => {
    const [name, setName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [gender, setGender] = useState<number>(0)
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [addressUser, setAddress] = useState<string>('')
    const [idGroup, setIdGroup] = useState<string>('')
    const [pass, setPass] = useState<string>('')
    const [confirmPass, setConfirmPass] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleRegister = async () => {
        const body: any = {
            name: name,
            pass: pass,
            username: username,
            gender: gender,
            email: email,
            phone: phone,
            date: date,
            address: addressUser,
            idGroup: idGroup
        }
        console.log('bodyyyyy ', body);
        const request = await fetch(`${address}account/add`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await request.json();
        console.log('resssss ', res);

        if (res.success) {
            navigation.navigation.navigate('LoginScreen')
            showMessage({
                message: 'Đã đăng ký tài khoản thành công',
                type: 'success'
            })
        }
    }

    return {
        name,
        setName,
        username,
        setUsername,
        gender,
        setGender,
        email,
        setEmail,
        phone,
        setPhone,
        date,
        setDate,
        addressUser,
        setAddress,
        idGroup,
        setIdGroup,
        pass,
        setPass,
        confirmPass,
        setConfirmPass,
        loading,
        setLoading,
        handleRegister
    }
}