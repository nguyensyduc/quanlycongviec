import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView
} from 'react-native'
import MainLayout from "../../Component/MainLayout/MainLayout";
import PieChart from 'react-native-pie-chart'
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import MainStyle from "../../MainStyle";
import Button from "../../Component/Button/Button";
import { useSelector } from "react-redux";

export default function SummaryScreen(nav: NativeStackScreenProps<any>) {
    const selectorMe = useSelector((state: any) => state.user.currentUser)
    const dataJobs = nav.route.params?.dataJobs
    const infoJob = nav.route.params?.infoJob
    const widthAndHeight = 180
    const [loading, setLoading] = useState<boolean>(true)
    const [series, setSeries] = useState<number[]>([])
    const [sliceColor, setSliceColor] = useState<string[]>([])

    const props = {
        activeStrokeWidth: 25,
        inActiveStrokeWidth: 25,
        inActiveStrokeOpacity: 0.15
    };

    const renderRow = (label: string, color: string) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 6 }}>
                <View style={[styles.itemView, { backgroundColor: color }]} />
                <Text>{label}</Text>
            </View>
        )
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        await setLoading(true)
        try {
            let dataSeries = []
            let dataColor = []
            let dataDone = dataJobs.filter((item: any) => {
                return item?.status == 'done'
            })
            let dataSuccess = dataJobs.filter((item: any) => {
                return item?.status == 'success'
            })
            let dataFail = dataJobs.filter((item: any) => {
                return item?.status == 'fail'
            })
            let dataPlan = dataJobs.filter((item: any) => {
                return item?.status == 'plan' && (new Date().getTime() <= new Date(item.endTime).getTime() || !item.endTime)
            })
            let dataDoing = dataJobs.filter((item: any) => {
                return item?.status == 'doing' && (new Date().getTime() <= new Date(item.endTime).getTime() || !item.endTime)
            })
            let dataPlanOutDate = dataJobs.filter((item: any) => {
                return item?.status == 'plan' && new Date().getTime() > new Date(item.endTime).getTime()
            })
            let dataDoingOutDate = dataJobs.filter((item: any) => {
                return item?.status == 'doing' && new Date().getTime() > new Date(item.endTime).getTime()
            })
            dataColor.push('#0FC71C')
            dataColor.push('#3689FE')
            dataColor.push('#F3B42B')
            dataColor.push('red')
            dataColor.push('#AD00FE')
            dataColor.push('#000')
            if (dataJobs.length > 0) {
                let lengthDone = dataDone.length ? dataDone.length : 0
                let lengthPlan = dataPlan.length ? dataPlan.length : 0
                let lengthDoing = dataDoing.length ? dataDoing.length : 0
                let lengthExpired = (dataPlanOutDate.length ? dataPlanOutDate.length : 0) + (dataDoingOutDate.length ? dataDoingOutDate.length : 0)
                let lengthSuccess = dataSuccess.length ? dataSuccess.length : 0
                let lengthFail = dataFail.length ? dataFail.length : 0
                dataSeries.push((lengthDone * 100) / dataJobs.length)
                dataSeries.push((lengthDoing * 100) / dataJobs.length)
                dataSeries.push((lengthPlan * 100) / dataJobs.length)
                dataSeries.push((lengthExpired * 100) / dataJobs.length)
                dataSeries.push((lengthSuccess * 100) / dataJobs.length)
                dataSeries.push((lengthFail * 100) / dataJobs.length)
            } else {
                dataSeries.push(0)
                dataSeries.push(0)
                dataSeries.push(0)
                dataSeries.push(0)
                dataSeries.push(0)
                dataSeries.push(0)
            }

            console.log('dataSeriessss ', dataSeries);

            await setSeries(dataSeries)
            await setSliceColor(dataColor)
            setLoading(false)
        } catch (error) {
            console.log('error ', error);
            setLoading(false)
        }
    }

    return (
        <MainLayout
            title="Thống kê dự án"
            iconEvent={() => nav.navigation.pop()}
            icon="md-caret-back"
        >
            {!loading ?
                series.length > 0 ?
                    <ScrollView style={styles.container}>
                        <Text style={styles.textLabel}>Công việc chưa được duyệt</Text>
                        <View style={styles.rowView}>
                            <CircularProgressBase
                                {...props}
                                value={series[0]}
                                radius={100}
                                activeStrokeColor={sliceColor[0]}
                                inActiveStrokeColor={sliceColor[0]}
                                duration={500}
                            >
                                <CircularProgressBase
                                    {...props}
                                    value={series[1]}
                                    radius={75}
                                    activeStrokeColor={sliceColor[1]}
                                    inActiveStrokeColor={sliceColor[1]}
                                    duration={700}
                                >
                                    <CircularProgressBase
                                        {...props}
                                        value={series[2]}
                                        radius={50}
                                        activeStrokeColor={sliceColor[2]}
                                        inActiveStrokeColor={sliceColor[2]}
                                        duration={900}
                                    >
                                        <CircularProgressBase
                                            {...props}
                                            value={series[3]}
                                            radius={25}
                                            activeStrokeColor={sliceColor[3]}
                                            inActiveStrokeColor={sliceColor[3]}
                                            duration={1100}
                                        />
                                    </CircularProgressBase>
                                </CircularProgressBase>
                            </CircularProgressBase>
                            <View style={{ width: '30%' }}>
                                {renderRow('Hoàn thành', '#0FC71C')}
                                {renderRow('Đang làm', '#3689FE')}
                                {renderRow('Chưa làm', '#F3B42B')}
                                {renderRow('Quá hạn', 'red')}
                            </View>
                        </View>
                        <Text style={styles.textLabel}>Công việc đã được duyệt</Text>
                        <View style={styles.rowView}>
                            <CircularProgressBase
                                {...props}
                                value={series[4]}
                                radius={100}
                                activeStrokeColor={sliceColor[4]}
                                inActiveStrokeColor={sliceColor[4]}
                                duration={500}
                            >
                                <CircularProgressBase
                                    {...props}
                                    value={series[5]}
                                    radius={75}
                                    activeStrokeColor={sliceColor[5]}
                                    inActiveStrokeColor={sliceColor[5]}
                                    duration={700}
                                />
                            </CircularProgressBase>
                            <View style={{ width: '30%' }}>
                                {renderRow('Đã xong', '#AD00FE')}
                                {renderRow('Chưa đạt', '#000')}
                            </View>
                        </View>
                    </ScrollView>
                    : null
                : null
            }
            {selectorMe.name == infoJob.creater ?
                <Button
                    title="Xem chi tiết thống kê"
                    styleButton={styles.btnViewSum}
                    onPress={() => {
                        nav.navigation.navigate('TableSummary', { dataJobs: dataJobs, infoJob: infoJob, listMember: nav.route.params?.listMember })
                    }}
                />
                : null
            }
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20
    },
    itemView: {
        width: 15,
        height: 15,
        marginRight: 5,
        borderRadius: 99
    },
    textLabel: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    btnViewSum: {
        marginBottom: 80,
        margin: 10,
        borderRadius: 10
    }
})