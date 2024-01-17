import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import address from "../../Address/ipa_address";
import { useDispatch } from "react-redux";
import { showMessage } from "react-native-flash-message";

export const useJobsScreen = (navigation: NativeStackScreenProps<any>) => {
    const inforUser = navigation.route.params?.infoUser
    const inforJob = navigation.route.params?.inforJob
    const [listPlan, setListPlan] = useState<any>([])
    const [listDoing, setListDoing] = useState<any>([])
    const [listDone, setListDone] = useState<any>([])
    const [listSuccess, setListSuccess] = useState<any>([])
    const [listFail, setListFail] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        const reload = navigation.navigation.addListener('focus', () => {
            getDataJob()
        })
        return reload
    }, [navigation.navigation])
    const getDataJob = async () => {
        console.log('heheheheh', inforJob);

        setLoading(true)
        try {
            const request = await fetch(`${address}detailjobs`, {
                method: 'GET'
            })
            const res = await request.json();
            console.log('ressss jobsss ', res);

            let listJobsPlan: Array<any> = []
            let listJobsDoing: Array<any> = []
            let listJobsDone: Array<any> = []
            let listJobsSuccess: Array<any> = []
            let listJobsFail: Array<any> = []
            res.data.map((job: any) => {
                if (job.members) {
                    console.log(job.members + ' - ' + inforUser.name + ' - ' + job.idJob + ' - ' + inforJob.idJobs + ' - ' + job.status);
                    if (job.members == inforUser.name) {
                        if (job.idJob == inforJob.idJobs) {
                            switch (job.status) {
                                case 'done':
                                    listJobsDone.push(job)
                                    break;
                                case 'doing':
                                    listJobsDoing.push(job)
                                    break;
                                case 'plan':
                                    listJobsPlan.push(job)
                                    break;
                                case 'success':
                                    listJobsSuccess.push(job)
                                    break;
                                case 'fail':
                                    listJobsFail.push(job)
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                } else {
                    if (job.creater == inforUser.name) {
                        if (job.idJob == inforJob.idJobs) {
                            switch (job.status) {
                                case 'done':
                                    listJobsDone.push(job)
                                    break;
                                case 'doing':
                                    listJobsDoing.push(job)
                                    break;
                                case 'plan':
                                    listJobsPlan.push(job)
                                    break;
                                case 'success':
                                    listJobsSuccess.push(job)
                                    break;
                                case 'fail':
                                    listJobsFail.push(job)
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            })
            await setListPlan(listJobsPlan)
            await setListDoing(listJobsDoing)
            await setListDone(listJobsDone)
            await setListSuccess(listJobsSuccess)
            await setListFail(listJobsFail)
            setLoading(false)
        } catch (error) {
            console.log('error', error);
            setLoading(false)
        }
    }

    return {
        inforUser,
        inforJob,
        listDone,
        listPlan,
        listDoing,
        listSuccess,
        listFail,
        loading,
        getDataJob
    }
}