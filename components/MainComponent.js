import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform, StatusBar, Image, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import Aboutus from './AboutComponent';
import Contact from './ContactComponent';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from './ReservationComponent';


const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders,
        comments: state.comments
    }
};

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

const HomeNavigator = createStackNavigator();

const AboutNavigator = createStackNavigator();

const MenuNavigator = createStackNavigator();

const ContactNavigator = createStackNavigator();

const ReservationNavigator = createStackNavigator();

const MainNavigator = createDrawerNavigator();

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style = {styles.drawerHeader}>
        <View style = {{flex: 1}}>
          <Image source={require('./images/logo.png')} style = {styles.drawerImage}/>
        </View>
        <View style = {{flex: 2}}>
          <Text style={styles.drawerHeaderText}>
            Ristorante Con Fusion
          </Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </SafeAreaView>
  </ScrollView>
);


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
      options = {({ navigation }) => ({
        headerLeft: () => (
          <Icon 
            name = "menu"
            size = {34}
            color = "white"
            onPress = { () => {
              navigation.toggleDrawer()
            }}
          />
        )
      })
      }
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
        options = {({ navigation }) => ({
          headerLeft: () =>(
            <Icon 
              name = "menu"
              size = {24}
              color = "white"
              onPress = { () => (
                navigation.toggleDrawer()
              )}
            />
          )
        })
        }
      />

    </HomeNavigator.Navigator>
  );
}

function AboutNavigatorScreen() {
  return(
    <AboutNavigator.Navigator
      initialRouteName='About Us'
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

      <AboutNavigator.Screen 
        name = "About Us"
        component = {Aboutus}
        options = {({ navigation }) => ({
          headerLeft: () =>(
            <Icon 
              name = "menu"
              size = {24}
              color = "white"
              onPress = { () => {
                navigation.toggleDrawer();
              }}
            />
          )
        })
        }
      />

    </AboutNavigator.Navigator>
  );
}

function ContactNavigatorScreen() {
  return(
    <ContactNavigator.Navigator
      initialRouteName='Contact Us'
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

      <ContactNavigator.Screen 
        name = "Contact Us"
        component = {Contact}
        options = {({ navigation }) => ({
          headerLeft: () =>(
            <Icon 
              name = "menu"
              size = {24}
              color = "white"
              onPress = { () => {
                navigation.toggleDrawer();
              }}
            />
          )
        })
        }
      />

    </ContactNavigator.Navigator>
  );
}

function ReservationNavigatorScreen() {
  return(
    <ReservationNavigator.Navigator
      initialRouteName='Reserve Table'
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

      <ReservationNavigator.Screen 
        name = "Reserve Table"
        component = {Reservation}
        options = {({ navigation }) => ({
          headerLeft: () =>(
            <Icon 
              name = "menu"
              size = {24}
              color = "white"
              onPress = { () => {
                navigation.toggleDrawer();
              }}
            />
          )
        })
        }
      />

    </ReservationNavigator.Navigator>
  );
}

function MainNavigatorScreen() {
  return(
    <MainNavigator.Navigator
      drawerStyle={{ backgroundColor: "#D1C4E9" }}
      drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
		>

      <MainNavigator.Screen 
        name = "Home"
        component = {HomeNavigatorScreen}
        options = {({title: "Home"}, {
          drawerIcon: ({tintColor}) =>  (
            <Icon 
              name= "home"
              type = "font-awesome"
              size = {32}
              color = {tintColor}
            />
          )
        })}

      />

      <MainNavigator.Screen 
        name = "About Us"
        component = {AboutNavigatorScreen}
        options = {({title: "About Us"}, {
          drawerIcon: ({tintColor}) => (
            <Icon 
            name= "info-circle"
            type = "font-awesome"
            size = {32}
            color = {tintColor}
            />
          )
        })}
      />

      <MainNavigator.Screen 
        name = "Menu"
        component = {MenuNavigatorScreen}
        options = {({title: "Menu"}, {
          drawerIcon: ({tintColor}) =>  (
            <Icon 
              name= "list"
              type = "font-awesome"
              size = {32}
              color = {tintColor}
            />
          )
        })}
      />

      <MainNavigator.Screen 
        name = "Contact Us"
        component = {ContactNavigatorScreen}
        options = {({title: "Contact Us"}, {
          drawerIcon : ({tintColor}) => (
            <Icon 
              name= "address-card"
              type = "font-awesome"
              size = {30}
              color = {tintColor}
            />
          )
        })}
      />

      <MainNavigator.Screen 
        name = "Reserve Table"
        component = {ReservationNavigatorScreen}
        options = {({title: "Reserve Table"}, {
          drawerIcon : ({tintColor}) => (
            <Icon 
              name= "cutlery"
              type = "font-awesome"
              size = {30}
              color = {tintColor}
            />
          )
        })}
      />

    </MainNavigator.Navigator>
  );
}


class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    return (
      <View style={{flex:1, paddingTop: Platform.OS ==='ios'? 0: StatusBar.currentHeight}} >
        <NavigationContainer>
          <MainNavigatorScreen />           
        </NavigationContainer>
      </View>
    );	    
  }	  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);