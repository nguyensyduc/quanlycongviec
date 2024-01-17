import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Input from "../../Component/Input/Input";
import MainLayout from "../../Component/MainLayout/MainLayout";
import styles from "./styles";
import Button from "../../Component/Button/Button";
import Icon from 'react-native-vector-icons/FontAwesome5'
import MainStyle from "../../MainStyle";
import { useLogin } from "./service";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import address from "../../Address/ipa_address";
import Loading from "../../Component/Loading/Loading";
// import { Icon } from 'native-base'
export default function LoginScreen(nav: NativeStackScreenProps<any>) {
    const {
        username,
        password,
        setUsername,
        setPassword,
        loading,
        handleLogin,
        getDataUser,
        loadingLogin
    } = useLogin(nav)
    // useEffect(() => {
    //     const reload = nav.navigation.addListener('focus', () => {
    //         console.log('oke');
    //         getDataUser()
    //     })
    //     return reload
    // }, [nav])

    return (
        <MainLayout
            title="Đăng nhập hệ thống">
            <View style={styles.container}>
                <View style={styles.logoIcon}>
                    <Icon
                        size={120}
                        color={MainStyle.mainColor}
                        name="stack-overflow"
                    />
                </View>
                <View style={styles.mainView}>
                    <ScrollView style={{ flex: 1 }}>
                        <Input
                            onChangeText={(text: string) => setUsername(text)}
                            valueText={username}
                            label={'Tên đăng nhập'}
                            placeholder={'Nhập tên đăng nhập'}
                        />
                        <Input
                            onChangeText={(text: string) => setPassword(text)}
                            valueText={password}
                            isPass={true}
                            label={'Mật khẩu'}
                            placeholder={'Nhập mật khẩu'}
                        />
                        <Button
                            styleButton={styles.btnLogin}
                            title={'Đăng nhập'}
                            loading={loadingLogin}
                            onPress={handleLogin}
                        // onPress={()=>console.log('okeeee')}
                        />
                        <TouchableOpacity
                            onPress={() => nav.navigation.navigate('RegisterScreen')}
                            style={styles.signUp}>
                            <Text style={{ color: MainStyle.mainColor }}>Đăng ký tài khoản ngay</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
            {loading ? <Loading /> : null}
        </MainLayout>
    )
}