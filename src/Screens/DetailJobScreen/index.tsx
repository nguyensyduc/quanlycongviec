import { ActivityIndicator, Dimensions, FlatList, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View, Animated, Keyboard, Alert } from "react-native";
import MainLayout from "../../Component/MainLayout/MainLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDetailJobsScreen } from "./service";
import Icon from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from "react-redux";
import styles from "./styles";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import MainStyle from "../../MainStyle";
import ToolTip from 'react-native-walkthrough-tooltip'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import OpenPicker from 'react-native-image-crop-picker';
import { Buffer } from "buffer";
import { showMessage } from "react-native-flash-message";

export default function DetailJobScreen(nav: NativeStackScreenProps<any>) {
    const selectorListText = useSelector((state: any) => state.jobs.listText)
    const selectorUser = useSelector((state: any) => state.jobs.listUser)
    const [showStatusJob, setShowStatusJob] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [showModalRate, setShowModalRate] = useState<boolean>(false)
    const [textRate, setTextRate] = useState<string>('')
    const dataRateStar = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    const [currentRateStar, setCurrentRateStar] = useState(0)
    const [currentDoneStatus, setCurrentDoneStatus] = useState(0)
    const [showKeyBoard, setShowKeyBoard] = useState(false)
    const [heightKeyboard, setHeightKeyboard] = useState(0)
    const [currentImg, setCurrentImg] = useState<string>('')
    const [isOpenImg, setIsOpenImg] = useState<boolean>(false)
    const {
        inforUser,
        inforDetailJob,
        addComment,
        textComment,
        setTextComment,
        loadingText,
        selectorMe,
        changeStatus,
        confirmJob,
        showRateStar,
        setShowRateStar,
        handleRate,
        imagePhoto,
        setImagePhoto,
        listNewText,
        listUserOfCompany,
        infoJob,
        isOpenList,
        setIsOpenList,
        handleChange
    } = useDetailJobsScreen(nav)

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow',
            _keyboardDidShow)
        Keyboard.addListener('keyboardDidHide', () => {
            setHeightKeyboard(0)
            setShowKeyBoard(false)
        })



    }, [])

    const _keyboardDidShow = (e: any) => {
        setShowKeyBoard(true)
        setHeightKeyboard(e.endCoordinates.height ?? 310)
    }

    // const handleOpenCamera = () => {
    //     OpenPicker.openCamera({
    //         cropping: false,
    //         includeBase64: true,
    //         compressImageQuality: 0.7
    //     }).then(async (image) => {
    //         // this.handleDataImage(image);
    //         console.log('imageeeeeee ', image);
    //     });
    // }

    const handleOpenPhoto = () => {
        try {
            OpenPicker.openPicker({
                cropping: false,
                includeBase64: true,
                compressImageQuality: 0.7,
                mediaType: 'photo',
            }).then(async (image) => {
                let _image = 'data:image/png;base64,' + image.data
                const byteCount = Buffer.from(image.data ?? '').length;
                if (byteCount > 50000) {
                    showMessage({
                        message: 'Kích thước của ảnh quá lớn. Vui lòng thử lại',
                        type: 'warning',
                        duration: 3000,
                        position: 'bottom'
                    })
                } else {
                    setImagePhoto(_image ?? '')
                }
                // setImagePhoto(_image ?? '')

            }).catch((error) => {
                console.log('loi open photoo ', error);
            });
        } catch (error) {
            console.log('loi open photoo ', error);

        }

    }


    const SpacingView = () => {
        return (
            <View style={{ height: 10, backgroundColor: 'lightgray' }}>
                {/* <Animated.View style={{ height: 10, backgroundColor: 'red', width: animated }}></Animated.View> */}
            </View>
        )
    }

    const renderModalConfirm = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={isOpen}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                    <View style={[styles.modalContainer, { height: 'auto' }]}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>{title == 'done' ? 'Bạn có chắc đã hoàn thành công việc?' : 'Bạn có chắc muốn xoá công việc này không?'}</Text>
                        <View style={[styles.rowView, { justifyContent: 'center', marginTop: 20 }]}>
                            <TouchableOpacity
                                onPress={async () => {
                                    setIsOpen(false)
                                    if (title == 'done') {
                                        changeStatus('done')
                                    } else {

                                    }
                                }}
                                style={[styles.btnChange, { backgroundColor: 'green' }]}>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>ĐỒNG Ý</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setTitle('')
                                    setIsOpen(false)
                                }}
                                style={[styles.btnChange, { backgroundColor: 'red' }]}>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>HUỶ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    const renderListUser = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={isOpenList}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: "flex-end" }}>
                    <View style={styles.modalContainer}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ position: 'absolute', alignSelf: 'center', fontSize: 18 }}>Chuyển việc cho</Text>
                            <TouchableOpacity
                                style={{ alignSelf: 'flex-end' }}
                                onPress={() => {
                                    setIsOpenList(false)
                                }}>
                                <AntDesign name="close" size={25} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={listUserOfCompany}
                            style={{ marginTop: 10 }}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            Alert.alert('', `Bạn có xác nhận chuyển giao việc cho ${item.username}?`, [
                                                {
                                                    text: 'Đồng ý',
                                                    onPress: () => {
                                                        handleChange(item.name)
                                                    }
                                                },
                                                {
                                                    text: 'Huỷ'
                                                }
                                            ])
                                        }}
                                        style={{
                                            margin: 5,
                                            padding: 10,
                                            borderRadius: 10,
                                            paddingHorizontal: 15,
                                            borderWidth: 0.25
                                        }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.username?.toUpperCase()}</Text>
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </View>
            </Modal>
        )
    }

    const RateModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModalRate}>
                <View style={styles.containerModalRate}>
                    <View style={styles.contentRate}>
                        <View style={[styles.rowView, { borderWidth: 1, borderStyle: 'dashed' }]}>
                            <Ionicons name="close" size={30} color={'transparent'} />
                            <Text style={[styles.txtStatus, { fontSize: 18 }]}>Đánh giá công việc</Text>
                            <TouchableOpacity onPress={() => setShowModalRate(false)}>
                                <Ionicons name="close" size={30} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{ flex: 1 }}>
                            <View style={{ flex: 1, paddingTop: 10 }}>
                                <Text style={{ fontSize: 16, textAlign: 'center', textDecorationLine: 'underline' }}>Công việc đã được hoàn thành từ người tiếp nhận.</Text>
                                <Text style={{ fontSize: 16, textAlign: 'center', textDecorationLine: 'underline', marginVertical: 10 }}>Là một người quản lý của dự án, bạn hãy đưa ra đánh giá cho đầu mục công việc này!</Text>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 10 }}>Đánh giá:</Text>
                                <TextInput
                                    style={styles.reasonInput}
                                    value={textRate}
                                    onChangeText={(text) => {
                                        setTextRate(text)
                                    }}
                                    multiline
                                    placeholder="Nhập lời đánh giá ..."
                                    placeholderTextColor={'gray'}
                                />
                            </View>
                        </ScrollView>
                        <View style={[styles.rowView, { justifyContent: 'center' }]}>
                            <TouchableOpacity
                                onPress={() => {
                                    confirmJob(textRate, 2, 0)
                                    // setCurrentDoneStatus(2)
                                    // // setShowRateStar(true)
                                    // handleRate(textRate)
                                }}
                                style={[styles.btnChange, { backgroundColor: 'red', width: '45%' }]}>
                                <Text style={styles.textBtnRate}>Chưa đạt yêu cầu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    confirmJob(textRate, 3, 0)
                                    // setCurrentDoneStatus(3)
                                    // setShowRateStar(true)
                                }}
                                style={[styles.btnChange, { backgroundColor: '#3689FE', padding: 15, width: '45%' }]}>
                                <Text style={styles.textBtnRate}>Xử lý tiếp công việc</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                // confirmJob(textRate, 1)
                                setCurrentDoneStatus(1)
                                // setShowRateStar(true)
                                handleRate(textRate)
                            }}
                            style={[styles.btnChange, { backgroundColor: 'green', width: '93%', alignSelf: 'center' }]}>
                            <Text style={styles.textBtnRate}>Xác nhận hoàn thành</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {levelRateModal()}
            </Modal>
        )
    }

    const levelRateModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showRateStar}>
                <View style={styles.containerModalRate}>
                    <View style={[styles.contentRate, { height: 'auto', width: '90%' }]}>
                        <Text style={{ fontSize: 17, textAlign: 'center' }}>Đánh giá mức độ hoàn thành công việc</Text>
                        <View style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: 10 }}>
                            {dataRateStar.map((item) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setCurrentRateStar(item.id)
                                        }}
                                        key={item.id}>
                                        {item.id <= currentRateStar
                                            ?
                                            <AntDesign name="star" size={40} style={{ marginHorizontal: 10 }} color={'#F2A201'} />
                                            :
                                            <AntDesign name="staro" size={40} style={{ marginHorizontal: 10 }} color={'#F2A201'} />
                                        }

                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <View style={[styles.rowView, { justifyContent: 'center' }]}>
                            <TouchableOpacity
                                onPress={() => setShowRateStar(false)}
                                style={[styles.btnChange, { backgroundColor: 'red' }]}>
                                <Text style={styles.textBtnRate}>Bỏ qua</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => confirmJob(textRate, currentDoneStatus, currentRateStar)}
                                style={[styles.btnChange, { backgroundColor: 'green' }]}>
                                <Text style={styles.textBtnRate}>Hoàn thành</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <MainLayout
            iconEvent={() => nav.navigation.pop()}
            icon="md-caret-back"
            title={inforDetailJob.nameDetailJob}>
            <View style={styles.container}>
                <View style={{ flex: 1, marginBottom: 10 }}>
                    <View style={[styles.rowView, { paddingHorizontal: 10 }]}>
                        <Text style={styles.labelJobView}>{inforDetailJob.nameDetailJob?.toUpperCase()}</Text>
                        {(selectorMe.name == inforUser.name || infoJob.creater == selectorMe.name) && (inforDetailJob.status !== 'done' && inforDetailJob.status !== 'success' && inforDetailJob.status !== 'fail') ?
                            <ToolTip
                                isVisible={showStatusJob}
                                arrowStyle={{ marginLeft: 3 }}
                                contentStyle={{ flex: 1 }}
                                content={
                                    <>
                                        {inforDetailJob.status !== 'plan' ?
                                            <TouchableOpacity
                                                onPress={async () => {
                                                    await setTitle('')
                                                    await setShowStatusJob(false)
                                                    changeStatus('plan')
                                                }}
                                                style={[styles.btnChange, { backgroundColor: '#F3B42B' }]}>
                                                <Text style={styles.txtStatus}>Chuyển đến "Việc cần làm"</Text>
                                            </TouchableOpacity>
                                            : null
                                        }
                                        {inforDetailJob.status !== 'doing' ?
                                            <TouchableOpacity
                                                onPress={async () => {
                                                    await setTitle('')
                                                    await setShowStatusJob(false)
                                                    // await setIsOpen(true)
                                                    changeStatus('doing')
                                                }}
                                                style={[styles.btnChange, { backgroundColor: '#3689FE' }]}>
                                                <Text style={styles.txtStatus}>Chuyển đến "Việc đang làm"</Text>
                                            </TouchableOpacity>
                                            : null
                                        }
                                        {inforDetailJob.status !== 'done' ?
                                            <TouchableOpacity
                                                onPress={async () => {
                                                    let _per = inforDetailJob?.percent ?? 0
                                                    if (_per < 100) {
                                                        showMessage({
                                                            message: 'Có vẻ như bạn chưa hoàn thành tiến độ!',
                                                            type: 'warning',
                                                            duration: 3000,
                                                            position: 'top'
                                                        })
                                                        setShowStatusJob(false)
                                                        return
                                                    }
                                                    await setTitle('done')
                                                    await setShowStatusJob(false)
                                                    setIsOpen(true)
                                                }}
                                                style={[styles.btnChange, { backgroundColor: '#0FC71C' }]}>
                                                <Text style={styles.txtStatus}>Hoàn thành</Text>
                                            </TouchableOpacity>
                                            : null
                                        }
                                        {(inforDetailJob.status == 'plan' || inforDetailJob.status == 'doing') && (inforDetailJob.creater == selectorMe.name || inforDetailJob.members == selectorMe.name || infoJob.creater == selectorMe.name) ?
                                            <TouchableOpacity
                                                onPress={async () => {
                                                    await setShowStatusJob(false)
                                                    setIsOpenList(true)
                                                    // changeStatus('done')
                                                }}
                                                style={[styles.btnChange, { backgroundColor: 'orange' }]}>
                                                <Text style={styles.txtStatus}>Chuyển giao việc</Text>
                                            </TouchableOpacity>
                                            : null
                                        }
                                        {/* {inforDetailJob.creater == selectorMe.name ?
                                            <TouchableOpacity
                                                onPress={async () => {
                                                    await setTitle('delete')
                                                    await setShowStatusJob(false)
                                                    setIsOpen(true)
                                                    // changeStatus('done')
                                                }}
                                                style={[styles.btnChange, { backgroundColor: 'red' }]}>
                                                <Text style={styles.txtStatus}>Xoá</Text>
                                            </TouchableOpacity>
                                            : null
                                        } */}
                                    </>
                                }
                                placement="bottom"

                                onClose={() => setShowStatusJob(false)}
                            >
                                <TouchableOpacity
                                    onPress={() => setShowStatusJob(true)}
                                    style={{ paddingHorizontal: 10 }}
                                >
                                    <Icon name="ellipsis-h" size={20} />
                                </TouchableOpacity>
                            </ToolTip>
                            :
                            (infoJob.creater == selectorMe.name && inforDetailJob.status == 'done' ?
                                <TouchableOpacity
                                    onPress={() => setShowModalRate(true)}
                                    style={styles.rateJob}>
                                    <MaterialIcons name="star-rate" size={25} color={MainStyle.mainColor} />
                                </TouchableOpacity>
                                : null
                            )
                        }
                        {/* {inforDetailJob.status == 'done' ?
                            <TouchableOpacity
                                onPress={() => setShowModalRate(true)}
                                style={styles.rateJob}>
                                <MaterialIcons name="star-rate" size={25} color={MainStyle.mainColor} />
                            </TouchableOpacity>
                            : null
                        } */}
                    </View>
                    <View style={[styles.blockView, { borderBottomWidth: 1, marginBottom: 5, paddingBottom: 5 }]}>
                        <Text style={{ fontSize: 17, color: 'gray' }}>
                            {inforDetailJob.status == 'plan'
                                ? 'Việc cần làm'
                                : (inforDetailJob.status == 'doing'
                                    ? 'Việc đang làm'
                                    : (inforDetailJob.status == 'done'
                                        ? 'Việc đã làm xong'
                                        : (inforDetailJob.status == 'success' ?
                                            'Việc đã hoàn thành'
                                            :
                                            'Việc chưa đạt'
                                        )

                                    ))
                            }
                        </Text>
                        {
                            inforDetailJob.status == 'success' ?
                                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                    {dataRateStar.map((item) => {
                                        return (
                                            <View
                                                key={item.id}>
                                                {item.id <= inforDetailJob?.rateLevel
                                                    ?
                                                    <AntDesign name="star" size={20} color={'#F2A201'} />
                                                    :
                                                    <AntDesign name="staro" size={20} color={'#F2A201'} />
                                                }

                                            </View>
                                        )
                                    })}
                                </View>
                                : null
                        }
                    </View>
                    <View style={styles.blockView}>
                        <View style={styles.timeView}>
                            <Icon name="clock" size={20} />
                            <Text style={{ fontSize: 16, color: '#000', marginLeft: 5 }}>Bắt đầu: {moment(inforDetailJob.startTime).format('DD/MM/yyyy')}</Text>
                        </View>
                        {
                            inforDetailJob.endTime ?
                                <View style={styles.timeView}>
                                    <Icon name="clock" size={20} />
                                    <Text style={{ fontSize: 16, color: '#000', marginLeft: 5 }}>Hết hạn: {moment(inforDetailJob.endTime).format('DD/MM/yyyy')}</Text>
                                </View>
                                : null
                        }
                    </View>
                    <SpacingView />
                    <TouchableOpacity
                        onPress={() => nav.navigation.navigate('DetailDesScreen', { inforDetailJob: inforDetailJob, inforUser: inforUser, infoJob: infoJob })}
                        style={[styles.blockView, { padding: 10 }]}>
                        <Text style={styles.labelView}>Mô tả:</Text>
                        {/* <Text>{inforDetailJob.description ?? `(empty)`}</Text> */}
                        <Text>Ấn vào đây để xem chi tiết mô tả nhé!</Text>
                    </TouchableOpacity>
                    <SpacingView />
                    <View style={[styles.blockView, { padding: 10, marginBottom: 20 }]}>
                        <Text style={styles.labelView}>Bình luận: (Sắp xếp theo bình luận mới nhất)</Text>
                        <FlatList
                            data={listNewText}
                            inverted
                            style={{ marginVertical: 10 }}
                            renderItem={({ item, index }) => {
                                return (
                                    <View key={Math.random()}>
                                        <View>
                                            {index >= 0 && listNewText[index + 1]?.username === item.username ?
                                                null
                                                :
                                                <Text style={{ alignSelf: item.username == selectorMe.name ? 'flex-end' : 'flex-start', color: '#000' }}>{item.fullName}</Text>
                                            }
                                            {item.type == 'photo' ?
                                                <>
                                                    <TouchableOpacity
                                                        onPress={async () => {
                                                            await setCurrentImg(item.linkPhoto)
                                                            setIsOpenImg(true)
                                                        }}
                                                        style={{ alignSelf: item.username == selectorMe.name ? 'flex-end' : 'flex-start' }}
                                                    >
                                                        <Image source={{ uri: item.linkPhoto }} style={{ width: 120, height: 150, borderRadius: 10, marginVertical: 5 }} />
                                                    </TouchableOpacity>
                                                    <Modal
                                                        animationType="slide"
                                                        transparent={true}
                                                        visible={isOpenImg}>
                                                        <View style={{
                                                            flex: 1,
                                                            alignItems: 'center',
                                                            justifyContent: "center",
                                                        }}>
                                                            <View style={[styles.modalContainer, { padding: 0, paddingVertical: 0, width: '95%', height: '80%', shadowRadius: 40 }]}>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        setIsOpenImg(false)
                                                                        setCurrentImg('')
                                                                    }}
                                                                    style={{ position: 'absolute', alignSelf: 'flex-end', zIndex: 99 }}>
                                                                    <Ionicons name="close-circle" size={35} />
                                                                </TouchableOpacity>
                                                                <Image resizeMode="contain" source={{ uri: currentImg }} style={{ width: '100%', height: '100%', borderRadius: 10, marginVertical: 5 }} />
                                                            </View>
                                                        </View>
                                                    </Modal>
                                                </>
                                                :
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    style={{ backgroundColor: item.username == selectorMe.name ? MainStyle.secondColor : 'lightgray', alignSelf: item.username == selectorMe.name ? 'flex-end' : 'flex-start', padding: 10, borderRadius: 10, marginVertical: 5 }}>
                                                    <Text style={{ color: '#000' }}>{item.message}</Text>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>
                <View style={{ backgroundColor: '#fff', paddingTop: 5, marginTop: 200 }}>
                    {inforDetailJob.status == 'success' || inforDetailJob.status == 'fail'
                        ?
                        null
                        :
                        <View style={{ backgroundColor: 'transparent' }}>
                            {imagePhoto ?
                                <View style={{
                                    backgroundColor: 'lightgray',
                                    padding: 15,
                                    alignSelf: 'flex-start',
                                    marginHorizontal: 45,
                                    borderRadius: 10,
                                    marginBottom: -40,
                                    zIndex: 99
                                }}>
                                    <TouchableOpacity
                                        onPress={() => setImagePhoto('')}
                                        style={{ position: 'absolute', right: -8, top: -8 }}>
                                        <Ionicons name="close-circle" size={25} />
                                    </TouchableOpacity>
                                    <Image source={{ uri: imagePhoto }} style={{ width: 100, height: 100 }} />
                                </View>
                                :
                                null
                            }
                            <View style={[styles.textCommentView, { marginBottom: heightKeyboard, backgroundColor: '#fff' }]}>
                                <View style={styles.rowView}>
                                    {/* <TouchableOpacity
                                onPress={() => handleOpenCamera()}
                            >
                                <Ionicons name="camera" size={35} color={MainStyle.mainColor} />
                            </TouchableOpacity> */}
                                    <TouchableOpacity
                                        onPress={() => handleOpenPhoto()}
                                    >
                                        <MaterialIcons name="insert-photo" size={35} color={MainStyle.mainColor} />
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    editable={imagePhoto ? false : true}
                                    value={textComment}
                                    onChangeText={(textComment) => setTextComment(textComment)}
                                    placeholderTextColor='gray'
                                    placeholder="Bình luận ..."
                                    style={[styles.inputStyle, { backgroundColor: 'lightgray', flex: 1 }]} />

                                {textComment || imagePhoto
                                    ?
                                    (loadingText ?
                                        <View style={{ marginLeft: 10, width: 30 }}>
                                            <ActivityIndicator size='small' color='#000'></ActivityIndicator>
                                        </View>
                                        :
                                        <TouchableOpacity
                                            style={{ marginLeft: 10 }}
                                            onPress={() => addComment()}
                                        >
                                            <Ionicons name="send" size={30} color={MainStyle.mainColor} />
                                        </TouchableOpacity>
                                    )
                                    :
                                    <TouchableOpacity
                                        disabled={true}
                                        style={{ marginLeft: 10 }}
                                    >
                                        <Ionicons name="send" size={30} color={'gray'} />
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    }
                </View>
            </View >
            {renderModalConfirm()}
            {RateModal()}
            {renderListUser()}
        </MainLayout >
    )
}
