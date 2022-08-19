import {
  View,
  Dimensions,
  ActivityIndicator,
  Button,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {getDetails} from '../../reducers/details';
import {useDispatch, useSelector} from 'react-redux';

function getLink(id, days) {
  return `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`;
}
export default function Lines(props) {
  const dataList = useSelector(state => state.details.details);
  const dispatch = useDispatch();
  console.log('coming from line', props);
  React.useEffect(() => {
    const link = `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=1&interval=hourly`;
    dispatch(getDetails(link));
  }, []);
  return (
    <ScrollView>
    
<View style={{height:500,justifyContent:'center'}}>
      {dataList.length === 0 ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <LineChart
          data={{
            datasets: [
              {
                data: dataList.map(ele => Number(ele.price)),
              },
            ],
          }}
          withInnerLines={false}
          width={Dimensions.get('window').width} // from react-native
          height={Dimensions.get('window').height * 0.6}
          yAxisLabel="$"
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            fillShadowGradientFrom:'white',
            fillShadowGradientTo:'white',
            backgroundColor: 'black',
            backgroundGradientFromOpacity: 1,
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 0.1) => {
              return props.change > 0
                ? `rgba(0, 100, 0,${opacity})`
                : `rgba(255, 0, 0,${opacity})`;
            },
            labelColor: (opacity = 1) => {
              return props.change > 0
                ? `rgba(0, 100, 0,${opacity})`
                : `rgba(255, 0, 0,${opacity})`;
            },
            style: {
              borderRadius: 20,
              backgroundColor: 'pink',
              margin: 0,
            },
            propsForDots: {
              r: '0',
              strokeWidth: '15',
              stroke: 'black',
            },
          }}
        />
       
      )}
      </View>
      <View>
      <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
        <Button
          title="1D"
          onPress={() => dispatch(getDetails(getLink(props.id, 1)))}
        />
        <Button
          title="7D"
          onPress={() => dispatch(getDetails(getLink(props.id, 7)))}
        />
        <Button
          title="30D"
          onPress={() => dispatch(getDetails(getLink(props.id, 30)))}
        />
        <Button
          title="365D"
          onPress={() => dispatch(getDetails(getLink(props.id, 365)))}
        />
      </View>
      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',margin:21}}>
      <View>
      <TouchableOpacity style={{backgroundColor:'purple',height:53,paddingVertical:15,flex:1,alignItems:'center',width:Dimensions.get('window').width*0.4}}>
      <Text style={{fontSize:20,color:"white"}}>Buy</Text>
     </TouchableOpacity>
     </View>
     <View>
     <TouchableOpacity style={{backgroundColor:'purple',height:53,paddingVertical:15,flex:1,alignItems:'center',width:Dimensions.get('window').width*0.4}}>
      <Text style={{fontSize:20,color:"white"}}>Sell</Text>
     </TouchableOpacity>
     </View>
      </View>
      </View>
    </ScrollView>
  );
}
