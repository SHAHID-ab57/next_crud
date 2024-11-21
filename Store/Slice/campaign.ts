import { base_url, endpoints } from "@/Api/Api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface campState {
  state: string;
  message: string | undefined;
  userData: any[]; 
  userDataId: any; // Store single campaign data by ID
}

const initialState: campState = {
  state: "idle",
  message: "",
  userData: [], // For storing all campaigns
  userDataId: {} // For storing a single campaign by ID
};

// Campaign input thunk
export const campainginput = createAsyncThunk("capm/campainginput", async (data: any) => {
  try {
    let response = await axios.post(base_url + endpoints.campaign, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// Campaign list thunk
export const campainglist = createAsyncThunk("capm/campainglist", async () => {
  try {
    let response = await axios.get(base_url + endpoints.campaign);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// Campaign list by ID 
export const campainglistbyid = createAsyncThunk("capm/campainglistbyid", async (id: string) => {
  try {
    let response = await axios.get(`${base_url + endpoints.campaign}/${id}`);
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// Update campaign by ID thunk
export const updatecampainglistbyid = createAsyncThunk("capm/updatecampainglistbyid", async (data: any) => {
  try {
    const { id, ...campaignData } = data; // Assuming `id` is passed separately from other data
    let response = await axios.put(`${base_url + endpoints.campaign}/${id}`, campaignData);
    console.log(response);
    return response.data; // Return updated campaign
  } catch (error) {
    console.error(error);
    throw error;
  }
});
export const deleteCampaignById = createAsyncThunk("capm/deleteCampaignById", async (id: string) => {
  try {
     // Assuming `id` is passed separately from other data
    let response = await axios.delete(`${base_url + endpoints.campaign}/${id}`);
    console.log(response);
    return response.data; // Return updated campaign
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const campaignSlice = createSlice({
  name: "capm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Campaign input cases
    builder.addCase(campainginput.pending, (state, action) => {
      state.state = "loading";
    });
    builder.addCase(campainginput.fulfilled, (state, action) => {
      state.state = "succeeded";
    });
    builder.addCase(campainginput.rejected, (state, action) => {
      state.state = "failed";
      state.message = action.error.message;
    });

    // Campaign list cases
    builder.addCase(campainglist.pending, (state, action) => {
      state.state = "loading";
    });
    builder.addCase(campainglist.fulfilled, (state, action) => {
      state.state = "succeeded";
      state.userData = action.payload; // Store all campaigns
    });
    builder.addCase(campainglist.rejected, (state, action) => {
      state.state = "failed";
      state.message = action.error.message;
    });

    // Campaign list by ID cases
    builder.addCase(campainglistbyid.pending, (state, action) => {
      state.state = "loading";
    });
    builder.addCase(campainglistbyid.fulfilled, (state, action) => {
      state.state = "succeeded";
      state.userDataId = action.payload; // Store specific campaign by ID
    });
    builder.addCase(campainglistbyid.rejected, (state, action) => {
      state.state = "failed";
      state.message = action.error.message;
    });

    // Update campaign by ID cases
    builder.addCase(updatecampainglistbyid.pending, (state, action) => {
      state.state = "loading";
    });
    builder.addCase(updatecampainglistbyid.fulfilled, (state, action) => {
      state.state = "succeeded";
      // Update the specific campaign in userData or userDataId after successful update
      state.userDataId = action.payload;
      // Optionally, update the campaign list if you want to reflect the updated campaign there too
      const index = state.userData.findIndex((campaign) => campaign.id === action.payload.id);
      if (index !== -1) {
        state.userData[index] = action.payload;
      }
    });
    builder.addCase(updatecampainglistbyid.rejected, (state, action) => {
      state.state = "failed";
      state.message = action.error.message;
    });

     // Delete campaign by ID cases
     builder.addCase(deleteCampaignById.pending, (state, action) => {
      state.state = "loading";
    });
    builder.addCase(deleteCampaignById.fulfilled, (state, action) => {
      state.state = "succeeded";
      // Optionally, remove the deleted campaign from the userData array
      state.userData = state.userData.filter((campaign) => campaign.id !== action.meta.arg);
    });
    builder.addCase(deleteCampaignById.rejected, (state, action) => {
      state.state = "failed";
      state.message = action.error.message;
    });
  },
});

export default campaignSlice.reducer;
