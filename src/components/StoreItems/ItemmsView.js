import React, {useState}from 'react'
import {useDispatch, useSelector} from "react-redux"
import { fetchData } from './itemSlice'

//useDispatch will fire the action. UseEffect fires on component mount
//useSelector will return the state of the slice. we will assign this to a variable


function ItemmsView() {

    const [val, setVal]=useState('')

    const dispatch = useDispatch()

    const itemFetch= useSelector((state)=>state.items)
    
    //useEffect(()=>{
   //   dispatch(fetchData())
  //  },[])

  //added button to fire off dispatch, added search term to fetchData to pass along to the action creator
  //added local state variable which is changed by input box so that user can dispatch a desired search term.

  return (
    <div>
        <input type='text' value={val} onChange={(e)=> setVal(e.target.value)}/>
      <button onClick={()=>dispatch(fetchData(val))}>Click</button>
        {itemFetch.loading && <div>Loading...</div>}
        {!itemFetch.loading && itemFetch.error ? <div> Error: {itemFetch.error}</div>:null}
        {!itemFetch.loading && itemFetch.products.length ? (
            <ul>
                {itemFetch.products.map((ea)=>(
                    <li key={ea.id}>{ea.title}</li>
                ))}
            </ul>
        ):null}
      
    </div>
  )
}

export default ItemmsView