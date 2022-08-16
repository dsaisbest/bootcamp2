import {
  View,
  Dimensions,
  ActivityIndicator,
  Text,
  ScrollView,
} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {getDetails} from '../../reducers/details';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Styles';

function Tiles({value, text}) {
  return (
    <View
      style={{
        backgroundColor: '#e4eaf5',
        padding: 10,
        margin: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text style={{fontSize: 22, fontWeight: '100'}}>{text}</Text>
      <Text style={{fontSize: 22, fontWeight: '200'}}>{value.toFixed(2)}</Text>
    </View>
  );
}

export default function Lines(props) {
  const dataList = useSelector(state => state.details.details);
  const dispatch = useDispatch();
  let [minValue, maxValue] = [1e9, 0];
  dataList.forEach(element => {
    minValue = Math.min(minValue, element.price);
    maxValue = Math.max(maxValue, element.price);
  });
  React.useEffect(() => {
    const link = `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=1&interval=hourly`;
    dispatch(getDetails(link));
    console.log('check it');
  }, []);
  return (
    <View>
      {dataList.length === 0 ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <View>
          <LineChart
            data={{
              datasets: [
                {
                  data: dataList.map(ele => Number(ele.price)),
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={Dimensions.get('window').height * 0.6}
            yAxisLabel="$"
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFromOpacity: 1,
              backgroundGradientFrom: 'white',
              backgroundGradientTo: 'white',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 0.1) => {
                return props.change > 0
                  ? `rgba(90, 255, 0,${opacity})`
                  : `rgba(255, 0, 0,${opacity})`;
              },
              labelColor: (opacity = 1) => {
                return props.change > 0
                  ? `rgba(90, 255, 0,${opacity})`
                  : `rgba(255, 0, 0,${opacity})`;
              },
              propsForDots: {
                r: '0',
                strokeWidth: '15',
                stroke: 'black',
              },
              style: {
                borderColor: 'black',
                borderStyle: 'dashed',
              },
            }}
            bezier
          />
          <View style={styles.metaData}>
            <Tiles value={maxValue} text={'Highest'} />
            <Tiles value={minValue} text={'Lowest'} />
          </View>
        </View>
      )}
    </View>
  );
}
