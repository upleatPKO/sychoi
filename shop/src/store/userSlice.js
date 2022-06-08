import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : { name : 'choi', age : 45 },
    reducers : {
        changeName(state){ //기존 state
            return 'seyeol' + state
        },
        increase(state, action){ //기존 state, action : 파라미터
            //state.age += 1 : state가 object/array면 return 없이 직접 수정해도 된다.
            state.age += action.payload
        }
    }
})

export let { changeName, increase } = user.actions // 만든 함수 export

export default user 