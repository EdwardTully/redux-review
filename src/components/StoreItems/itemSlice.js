import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

//since this slice will get external data, we import createAsyncThunk to handle the async fetch.  We also need createSlice to make the slice and Axios to handle the get data.

//In a slice we need to define initial state, our action and build the slice.

//with the asyncthunk, since three life cycles of the data fetch process are returned, we can define our init state to reflect the returns of pending,fulfilled, rejected

const initialState = {
    loading: false,
    products: [],
    error: ''
}

//our thunk

export const fetchData= createAsyncThunk('products/fetchData', (val)=>{
     return axios
    .get(`http://localhost:4000/products?category=${val}`)
    .then((response)=>response.data)
})

//to create the slice itself, we need to include the name of the slice, the initial state and the reducers.  In this case with the async thunk, we add these reducers as extraReducers.  Use builder/builder.addCase to manage the returned stuff from the async action and payload

const itemsSlice = createSlice({
    name: 'items',
    initialState: initialState,
    extraReducers: (builder)=>{
        builder.addCase(fetchData.pending, (state)=>{
            state.loading=true
        })
        builder.addCase(fetchData.fulfilled, (state, action)=>{
            state.loading = false
            state.products= action.payload
            state.error= ''
        })
        builder.addCase(fetchData.rejected, (state, action)=>{
            state.loading= false
            state.products=[]
            state.error=action.error.message
        })
    }})


    //the async thunk is exported by definition above.  It will be imported by the view.  The reducer is exported below at the end as a default export, it will be imported by the store.

    export default itemsSlice.reducer