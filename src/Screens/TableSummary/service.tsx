import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainStyle from "../../MainStyle";

export default function useTableSummary(nav: NativeStackScreenProps<any>) {
    const infoJob = nav.route.params?.infoJob
    const dataJobs = nav.route.params?.dataJobs
    const listUser = useSelector((state: any) => state.jobs.listUser)
    const selectorMe = useSelector((state: any) => state.user.currentUser)
    const [newDataJob, setDataNewJob] = useState<any[]>([])
    const [acceptDone, setAcceptDone] = useState<boolean>(false)
    const [acceptView, setAcceptView] = useState<boolean>(false)

    useEffect(() => {
        getDetailSum()
    }, [])

    const getDetailSum = () => {
        let _newData: Array<any> = []
        let _dataUserCompany = listUser.filter((item: any) => { return item.idGroup == selectorMe.idGroup })
        let notHaveJobNotDone = 0
        let totalJob = 0
        dataJobs.map((item: any) => {
            totalJob++
            if (item.status != 'success' && item.status != 'fail') {
                notHaveJobNotDone++
            }
            let _status = ''
            let color = ''
            switch (item.status) {
                case 'plan':
                    _status = 'Chưa tiếp nhận'
                    color = '#FFC44B'
                    break;
                case 'doing':
                    _status = 'Đang xử lý'
                    color = '#4BB5FF'
                    break;
                case 'done':
                    _status = 'Đang chờ duyệt'
                    color = MainStyle.secondColor
                    break;
                case 'success':
                    _status = 'Đã xong'
                    color = 'lightgreen'
                    break;
                case 'fail':
                    _status = 'Chưa đạt'
                    color = 'gray'
                    break;
                default:
                    break;
            }
            _dataUserCompany.map((itemUser: any) => {
                if (item.members) {
                    if (item.members == itemUser.name) {
                        _newData.push({
                            ...item,
                            userName: itemUser.username,
                            trang_thai: _status,
                            color: color
                        })
                    }
                } else {
                    if (item.creater == itemUser.name) {
                        _newData.push({
                            ...item,
                            userName: itemUser.username,
                            trang_thai: _status,
                            color: color
                        })
                    }
                }
            })
        })
        console.log('notHaveJobNotDone', notHaveJobNotDone);
        if (notHaveJobNotDone <= 0 && infoJob.creater == selectorMe.name && totalJob > 0) {
            if (!infoJob.isDone) {
                setAcceptDone(true)
            } else {
                setAcceptView(true)
            }
        } else {
            setAcceptDone(false)
            setAcceptView(false)
        }


        setDataNewJob(_newData)
    }

    return {
        infoJob,
        dataJobs,
        newDataJob,
        acceptDone,
        setAcceptDone,
        acceptView
    }
}