import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import address from "../../Address/ipa_address";
import { showMessage } from "react-native-flash-message";

export const useMemberOfJob = (nav: NativeStackScreenProps<any>) => {
    const [loadingUser, setLoadingUser] = useState(true)
    const [listUser, setListUser] = useState<any>([])
    const [listUserHaveJobs, setListUserHaveJobs] = useState<any>([])
    const selectorUser = useSelector((state: any) => state.jobs.listUser)
    const selectorMe = useSelector((state: any) => state.user.currentUser)
    const [listDataJobsPlan, setListDataJobsPlan] = useState<any>([])
    const infoJob = nav.route.params?.infoJob
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [listUserOfCompany, setListUserOfCompany] = useState<any[]>([])
    const [listMembers, setListMembers] = useState<any[]>([])

    useEffect(() => {
        getListUser();
        // getMemberOfCompany();
        getDataPlanJob();
    }, [])

    useEffect(() => {
        getUserHaveJobs()
    }, [listUser, listDataJobsPlan])

    const getMemberOfCompany = (data: any) => {
        // console.log('list userrrrrr ', data);
        let _arrayTextName = ''
        let _listUserOfCompany: Array<any> = []
        let _listUserOfCompanyNew: Array<any> = []
        data.map((item: any) => {
            _arrayTextName += item.name + '|'
        })
        selectorUser.map((item: any) => {
            if (item.idGroup == selectorMe.idGroup) {
                _listUserOfCompany.push({
                    ...item,
                    select: false
                })
            }
        })
        _listUserOfCompany.map((item: any) => {
            if (!_arrayTextName?.includes(item?.name)) {
                _listUserOfCompanyNew.push(item)
            }
        })
        setListUserOfCompany(_listUserOfCompanyNew)
    }

    const getListUser = async () => {
        let _listUser: Array<any> = []
        selectorUser.map((item: any) => {
            infoJob?.members.map((itemUser: any) => {
                if (item.name == itemUser) {
                    _listUser.push(item)
                }
            })
            if (infoJob?.creater == item.name) {
                _listUser.push(item)
            }

        })
        let infoMe: any
        _listUser?.map((item: any, index: any) => {
            if (item.name == selectorMe.name) {
                infoMe = _listUser.splice(index, 1)
            }
        })
        _listUser.unshift(infoMe[0])
        
        getMemberOfCompany(_listUser)
        setListUser(_listUser)
    }

    const getDataPlanJob = async () => {
        await setLoadingUser(true)
        const request = await fetch(`${address}detailjobs`, {
            method: 'GET'
        })
        const res = await request.json();
        let listJobsPlan: Array<any> = []
        res.data.forEach((job: any) => {
            if (job.idJob == infoJob.idJobs) {
                listJobsPlan?.push(job);
            }
        })
        console.log('sadnasdjiasjdiasjdia ', listJobsPlan);
        

        await setListDataJobsPlan(listJobsPlan)
        setLoadingUser(false)
    }

    const addMember = async (item: any) => {
        let _listMember: Array<any> = []
        let _listNew: Array<any> = []
        if (item?.members?.length > 0) {
            _listMember = [...item?.members]
        }
        listUserOfCompany.map((itemMem: any) => {
            if (itemMem.select) {
                _listNew.push(itemMem.name)
            }
        })
        const body = {
            members: _listMember.concat(_listNew)
        }
        const request = await fetch(`${address}jobs/edit/${item.idJobs}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const res = await request.json();
        if (res.success) {
            setIsOpen(false)
            showMessage({
                message: 'Thêm thành công',
                type: 'success',
                duration: 3000,
                titleStyle: { fontSize: 16 }
            })
            nav.navigation.pop()
        }
    }


    const getUserHaveJobs = async () => {
        let _listUser = listUser
        let _listJobsPlan = listDataJobsPlan
        let list: Array<any> = []
        _listUser.map((itemUser: any, index: any) => {
            let isHave = false
            let obj = {}
            _listJobsPlan.map((itemPlan: any) => {
                if ((itemPlan.members && itemUser.name == itemPlan.members) || itemUser.name == itemPlan.creater) {
                    isHave = true

                }
            })
            if (isHave) {
                obj = {
                    _id: itemUser._id,
                    name: itemUser.name,
                    pass: itemUser.pass,
                    username: itemUser.username,
                    showMore: false,
                    isHaveJobs: true
                }
            } else {
                obj = {
                    _id: itemUser._id,
                    name: itemUser.name,
                    pass: itemUser.pass,
                    showMore: false,
                    username: itemUser.username,
                }
            }
            list.push(obj)
        })

        console.log('dsaijdiasjdasiojdajdasj ', list);
        
        
        setListUserHaveJobs(list)
    }

    const gotoJobScreen = (item: any) => {
        nav.navigation.navigate('JobsScreen', {
            infoUser: item,
            inforJob: infoJob,
            listMember: listUserHaveJobs
        })
    }

    return {
        infoJob,
        loadingUser,
        listUser,
        listDataJobsPlan,
        listUserHaveJobs,
        gotoJobScreen,
        getDataPlanJob,
        setListUserHaveJobs,
        setIsOpen,
        isOpen,
        listUserOfCompany,
        setListMembers,
        listMembers,
        setListUserOfCompany,
        addMember
    }
}