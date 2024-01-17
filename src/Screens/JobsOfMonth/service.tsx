import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const UseJobsOfMonth = (navigate: NativeStackScreenProps<any>) => {
    const inforUser = navigate.route.params?.infoUser
    const listJob = useSelector((state: any) => state.jobs.listJob)
    const listProject = useSelector((state: any) => state.jobs.listProject)
    const [listSuccess, setListSuccess] = useState<any[]>([])
    const [listFail, setListFail] = useState<any[]>([])
    const [currentDate, setCurrentDate] = useState<string>('')
    const [currentDateEnd, setCurrentDateEnd] = useState<string>('')
    const [newList, setNewList] = useState<any[]>([])
    useEffect(() => {
        getNameJob()
    }, [])

    const gotoDetail = (inforUser: any, detailJob: any) => {
        let infoJob = {}
        listJob.map((itemJob: any) => {
            if (detailJob.idJob == itemJob.idJobs) {
                infoJob = itemJob
            }
        })
        navigate.navigation.navigate('DetailJobScreen', { inforUser: inforUser, inforDetailJob: detailJob, inforJob: infoJob })
    }

    const getNameJob = async () => {
        let _listJob: Array<any> = []
        let _listProject: Array<any> = []
        let _newList: Array<any> = []
        listProject.map((item: any) => {
            if (item.creater == inforUser.name) {
                _listProject.push(item)
            } else {
                item.members.map((itemMembers: any) => {
                    if (itemMembers == inforUser.name) {
                        _listProject.push(item)
                    }
                })
            }

        })
        _listProject.map((item: any) => {
            listJob.map((itemJob: any) => {
                if (item.idJobs == itemJob.idJob) {
                    _newList.push({
                        ...itemJob,
                        nameProject: item.name
                    })
                }
            })
        })

        const dateToday = new Date()
        const month = dateToday.getMonth() + 1
        const year = dateToday.getFullYear()
        await setNewList(_newList)
        getJobsOfCurrentMonth(month, year, _newList)
    }

    const filter = (month: any, year: any, endMonth?: any, endYear?: any) => {
        if (endMonth && endYear) {
            console.log('vao ham range');
            
            getJobsOfCurrentMonthRange(month, year, endMonth, endYear, newList)
            return
        }
        console.log('k vao ham range');
        getJobsOfCurrentMonth(month, year, newList)
    }

    const getJobsOfCurrentMonthRange = async (month: any, year: any, endMonth: any, endYear: any, newListPro: Array<any>) => {
        let listJobSuccess: Array<any> = []
        let listJobFail: Array<any> = []
        newListPro.map((item: any) => {
            let dateDone = new Date(item.dateDone)
            // let _dateDone = `${dateDone.getMonth() + 1}-${dateDone.getFullYear()}`
            let _dateDone = dateDone.getTime()
            let dateFilter = new Date(`${year}-${month}-1`)
            let _dateFilter = dateFilter.getTime()
            let dateFilterEnd = new Date(`${endYear}-${endMonth}-30`)
            let _dateFilterEnd = dateFilterEnd.getTime()
            if (item.members) {
                if (item.members == inforUser.name && item.status == 'success' && (_dateDone >= _dateFilter && _dateDone <= _dateFilterEnd)) {
                    listJobSuccess.push(item)
                }
            } else {
                if (item.creater == inforUser.name && item.status == 'success' && (_dateDone >= _dateFilter && _dateDone <= _dateFilterEnd)) {
                    listJobSuccess.push(item)
                }
            }
        })
        newListPro.map((item: any) => {
            let dateDone = new Date(item.dateDone)
            let _dateDone = dateDone.getTime()
            let dateFilter = new Date(`${year}-${month}-1`)
            let _dateFilter = dateFilter.getTime()
            let dateFilterEnd = new Date(`${endYear}-${endMonth}-30`)
            let _dateFilterEnd = dateFilterEnd.getTime()
            if (item.members) {
                if (item.members == inforUser.name && item.status == 'fail' && (_dateDone >= _dateFilter && _dateDone <= _dateFilterEnd)) {
                    listJobFail.push(item)
                }
            } else {
                if (item.creater == inforUser.name && item.status == 'fail' && (_dateDone >= _dateFilter && _dateDone <= _dateFilterEnd)) {
                    listJobFail.push(item)
                }
            }
        })

        await setListSuccess(listJobSuccess)
        await setListFail(listJobFail)
        await setCurrentDate(`${month}-${year}`)
        await setCurrentDateEnd(`${endMonth}-${endYear}`)
    }

    const getJobsOfCurrentMonth = async (month: any, year: any, newListPro: Array<any>) => {
        let listJobSuccess: Array<any> = []
        let listJobFail: Array<any> = []
        newListPro.map((item: any) => {
            let dateDone = new Date(item.dateDone)
            let _dateDone = `${dateDone.getMonth() + 1}-${dateDone.getFullYear()}`
            let dateFilter = `${month}-${year}`
            if (item.members) {
                if (item.members == inforUser.name && item.status == 'success' && _dateDone == dateFilter) {
                    listJobSuccess.push(item)
                }
            } else {
                if (item.creater == inforUser.name && item.status == 'success' && _dateDone == dateFilter) {
                    listJobSuccess.push(item)
                }
            }
        })
        newListPro.map((item: any) => {
            let dateDone = new Date(item.dateDone)
            let _dateDone = `${dateDone.getMonth() + 1}-${dateDone.getFullYear()}`
            let dateFilter = `${month}-${year}`
            if (item.members) {
                if (item.members == inforUser.name && item.status == 'fail' && _dateDone == dateFilter) {
                    listJobFail.push(item)
                }
            } else {
                if (item.creater == inforUser.name && item.status == 'fail' && _dateDone == dateFilter) {
                    listJobFail.push(item)
                }
            }
        })

        await setListSuccess(listJobSuccess)
        await setListFail(listJobFail)
        await setCurrentDate(`${month}-${year}`)
    }

    return {
        inforUser,
        listSuccess,
        listFail,
        currentDate,
        currentDateEnd,
        setCurrentDateEnd,
        filter,
        gotoDetail
    }
}   