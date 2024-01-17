import { createSlice } from '@reduxjs/toolkit'

const jobsSlice = createSlice({
    name: 'jobs',
    initialState: {
        account: '',
        pass: '',
        title: '',
        currentJobs: '',
        idJobs: '',
        userInfor: {},
        listJob: [],
        listProject: [],
        listMyJobs: [],
        listMyDetailJobs: [],
        listText: [],
        listUser: [],
        // currentUser: {}
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.userInfor = action.payload.userInfor
            // state.title = action.payload.title
        },
        setCurrentListJob: (state, action) => {
            state.listJob = action.payload.listJob
        },
        setListMyJob: (state, action) => {
            state.listMyJobs = action.payload.listMyJobs
        },
        setListMyDetailJob: (state, action) => {
            state.listMyDetailJobs = action.payload.listMyDetailJobs
        },
        setCurrentJobs: (state, action) => {
            state.currentJobs = action.payload.currentJobs
            state.idJobs = action.payload.idJobs
        },
        setListProject: (state, action) => {
            state.listProject = action.payload.listProject
        },
        setCurrentComment: (state, action) => {
            state.listText = action.payload.listText
        },
        setListUser: (state, action) => {
            state.listUser = action.payload.listUser
        }
    }
})

export default jobsSlice.reducer;
export const {
    setCurrentUser,
    setCurrentListJob,
    setCurrentJobs,
    setCurrentComment,
    setListUser,
    setListProject,
    setListMyJob,
    setListMyDetailJob
} = jobsSlice.actions