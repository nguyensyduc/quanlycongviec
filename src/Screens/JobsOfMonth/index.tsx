import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import MainLayout from "../../Component/MainLayout/MainLayout";
import Icon from 'react-native-vector-icons/EvilIcons'
import { useSelector } from "react-redux";
// import styles from "./styles";
import { useEffect, useRef, useState } from "react";
import styles from "./styles";
import { UseJobsOfMonth } from "./service";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MainStyle from "../../MainStyle";
import DatePicker from "react-native-date-picker";

export default function JobsOfMonth(nav: NativeStackScreenProps<any>) {
    // const inforUser = nav.route.params?.infoUser
    // const selectorUser = useSelector((state: any) => state.jobs.listUser)
    // const selectorMe = useSelector((state: any) => state.user.currentUser)
    // const [dataUser, setDataUser] = useState<any[]>([])
    const [month, setMonth] = useState<any>()
    const [year, setYear] = useState<any>()
    const [date, setDate] = useState<Date>(new Date())
    const [dateEnd, setDateEnd] = useState<Date>(new Date())
    const [showDate, setShowDate] = useState<boolean>(false)
    const [isEndDate, setIsEndDate] = useState<boolean>(false)
    const dataRateStar = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]

    const {
        inforUser,
        listSuccess,
        listFail,
        currentDate,
        currentDateEnd,
        setCurrentDateEnd,
        filter,
        gotoDetail
    } = UseJobsOfMonth(nav)


    return (
        <MainLayout
            title={inforUser.username}
            icon="md-caret-back"
            iconEvent={() => {
                nav.navigation.pop()
            }}>
            <View style={[styles.container, { padding: 10 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => {
                            setIsEndDate(false)
                            setShowDate(true)
                        }}
                        style={styles.btnFilter}>
                        <Text style={{ fontSize: 16, fontStyle: 'italic' }}>Tổng kết tháng: {currentDate}  <AntDesign name="caretdown" size={14} color={'#000'} /></Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                setIsEndDate(true)
                                setShowDate(true)
                            }}
                            style={[styles.btnFilter, { marginRight: 10 }]}>
                            <Text style={{ fontSize: 16, fontStyle: 'italic', minWidth: 50, textAlign: 'right' }}>{currentDateEnd}  <AntDesign name="caretdown" size={14} color={'#000'} /></Text>
                        </TouchableOpacity>
                        {
                            currentDateEnd ?
                                <TouchableOpacity
                                    onPress={() => {
                                        setCurrentDateEnd('')
                                        filter(currentDate.split('-')[0], currentDate.split('-')[1])
                                        setDateEnd(new Date())
                                    }}
                                    style={styles.btnFilter}>
                                    <AntDesign name="closesquare" size={20} color={MainStyle.mainColor} />
                                </TouchableOpacity>
                                :
                                null
                        }
                    </View>
                </View>
                <View style={[styles.container, styles.rowView, { alignItems: 'flex-start' }]}>
                    <FlatList
                        data={listSuccess}
                        style={[styles.listView, { maxWidth: Dimensions.get('screen').width * 0.45 }]}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        // nav.navigation.navigate('DetailJobScreen', { inforUser: inforUser, inforDetailJob: item })
                                        gotoDetail(inforUser, item)
                                    }}
                                    style={[styles.itemJob, { backgroundColor: '#C1EBC1' }]}>
                                    <Text numberOfLines={1} style={styles.textNameJob}>{item.nameDetailJob}</Text>
                                    <View style={styles.rowView}>
                                        <Text style={{ marginRight: 5 }}>Hiệu quả:</Text>
                                        {dataRateStar.map((itemRate) => {
                                            return (
                                                <View
                                                    key={itemRate.id}>
                                                    {itemRate.id <= item?.rateLevel
                                                        ?
                                                        <AntDesign name="star" size={18} color={'#F2A201'} />
                                                        :
                                                        <AntDesign name="staro" size={18} color={'#F2A201'} />
                                                    }

                                                </View>
                                            )
                                        })}
                                    </View>
                                    <Text style={{ marginRight: 5 }}>Trạng thái: Đã hoàn tất</Text>
                                    <View style={{ height: 50 }}>
                                        <Text style={{ marginRight: 5, textDecorationLine: 'underline' }}>Dự án: {item.nameProject} </Text>
                                    </View>

                                </TouchableOpacity>
                            )
                        }}
                    />
                    <FlatList
                        data={listFail}
                        style={[styles.listView]}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    // onPress={() => {
                                    //     nav.navigation.navigate('DetailJobScreen', { inforUser: inforUser, inforDetailJob: item })
                                    // }}
                                    onPress={() => gotoDetail(inforUser, item)}
                                    style={[styles.itemJob, { backgroundColor: MainStyle.secondColor }]}>
                                    <Text numberOfLines={1} style={styles.textNameJob}>{item.nameDetailJob}</Text>
                                    <View style={styles.rowView}>
                                        <Text style={{ marginRight: 5 }}>Hiệu quả:</Text>
                                        {dataRateStar.map((itemRate) => {
                                            return (
                                                <View
                                                    key={itemRate.id}>
                                                    {itemRate.id <= item?.rateLevel
                                                        ?
                                                        <AntDesign name="star" size={18} color={'#C68401'} />
                                                        :
                                                        <AntDesign name="staro" size={18} color={'#C68401'} />
                                                    }

                                                </View>
                                            )
                                        })}
                                    </View>
                                    <Text style={{ marginRight: 5 }}>Trạng thái: Chưa đạt</Text>
                                    <View style={{ height: 50 }}>
                                        <Text style={{ marginRight: 5, textDecorationLine: 'underline' }}>Dự án: {item.nameProject} </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
            {/* {modalDate()} */}
            <DatePicker
                mode="date"
                modal
                textColor={"black"}
                open={showDate}
                date={isEndDate ? dateEnd : date}
                minimumDate={isEndDate ? date : undefined}
                onConfirm={(date: any) => {
                    setShowDate(false);
                    let _date = new Date(date)
                    console.log('dateeeeee ', _date.getMonth() + 1, _date.getFullYear());
                    if (isEndDate) {
                        filter(currentDate.split('-')[0], currentDate.split('-')[1], _date.getMonth() + 1, _date.getFullYear())
                        setDateEnd(date)
                    } else {
                        setMonth(_date.getMonth() + 1)
                        setYear(_date.getFullYear())
                        filter(_date.getMonth() + 1, _date.getFullYear(), currentDateEnd.split('-')[0] ?? null, currentDateEnd.split('-')[1] ?? null)
                        setDate(date)
                    }
                }}
                onCancel={() => {
                    setShowDate(false);
                    setIsEndDate(false)
                }}
                androidVariant="iosClone"
                theme="light"
            />
        </MainLayout>
    )
}

