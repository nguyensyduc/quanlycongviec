import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MainLayout from "../../Component/MainLayout/MainLayout";
import { useEffect, useRef, useState } from "react";
import { Alert, Animated, Dimensions, FlatList, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import useTableSummary from "./service";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MainStyle from "../../MainStyle";
import { useSelector } from "react-redux";
import address from "../../Address/ipa_address";
import { showMessage } from "react-native-flash-message";

export default function TableSummary(navigation: NativeStackScreenProps<any>) {
    const dataRateStar = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isShow, setIsShow] = useState<boolean>(false)
    const [currentUser, setCurrentUser] = useState<any>({})
    const [listJobCurrent, setListJobCurrent] = useState<any[]>([])
    const listMembers = navigation.route.params?.listMember
    const {
        infoJob,
        dataJobs,
        newDataJob,
        acceptDone,
        setAcceptDone,
        acceptView
    } = useTableSummary(navigation)

    const heightList = useRef<any>(new Animated.Value(0)).current

    useEffect(() => {
        console.log('infoJobbbbbbb ', infoJob?.dateRealDone, infoJob?.dateEnd, new Date(infoJob?.dateRealDone).getTime(), new Date(infoJob?.dateEnd).getTime(), new Date(infoJob?.dateRealDone).getTime() - new Date(infoJob?.dateEnd).getTime());
    }, [listJobCurrent])

    const handleDoneProject = async () => {
        const body = {
            isDone: true,
            dateRealDone: new Date()
        }
        const request = await fetch(`${address}jobs/edit/${infoJob.idJobs}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const res = await request.json();
        if (res.success) {
            showMessage({
                message: 'Đã hoàn thành dự án',
                type: 'success',
                duration: 3000,
                titleStyle: { fontSize: 16 }
            })
            navigation.navigation.navigate('HomeScreen')
        }
    }

    const changeHeight = () => {
        const newValue = heightList._value === 0 ? 300 : 0;
        console.log(newValue);
        if (isShow) {
            Animated.timing(heightList, {
                toValue: newValue,
                duration: 500,
                useNativeDriver: false,
            }).start();
            setTimeout(() => {
                setIsShow(false)
            }, 500);
        } else {
            setIsShow(true)
            Animated.timing(heightList, {
                toValue: newValue,
                duration: 500,
                useNativeDriver: false,
            }).start();
        }

    }

    const ModalSum = () => {
        let avgRate = 0;
        let sumRate = 0;
        let countRate = 0;
        let textRate = ''
        let colorRate = '#000'
        listJobCurrent?.map((itemRate: any) => {
            console.log(sumRate, itemRate.rateLevel, itemRate.nameDetailJob, 'dấdasdasas');

            countRate++
            sumRate = sumRate + (itemRate.rateLevel ?? 0)
        })
        console.log('summmmm ', sumRate, countRate);

        avgRate = countRate ? (sumRate / countRate) : 0
        avgRate = parseInt((avgRate * 100 / 5).toString())
        if (avgRate >= 90) {
            textRate = 'Xuất Sắc'
            colorRate = 'green'
        } else if (avgRate >= 75 && avgRate < 90) {
            textRate = 'Tốt'
            colorRate = 'green'
        } else if (avgRate >= 50 && avgRate < 75) {
            textRate = 'Khá'
            colorRate = 'blue'
        } else if (avgRate >= 25 && avgRate < 50) {
            textRate = 'Trung bình'
            colorRate = 'orange'
        } else {
            textRate = 'Yếu'
            colorRate = 'red'
        }
        return (
            <Modal
                visible={isOpen}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalView}>
                    <View style={[styles.modalContainer, { height: Dimensions.get('window').height - (MainStyle.heightHeader + 10) }]}>
                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end' }}
                            onPress={() => {
                                setIsOpen(false)
                                setCurrentUser({})
                                setListJobCurrent([])
                            }}>
                            <AntDesign name="close" size={30} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                style={{ alignSelf: 'flex-start', width: 150, borderBottomWidth: 0.5, padding: 5, backgroundColor: '#eee', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                                onPress={() => {
                                    changeHeight()
                                }}
                            >
                                <Text>{currentUser.name ? currentUser.username : 'Chọn'}</Text>
                            </TouchableOpacity>
                            {isShow ?
                                <Animated.View style={{
                                    position: 'absolute',
                                    zIndex: 99,
                                    backgroundColor: '#fff',
                                    marginTop: 27,
                                    borderWidth: 0.25,
                                    maxHeight: heightList,
                                    shadowColor: '#000',
                                    shadowOpacity: 0.5,
                                    shadowRadius: 15,
                                    shadowOffset: { width: 0, height: 17 },
                                    elevation: 10,
                                    borderRadius: 10,
                                    borderTopLeftRadius: 0
                                }}>
                                    <FlatList
                                        data={listMembers}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={async () => {
                                                        await setCurrentUser({
                                                            name: item.name,
                                                            username: item.username
                                                        })
                                                        await setListJobCurrent(
                                                            newDataJob.filter((itemData: any) => {
                                                                if (itemData.members) {
                                                                    return itemData.members == item.name
                                                                }
                                                                return itemData.creater == item.name
                                                            })
                                                        )
                                                        Animated.timing(heightList, {
                                                            toValue: 0,
                                                            duration: 500,
                                                            useNativeDriver: false,
                                                        }).start();
                                                        setTimeout(() => {
                                                            setIsShow(false)
                                                        }, 500);
                                                    }}
                                                    style={{
                                                        padding: 10,
                                                        borderBottomWidth: index + 1 == listMembers.length ? 0 : 1,
                                                        width: 150,
                                                    }}
                                                >
                                                    <Text>{item.username}</Text>
                                                </TouchableOpacity>
                                            )
                                        }}
                                    />
                                </Animated.View>
                                :
                                null
                            }
                            {
                                currentUser.name
                                    ?
                                    <>
                                        <View style={{ alignItems: 'center', padding: 20 }}>
                                            <Text>Đánh giá năng lực trong dự án: <Text style={{ fontSize: 18, color: colorRate, fontWeight: 'bold' }}>{avgRate}%</Text></Text>
                                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: colorRate }}>{textRate}</Text>
                                        </View>
                                        <View style={[styles.rowView, { borderWidth: 0.5, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: MainStyle.mainColor, borderColor: MainStyle.mainColor }]}>
                                            <View style={[styles.txtName, { flex: 0.05, borderWidth: 0, borderRightWidth: 0.5, borderColor: MainStyle.mainColor }]} />
                                            <View style={[styles.txtName, { flex: 0.5, borderWidth: 0, borderLeftWidth: 0.5 }]}>
                                                <Text style={[{ fontSize: 15, color: '#fff' }]}>Tên công việc</Text>
                                            </View>
                                            <View style={[styles.txtName, { flex: 0.2, borderWidth: 0, borderLeftWidth: 1 }]}>
                                                <Text style={[{ fontSize: 15, color: '#fff' }]}>Người làm</Text>
                                            </View>
                                            <View style={[styles.txtName, { flex: 0.25, borderWidth: 0, borderLeftWidth: 0.5 }]}>
                                                <Text style={[{ fontSize: 15, color: '#fff' }]}>Trạng thái</Text>
                                            </View>
                                        </View>
                                        <FlatList
                                            data={
                                                newDataJob.filter((item: any) => {
                                                    if (item.members) {
                                                        return item.members == currentUser.name
                                                    }
                                                    return item.creater == currentUser.name
                                                })
                                            }
                                            style={[styles.container, {}]}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <View style={[styles.rowView, { borderWidth: 0.5 }]}>
                                                        <Text style={[styles.txtName, { flex: 0.05, textAlign: 'center' }]}>{index + 1}</Text>
                                                        <Text style={[styles.txtName, { flex: 0.5 }]}>{item.nameDetailJob}</Text>
                                                        <Text style={[styles.txtName, { flex: 0.2 }]}>{item.userName}</Text>
                                                        {/* <Text style={[styles.txtName, { flex: 0.2 }]}>{item.status}</Text> */}
                                                        <View style={{ flex: 0.25, padding: 5, paddingVertical: 10, backgroundColor: item?.color ?? '#fff' }}>
                                                            <Text style={{ fontSize: 15 }}>{item.trang_thai}</Text>
                                                            {item?.status == 'success' ?
                                                                <View style={[styles.rowView, { justifyContent: 'flex-start', marginTop: 10 }]}>
                                                                    {dataRateStar.map((itemRate) => {
                                                                        return (
                                                                            <View
                                                                                key={itemRate.id}>
                                                                                {itemRate.id <= item?.rateLevel
                                                                                    ?
                                                                                    <AntDesign name="star" size={12} color={'#C68401'} />
                                                                                    :
                                                                                    <AntDesign name="staro" size={12} color={'#C68401'} />
                                                                                }
                                                                            </View>
                                                                        )
                                                                    })}
                                                                </View>
                                                                : null
                                                            }
                                                        </View>
                                                    </View>
                                                )
                                            }}
                                        />
                                    </>
                                    :
                                    null
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <MainLayout
            iconEvent={() => navigation.navigation.pop()}
            icon="md-caret-back"
            title="Bảng thống kê dự án">
            <View style={[styles.container, { padding: 10 }]}>
                {
                    infoJob.isDone ?
                        (new Date(infoJob?.dateRealDone).getTime() > new Date(infoJob?.dateEnd).getTime()
                            ?
                            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                <Text style={{ fontSize: 18, color: MainStyle.mainColor }}>Dự án hoàn thành không đúng hạn</Text>
                                <Text style={{ fontSize: 16 }}>Trễ: <Text style={{ fontSize: 18, color: MainStyle.mainColor, fontWeight: 'bold' }}>{parseInt((Math.round(Math.abs(new Date(infoJob?.dateRealDone).getTime() - new Date(infoJob?.dateEnd).getTime())) / (24 * 60 * 60 * 1000)).toString())}</Text> ngày</Text>
                            </View>
                            :
                            null
                        )
                        :
                        (new Date().getTime() > new Date(infoJob?.dateEnd).getTime()
                            ?
                            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                <Text style={{ fontSize: 18, color: MainStyle.mainColor }}>Dự án đã quá hạn</Text>
                                <Text style={{ fontSize: 16 }}>Trễ: <Text style={{ fontSize: 18, color: MainStyle.mainColor, fontWeight: 'bold' }}>{parseInt((Math.round(Math.abs(new Date().getTime() - new Date(infoJob?.dateEnd).getTime())) / (24 * 60 * 60 * 1000)).toString())}</Text> ngày</Text>
                            </View>
                            :
                            null
                        )
                }
                <View style={[styles.rowView, { borderWidth: 0.5, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: MainStyle.mainColor, borderColor: MainStyle.mainColor }]}>
                    <View style={[styles.txtName, { flex: 0.05, borderWidth: 0, borderRightWidth: 0.5, borderColor: MainStyle.mainColor }]} />
                    <View style={[styles.txtName, { flex: 0.5, borderWidth: 0, borderLeftWidth: 0.5 }]}>
                        <Text style={[{ fontSize: 15, color: '#fff' }]}>Tên công việc</Text>
                    </View>
                    <View style={[styles.txtName, { flex: 0.2, borderWidth: 0, borderLeftWidth: 1 }]}>
                        <Text style={[{ fontSize: 15, color: '#fff' }]}>Người làm</Text>
                    </View>
                    <View style={[styles.txtName, { flex: 0.25, borderWidth: 0, borderLeftWidth: 0.5 }]}>
                        <Text style={[{ fontSize: 15, color: '#fff' }]}>Trạng thái</Text>
                    </View>
                </View>
                {newDataJob.length > 0 ?
                    <FlatList
                        data={
                            newDataJob
                        }
                        style={styles.container}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={[styles.rowView, { borderWidth: 0.5 }]}>
                                    <Text style={[styles.txtName, { flex: 0.05, textAlign: 'center' }]}>{index + 1}</Text>
                                    <Text style={[styles.txtName, { flex: 0.5 }]}>{item.nameDetailJob}</Text>
                                    <Text style={[styles.txtName, { flex: 0.2 }]}>{item.userName}</Text>
                                    {/* <Text style={[styles.txtName, { flex: 0.2 }]}>{item.status}</Text> */}
                                    <View style={{ flex: 0.25, padding: 5, paddingVertical: 10, backgroundColor: item?.color ?? '#fff' }}>
                                        <Text style={{ fontSize: 15 }}>{item.trang_thai}</Text>
                                        {item?.status == 'success' ?
                                            <View style={[styles.rowView, { justifyContent: 'flex-start', marginTop: 10 }]}>
                                                {dataRateStar.map((itemRate) => {
                                                    return (
                                                        <View
                                                            key={itemRate.id}>
                                                            {itemRate.id <= item?.rateLevel
                                                                ?
                                                                <AntDesign name="star" size={12} color={'#C68401'} />
                                                                :
                                                                <AntDesign name="staro" size={12} color={'#C68401'} />
                                                            }

                                                        </View>
                                                    )
                                                })}
                                            </View>
                                            : null
                                        }
                                    </View>
                                </View>
                            )
                        }}
                    />
                    :
                    <View style={{ padding: 15, borderWidth: 0.5, alignItems: 'center' }}>
                        <Text>Chưa có công việc nào</Text>
                    </View>
                }
            </View>
            <View style={[styles.rowView, { justifyContent: 'center' }]}>
                {acceptDone ?
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert('Thông báo', 'Bạn có muốn hoàn tất dự án này không?', [
                                {
                                    text: 'Đồng ý',
                                    onPress: handleDoneProject
                                },
                                {
                                    text: 'Huỷ',
                                }
                            ])
                        }}
                        style={styles.btnDone}>
                        <Text style={{ color: '#000' }}>Hoàn tất dự án</Text>
                    </TouchableOpacity>
                    :
                    null
                }
                {acceptView ?
                    <TouchableOpacity
                        onPress={() => {
                            setIsOpen(true)
                        }}
                        style={[styles.btnDone, { backgroundColor: 'lightgreen' }]}>
                        <Text style={{ color: '#000' }}>Xem đánh giá</Text>
                    </TouchableOpacity>
                    : null
                }
            </View>
            {ModalSum()}
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txtName: {
        fontSize: 15,
        borderWidth: 0.5,
        padding: 5,
        paddingVertical: 10
    },
    btnDone: {
        margin: 5,
        marginBottom: 30,
        backgroundColor: MainStyle.secondColor,
        padding: 10,
        alignSelf: 'center',
        borderRadius: 10
    },
    modalView: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: MainStyle.heightHeader + 10
    },
    modalContainer: {
        // flex: 1,
        paddingBottom: 30,
        // height: Dimensions.get('window').height - (MainStyle.heightHeader + 10),
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 10,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 10
    },
})