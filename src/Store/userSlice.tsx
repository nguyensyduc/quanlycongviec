import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {},
    },
    reducers: {
        setCurrentUserDetail: (state, action) => {
            let _currentUser = { ...action.payload.currentUser };
            console.log('actionnnnnn ', _currentUser);
            if (_currentUser.name) {
                state.currentUser = _currentUser;
            } else {
                state.currentUser = {}
            }
        }
    }
})

export default userSlice.reducer;
export const { setCurrentUserDetail } = userSlice.actions