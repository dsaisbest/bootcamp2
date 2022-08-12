import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    "container":{
        flex:1,
    },
    "items":{
        backgroundColor:'coral',
        margin: 2,
        padding:15,
        flex:1,
        justifyContent:"space-between",
        flexDirection:"row",
        borderRadius:3
      },
      "logo":{
        width:50,
        height:40,
        marginRight:10
        // backgroundColor:'black'
      },
      "sub-itmes":{
        flex:1,
        flexWrap:"wrap",
        height:40,
        // backgroundColor:'black',
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"flex-start"
      },
      "price":{
        flex:1,
        flexDirection:"column",
        alignItems:'flex-end',
        justifyContent:'space-between'
      }
})
export default styles