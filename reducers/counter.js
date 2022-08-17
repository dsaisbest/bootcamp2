import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);

    await AsyncStorage.setItem('favourites', jsonValue);
  } catch (e) {
    console.log(e);
  }
};
const seeding = createAsyncThunk(
  'data/fetchfavourite',
  async (link, thunkAPI) => {
    return AsyncStorage.getItem('favourites')
      .then(res => JSON.parse(res))
      .catch(err => console.log('this error happened because', err));
  },
);

const getData = createAsyncThunk('data/fetchData', async (link, thunkAPI) => {
  const data = await axios
    .get(link)
    .then(response => response.data)
    .then(dataList => {
      const list = dataList.map((ele, ind) => ({
        symbol: ele.symbol,
        averagePrice: ele.current_price,
        image: ele.image,
        name: ele.name,
        percentageChange: ele.price_change_percentage_24h,
        id: ele.id,
        favourite: false,
        index: ind,
      }));
      return list;
    });
  return data;
});
const resetData = createAsyncThunk('data/eraseData', async (link, thunkAPI) => {
  const data = await axios
    .get(link)
    .then(response => response.data)
    .then(dataList => {
      const list = dataList.map((ele, ind) => ({
        symbol: ele.symbol,
        averagePrice: ele.current_price,
        image: ele.image,
        name: ele.name,
        percentageChange: ele.price_change_24h,
        id: ele.id,
        favourite: false,
        index: ind,
      }));
      return list;
    });
  return data;
});
const loadFavouriteData = createAsyncThunk(
  'data/favourite',
  async (favouriteData, thunkAPI) => {
    const link = 'https://api.coingecko.com/api/v3/simple/price';
    const ids = String(favouriteData.map(ele => ele.id));
    console.log(ids);
    const obj = {
      ids: ids,
      vs_currencies: 'usd',
      include_market_cap: 'false',
      include_24hr_vol: 'false',
      include_24hr_change: 'true',
      include_last_updated_at: 'false',
    };
    const data = await axios.get(link, {params: obj}).then(res => {
      console.log(res);
      return res.data;
    });
    return data;
  },
);
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    apiData: [],
    loading: false,
    page: 1,
    favourites: [],
  },
  reducers: {
    makeFavourite(state, action) {
      const index = state.favourites.findIndex(
        (ele, ind) => ele.symbol === action.payload,
      );
      const elementindex = state.apiData.findIndex(
        ele => ele.symbol === action.payload,
      );
      if (index === -1) {
        state.favourites.push(state.apiData[elementindex]);
        state.apiData[elementindex].favourite = true;
      } else {
        if (elementindex !== -1) state.apiData[elementindex].favourite = false;
        state.favourites = state.favourites.filter(
          ele => ele.symbol != action.payload,
        );
      }
      storeData(state.favourites);
    },
  },
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      let favouriteData = new Set();
      state.favourites.forEach(ele => favouriteData.add(ele.id));
      let filteredData = action.payload.map(ele => {
        ele['favourite'] = favouriteData.has(ele.id);
        return ele;
      });
      state.apiData.push(...filteredData);
      state.loading = false;
      state.page = state.page + 1;
    });
    builder.addCase(getData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetData.fulfilled, (state, action) => {
      let favouriteData = new Set();
      state.favourites.forEach(ele => favouriteData.add(ele.id));
      let filteredData = action.payload.map(ele => {
        ele['favourite'] = favouriteData.has(ele.id);
        return ele;
      });
      state.apiData = filteredData;
      state.page = 2;
    });
    builder.addCase(resetData.rejected, (state, action) => {
      console.log('error in fetching data');
    });
    builder.addCase(loadFavouriteData.fulfilled, (state, action) => {
      state.favourites.map((ele, id) => {
        state.favourites[id].averagePrice = action.payload[ele.id].usd;
      });
    });
    builder.addCase(seeding.fulfilled, (state, action) => {
      if (action.payload) {
        state.favourites = action.payload;
      }
    });
    builder.addCase(seeding.rejected, (state, action) => {
      console.log('rejected', action.error);
    });
  },
});

// Action creators are generated for each case reducer function

export {getData, resetData, loadFavouriteData, seeding};
export const {makeFavourite} = counterSlice.actions;
export default counterSlice.reducer;
