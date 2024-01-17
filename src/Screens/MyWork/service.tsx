import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import address from "../../Address/ipa_address";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { setListMyJob } from "../../Store/jobsSlice";

export const useMyWork = (navigation: NativeStackScreenProps<any>) => {
    const dispatch = useDispatch()
    const selectorMyJobs = useSelector((state: any) => state.jobs.listMyJobs)
    const selectorUser = useSelector((state: any) => state.jobs.listUser)
    const selectorMe = useSelector((state: any) => state.user.currentUser)
    const [listDetailJobs, setListDetailJobs] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [listUserOfCompany, setListUserOfCompany] = useState<any[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [nameJob, setNameJob] = useState<string>('')
    const [nameCreater, setNameCreater] = useState<string>('')
    const [listMembers, setListMembers] = useState<string[]>([])
    const [loadingAdd, setLoadingAdd] = useState<boolean>(false)
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [isFrom, setIsFrom] = useState<boolean>(true)
    const [isShowDate, setIsShowDate] = useState<boolean>(false)
    useEffect(() => {
        getDataDetailJobs();
        getMemberOfCompany()
    }, [])

    const getMemberOfCompany = () => {
        console.log('list userrrrrr ', selectorUser, selectorMe);
        let _listUserOfCompany: Array<any> = []
        selectorUser.map((item: any) => {
            if (item.idGroup == selectorMe.idGroup && item.name != selectorMe.name) {
                _listUserOfCompany.push({
                    ...item,
                    select: false
                })
            }
        })
        setListUserOfCompany(_listUserOfCompany)
    }

    const getDataDetailJobs = async () => {
        const request = await fetch(`${address}detailjobs`, {
            method: 'GET',
        });
        const res = await request.json();
        setLoading(true);
        setTimeout(() => {
            setListDetailJobs(res.data);
            setLoading(false);
        }, 1000);
    }

    const deleteJob = async (id: any) => {
        const request = await fetch(`${address}detailjobs/delete${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        const res = await request.json();
    }

    const getListJobs = async () => {
        try {
            const request = await fetch(`${address}jobs`, {
                method: 'GET',
            })
            const response = await request.json();
            let listMyJobs: Array<string> = []
            response.data.map((item: any) => {
                if (item.creater == selectorMe.name) {
                    listMyJobs.push(item)
                } else {
                    item.members.map((itemMembers: any) => {
                        if (itemMembers == selectorMe.name) {
                            listMyJobs.push(item)
                        }
                    })
                }

            })
            dispatch(setListMyJob({ listMyJobs: listMyJobs }))
        } catch (error) {
        }
    }

    const clearData = () =>{
        setDateTo('')
        setIsShowDate(false)

    }

    const handleAddJob = async () => {
        if (!nameJob || !dateTo) {
            showMessage({
                message: 'Vui lòng nhập đủ thông tin công việc',
                type: 'warning',
                duration: 3000,
                titleStyle: { fontSize: 16 }
            })
            return
        }
        await setLoadingAdd(true)
        let _listMember: Array<any> = []
        listMembers.map((item: any) => {
            _listMember.push(item.name)
        })
        const body = {
            "name": nameJob.trim(),
            "creater": selectorMe.name,
            "members": _listMember,
            "dateStart": new Date(),
            "dateEnd": dateTo
        }
        console.log('bodyyyy ', body);
        
        const request = await fetch(`${address}jobs/add`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const res = await request.json();
        if (res.success) {
            await getListJobs()
            getMemberOfCompany()
            getDataDetailJobs();
            setIsOpen(false)
            showMessage({
                message: 'Thêm thành công',
                type: 'success',
                duration: 3000,
                titleStyle: { fontSize: 16 }
            })
            clearData()
        } else {
            showMessage({
                message: 'Thêm thất bại',
                type: 'success',
                duration: 3000,
                titleStyle: { fontSize: 16 }
            })
        }
        setLoadingAdd(false)
    }

    return {
        selectorMyJobs,
        listDetailJobs,
        setListUserOfCompany,
        loading,
        nameJob,
        setNameJob,
        nameCreater,
        setNameCreater,
        listUserOfCompany,
        handleAddJob,
        isOpen,
        setIsOpen,
        loadingAdd,
        listMembers,
        setListMembers,
        getMemberOfCompany,
        deleteJob,
        dateFrom, 
        setDateFrom,
        dateTo,
        setDateTo,
        isFrom,
        setIsFrom,
        isShowDate,
        setIsShowDate,
        clearData
    }
}