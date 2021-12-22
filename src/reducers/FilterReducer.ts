import React from 'react';
import { FilterValuesType } from '../App';

export  const FilterReducer = (state:FilterValuesType, action: tsarTypr) => {
   switch (action.type) {
       case "FILTER": {return state = action.filter}
       default: return state

   }
};

type tsarTypr = activeACType
    type activeACType = ReturnType<typeof filterAC>
 export const filterAC = (filter:FilterValuesType) => {return{type:'FILTER', filter}as const}


