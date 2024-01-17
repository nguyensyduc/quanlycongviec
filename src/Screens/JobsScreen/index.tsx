import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Dimensions, FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MainLayout from "../../Component/MainLayout/MainLayout";
import Icon from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from "react-redux";
import styles from "./styles";
import { useJobsScreen } from "./service";
import { useEffect, useState } from "react";
import Swiper from "react-native-swiper";
import moment from "moment";
import MainStyle from "../../MainStyle";
import Loading from "../../Component/Loading/Loading";
import Input from "../../Component/Input/Input";
import DatePicker from "react-native-date-picker";
import Button from "../../Component/Button/Button";
import { showMessage } from "react-native-flash-message";
import address from "../../Address/ipa_address";
import OpenPicker from 'react-native-image-crop-picker';
import { Buffer } from "buffer";

export default function JobsScreen(nav: NativeStackScreenProps<any>) {
    const selectorUser = useSelector((state: any) => state.jobs.listUser)
    const selectorMe = useSelector((state: any) => state.user.currentUser)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isShowDate, setIsshowDate] = useState<boolean>(false)
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [isFrom, setIsFrom] = useState<boolean>(true)
    const [statusJob, setStatusJob] = useState<string>('')
    const [nameJob, setNameJob] = useState<string>('')
    const [desJob, setDesJob] = useState<string>('')
    const [textError, setTextError] = useState<string>('')
    const [listImage, setListImage] = useState<string[]>([])
    const [loadingAdd, setLoadingAdd] = useState<boolean>(false)
    const {
        inforUser,
        inforJob,
        listDoing,
        listDone,
        listPlan,
        listSuccess,
        listFail,
        loading,
        getDataJob
    } = useJobsScreen(nav)
    const [sliceCurrent, setSliceCurrent] = useState(0);

    const clearData = () => {
        setDateFrom('')
        setDateTo('')
        setIsFrom(true)
        setStatusJob('')
        setTextError('')
        setListImage([])
        setNameJob('')
        setDesJob('')
    }

    const handleOpenPhoto = () => {
        let _listImage = [...listImage]
        try {
            OpenPicker.openPicker({
                cropping: false,
                includeBase64: true,
                compressImageQuality: 0.7,
                mediaType: 'photo',
            }).then(async (image) => {
                let _image = 'data:image/png;base64,' + image.data
                const byteCount = Buffer.from(image.data ?? '').length;
                console.log('imageeeeeee ', image, byteCount);
                if (byteCount > 50000) {
                    // showMessage({
                    //     message: 'Kích thước của ảnh quá lớn. Vui lòng thử lại',
                    //     type: 'warning',
                    //     duration: 3000,
                    //     position: 'bottom'
                    // })
                    setTextError('Kích thước của ảnh quá lớn. Vui lòng thử lại')
                } else {
                    _listImage.push(_image)
                    setTextError('')
                }
                setListImage(_listImage)
            }).catch((error) => {
                console.log('loi open photoo ', error);
            });
        } catch (error) {
            console.log('loi open photoo ', error);

        }
    }

    const submitAddJob = async () => {
        if (!dateFrom || !nameJob) {
            // showMessage({
            //     message: 'Không được bỏ trống thông tin!',
            //     type: 'warning',
            //     position: 'bottom',
            //     duration: 3000,
            //     floating: true,
            // })
            setTextError('Không được bỏ trống thông tin!')
            return;
        }
        setLoadingAdd(true)
        const body = {
            "nameDetailJob": nameJob.trim(),
            "idJob": inforJob.idJobs,
            "status": statusJob,
            "startTime": dateFrom,
            "endTime": dateTo ?? '',
            "members": selectorMe.name == inforUser.name ? '' : inforUser.name,
            "creater": selectorMe.name,
            "confirmByAdmin": 0,
            "rateText": '',
            "description": desJob.trim(),
            "listImage": listImage,
            "rateLevel": 0,
        }
        console.log('bodyyyyy ', body);
        try {
            const request = await fetch(`${address}detailjobs/add`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const res = await request.json();
            if (res.success) {
                setIsOpen(false)
                setLoadingAdd(false)
                getDataJob()
                showMessage({
                    message: 'Thêm thành công một thẻ công việc',
                    type: 'success'
                })
                clearData()

            }
        } catch (error) {
            setLoadingAdd(false)
            setTextError('Đã có lỗi xảy ra!')
        }

    }

    const renderListJobs = (data: any, isDone?: boolean, status?: any) => {
        return (
            <>
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    nav.navigation.navigate('DetailJobScreen', { inforUser: inforUser, inforDetailJob: item, inforJob: inforJob })
                                }}
                                style={[styles.taskStyle]}>
                                <View style={styles.rowView}>
                                    <Text style={styles.nameJobs}>{item.nameDetailJob}</Text>
                                    {/* {inforUser.name == inforJob.creater || selectorMe.name == inforUser.name ?
                                        <TouchableOpacity
                                            style={styles.btnThreeDot}>
                                            <Icon name="ellipsis-h" size={20} />
                                        </TouchableOpacity> : null} */}
                                </View>
                                <View style={[styles.timeLineStyle]}>
                                    <Icon name="calendar-alt" size={25} color={new Date().setHours(0, 0, 0, 0) > new Date(item.endTime).setHours(0, 0, 0, 0) && !isDone ? 'red' : '#000'} />
                                    <Text style={styles.textCalendar}>{moment(item.startTime).format('DD/MM/yyyy')}{item.endTime ? (' - ' + moment(item.endTime).format('DD/MM/YYYY')) : ''}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                {!isDone && !inforJob.isDone
                    ?
                    <TouchableOpacity
                        onPress={() => {
                            setIsOpen(true)
                            setStatusJob(status)
                        }}
                        style={styles.btnAddJob}
                    >
                        {inforUser.name == selectorMe.name ?
                            <Text style={{ color: '#000' }}>+ Thêm thẻ</Text>
                            :
                            <Text style={{ color: '#000' }}>+ Giao việc</Text>
                        }
                    </TouchableOpacity>
                    : null
                }
            </>
        )
    }

    const renderDateInput = () => {
        return (
            <DatePicker
                mode="date"
                modal
                textColor={"black"}
                open={isShowDate}
                date={new Date()}
                minimumDate={isFrom ? new Date() : new Date(dateFrom)}
                onConfirm={(date: any) => {
                    setIsshowDate(false);
                    console.log('dateeeeee ', date);
                    if (isFrom) {
                        setDateFrom(date);
                    } else {
                        setDateTo(date);
                    }
                }}
                onCancel={() => {
                    setIsshowDate(false);
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
                        {/* <View style={[styles.modalContainer, { height: 100 }]}> */}
                        <ScrollView style={{ flex: 1 }}>
                            <TouchableOpacity
                                style={{ alignSelf: 'flex-end' }}
                                onPress={() => {
                                    setIsOpen(false)
                                    clearData()
                                }}>
                                <AntDesign name="close" size={30} />
                            </TouchableOpacity>
                            <View>
                                <Input
                                    label="Tên công việc *"
                                    placeholder="Nhập nội dung"
                                    valueText={nameJob}
                                    onChangeText={(text) => setNameJob(text)}
                                />
                                <Input
                                    label="Ngày tiếp nhận *"
                                    isChildren={true}
                                    onChangeText={() => { }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            setIsFrom(true)
                                            setIsshowDate(true)
                                        }}>
                                        <View style={styles.rowView}>
                                            <Text>{dateFrom ? moment(dateFrom.toString()).format('DD-MM-YYYY') : ''}</Text>
                                            <Icon name="calendar-alt" size={25} />
                                        </View>
                                    </TouchableOpacity>
                                </Input>
                                <Input
                                    label="Ngày hoàn thành"
                                    isChildren={true}
                                    onChangeText={() => { }}
                                >
                                    <TouchableOpacity
                                        disabled={dateFrom ? false : true}
                                        onPress={() => {
                                            setIsFrom(false)
                                            setIsshowDate(true)
                                        }}>
                                        <View style={styles.rowView}>
                                            <Text>{dateTo ? moment(dateTo.toString()).format('DD-MM-YYYY') : null}</Text>
                                            <Icon name="calendar-alt" size={25} />
                                        </View>
                                    </TouchableOpacity>
                                </Input>
                                <Input
                                    label="Mô tả *"
                                    isMulti={true}
                                    placeholder="Nhập nội dung"
                                    valueText={desJob}
                                    onChangeText={(text) => setDesJob(text)}
                                />
                                {listImage.length > 0 ?
                                    <View style={[styles.rowView, {
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderStyle: 'dashed',
                                        padding: 10,
                                    }]}>
                                        {listImage.map((item) => {
                                            return (
                                                <Image key={Math.random()} source={{ uri: item }} style={{ width: 80, height: 80, borderRadius: 5, margin: 5 }} />
                                            )
                                        })}
                                        {listImage.length < 3 ?
                                            <TouchableOpacity
                                                onPress={handleOpenPhoto}
                                                style={{
                                                    borderRadius: 10,
                                                    borderWidth: 0.75,
                                                    padding: 20,
                                                    marginLeft: 10
                                                }}>
                                                <AntDesign name="plussquare" size={25} />
                                            </TouchableOpacity>
                                            : null
                                        }
                                    </View>
                                    :
                                    <TouchableOpacity
                                        onPress={handleOpenPhoto}
                                        style={styles.btnAddImg}>
                                        <Text style={{ fontWeight: 'bold' }}><Text style={{ fontSize: 20 }}>+ </Text>Thêm ảnh</Text>
                                    </TouchableOpacity>
                                }
                                <Text style={{ color: 'red', fontStyle: 'italic', marginTop: 10 }}>{textError}</Text>
                            </View>
                            {renderDateInput()}
                        </ScrollView>
                        <Button
                            title="Thêm"
                            disabled={loadingAdd ? true : false}
                            loading={loadingAdd}
                            onPress={() => submitAddJob()}
                            styleButton={{ borderRadius: 10, alignSelf: 'center' }}
                        />
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <MainLayout
            iconEvent={() => nav.navigation.pop()}
            icon="md-caret-back"
            title={inforUser.username}>
            <Swiper
                index={sliceCurrent}
                activeDotColor='#209DBC'
                loop={false}
                showsPagination={true}
                onIndexChanged={async (item) => {
                    await setSliceCurrent(item)
                }}>
                <View style={styles.stateJobs}>
                    <View style={[styles.headerStatus, { backgroundColor: '#F3B42B' }]}>
                        <Text style={styles.textHeaderStatus}>Những việc cần làm</Text>
                    </View>
                    {loading ?
                        <View style={{ flex: 1 }}>
                            <ActivityIndicator size={'large'} color={'#000'} />
                        </View>
                        :
                        renderListJobs(listPlan, undefined, 'plan')
                    }
                </View>
                <View style={styles.stateJobs}>
                    <View style={[styles.headerStatus, { backgroundColor: '#3689FE' }]}>
                        <Text style={styles.textHeaderStatus}>Những việc đang làm</Text>
                    </View>
                    {loading ?
                        <View style={{ flex: 1 }}>
                            <ActivityIndicator size={'large'} color={'#000'} />
                        </View>
                        :
                        renderListJobs(listDoing, undefined, 'doing')
                    }
                </View>
                <View style={styles.stateJobs}>
                    <View style={[styles.headerStatus, { backgroundColor: '#0FC71C' }]}>
                        <Text style={styles.textHeaderStatus}>Những việc đã xong</Text>
                    </View>
                    {loading ?
                        <View style={{ flex: 1 }}>
                            <ActivityIndicator size={'large'} color={'#000'} />
                        </View>
                        :
                        renderListJobs(listDone, true, 'done')
                    }
                </View>
                <View style={styles.stateJobs}>
                    <View style={[styles.headerStatus, { backgroundColor: '#AD00FE' }]}>
                        <Text style={styles.textHeaderStatus}>Những việc đã hoàn thành</Text>
                    </View>
                    {loading ?
                        <View style={{ flex: 1 }}>
                            <ActivityIndicator size={'large'} color={'#000'} />
                        </View>
                        :
                        renderListJobs(listSuccess, true, 'done')
                    }
                </View>
                <View style={styles.stateJobs}>
                    <View style={[styles.headerStatus, { backgroundColor: '#000' }]}>
                        <Text style={styles.textHeaderStatus}>Những việc chưa đạt</Text>
                    </View>
                    {loading ?
                        <View style={{ flex: 1 }}>
                            <ActivityIndicator size={'large'} color={'#000'} />
                        </View>
                        :
                        renderListJobs(listFail, true, 'done')
                    }
                </View>
            </Swiper>
            {ModalAddJobs()}
        </MainLayout>
    )
}