import React, { useEffect, useState } from 'react'
import OrderMenuService from '../../../services/OrderMenuService';

function MonthCost() {
    const [Cost, setCost] = useState();


    const Costs = () => {
      OrderMenuService.monthCost().then((res) => {
        setCost(res.data)
        console.log(res.data)
      })    
    }

    useEffect(() =>{
        Costs();
    },[])
    

  return (
    <div>monthCost</div>
  )
}

export default MonthCost