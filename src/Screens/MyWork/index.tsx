import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Dimensions, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View, FlatList, Animated } from "react-native";
import MainLayout from "../../Component/MainLayout/MainLayout";
import styles from "./styles";
import Carousel from 'react-native-snap-carousel'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import { useMyWork } from "./service";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MainStyle from "../../MainStyle";
import Loading from "../../Component/Loading/Loading";
import Button from "../../Component/Button/Button";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Input from "../../Component/Input/Input";
import Tooltip from "react-native-walkthrough-tooltip";
import Icon from 'react-native-vector-icons/FontAwesome5'
import DatePicker from "react-native-date-picker";

export default function MyWork(nav: NativeStackScreenProps<any>) {
    const {
        selectorMyJobs,
        listDetailJobs,
        loading,
        nameJob,
        setNameJob,
        nameCreater,
        setNameCreater,
        listUserOfCompany,
        isOpen,
        setIsOpen,
        loadingAdd,
        handleAddJob,
        setListUserOfCompany,
        listMembers,
        setListMembers,
        getMemberOfCompany,
        dateFrom,
        dateTo,
        isFrom,
        setIsShowDate,
        isShowDate,
        setDateTo,
        setDateFrom,
        setIsFrom,
        clearData
    } = useMyWork(nav)
    const selectorUser = useSelector((state: any) => state.user.currentUser)
    const heightAnimate = useRef<any>(new Animated.Value(0)).current
    const [showList, setShowList] = useState<boolean>(false)

    useEffect(() => {
        const reload = nav.navigation.addListener('focus', () => {
            setDefault()
        })
        return reload
    }, [])

    const setDefault = () => {
        Animated.timing(heightAnimate, {
            toValue: 0,
            useNativeDriver: false,
            duration: 500
        }).start()
        setTimeout(() => {
            setShowList(false)
        }, 500);
    }

    const toggleHeight = () => {
        const newValue = heightAnimate._value === 0 ? 300 : 0;
        if (newValue == 0) {
            Animated.timing(heightAnimate, {
                toValue: newValue,
                duration: 500, // Thời gian animate, có thể điều chỉnh
                useNativeDriver: false, // Sử dụng native driver cho performance tốt hơn
            }).start();
            setTimeout(() => {
                setShowList(false)
            }, 500);
        } else {
            setShowList(true)
            Animated.timing(heightAnimate, {
                toValue: newValue,
                duration: 500, // Thời gian animate, có thể điều chỉnh
                useNativeDriver: false, // Sử dụng native driver cho performance tốt hơn
            }).start();
        }
    };

    const renderDateInput = () => {
        return (
            <DatePicker
                mode="date"
                modal
                textColor={"black"}
                open={isShowDate}
                date={new Date()}
                minimumDate={new Date()}
                onConfirm={(date: any) => {
                    setIsShowDate(false);
                    setDateTo(date);
                }}
                onCancel={() => {
                    setIsShowDate(false);
                }}
                androidVariant="iosClone"
                theme="light"
            />
        )
    }

    const ModalAddJobs = () => {
        return (
            <Modal
                visible={isOpen}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalView}>
                    <View style={[styles.modalContainer, { height: Dimensions.get('window').height - (MainStyle.heightHeader + 10) }]}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                style={{ alignSelf: 'flex-end' }}
                                onPress={() => {
                                    setDefault()
                                    setTimeout(() => {
                                        setIsOpen(false)
                                        setListMembers([])
                                        setNameJob('')
                                        getMemberOfCompany()
                                        clearData()
                                    }, 500);
                                }}>
                                <AntDesign name="close" size={30} />
                            </TouchableOpacity>
                            <Input
                                label="Tên công việc *"
                                placeholder="Nhập nội dung"
                                valueText={nameJob}
                                onChangeText={(text) => setNameJob(text)}
                            />
                            <Input
                                label="Ngày hoàn thành *"
                                isChildren={true}
                                onChangeText={() => { }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsShowDate(true)
                                    }}>
                                    <View style={[styles.rowView, { justifyContent: 'space-between' }]}>
                                        <Text>{dateTo ? moment(dateTo.toString()).format('DD-MM-YYYY') : null}</Text>
                                        <Icon name="calendar-alt" size={25} />
                                    </View>
                                </TouchableOpacity>
                            </Input>
                            <Input
                                label="Thành viên trong dự án"
                                isChildren={true}
                                onChangeText={() => { }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        toggleHeight()
                                    }}>
                                    <View style={styles.rowView}>
                                        <View style={styles.rowView}>
                                            {listMembers.length > 0 ?
                                                listMembers.map((item: any) => {
                                                    return (
                                                        <View
                                                            style={{ borderWidth: 1, marginRight: 5, padding: 2, paddingHorizontal: 5, borderRadius: 10 }}
                                                            key={Math.random()}>
                                                            <Text>{item.username}</Text>
                                                        </View>
                                                    )
                                                })
                                                :
                                                <Text
                                                    style={{ color: nameCreater ? '#000' : MainStyle.placeColorText }}
                                                >{'Chọn thành viên trong dự án'}</Text>
                                            }
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            </Input>
                            <Animated.View style={{ maxHeight: heightAnimate, marginTop: -10 }}>
                                <FlatList
                                    data={listUserOfCompany}
                                    style={
                                        !showList ?
                                            {}
                                            :
                                            {
                                                marginTop: -15,
                                                borderRadius: 10,
                                                borderColor: MainStyle.mainColor,
                                                borderWidth: 1,
                                                paddingTop: 10
                                            }
                                    }
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    let _list: Array<any> = []
                                                    let _listMember: Array<any> = []
                                                    listUserOfCompany?.map((itemUser: any) => {
                                                        if (item.name == itemUser.name) {
                                                            _list.push({
                                                                ...item,
                                                                select: !item.select
                                                            })
                                                        } else {
                                                            _list.push(itemUser)
                                                        }
                                                    })
                                                    _list.map((item: any) => {
                                                        if (item.select) {
                                                            _listMember.push({
                                                                name: item.name,
                                                                username: item.username
                                                            })
                                                        }
                                                    })
                                                    setListUserOfCompany(_list)
                                                    setListMembers(_listMember)
                                                    setDefault()
                                                }}
                                                style={[styles.itemUser, { borderBottomWidth: index + 1 == listUserOfCompany.length ? 0 : 0.75 }]}>
                                                <View>
                                                    <Text style={{ fontWeight: 'bold' }}>{item.username}</Text>
                                                    <Text>{item.name}</Text>
                                                </View>
                                                {item?.select ? <AntDesign name="check" size={25} /> : null}
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            </Animated.View>
                        </View>
                        <Button
                            title="Thêm"
                            disabled={loadingAdd ? true : false}
                            loading={loadingAdd}
                            onPress={async () => {
                                await handleAddJob()
                                setListMembers([])
                                setNameJob('')
                                setTimeout(() => {
                                    setShowList(false)
                                }, 500);
                            }}
                            styleButton={{ borderRadius: 10, alignSelf: 'center' }}
                        />
                    </View>
                </View>
                {renderDateInput()}
            </Modal >
        )
    }

    const renderItem = (item: any) => {
        return (
            <View style={styles.jobsView}>
                <View style={[styles.labelView, styles.rowView, { justifyContent: 'space-between' }]}>
                    <Text style={[styles.textlabel, { width: '90%' }]}>{item.name}</Text>
                    {item?.isDone ?
                        <MaterialIcons name="stars" size={25} color={MainStyle.mainColor} />
                        :
                        <TouchableOpacity
                            onPress={() => {
                                nav.navigation.navigate('JobsScreen', {
                                    infoUser: selectorUser,
                                    inforJob: item
                                })
                            }}
                            style={{ paddingHorizontal: 10 }}>
                            <MaterialIcons name="double-arrow" size={25} color={MainStyle.mainColor} />
                        </TouchableOpacity>
                    }
                </View>
                <ScrollView style={{ flex: 1 }}>
                    {loading ?
                        <View style={{ flex: 1 }}>
                            <ActivityIndicator size={'large'} color={'#000'} />
                        </View>
                        :
                        <View style={{ paddingBottom: 150, flex: 1 }}>
                            {/* {
                                listDetailJobs.map((e: any) => {
                                    if (e.idJob == item.idJobs && e.status != 'success' && e.status != 'success' && (e.members ? (e.members == selectorUser.name) : (e.creater == selectorUser.name))) {
                                        return (
                                            <TouchableOpacity
                                                key={Math.random()}
                                                onPress={() => {
                                                    nav.navigation.navigate('DetailJobScreen', { inforUser: selectorUser, inforDetailJob: e, inforJob: item })
                                                }}
                                                style={styles.taskStyle}>
                                                <View style={{ width: '70%' }}>
                                                    <Text style={styles.nameDetail}>{e.nameDetailJob}</Text>
                                                    <View style={styles.rowView}>
                                                        <MaterialIcons name="date-range" size={20} />
                                                        <Text style={styles.textDate}>{moment(e.startTime).format('DD/MM/yyyy')} - {moment(e.endTime).format('DD/MM/yyyy')}</Text>
                                                    </View>
                                                </View>
                                                {e.status != 'done' ?
                                                    new Date().setHours(0, 0, 0, 0) > new Date(e.endTime).setHours(0, 0, 0, 0) ?
                                                        // <View style={[styles.statusView]}>
                                                        //     <Text style={styles.textStatus}>Quá hạn</Text>
                                                        // </View>
                                                        <Ionicons name="warning" size={30} color={'orange'} />
                                                        :
                                                        <></>
                                                    :
                                                    // <View style={[styles.statusView]}>
                                                    //     <Text style={styles.textStatus}>Xong</Text>
                                                    // </View>
                                                    <Ionicons name="checkbox" size={30} color={'#43BC0A'} />
                                                }
                                            </TouchableOpacity>
                                        );
                                    }
                                })
                            } */}

                            {
                                listDetailJobs.filter((e: any) => { return e.idJob == item.idJobs && e.status != 'success' && e.status != 'success' && (e.members ? (e.members == selectorUser.name) : (e.creater == selectorUser.name)) }).length > 0
                                    ?
                                    listDetailJobs.filter((e: any) => { return e.idJob == item.idJobs && e.status != 'success' && e.status != 'success' && (e.members ? (e.members == selectorUser.name) : (e.creater == selectorUser.name)) }).map((e: any) => {
                                        return (
                                            <TouchableOpacity
                                                key={Math.random()}
                                                onPress={() => {
                                                    nav.navigation.navigate('DetailJobScreen', { inforUser: selectorUser, inforDetailJob: e, inforJob: item })
                                                }}
                                                style={styles.taskStyle}>
                                                <View style={{ width: '70%' }}>
                                                    <Text style={styles.nameDetail}>{e.nameDetailJob}</Text>
                                                    <View style={styles.rowView}>
                                                        <MaterialIcons name="date-range" size={20} />
                                                        <Text style={styles.textDate}>{moment(e.startTime).format('DD/MM/yyyy')} - {moment(e.endTime).format('DD/MM/yyyy')}</Text>
                                                    </View>
                                                </View>
                                                {e.status != 'done' ?
                                                    new Date().setHours(0, 0, 0, 0) > new Date(e.endTime).setHours(0, 0, 0, 0) ?
                                                        // <View style={[styles.statusView]}>
                                                        //     <Text style={styles.textStatus}>Quá hạn</Text>
                                                        // </View>
                                                        <Ionicons name="warning" size={30} color={'orange'} />
                                                        :
                                                        <></>
                                                    :
                                                    // <View style={[styles.statusView]}>
                                                    //     <Text style={styles.textStatus}>Xong</Text>
                                                    // </View>
                                                    <Ionicons name="checkbox" size={30} color={'#43BC0A'} />
                                                }
                                            </TouchableOpacity>
                                        )
                                    })
                                    :
                                    <View style={{ flex: 1, height: Dimensions.get('screen').height * 0.4, justifyContent: 'center', alignItems: 'center' }}>
                                        {
                                            item?.isDone ?
                                                <View style={{ alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 20 }}>Dự án đã hoàn tất</Text>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            nav.navigation.navigate('MemberOfJob', { infoJob: item })
                                                        }}
                                                        style={{ backgroundColor: MainStyle.secondColor, margin: 15, padding: 20, borderRadius: 10 }}
                                                    >
                                                        <Text>Xem dự án</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <Text style={{ fontSize: 16, color: 'red' }}>Bạn chưa có công việc nào.{'\n\n'}Hãy bắt đầu công việc nhé!</Text>
                                        }
                                    </View>
                            }
                        </View>
                    }
                </ScrollView>
            </View>
        )
    }

    return (
        <MainLayout
            title="Việc của tôi"
            iconRightEvent={() => {
                setIsOpen(true)
            }}
            iconRight="add-circle">
            <View style={styles.container}>
                {selectorMyJobs.length > 0
                    ?
                    <Carousel
                        data={selectorMyJobs}
                        layout='tinder'
                        layoutCardOffset={20}
                        sliderWidth={Dimensions.get('window').width}
                        itemWidth={Dimensions.get('window').width * 0.9}
                        renderItem={({ item }: any) => renderItem(item)}
                    />
                    :
                    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={styles.textlabel}>Chưa có dự án nào</Text>
                        <Text style={{ marginTop: 20 }}>Chúc bạn một ngày làm việc tốt lành {`:)`}</Text>
                    </View>
                }
            </View>
            {ModalAddJobs()}
        </MainLayout>
    )
}