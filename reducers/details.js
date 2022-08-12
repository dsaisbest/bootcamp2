import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const getDetails = createAsyncThunk(
  'details/fetchData',
  async (link, thunkAPI) => {
    console.log('extracting data', link);
    const data = await axios
      .get(link)
      .then(response => response.data)
      .then(dataList => {
        dataList = dataList.prices;
        console.log(dataList);
        const list = dataList.map(ele => ({
          time: new Date(ele[0] * 1000).getHours(),
          price: ele[1],
        }));
        return list;
      });
    data.sort(function(a,b){ return (a['time']- b['time'])})
    return data;
  },
);

export const counterSlice = createSlice({
  name: 'details',
  initialState: {
    details: [],
  },
  reducers: {
    addData: (state, action) => {
      state.details = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getDetails.fulfilled, (state, action) => {
      state.details = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export {getDetails};
export default counterSlice.reducer;
