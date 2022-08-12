import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const getData = createAsyncThunk('data/fetchData', async (link, thunkAPI) => {
  const data = await axios
    .get(link)
    .then(response => response.data) 
    .then(dataList => {
      const list = dataList.map(ele => ({
        symbol: ele.symbol,
        averagePrice: ele.current_price,
        image:ele.image,
        name:ele.name,
        percentageChange:ele.price_change_24h,
        id:ele.id
      }));
      return list;
    });
  return data;
});

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    apiData: [],
  },
  reducers: {
    addData: (state, action) => {
      state.apiData = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.apiData.push (...action.payload);
    });
   
  },
});

// Action creators are generated for each case reducer function
export {getData};
export default counterSlice.reducer;
