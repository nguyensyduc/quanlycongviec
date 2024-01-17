import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Input from "../../Component/Input/Input";
import MainLayout from "../../Component/MainLayout/MainLayout";
import styles from "../Login/styles";
import Button from "../../Component/Button/Button";
import Icon from 'react-native-vector-icons/FontAwesome5'
import MainStyle from "../../MainStyle";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import address from "../../Address/ipa_address";
// import { setListUser } from "../../Store/userSlice";
import Loading from "../../Component/Loading/Loading";
import { useRegister } from "./service";
import DatePicker from "react-native-date-picker";
// import { Icon } from 'native-base'
export default function RegisterScreen(nav: NativeStackScreenProps<any>) {
    const {
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
    } = useRegister(nav)

    const [isShowDate, setIsShowDate] = useState<boolean>(false)


    const RadioButton = (label: any, value: any) => {
        return (
            <View style={[styles.rowView, { width: '50%' }]}>
                <TouchableOpacity
                    onPress={() => setGender(value)}
                    style={styles.radView}>
                    <View style={[styles.radCircle, { backgroundColor: value == gender ? MainStyle.mainColor : 'transparent' }]}></View>
                </TouchableOpacity>
                <Text>{label}</Text>
            </View>
        )
    }

    return (
        <MainLayout
            iconEvent={() => nav.navigation.navigate('LoginScreen')}
            icon="md-caret-back"
            title="Đăng ký tài khoản">
            <View style={styles.container}>
                <View style={styles.mainView}>
                    <ScrollView style={{ flex: 1 }}>
                        <Input
                            onChangeText={(text: string) => setName(text)}
                            label={'Tên đăng nhập'}
                            placeholder={'Nhập tên đăng nhập'}
                            valueText={name}
                        />
                        <Input
                            onChangeText={(text: string) => setUsername(text)}
                            label={'Họ tên'}
                            placeholder={'Nhập họ tên đầy đủ'}
                            valueText={username}
                        />
                        <View style={[styles.rowView, { justifyContent: 'space-between' }]}>
                            <View style={[styles.inputView, { width: '45%' }]}>
                                <Text style={styles.labelView}>Giới tính</Text>
                                <View style={[styles.rowView, { justifyContent: 'space-between' }]}>
                                    {RadioButton('Nam', 1)}
                                    {RadioButton('Nữ', 2)}
                                </View>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Input
                                    onChangeText={(text: string) => setPhone(text)}
                                    valueText={phone}
                                    label={'Số điện thoại'}
                                    placeholder={'Nhập số điện thoại'}
                                />
                            </View>
                        </View>


                        <Input
                            onChangeText={(text: string) => setEmail(text)}
                            label={'Email'}
                            valueText={email}
                            placeholder={'Nhập email'}
                        />
                        <DatePicker
                            mode="date"
                            modal
                            textColor={"black"}
                            open={isShowDate}
                            date={new Date()}
                            onConfirm={(date: any) => {
                                setIsShowDate(false);
                                console.log('dateeeeee ', date);
                                setDate(date?.toISOString())
                            }}
                            onCancel={() => {
                                setIsShowDate(false);
                            }}
                            androidVariant="iosClone"
                            theme="light"
                        />
                        <TouchableOpacity
                            onPress={() => setIsShowDate(true)}
                            style={styles.inputView}>
                            <Text style={styles.labelView}>Ngày sinh</Text>
                            <Text>{date}</Text>
                        </TouchableOpacity>
                        <Input
                            onChangeText={(text: string) => setAddress(text)}
                            label={'Địa chỉ'}
                            placeholder={'Nhập địa chỉ'}
                            valueText={addressUser}
                        />
                        <Input
                            onChangeText={(text: string) => setIdGroup(text)}
                            label={'Mã công ty'}
                            placeholder={'Nhập mã công ty'}
                            valueText={idGroup}
                        />
                        <Input
                            onChangeText={(text: string) => setPass(text)}
                            isPass={true}
                            label={'Mật khẩu'}
                            placeholder={'Nhập mật khẩu'}
                            valueText={pass}
                        />
                        <Input
                            onChangeText={(text: string) => setConfirmPass(text)}
                            isPass={true}
                            label={'Xác nhận mật khẩu'}
                            placeholder={'Nhập mật khẩu'}
                            valueText={confirmPass}
                        />
                        <Button
                            styleButton={styles.btnLogin}
                            title={'Đăng ký'}
                            onPress={handleRegister}
                        />
                    </ScrollView>
                </View>
            </View>
            {loading ? <Loading /> : null}
        </MainLayout>
    )
}