import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setCurrentListJob, setListMyDetailJob, setListMyJob } from "../../Store/userSlice";
import address from "../../Address/ipa_address";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCurrentListJob, setListMyDetailJob, setListMyJob, setListProject } from "../../Store/jobsSlice";
import { setCurrentUserDetail } from "../../Store/userSlice";

export default function useHomeScreen(navigation: NativeStackScreenProps<any>) {
    const [showLogout, setShowLogout] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState([])
    const selectorUser = useSelector((state: any) => state.user.currentUser)
    const [countJobs, setCountJobs] = useState(0)
    const [countDone, setCountDone] = useState(0)
    const [countDoing, setCountDoing] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        const reload = navigation.navigation.addListener('focus', () => {
            getListJobs();
        })
        return reload
    }, [navigation.navigation])

    const getListJobs = async () => {
        setLoading(true)
        try {
            const request = await fetch(`${address}jobs`, {
                method: 'GET',
            })
            const response = await request.json();
            console.log('okeeeeeeee ', response);

            const payload = { listUser: response.data };
            dispatch(setCurrentListJob(payload))
            setTimeout(() => {
                setData(response.data);
            }, 500);
            let listMyJobs: Array<string> = []
            response.data.map((item: any) => {
                if (item.creater == selectorUser.name) {
                    listMyJobs.push(item)
                } else {
                    item.members.map((itemMembers: any) => {
                        if (itemMembers == selectorUser.name) {
                            listMyJobs.push(item)
                        }
                    })
                }

            })
            setCountJobs(listMyJobs.length)
            dispatch(setListMyJob({ listMyJobs: listMyJobs }))
            dispatch(setListProject({ listProject: response.data }))
            getDetailJobs()
        } catch (error) {
            setLoading(false)
        }
    }

    const deleteJob = async (id: any) => {
        const request = await fetch(`${address}jobs/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        const res = await request.json();
        console.log(res);
        if (res.success) {
            getListJobs()
        }

    }

    const getDetailJobs = async () => {
        try {
            const request = await fetch(`${address}detailjobs`, {
                method: 'GET'
            })
            const res = await request.json();
            let listMyDetail: Array<string> = []
            let listDone: Array<string> = []
            let listDoing: Array<string> = []
            res.data.map((item: any) => {
                if (item.members) {
                    if (item.members == selectorUser.name) {
                        listMyDetail.push(item)
                    }
                } else {
                    if (item.creater == selectorUser.name) {
                        listMyDetail.push(item)
                    }
                }
            })
            const payload = { listMyDetailJobs: listMyDetail };
            dispatch(setListMyDetailJob(payload))
            const payloadJob = { listJob: res.data };
            dispatch(setCurrentListJob(payloadJob))

            listMyDetail.map((item: any) => {
                if (item.status == 'success' || item.status == 'fail') {
                    listDone.push(item)
                } else {
                    listDoing.push(item)
                }
            })
            setCountDone(listDone.length)
            setCountDoing(listDoing.length)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const gotoLogin = async () => {
        await AsyncStorage.removeItem('name_login')
        await AsyncStorage.removeItem('pass_login')
        // console.log('actionnnnnnHomeScreen');
        // dispatch(setCurrentUserDetail({ currentUser: {} }))
        setShowLogout(false)
        navigation.navigation.navigate('LoginScreen')
        // navigation.navigation.navigate('Setting')

    }
    const gotoMyWork = () => {
        navigation.navigation.navigate('MyWork')
    }
    const gotoMember = () => {
        navigation.navigation.navigate('Members')
    }

    return {
        showLogout,
        setShowLogout,
        gotoMyWork,
        gotoMember,
        gotoLogin,
        data,
        countJobs,
        countDoing,
        countDone,
        loading,
        deleteJob
    }
}