import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from './StoreItems/itemSlice'

//for the store, import the reducer from the slice, then include that in an object passed into config store,  now we have a store!

const store = configureStore({
    reducer:{
        items: itemsReducer
    }
})

export default store