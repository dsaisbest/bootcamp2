import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    "container":{
        flex:1,
        justifyContent:"flex-start"
    },
    "items":{
        backgroundColor:'coral',
        margin: 1,
        padding:15,
        flex:1,
        
        justifyContent:"space-between",
        flexDirection:"row",
        borderRadius:3,
        flexWrap:'wrap'
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
        justifyContent:'flex-start',
        height:50,
        flexWrap:"wrap"
      },
      'textinput':{
        width:'100%',
        height:60,
        paddingLeft:20,
        backgroundColor:'#B0E0E6',
        fontSize:20,
        fontWeight:'200'
      }
})
export default styles