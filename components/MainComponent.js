import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const MenuNavigator = createStackNavigator();

const HomeNavigator = createStackNavigator();

const MainNavigator = createDrawerNavigator();

function MenuNavigatorScreen() {
  return(
    <MenuNavigator.Navigator
      initialRouteName='Menu'
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8"
        },
        
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff"            
          }
        }}
    >

    <MenuNavigator.Screen 
      name="Menu"
      component={Menu} 
    />
            
    <MenuNavigator.Screen
      name="Dishdetail"
      component={Dishdetail}
      options={{ headerTitle: "Dish Detail"}}
    /> 

    </MenuNavigator.Navigator>
  );
}

function HomeNavigatorScreen() {
  return(
    <HomeNavigator.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8"
        },
        
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff"            
          }
        }}
    >

      <HomeNavigator.Screen 
        name = "Home"
        component = {Home}
        options = {{ headerTitle: "Home"}}
      />

    </HomeNavigator.Navigator>
  );
}

function MainNavigatorScreen() {
  return(
    <MainNavigator.Navigator drawerStyle= {{backgroundColor : '#D1C4E9'}} >

      <MainNavigator.Screen 
        name = "Home"
        component = {HomeNavigatorScreen}
        options = {{title: "Home"}}
      />

      <MainNavigator.Screen 
        name = "Menu"
        component = {MenuNavigatorScreen}
        options = {{title: "Menu"}}
      />

    </MainNavigator.Navigator>
  );
}


class Main extends Component {

  render() {


    return (
      <View style={{flex:1,paddingTop:Platform.OS==='ios'?0:StatusBar.currentHeight}} >
        <NavigationContainer>
          <MainNavigatorScreen />           
        </NavigationContainer>
      </View>
    );	    
  }	  
}

export default Main;