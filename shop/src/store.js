import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'


let stock = createSlice({
    name : 'stock', // state 이름
    initialState : [10, 11, 12]
})

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count:2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        addCount(state, action){ 
            let 번호 = state.findIndex((a)=> { return a.id == action.payload }) // findIndex : array에서 원하는거 몇번째 있나 찾아주는 함수, 파라미터 a는 배열의 각 항목을 의미함
            state[번호].count++
        },
        addItem(state, action){ 
            state.push(action.payload)
        }
    }
})

export let { addCount, addItem } = cart.actions //state 수정함수 export

export default configureStore({
  reducer: {
      user : user.reducer, 
      stock : stock.reducer,
      cart : cart.reducer
   }
}) 

// createSlice()로 state 만들고 configureStore()안에 state 등록