import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {getDetails} from '../../reducers/details';
import {useDispatch, useSelector} from 'react-redux';

export default function Lines(props) {
  const dataList = useSelector(state => state.details.details);
  const dispatch = useDispatch();
  console.log(props);
  React.useEffect(() => {
    const link = `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=1&interval=hourly`;
    dispatch(getDetails(link));
    console.log('check it');
  }, []);
  return (
    <LineChart
      data={{
        labels: dataList
          .filter((ele, id) => id % 3 === 0)
          .map(ele => {
            console.log(ele);
            const time = ele.time >= 12 ? 'PM' : 'AM';
            const data = (ele.time % 12).toString() + time;
            return data;
          }),
        datasets: [
          {
            data: dataList
              .filter((ele, id) => id % 3 === 0)
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
        backgroundGradientFromOpacity: 0,
        backgroundGradientFrom: 'white',
        backgroundGradientTo: 'white',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 0.1) => `rgba(19, 255, 19, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 129, 91, ${opacity})`,
        style: {
          borderRadius: 20,
          backgroundColor: 'pink',
        },
        propsForDots: {
          r: '4',
          strokeWidth: '3',
          stroke: 'darkgreen',
        },
      }}
      bezier
    />
  );
}
