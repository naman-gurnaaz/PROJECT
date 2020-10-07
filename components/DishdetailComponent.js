import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Modal, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavourite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favourites: state.favourites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavourite: (dishId) => dispatch(postFavourite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})



function RenderDish(props) {

    const dish = props.dish;

    const recognizeDrag = ({ moveX, moveY, dx, dy}) => {
        if (dx < -200)
            return true;
        else 
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderEnd: (e, gestureState) => {
            if(recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favourite',
                    'Are you sure you wish to add ' + dish.name + ' to your Favourites?',
                    [
                        {
                            text : 'Cancel', 
                            onPress : () => console.log('Cancel Pressed'), 
                            style : 'cancel'
                        }, 
                        {
                            text : 'OK',
                            onPress: () => {props.favourite ? console.log('Already favourite') : props.onPress()}
                        }
                    ],
                    {cancelable : false}
                );
            return true;
        }
    });

    
        if (dish != null) {
            return(
                <Animatable.View animation = 'fadeInDown' duration = {2000} delay = {1000}
                    {...panResponder.panHandlers}>

                    <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}>
                        <Text style={{margin: 10}}>
                            {dish.description}
                        </Text>
                        <View style = {{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Icon 
                            raised
                            reverse
                            name={ props.favourite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#512D'
                            onPress={() => props.favourite ? console.log('Already favourite') : props.onPress()}
                        />

                        <Icon 
                            raised
                            reverse
                            name = 'pencil'
                            type = 'font-awesome'
                            color = '#512D'
                            onPress = {() => props.toggleModal()}
                        />
                        </View>
                    </Card>

                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {
	const comments = props.comments;

	const RenderCommentItem = ({ item, index }) => {
		return (
			<View key={index} style={{ margin: 10 }}>
				<Text style={{ fontSize: 14 }}>
                    {item.comment}
                </Text>
				<Text style={{ fontSize: 12 }}>
                    {item.rating} Stars
                </Text>
				<Text style={{ fontSize: 12 }}>
					{"-- " + item.author + ", " + item.date}
				</Text>
			</View>
		);
	};
	return (
        <Animatable.View animation = 'fadeInUp' duration = {2000} delay = {1000}>

            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={RenderCommentItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </Card>

        </Animatable.View>
	);
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            author: '',
            comment: '',
            rating: 1
        }
    }

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal});
    }

    markFavourite(dishId) {
        this.props.postFavourite(dishId);
    }

    handleComment(dishId) {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        console.log('urhveourvhlwnwl');
    }

    resetForm() {
        this.setState({
            author: '',
            comment: '',
            rating: 1
        });
    }

    static navigationOptions = {
        title: 'Dish Details'
    }

    render() {
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favourite = {this.props.favourites.some(el => el === dishId)}
                    onPress = {() => this.markFavourite(dishId)}
                    toggleModal = {() => this.toggleModal()}
                />

                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

                <Modal
                    animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => {this.toggleModal(); this.resetForm();} }
                    onRequestClose = {() => this.toggleModal() }
                >
                    <View style = {styles.modal}>
                        <Rating 
                            type = 'star'
                            showRating
                            ratingCount = {5}
                            fractions = {0}
                            startingValue = {0}
                            onFinishRating = {(rating) => this.setState({rating: rating})}
                        />
                        <Input placeholder = 'Author' style = {styles.modalText}
                            leftIcon = {
                                <Icon type = 'font-awesome' name = 'user-o'/>
                            }
                            onChangeText = {(author) => this.setState({author: author})}
                        />
                        <Input placeholder = 'Comment' style = {styles.modalText}
                            leftIcon = {
                                <Icon type = 'font-awesome' name = 'comment-o' />
                            }
                            onChangeText = {(comment) => this.setState({comment: comment})}
                        />
                        <View style = {{margin:10}}>
                            <Button 
                                color="#512DA8"
                                title="Submit" 
                                onPress = {() => {this.handleComment(dishId); this.resetForm(); this.toggleModal();}}
                            />
                        </View>
                        <View style = {{margin:10}}>
                            <Button 
                                color = 'grey'
                                title = "Cancel"
                                onPress= {() => {this.toggleModal(); this.resetForm();}}
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
    
}

const styles = StyleSheet.create({

    modal: {
        justifyContent: 'center',
       margin: 20
    },

    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },

    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);