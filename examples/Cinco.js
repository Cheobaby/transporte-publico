import React from "react";
import {View,StyleSheet,Text, Button} from 'react-native';
const styles=StyleSheet.create({
    header:{
        flex:1,        
        justifyContent:'flex-end',       
    },
    footer:{        
        backgroundColor:'#5DB5F7',
        justifyContent:'center', 
        alignItems:'center',
        height:'45%',     
        borderRadius:40,                
    },
});

const Cinco=()=>{
    return (
        <View style={styles.header}>            
            <View style={styles.footer}>
                <Button title="PRESIONAME" color={'#000000'}/>
            </View>
        </View>
    );
};

export default Cinco;
 

