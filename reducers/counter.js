import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const getData = createAsyncThunk('data/fetchData', async (link, thunkAPI) => {
  console.log('getting data for the first time',link);
  const data = await axios
    .get(link)
    .then(response => response.data)
    .then(dataList => {
      const list = dataList.map(ele => ({
        symbol: ele.symbol,
        averagePrice: ele.current_price,
        image: ele.image,
        name: ele.name,
        percentageChange: ele.price_change_percentage_24h,
        id: ele.id,
      }));
      return list;
    });
  return data;
});
const resetData = createAsyncThunk('data/eraseData',async (link,thunkAPI)=>{
  console.log('reseting data',link);
  const data = await axios
    .get(link)
    .then(response => response.data)
    .then(dataList => {
      const list = dataList.map(ele => ({
        symbol: ele.symbol,
        averagePrice: ele.current_price,
        image: ele.image,
        name: ele.name,
        percentageChange: ele.price_change_24h,
        id: ele.id,
      }));
      return list;
    });
  return data;
})
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    apiData: [],
    loading: false,
    page: 1,
  },
  reducers: {
    
  },
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.apiData.push(...action.payload);
      state.loading = false;
      state.page = state.page + 1;
    });
    builder.addCase(getData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetData.fulfilled,(state,action)=>{
      console.log(action.payload);
      state.apiData=action.payload;
      state.page = 2;
      
    });
    builder.addCase(resetData.rejected,(state,action)=>{
      console.log('error in fetching data');
    })
  },
});

// Action creators are generated for each case reducer function

export {getData,resetData};
export default counterSlice.reducer;
