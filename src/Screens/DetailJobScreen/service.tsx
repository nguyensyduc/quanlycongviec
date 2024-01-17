import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import address from "../../Address/ipa_address";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { setCurrentComment } from "../../Store/jobsSlice";

export const useDetailJobsScreen = (navigation: NativeStackScreenProps<any>) => {
    const inforUser = navigation.route.params?.inforUser
    const inforDetailJob = navigation.route.params?.inforDetailJob
    const selectorUser = useSelector((state: any) => state.jobs.listUser)
    const selectorMe = useSelector((state: any) => state.user.currentUser)
    const [loadingText, setLoadingText] = useState<boolean>(false)
    const [textComment, setTextComment] = useState<any>('');
    const [showRateStar, setShowRateStar] = useState<boolean>(false)
    const [imagePhoto, setImagePhoto] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [listNewText, setListNewText] = useState<any[]>([])
    const [listUserOfCompany, setListUserOfCompany] = useState<any[]>([])
    const [isOpenList, setIsOpenList] = useState<boolean>(false)
    const infoJob = navigation.route.params?.inforJob
    const dispatch = useDispatch()

    useEffect(() => {
        getComment()
        getUserOfProject()
    }, [])

    const getUserOfProject = async () => {
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
        _listUser.map((item: any, index: any) => {
            let _name = ''
            if (inforDetailJob.members) {
                _name = inforDetailJob.members
            }else{
                _name = inforDetailJob.creater
            }
            if(_name == item.name){
               _listUser.splice(index, 1)
            }
        })
        setListUserOfCompany(_listUser)

    }

    const getComment = async () => {
        try {
            const request = await fetch(`${address}comment`, {
                method: 'GET'
            })
            const res = await request.json();

            let _listComment: Array<any> = [];
            for (let item = res.data.length - 1; item > 0; item--) {
                _listComment?.push(res.data[item])
            }
            let _listUser = selectorUser?.filter((item: any) => { return item.idGroup == selectorMe.idGroup })
            let _listNewText = _listComment?.filter((item: any) => { return item.idDetailJob == inforDetailJob.idDetailJob })
            let _listFull: Array<any> = []

            _listNewText.forEach((item: any) => {
                _listUser.map((itemUser: any) => {
                    if (item.username == itemUser.name) {
                        _listFull.push({
                            ...item,
                            fullName: itemUser.username
                        })
                    }
                })
            })
            setListNewText(_listFull)
            setTimeout(() => {
                const payload = { listText: _listComment }
                dispatch(setCurrentComment(payload));
            }, 10);
        } catch (error) {

        } finally {
        }
    }

    const addComment = async () => {
        setLoadingText(true)
        try {
            const body = {
                "message": textComment,
                "idDetailJob": inforDetailJob.idDetailJob,
                "username": selectorMe.name,
                "type": imagePhoto ? 'photo' : 'text',
                "createTime": new Date(),
                "linkPhoto": imagePhoto
            }
            console.log('bodyyyyyy ', body);

            const request = await fetch(`${address}comment/add`, {
                method: 'POST',
                body: JSON.stringify(body),
                // body: body,
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const res = await request.json();
            console.log('ressssssss ', res);

            if (res.data) {
                setTextComment('')
                getComment()
                setLoadingText(false)
                setImagePhoto('')
            }
        } catch (error) {
            setLoadingText(false)
            console.log('errrrrrr ', error);

        }
    }

    const handleChange = async (member: string) => {
        const body = {
            "members": member
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
            navigation.navigation.pop()
        } else {

        }
    }

    const changeStatus = async (value: string) => {
        const body = {
            "status": value
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
            navigation.navigation.pop()
        } else {

        }
    }

    const handleRate = (textRate: string) => {
        console.log('confirm Rate ', textRate);
        if (!textRate.trim()) {
            showMessage({
                message: 'Vui lòng nhập nội dung đánh giá',
                type: 'warning',
                duration: 3000,
                titleStyle: { fontSize: 16 }
            })
            return
        }
        setShowRateStar(true)
    }

    const confirmJob = async (textRate: string, doneStatus: any, rateLevel: number) => {
        console.log('confirm Rate ', textRate, doneStatus);
        if (!textRate.trim()) {
            showMessage({
                message: 'Vui lòng nhập nội dung đánh giá',
                type: 'warning',
                duration: 3000,
                titleStyle: { fontSize: 16 }
            })
            return
        }
        const bodyDone = {
            "rateText": textRate,
            "status": doneStatus == 1 ? 'success' : (doneStatus == 2 ? 'fail' : 'done'),
            "rateLevel": rateLevel,
            "dateDone": new Date()
        };

        let _description = inforDetailJob.description ? inforDetailJob.description + '\n' : ''
        const bodyProcess = {
            "status": "doing",
            "description": _description + textRate
        }

        console.log('bodyyyyyyy DOneeeee ', bodyDone);


        if (doneStatus != 3) {
            const request = await fetch(`${address}detailjobs/edit/${inforDetailJob.idDetailJob}`, {
                method: 'PUT',
                body: JSON.stringify(bodyDone),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const res = await request.json();
            console.log('resssss change ', res);
            if (res && res.data) {
                navigation.navigation.pop()
            } else {

            }
        } else {
            const request = await fetch(`${address}detailjobs/edit/${inforDetailJob.idDetailJob}`, {
                method: 'PUT',
                body: JSON.stringify(bodyProcess),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const res = await request.json();
            console.log('resssss change ', res);
            if (res && res.success) {
                navigation.navigation.pop()
            } else {

            }
        }
    }

    return {
        inforUser,
        inforDetailJob,
        addComment,
        loadingText,
        textComment,
        setTextComment,
        selectorMe,
        changeStatus,
        confirmJob,
        setShowRateStar,
        showRateStar,
        handleRate,
        imagePhoto,
        setImagePhoto,
        listNewText,
        listUserOfCompany,
        infoJob,
        isOpenList,
        setIsOpenList,
        handleChange
    }
}