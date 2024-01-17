import { Dimensions, FlatList, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View, Animated, RefreshControl, Alert, Platform, PanResponder } from "react-native"
import MainLayout from "../../Component/MainLayout/MainLayout"
import styles from "./styles"
import useHomeScreen from "./service"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import Icon from 'react-native-vector-icons/MaterialIcons'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import ModalLogout from "../../Component/ModalLogout"
import { useEffect, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import Loading from "../../Component/Loading/Loading"
import MainStyle from "../../MainStyle"
import { Swipeable } from "react-native-gesture-handler"
import { showMessage } from "react-native-flash-message"

const HomeScreen = (nav: NativeStackScreenProps<any>) => {
    const {
        showLogout,
        setShowLogout,
        gotoLogin,
        gotoMember,
        gotoMyWork,
        data,
        countJobs,
        countDoing,
        countDone,
        loading,
        deleteJob
    } = useHomeScreen(nav)
    const selectorMyJobs = useSelector((state: any) => state.jobs.listMyJobs)
    const selectorUser = useSelector((state: any) => state.jobs.listUser)
    const selectorMe = useSelector((state: any) => state.user.currentUser)
    const [showMoreMenu, setShowMoreMenu] = useState<boolean>(true)
    const heightMenu = useRef<any>(new Animated.Value(260)).current
    const animateAddValueY = useRef<any>(new Animated.Value(-20)).current
    const animateAddValueX = useRef<any>(new Animated.Value(Dimensions.get('screen').width - 90)).current
    const lastY = useRef(-20)
    const lastX = useRef(Dimensions.get('screen').width - 90)
    const panRes = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (e, gesture) => {
            animateAddValueY.setOffset(lastY.current)
            animateAddValueX.setOffset(lastX.current)
        },
        onPanResponderMove: (e, gesture) => {
            animateAddValueY.setValue(gesture.dy)
            animateAddValueX.setValue(gesture.dx)
        },
        onPanResponderRelease: (e, gesture) => {
            lastY.current += gesture.dy
            lastX.current += gesture.dx
            if (lastY.current > -20) {
                lastY.current = -20
            } else if (lastY.current < -Dimensions.get('screen').height * 0.4) {
                lastY.current = -Dimensions.get('screen').height * 0.4
            }
            if (lastX.current > Dimensions.get('screen').width - 90) {
                lastX.current = Dimensions.get('screen').width - 90
            } else if (lastX.current < 0) {
                lastX.current = 0
            }
        }
    })).current

    const widthItemMenuValue = useRef<any>(new Animated.Value(0)).current

    const widthItemMenuAnimate = {
        width: widthItemMenuValue.interpolate({
            inputRange: [0, 50],
            outputRange: [Dimensions.get('window').width * 0.35, 70],
            extrapolate: 'clamp'
        }),
        height: widthItemMenuValue.interpolate({
            inputRange: [0, 50],
            outputRange: [Dimensions.get('window').width * 0.3 * 120 / 150, 70],
            extrapolate: 'clamp'
        }),
        padding: widthItemMenuValue.interpolate({
            inputRange: [0, 50],
            outputRange: [5, 0],
            extrapolate: 'clamp'
        }),
        borderRadius: widthItemMenuValue.interpolate({
            inputRange: [0, 50],
            outputRange: [10, 50],
            extrapolate: 'clamp'
        }),
        paddingLeft: widthItemMenuValue.interpolate({
            inputRange: [0, 50],
            outputRange: [5, 20],
            extrapolate: 'clamp'
        })
    }

    const widthLabelItemMenuAnimate = {
        width: widthItemMenuValue.interpolate({
            inputRange: [0, 20],
            outputRange: [Dimensions.get('window').width * 0.3 - 10, 0],
            extrapolate: 'clamp'
        }),
        height: widthItemMenuValue.interpolate({
            inputRange: [0, 20],
            outputRange: [20, 0],
            extrapolate: 'clamp'
        })
    }

    const fontSizeNumberAnimate = {
        fontSize: widthItemMenuValue.interpolate({
            inputRange: [0, 10],
            outputRange: [30, 20],
            extrapolate: 'clamp'
        })
    }

    const widthViewAnimate = {
        width: widthItemMenuValue.interpolate({
            inputRange: [0, 50],
            outputRange: [Dimensions.get('screen').width - 40, Dimensions.get('screen').width * 0.5],
            extrapolate: 'clamp'
        }),
        borderRadius: widthItemMenuValue.interpolate({
            inputRange: [0, 50],
            outputRange: [15, 8],
            extrapolate: 'clamp'
        })
    }

    useEffect(() => {
        const reload = nav.navigation.addListener('focus', () => {
            animateAddValueY.setValue(-20)
            animateAddValueX.setValue(Dimensions.get('screen').width - 90)
            lastY.current = -20
            lastX.current = Dimensions.get('screen').width - 90
            widthItemMenuValue.setValue(0)
        })
        return reload
    }, [nav.navigation])

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y
        widthItemMenuValue.setValue(offsetY)

    }

    const MenuBlock = (props: any) => {
        return (
            // <TouchableOpacity
            //     onPress={props.onPress}
            //     // style={_animateTitle}
            //     // style={{opacity: 1}}
            //     activeOpacity={0.7}>
            //     <ImageBackground
            //         source={require('../../Assets/bgMenu.png')}
            //         tintColor={props.color}
            //         style={[styles.logoIcon]}
            //     >
            //         <Text style={[styles.textMenu]}>{props.label}</Text>
            //         <Text style={[styles.numberText, { color: props.colorNumber ?? '#000' }]}>{props.numbers}</Text>
            //         <Icon name={props.icon} size={Platform.OS == 'ios' ? 30 : 25} color={props.iconColor} />
            //     </ImageBackground>
            // </TouchableOpacity>
            <TouchableOpacity
                onPress={props.onPress}
                style={[
                    {
                        backgroundColor: props.color,
                        margin: 5,
                        alignItems: 'flex-start',
                        paddingTop: 5
                    },
                    widthItemMenuAnimate
                ]}
                activeOpacity={0.7}>
                <Animated.Text style={[styles.textMenu, widthLabelItemMenuAnimate]}>{props.label}</Animated.Text>
                <View style={{ alignItems: 'center' }}>
                    <Animated.Text style={[styles.numberText, { color: props.colorNumber ?? '#000' }, fontSizeNumberAnimate]}>{props.numbers}</Animated.Text>
                    <Icon name={props.icon} size={Platform.OS == 'ios' ? 30 : 25} color={props.iconColor} />
                </View>

            </TouchableOpacity>
        )
    }

    const MenuBlockHiden = (props: any) => {
        return (
            <TouchableOpacity
                onPress={props.onPress}
                style={{ backgroundColor: props.color, width: 70, height: 70, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.numberText, { color: props.colorNumber ?? '#000', fontSize: 20 }]}>{props.numbers}</Text>
                <Icon name={props.icon} size={30} color={props.iconColor} />
            </TouchableOpacity>
        )
    }

    const Loading = () => {
        return (
            <SkeletonPlaceholder highlightColor='#fff' backgroundColor={MainStyle.secondColor}>
                <SkeletonPlaceholder.Item >
                    <View style={styles.rowView}>
                        <SkeletonPlaceholder.Item width={Dimensions.get('window').width * 0.35} height={Dimensions.get('window').width * 0.3 * 120 / 150} borderRadius={10} marginVertical={5} />
                        <SkeletonPlaceholder.Item width={Dimensions.get('window').width * 0.35} height={Dimensions.get('window').width * 0.3 * 120 / 150} borderRadius={10} marginVertical={5} />
                    </View>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        )
    }
    const LoadingHidden = () => {
        return (
            // <View
            //     style={{ backgroundColor={MainStyle.secondColor}, width: 70, height: 70, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
            // </View>
            <SkeletonPlaceholder highlightColor='#fff' backgroundColor={MainStyle.secondColor}>
                <SkeletonPlaceholder.Item >
                    <View style={styles.rowView}>
                        <SkeletonPlaceholder.Item width={70} height={70} borderRadius={100} marginVertical={5} />
                        <SkeletonPlaceholder.Item width={70} height={70} borderRadius={100} marginVertical={5} />
                        <SkeletonPlaceholder.Item width={70} height={70} borderRadius={100} marginVertical={5} />
                        <SkeletonPlaceholder.Item width={70} height={70} borderRadius={100} marginVertical={5} />
                    </View>
                </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
        )
    }

    const FullMenu = useMemo(() => {
        return (
            <View>
                <View style={styles.rowView}>
                    <MenuBlock
                        numbers={countJobs}
                        color={'#FEE2F6'}
                        label={'Dự án của tôi:'}
                        icon="group-work"
                        iconColor="#FC1FBE"
                        onPress={gotoMyWork}
                    />
                    <MenuBlock
                        numbers={countDone}
                        color={'#CEEDC7'}
                        label={'Đã duyệt:'}
                        icon="check-circle"
                        iconColor="#43BC0A"
                    />
                </View>
                <View style={styles.rowView}>
                    <MenuBlock
                        numbers={selectorUser?.filter((item: any) => { return item.idGroup == selectorMe.idGroup }).length}
                        color={'#F2F5C2'}
                        label={'Thành viên:'}
                        icon="supervised-user-circle"
                        iconColor="#9CA611"
                        onPress={gotoMember}
                    />
                    <MenuBlock
                        numbers={countDoing}
                        color={'#FEB2B2'}
                        label={'Công việc tồn:'}
                        icon="disc-full"
                        iconColor="#FB6262"
                    />
                </View>
            </View>
        )
    }, [countJobs, countDone, countDoing])

    const HiddenMenu = useMemo(() => {
        return (
            <View style={[styles.rowView, { marginTop: 5 }]}>
                <MenuBlockHiden
                    numbers={countJobs}
                    color={'#FEE2F6'}
                    icon="group-work"
                    iconColor="#FC1FBE"
                    onPress={gotoMyWork}
                />
                <MenuBlockHiden
                    numbers={countDone}
                    color={'#CEEDC7'}
                    icon="check-circle"
                    iconColor="#43BC0A"
                />
                <MenuBlockHiden
                    numbers={selectorUser.length}
                    color={'#F2F5C2'}
                    icon="supervised-user-circle"
                    iconColor="#9CA611"
                    onPress={gotoMember}
                />
                <MenuBlockHiden
                    numbers={countDoing}
                    color={'#FEB2B2'}
                    icon="disc-full"
                    iconColor="#FB6262"
                />
            </View>
        )
    }, [countJobs, countDone, selectorUser.length, countDoing])

    const MainMenuWork = () => {
        return (
            <Animated.View style={[styles.menuView, widthViewAnimate]}>
                <Text style={styles.titleLabel}>Tổng quan công việc:</Text>
                {loading ?
                    (showMoreMenu ?
                        <>
                            {Loading()}
                            {Loading()}
                        </>
                        :
                        <>
                            {LoadingHidden()}
                        </>
                    )
                    :
                    (showMoreMenu ?
                        FullMenu
                        :
                        HiddenMenu
                    )}
            </Animated.View>
        )
    }

    const buttonAdd = () => {
        return (
            <Animated.View
                {...panRes.panHandlers}
                style={{
                    backgroundColor: 'red',
                    width: 60,
                    height: 60,
                    position: 'absolute',
                    bottom: 0,
                    borderRadius: 100,
                    transform: [
                        {
                            translateX: animateAddValueX.interpolate({
                                inputRange: [0, Dimensions.get('screen').width - 90],
                                outputRange: [0, Dimensions.get('screen').width - 90],
                                extrapolate: 'clamp'
                            })
                        },
                        {
                            translateY: animateAddValueY.interpolate({
                                inputRange: [-Dimensions.get('screen').height * 0.4, -20],
                                outputRange: [-Dimensions.get('screen').height * 0.4, -20],
                                extrapolate: 'clamp'
                            })
                        }
                    ]
                }}>

            </Animated.View>
        )
    }

    return (
        <MainLayout
            icon="power-outline"
            iconEvent={() => setShowLogout(true)}
            title="Hệ thống công việc"
        >
            <View style={styles.container}>
                {MainMenuWork()}
                <View style={styles.listView}>
                    <Text style={[styles.titleLabel, { marginHorizontal: 15 }]}>Danh sách dự án:</Text>
                    {!loading
                        ?
                        <FlatList
                            // refreshControl={
                            //     <RefreshControl
                            //         colors={[MainStyle.mainColor]}
                            //         onRefresh={async () => {
                            //             Animated.spring(heightMenu, {
                            //                 toValue: 260,
                            //                 useNativeDriver: false,
                            //             }).start()
                            //             setTimeout(() => {
                            //                 setShowMoreMenu(true)
                            //             }, 200);
                            //         }}
                            //         refreshing={loading}
                            //     />
                            // }
                            ListEmptyComponent={() => {
                                return (
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                                        <Text style={styles.textItem}>Chưa có dự án nào</Text>
                                        <Text style={{ marginTop: 20 }}>Chúc bạn một ngày làm việc tốt lành {`:)`}</Text>
                                    </View>
                                )
                            }}
                            onScroll={handleScroll}
                            data={selectorMyJobs}
                            style={{ marginTop: 10 }}
                            renderItem={({ item }) => {
                                return (
                                    <Swipeable
                                        renderRightActions={() => {
                                            return (
                                                <View style={[styles.rowView, { marginVertical: 10, width: 80 }]}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            if (selectorMe.name != item.creater) {
                                                                showMessage({
                                                                    message: 'Bạn không có quyền xoá dự án này!',
                                                                    duration: 3000,
                                                                    type: 'warning',
                                                                    position: 'bottom'
                                                                })
                                                                return
                                                            }
                                                            Alert.alert('Thông báo', 'Bạn có chắc chắn muốn xoá dự án này không?', [
                                                                {
                                                                    text: 'Đồng ý',
                                                                    onPress: () => {
                                                                        deleteJob(item.idJobs)
                                                                        animateAddValueY.setValue(-20)
                                                                        animateAddValueX.setValue(Dimensions.get('screen').width - 90)
                                                                        lastY.current = -20
                                                                        lastX.current = Dimensions.get('screen').width - 90
                                                                        widthItemMenuValue.setValue(0)
                                                                    }
                                                                },
                                                                {
                                                                    text: 'Huỷ'
                                                                }
                                                            ])
                                                        }}
                                                        style={{ padding: 5 }}>
                                                        <Icon name="delete-forever" size={30} />
                                                    </TouchableOpacity>
                                                    {/* <TouchableOpacity style={{ padding: 5 }}>
                                                        <Icon name="mode-edit" size={30} />
                                                    </TouchableOpacity> */}
                                                </View>
                                            )
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => nav.navigation.navigate('MemberOfJob', { infoJob: item })}
                                            style={styles.itemJobsView}>
                                            <View style={[styles.rowView, { justifyContent: 'space-between', flex: 1 }]}>
                                                <Text style={styles.textItem}>{item.name}</Text>
                                                <Icon name="stars" size={25} color={item?.isDone ? MainStyle.mainColor : 'transparent'} />
                                            </View>
                                            <Icon name="chevron-right" size={30} color={"#000"} />
                                        </TouchableOpacity>
                                    </Swipeable>
                                )
                            }}
                        />
                        :
                        <SkeletonPlaceholder highlightColor='#fff' backgroundColor={MainStyle.secondColor}>
                            <SkeletonPlaceholder.Item >
                                <View>
                                    <SkeletonPlaceholder.Item width={'100%'} height={60} borderRadius={15} marginVertical={5} />
                                    <SkeletonPlaceholder.Item width={'100%'} height={60} borderRadius={15} marginVertical={5} />
                                </View>
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder>
                    }
                </View>

            </View>
            {/* {buttonAdd()} */}
            <ModalLogout
                isOpen={showLogout}
                confirmModal={gotoLogin}
                closeModal={() => setShowLogout(false)}
            />
        </MainLayout>
    )
}

export default HomeScreen