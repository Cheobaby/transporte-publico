import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';

export default class App extends React.Component {
    state = {
        showModal: false,
        status: "Pending"
    };
    handleResponse = data => {
        if (data.title === "success") {
            this.setState({ showModal: false, status: "Complete" });
        } else if (data.title === "cancel") {
            this.setState({ showModal: false, status: "Cancelled" });
        } else {
            return;
        }
    };
    render() {
        const datos = this.props.route.params.datos;        
        return (
            <View style={{ marginTop: 100,flex:1,justifyContent:'center',alignItems:'center'}}>
                <Modal
                    visible={this.state.showModal}
                    onRequestClose={() => this.setState({ showModal: false })}
                >
                    <WebView
                        source={{ uri: "http://10.13.10.191:3000" }}
                        onNavigationStateChange={data =>
                            this.handleResponse(data)
                        }
                        injectedJavaScript={`document.f1.submit()`}
                    />
                </Modal>
                <TouchableOpacity
                    style={{ width: 300, height: 50,backgroundColor:'yellow',justifyContent:'center',alignItems:'center',borderRadius:8,flexDirection:'row'}}
                    onPress={() => this.setState({ showModal: true })}                    
                >
                    <Text style={{fontWeight:'bold',color:'blue'}}>Pagar</Text>
                    <Icon size={22} color={'blue'} name="logo-paypal"></Icon>
                </TouchableOpacity>
                <Text>Payment Status: {this.state.status}</Text>
            </View>
        );
    }
}




