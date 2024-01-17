import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MainLayout from "../../Component/MainLayout/MainLayout";
import { useEffect, useReducer, useState } from "react";
import MainStyle from "../../MainStyle";
import styles from "./styles";
import { useMemberOfJob } from "./service";
import moment from "moment";
import Loading from "../../Component/Loading/Loading";
import Icon from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Button from "../../Component/Button/Button";
export default function MemberOfJob(nav: NativeStackScreenProps<any>) {
    const {
        infoJob,
        listUser,
        loadingUser,
        listDataJobsPlan,
        listUserHaveJobs,
        gotoJobScreen,
        getDataPlanJob,
        setListUserHaveJobs,
        isOpen,
        setIsOpen,
        listUserOfCompany,
        setListUserOfCompany,
        addMember
    } = useMemberOfJob(nav)

    const [arrayName, setArrayName] = useState<string>('')

    useEffect(() => {
        const reload = nav.navigation.addListener('focus', () => {
            getDataPlanJob()

        })
        return reload
    })


    const handleExpand = (item: any) => {
        let _listExpand = [...listUserHaveJobs]
        let _listNewUser: Array<any> = []
        _listExpand.map((itemExpand: any) => {
            if (item._id == itemExpand._id) {
                _listNewUser.push({
                    ...itemExpand,
                    showMore: !itemExpand.showMore
                })
            } else {
                _listNewUser.push(itemExpand)
            }
        })
        setListUserHaveJobs(_listNewUser)

    }

    const handleAddMembers = (data: any) => {
        console.log('oke', data);
        // let _oldList: Array<any> = [...listMembers]
        let _listMember: Array<any> = []
        listUserOfCompany.map((item: any) => {
            if (item.name == data.name) {
                _listMember.push({
                    ...item,
                    select: !item.select
                })
            } else {
                _listMember.push(item)
            }
        })
        console.log('dsajdasidjas ', _listMember);
        setListUserOfCompany(_listMember)
    }

    return (
        <MainLayout
            iconEvent={() => nav.navigation.pop()}
            icon="md-caret-back"
            iconRightEvent={() => {
                nav.navigation.navigate('SummaryScreen', { dataJobs: listDataJobsPlan, infoJob: infoJob, listMember: listUserHaveJobs })
            }}
            iconRight="bar-chart-outline"
            iconRightSecondEvent={() => {
                setIsOpen(true)
                // nav.navigation.navigate('SummaryScreen', { dataJobs: listDataJobsPlan })
            }}
            iconRightSecond="person-add-outline"
            title={infoJob.name}>
            <View style={styles.container}>
                {loadingUser ?
                    <Loading />
                    :
                    <FlatList
                        data={listUserHaveJobs}
                        // horizontal
                        // pagingEnabled
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.itemUser}>
                                    <View style={styles.rowView}>
                                        <Text style={styles.textUser}>{item.username} {index == 0 ? '(Bạn)' : null}</Text>
                                        <TouchableOpacity
                                            onPress={() => handleExpand(item)}
                                            style={{ padding: 5, paddingHorizontal: 10 }}
                                        >
                                            {item?.showMore ? <Icon name="angle-up" size={25} /> : <Icon name="angle-down" size={25} />}
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        item?.showMore
                                            ?
                                            <TouchableOpacity
                                                onPress={() => {
                                                    gotoJobScreen(item)
                                                }}
                                                style={{ backgroundColor: MainStyle.secondColor, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
                                            >
                                                {item?.isHaveJobs ?
                                                    (listDataJobsPlan.filter((_item: any) => {
                                                        if (_item.members) {
                                                            return (_item.status == 'doing' || _item.status == 'plan') && _item.members == item.name
                                                        } else {
                                                            return (_item.status == 'doing' || _item.status == 'plan') && _item.creater == item.name
                                                        }
                                                    }).length <= 0 ?
                                                        <View style={styles.noData}>
                                                            <Icon name="sad-tear" size={60} color={'#FD446F'} />
                                                            <Text style={{ marginTop: 15, fontSize: 18, color: 'red' }}>Chưa có công việc</Text>
                                                        </View>
                                                        :
                                                        listDataJobsPlan?.map((e: any) => {
                                                            if (e.members) {
                                                                if (item.name == e.members && (e.status == 'doing' || e.status == 'plan')) {
                                                                    return (
                                                                        <View
                                                                            key={Math.random()}
                                                                            style={[styles.userJobs]}>
                                                                            <View style={styles.horizontalView}>
                                                                                <Text style={{ flex: 7, color: '#000' }}>{e.nameDetailJob}</Text>
                                                                                <View style={styles.statusJob}>
                                                                                    <View style={[styles.borderStatus, { backgroundColor: e.status == 'plan' ? '#F3B42B' : '#3689FE' }]}>
                                                                                        <Text style={styles.textStatus}>{e.status}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>
                                                                            <Text style={{ color: new Date().setHours(0, 0, 0, 0) > new Date(e.endTime).setHours(0, 0, 0, 0) ? 'red' : '#000' }}>{moment(e.startTime).format('DD/MM/YYYY')}{e.endTime ? (' - ' + moment(e.endTime).format('DD/MM/YYYY')) : ''}</Text>
                                                                        </View>
                                                                    )
                                                                }
                                                            } else {
                                                                if (item.name == e.creater && (e.status == 'doing' || e.status == 'plan')) {
                                                                    return (
                                                                        <View
                                                                            key={Math.random()}
                                                                            style={[styles.userJobs]}>
                                                                            <View style={styles.horizontalView}>
                                                                                <Text style={{ flex: 7, color: '#000' }}>{e.nameDetailJob}</Text>
                                                                                <View style={styles.statusJob}>
                                                                                    <View style={[styles.borderStatus, { backgroundColor: e.status == 'plan' ? '#F3B42B' : '#3689FE' }]}>
                                                                                        <Text style={styles.textStatus}>{e.status}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>
                                                                            <Text style={{ color: new Date().setHours(0, 0, 0, 0) > new Date(e.endTime).setHours(0, 0, 0, 0) ? 'red' : '#000' }}>{moment(e.startTime).format('DD/MM/YYYY')}{e.endTime ? (' - ' + moment(e.endTime).format('DD/MM/YYYY')) : ''}</Text>
                                                                        </View>
                                                                    )
                                                                }
                                                            }
                                                        }))
                                                    :
                                                    <View style={styles.noData}>
                                                        <Icon name="sad-tear" size={60} color={'#FD446F'} />
                                                        <Text style={{ marginTop: 15, fontSize: 18, color: 'red' }}>Chưa có công việc</Text>
                                                    </View>
                                                }
                                            </TouchableOpacity>
                                            :
                                            null
                                    }
                                </View>
                            )
                        }}
                    />}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isOpen}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: "center",
                }}>
                    <View style={[styles.modalContainer, { padding: 0, paddingVertical: 0, width: '95%', height: '80%', shadowRadius: 40 }]}>
                        <TouchableOpacity
                            onPress={() => {
                                setIsOpen(false)
                            }}
                            style={{ position: 'absolute', alignSelf: 'flex-end', zIndex: 99, backgroundColor: '#fff', borderRadius: 100, }}>
                            <Ionicons name="close-circle" size={35} />
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', margin: 10, fontSize: 18 }}>Danh sách thành viên</Text>
                        <View style={{ height: 12, backgroundColor: MainStyle.secondColor, marginHorizontal: 10, borderTopRightRadius: 15, borderTopLeftRadius: 15, borderWidth: 0.5, borderBottomWidth: 0 }} />
                        <FlatList
                            data={listUserOfCompany}
                            style={{ margin: 10, marginTop: 0, borderWidth: 0.5, borderTopWidth: 0 }}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => handleAddMembers(item)}
                                        style={[styles.itemMember, { backgroundColor: item?.select ? '#eee' : 'transparent' }]}>
                                        <View>
                                            <Text>{item.username}</Text>
                                            <Text>{item.name}</Text>
                                        </View>
                                        {item?.select ?
                                            <AntDesign name="check" size={20} color={'#43BC0A'} />
                                            :
                                            null
                                        }
                                    </TouchableOpacity>
                                )
                            }}
                        />
                        <TouchableOpacity
                            style={styles.btnAdd}
                            onPress={() => addMember(infoJob)}
                        >
                            <Text style={{ color: '#fff', fontSize: 15 }}>Thêm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </MainLayout>
    )
}