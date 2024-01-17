import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import MainLayout from "../../Component/MainLayout/MainLayout";
import Icon from 'react-native-vector-icons/EvilIcons'
import { useSelector } from "react-redux";
import styles from "./styles";
import { useEffect, useState } from "react";

export default function Members(nav: NativeStackScreenProps<any>) {
    const selectorUser = useSelector((state: any) => state.jobs.listUser)
    const selectorMe = useSelector((state: any) => state.user.currentUser)
    const [dataUser, setDataUser] = useState<any[]>([])

    useEffect(() => {
        getMember()
    }, [])

    const getMember = () => {
        let data: Array<any> = []
        selectorUser.map((item: any) => {
            if (item?.idGroup == selectorMe.idGroup) {
                data.push(item)
            }
        })
        setDataUser(data)
    }
    return (
        <MainLayout title="Thành viên">
            <FlatList
                data={dataUser}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => nav.navigation.navigate('JobsOfMonth', { infoUser: item })}
                            style={styles.membersView}>
                            <Icon name='user' size={50} />
                            <Text>{item.username}</Text>
                        </TouchableOpacity>
                    )
                }}
                contentContainerStyle={styles.container}
            />
        </MainLayout>
    )
}