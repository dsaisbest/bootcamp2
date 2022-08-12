import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {getDetails} from '../../reducers/details';
import {useDispatch, useSelector} from 'react-redux';
import { registerables } from 'chart.js';

export default function Lines(props) {
  
  const dataList = useSelector(state => state.details.details);
  const dispatch = useDispatch();
  console.log('coming from line',props);
  React.useEffect(() => {
    const link = `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=1&interval=hourly`;
    dispatch(getDetails(link));
    console.log('check it');
  }, []);
  return (
    <LineChart
      data={{
        datasets: [
          {
            data: dataList
              .map(ele => ele.price),
          },
        ],
      }}
      width={Dimensions.get('window').width} // from react-native
      height={Dimensions.get('window').height}
      yAxisLabel="$"
      yAxisSuffix=""
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: 'black',
        backgroundGradientFromOpacity: 1,
        backgroundGradientFrom: 'white',
        backgroundGradientTo: 'white',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 0.1) => {return((props.change>0)?`rgba(90, 255, 0,${opacity})`:`rgba(255, 0, 0,${opacity})`)},
        labelColor: (opacity = 1) => {return((props.change>0)?`rgba(90, 255, 0,${opacity})`:`rgba(255, 0, 0,${opacity})`)},
        style: {
          borderRadius: 20,
          backgroundColor: 'pink',
        },
        propsForDots: {
          r: '0',
          strokeWidth: '5',
          stroke: 'darkgreen',
        },
      }}
      bezier
    />
  );
}
