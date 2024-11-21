import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchTerm: string ;
  filteredCampaigns: any[]; 
}

const initialState: SearchState = {
  searchTerm: "",
  filteredCampaigns: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      // console.log("action.payload",action.payload);
    },

    
    setFilteredCampaigns(state, action: PayloadAction<any[]>) {
      state.filteredCampaigns = action.payload;
    },
  },
});

export const { setSearchTerm, setFilteredCampaigns } = searchSlice.actions;

export default searchSlice.reducer;
