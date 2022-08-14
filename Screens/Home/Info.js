import { Image,Text,View } from "react-native";
import * as React from 'react'
import styles from "./Styles";
export default function Info(props) {
    return (
      <View style={styles.items}>
        <View style={styles['sub-itmes']}>
          <Image source={{uri: props.image}} style={styles.logo} />
          <Text style={{fontWeight: '700', fontSize: 15, textAlign: 'center'}}>
            {props.name}
          </Text>
          <Text style={{fontStyle: 'italic', color: 'grey'}}>{props.symbol}</Text>
        </View>
        <View style={styles.price}>
          <Text style={{fontWeight: '800', fontSize: 16}}>
            {'\u0024'}
            {props.averagePrice.toLocaleString()}
          </Text>
          <Text style={{fontWeight: '600', fontSize: 12}}>
            {props.percentageChange > 0 ? (
              <Text style={{color: 'green'}}>▲</Text>
            ) : (
              <Text style={{color: 'red'}}>▼</Text>
            )}{' '}
            {props.percentageChange.toFixed(3)}
            <Text style={{fontSize: 10, fontWeight: '900'}}>%</Text>
          </Text>
        </View>
      </View>
    );
  }