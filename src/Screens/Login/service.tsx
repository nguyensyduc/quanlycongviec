import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import address from "../../Address/ipa_address";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUserDetail } from "../../Store/userSlice";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setListUser } from "../../Store/jobsSlice";

export const useLogin = (navigation: NativeStackScreenProps<any>) => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [dataUser, setDataUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingLogin, setLoadingLogin] = useState(false)
    const selectorUser = useSelector((state: any) => state.user.currentUser)
    const dispatch = useDispatch()
    useEffect(() => {
        const reload = navigation.navigation.addListener('focus', () => {
            console.log('currentUserrrrrr ', selectorUser);
            getDataUser();
        })
        return reload
        // // autoLogin()
        // const reload = navigation.navigation.addListener('focus', () => {
        //     console.log('info mee ', selectorUser);
        // })
        // return reload
    }, [navigation.navigation])

    const getDataUser = async () => {
        setLoading(true)
        try {
            const request = await fetch(`${address}account`, {
                method: 'GET',
            })
            const response = await request.json();
            console.log('data user ', response);

            const payload = { listUser: response.data };
            dispatch(setListUser(payload))
            setTimeout(() => {
                setDataUser(response.data);
                autoLogin(response.data)
            }, 500);
            setLoading(false)
        } catch (error) {
            console.log('errorrrrr ', error);

            setLoading(false)
        }
    }

    const clearInput = () => {
        setUsername('')
        setPassword('')
        setLoading(false)
    }

    const handleLogin = async () => {
        console.log(username, password);

        if (!username) {
            showMessage({
                message: 'Yêu cầu nhập tên đăng nhập!',
                type: 'warning',
                duration: 3000
            })
            return
        }
        if (!password) {
            showMessage({
                message: 'Yêu cầu nhập mật khẩu!',
                type: 'warning',
                duration: 3000
            })
            return
        }
        console.log('Click Login ', dataUser);
        setLoadingLogin(true)
        let isHave = 0
        let title = '';
        let userInfor = {};
        dataUser.map((item: any) => {
            if (item.name == username.trim() && item.pass == password.trim()) {
                isHave++
                title = item.username;
                userInfor = item;
            }
        })
        if (isHave > 0) {
            await AsyncStorage.setItem('name_login', username.trim())
            await AsyncStorage.setItem('pass_login', password.trim())
            // console.log('actionnnnnnLoginScreen1');
            dispatch(setCurrentUserDetail({ currentUser: userInfor }))
            navigation.navigation.navigate('HomeScreen');
            clearInput()
        } else {
            showMessage({
                message: 'Tài khoản hoặc mật khẩu không chính xác!',
                type: 'warning',
                duration: 3000
            })
        }
        setLoadingLogin(false)
        // 
    }


    const autoLogin = async (data: any) => {
        let name_login = await AsyncStorage.getItem('name_login')
        let pass_login = await AsyncStorage.getItem('pass_login')
        // let name_login = selectorUser.name
        // let pass_login = selectorUser.pass
        console.log('autooooooo ', name_login, pass_login);
        let isHave = 0
        let title = '';
        let userInfor = {};
        if (name_login && pass_login) {
            data.map((item: any) => {
                if (item.name == name_login && item.pass == pass_login) {
                    isHave++
                    title = item.username;
                    userInfor = item;
                }
            })
            if (isHave > 0) {
                console.log('oke này');

                await AsyncStorage.setItem('name_login', name_login)
                await AsyncStorage.setItem('pass_login', pass_login)
                // console.log('actionnnnnnLoginScreen2');
                dispatch(setCurrentUserDetail({ currentUser: userInfor }))
                navigation.navigation.navigate('HomeScreen');
                clearInput()
            }
            // else {
            //     showMessage({
            //         message: 'Tài khoản hoặc mật khẩu không chính xác!',
            //         type: 'warning',
            //         duration: 3000
            //     })
            // }
        }
    }

    return {
        username,
        setUsername,
        password,
        setPassword,
        handleLogin,
        loading,
        getDataUser,
        loadingLogin
    }
}