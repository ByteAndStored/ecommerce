import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

export default function Loading() {
  return (
    <div className=' absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center'>


    <InfinitySpin
    visible={true}
    width="200"
    color="#4fa94d"
    ariaLabel="infinity-spin-loading"
    />
    </div>
      
   )
  
}
