import { ActivityIndicator, Dimensions, FlatList, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View, Animated, Keyboard, StyleSheet } from "react-native";
import MainLayout from "../../Component/MainLayout/MainLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Slider from '@react-native-community/slider';
// import Slider from 'react-native-slider';
import MainStyle from "../../MainStyle";
import address from "../../Address/ipa_address";

export default function DetailDesScreen(nav: NativeStackScreenProps<any>) {
    const [inforDetailJob, setInforDetailJob] = useState<any>(nav.route.params?.inforDetailJob)
    const [currentImg, setCurrentImg] = useState<string>('')
    const [isOpenImg, setIsOpenImg] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [currentPer, setCurrentPer] = useState<number>(0)
    const inforUser = nav.route.params?.inforUser
    const infoJob = nav.route.params?.infoJob
    useEffect(() => {
        let _percent = inforDetailJob?.percent ?? 0
        setCurrentPer(_percent)
    }, [])

    const handleUpdatePercent = async () => {
        setLoading(true)
        try {
            const body = {
                "percent": currentPer
            };
            const request = await fetch(`${address}detailjobs/edit/${inforDetailJob.idDetailJob}`, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const res = await request.json();
            console.log('resssss change ', res);
            if (res && res.success) {
                // nav.navigation.pop()
                setInforDetailJob(res.data[0])
                setLoading(false)
            } else {
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
        }

    }

    const renderPercent = (value: any) => {
        return (
            <View style={{ minWidth: 20, alignItems: 'center' }}>
                <Text style={{ fontSize: 7 }}>{value < 10 ? '|  ' : '|'}</Text>
                <Text style={{ fontSize: 16 }}>{value < 10 ? value + ' ' : value}</Text>
            </View>
        )
    }

    return (
        <MainLayout
            iconEvent={() =>
                nav.navigation.navigate('DetailJobScreen', { inforUser: inforUser, inforDetailJob: inforDetailJob, inforJob: infoJob })
            }
            icon="md-caret-back"
            title={inforDetailJob.nameDetailJob}>
            <View style={styles.container}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Tiến độ công việc (%):</Text>
                    <Slider
                        style={{ width: '100%', height: 100, marginVertical: 10 }}
                        minimumValue={0}
                        value={currentPer}
                        maximumValue={100}
                        minimumTrackTintColor={MainStyle.mainColor}
                        maximumTrackTintColor="#000000"
                        step={25}
                        thumbTintColor={MainStyle.mainColor}
                        onValueChange={(value) => {
                            console.log('valueeee ', value);
                            setCurrentPer(value)
                        }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {renderPercent(0)}
                        {renderPercent(25)}
                        {renderPercent(50)}
                        {renderPercent(75)}
                        {renderPercent(100)}
                    </View>
                    <TouchableOpacity
                        onPress={handleUpdatePercent}
                        disabled={currentPer == (inforDetailJob?.percent ?? 0) ? true : false}
                        style={{
                            alignSelf: 'center',
                            backgroundColor: MainStyle.mainColor,
                            padding: 10,
                            borderRadius: 10,
                            marginTop: 10,
                            opacity: currentPer == (inforDetailJob?.percent ?? 0) ? 0.5 : 1
                        }}>
                        {loading ?
                            <ActivityIndicator size='small' color='#fff'></ActivityIndicator>
                            :
                            <Text style={{ color: '#fff' }}>Cập nhật tiến độ</Text>
                        }
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Mô tả công việc:</Text>
                <ScrollView style={styles.container}>
                    <Text style={styles.txtDes}>{inforDetailJob.description ?? ''}</Text>
                </ScrollView>
                <View style={styles.rowView}>
                    {inforDetailJob?.listImage?.length > 0
                        ?
                        inforDetailJob?.listImage?.map((item: any) => {
                            return (
                                <TouchableOpacity
                                    key={Math.random()}
                                    onPress={async () => {
                                        await setCurrentImg(item)
                                        setIsOpenImg(true)
                                    }}
                                    style={styles.imageView}>
                                    <Image source={{ uri: item }} style={styles.image} />
                                </TouchableOpacity>
                            )
                        })
                        : null
                    }
                </View>
            </View>
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
                            style={{ position: 'absolute', alignSelf: 'flex-end', zIndex: 99, backgroundColor: '#fff', borderRadius: 100, }}>
                            <Ionicons name="close-circle" size={35} />
                        </TouchableOpacity>
                        <Image resizeMode="contain" source={{ uri: currentImg }} style={{ width: '100%', height: '100%', borderRadius: 10, marginVertical: 5 }} />
                    </View>
                </View>
            </Modal>
        </MainLayout >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        padding: 10,
        paddingBottom: 20
    },
    txtDes: {
        fontSize: 18
    },
    imageView: {
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0 },
        elevation: 10,
        marginHorizontal: 10
    },
    image: {
        width: Dimensions.get('screen').width / 3 - 25,
        height: 150,
        borderRadius: 10,
        backgroundColor: 'transparent',
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        width: '90%',
        padding: 10,
        paddingVertical: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 10
    },
})
