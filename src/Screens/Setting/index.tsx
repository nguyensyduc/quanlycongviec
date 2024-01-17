import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import MainLayout from "../../Component/MainLayout/MainLayout";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Button from "../../Component/Button/Button";
import MainStyle from "../../MainStyle";
import ModalLogout from "../../Component/ModalLogout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCurrentUserDetail } from "../../Store/userSlice";

export default function Setting(nav: NativeStackScreenProps<any>) {
    // const selectorUser = useSelector((state: any) => state.user.listUser)
    const selectorMe = useSelector((state: any) => state.user.currentUser)
    const [showLogout, setShowLogout] = useState<boolean>(false)
    const dispatch = useDispatch()
    useEffect(() => {
        // console.log('info mee ', selectorMe);
        const reload = nav.navigation.addListener('focus', () => {
            console.log('info mee ', selectorMe);
        })
        return reload
    }, [nav.navigation])

    const gotoLogin = async () => {
        await AsyncStorage.removeItem('name_login')
        await AsyncStorage.removeItem('pass_login')
        // dispatch(setCurrentUserDetail({ currentUser: {} }))
        setShowLogout(false)
        nav.navigation.navigate('LoginScreen')
    }

    const renderHeader = () => {
        return (
            <View style={[styles.headerView, styles.rowView]}>
                <FontAwesome name='user-circle-o' size={80} style={{ marginRight: 20 }} />
                <Text style={styles.label}>{selectorMe.username}</Text>
            </View>
        )
    }

    const renderItem = (label: string, value: string) => {
        return (
            <View style={[styles.rowView, { margin: 10, justifyContent: 'center' }]}>
                <Text style={styles.label}>{label}</Text>
                <View style={{ borderBottomWidth: 0.5, borderColor: MainStyle.mainColor, width: '50%', paddingBottom: 10 }}>
                    <Text style={styles.content}>{value}</Text>
                </View>

            </View>
        )

    }

    const renderBody = () => {
        return (
            <View style={{ flex: 1, paddingTop: 10, justifyContent: 'space-between' }}>
                <View>
                    {renderItem('Tên đăng nhập:', selectorMe.name)}
                    {renderItem('Giới tính:', selectorMe.gender == 1 ? 'Nam' : 'Nữ')}
                    {renderItem('Số điện thoại:', selectorMe.phone)}
                    {renderItem('Email:', selectorMe.email)}
                    {renderItem('Địa chỉ:', selectorMe.address)}
                    {renderItem('Mã công ty:', selectorMe.idGroup)}
                </View>
                <View style={{ marginBottom: 20 }}>
                    {/* <Button
                        // onPress={() => setShowLogout(true)}
                        title="Đổi mật khẩu"
                        styleButton={{ margin: 10, borderRadius: 10 }}
                    /> */}
                    <Button
                        onPress={() => setShowLogout(true)}
                        title="Đăng xuất hệ thống"
                        styleButton={{ margin: 10, borderRadius: 10 }}
                    />
                </View>
            </View>
        )
    }
    return (
        <MainLayout title="Cài đặt">
            <View style={{ flex: 1 }}>
                {renderHeader()}
                {renderBody()}
            </View>
            <ModalLogout
                isOpen={showLogout}
                confirmModal={gotoLogin}
                closeModal={() => setShowLogout(false)}
            />
        </MainLayout>
    )
}