import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const getData = createAsyncThunk('data/fetchData', async (link, thunkAPI) => {
  const data = await axios
    .get(link)
    .then(response => response.data) 
    .then(dataList => {
      console.log(dataList[0]);
      const list = dataList.map(ele => ({
        symbol: ele.symbol,
        averagePrice: ele.weightedAvgPrice,
      }));
      return list;
    });

  return data;
});

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    apiData: false,
  },
  reducers: {
    addData: (state, action) => {
      state.apiData = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.apiData = action.payload;
    });
    builder.addCase(getData.pending, (state, action) => {
      state.apiData = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {increment, decrement, incrementByAmount} = counterSlice.actions;
export {getData};
export default counterSlice.reducer;
