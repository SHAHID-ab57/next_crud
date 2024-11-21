import { configureStore } from "@reduxjs/toolkit";
import authreducer from "@/Store/Slice/Auth"
import campaignreducer from "@/Store/Slice/campaign"
import searchreducer from "@/Store/Slice/search"


export const makestore = ()=>{

 return configureStore({
    reducer:{
      auth:authreducer,
      camp:campaignreducer,
      search:searchreducer
    }
})
}

export type AppStore = ReturnType<typeof makestore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']