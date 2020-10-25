import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import FoodTile from "./FoodTile";

function mapStateToProps(state) {
  return {
    foods: state.foods,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addFood: (name) => dispatch({ type: "ADD_FOOD", name: name }),
    addFoodObj: (food) =>
      dispatch({
        type: "ADD_FOOD_OBJ",
        food: {
          name: food.name,
          thumbnail: food.thumbnail,
          calories: food.calories,
        },
      }),
    addFoods: (arr) => dispatch({ type: "ADD_MULTIPLE_FOODS", list: arr }),
  };
}
class CounterApp extends Component {
  state = {
    text: null,
    listWidth: 0,
  };
  parseCommonFoodList = (itemArray) => {
    let itemList = [];
    itemArray.map((item) => {
      console.log(item);
      if (item.thumbnail != "")
        itemList.push({
          name: item.title,
          thumbnail: item.thumbnail,
          ingredients: item.ingredients,
        });
    });

    this.props.addFoods(itemList);
  };
  _onChangeText = (t) => {
    this.setState({ text: t });
  };
  parseNF = (response) => {
    console.log(response);
    this.props.addFoodObj({
      name: response.food_name,
      thumbnail: response.photo.thumb,
      calories: response.nf_calories,
    });
  };
  queryFood = (food) => {
    console.log("testtestest");
    fetch("http://www.recipepuppy.com/api/?q=" + food, { method: "GET" })
      .then((response) => response.text())
      .then((result) => this.parseCommonFoodList(JSON.parse(result)["results"]))
      .catch((error) => console.log("error", error));
  };

  componentDidMount = () => {
    this.queryFood("pie");
  };

  render = () => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <View style={{ width: "100%", padding: 20, flexDirection: "column" }}>
            <View
              style={{ width: "100%", flexDirection: "row", marginBottom: 20 }}
            >
              <TextInput
                style={{
                  height: 60,
                  backgroundColor: "white",
                  flexGrow: 1,
                  fontSize: 20,
                }}
                clearButtonMode="always"
                onChangeText={this._onChangeText}
                value={this.state.text}
                onSubmitEditing={(t) => this.queryFood(t)}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "orange",
                width: 250,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => this.queryFood(this.state.text)}
            >
              <Text style={{ fontSize: 25, color: "white" }}>Get Recipes</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            onLayout={(event) => {
              var { x, y, width, height } = event.nativeEvent.layout;
              this.setState({ listWidth: width });
            }}
            style={styles.listStyle}
            horizontal={true}
            data={this.props.foods}
            keyExtractor={(item) => {
              return item.name;
            }}
            renderItem={({ item }) => (
              <FoodTile
                item={item}
                snapToAlignment="start"
                pagingEnabled={true}
                width={this.state.listWidth}
              />
            )}
          />
        </View>
      </View>
    );
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CounterApp);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#e6e7e7",

    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  subContainer: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  listStyle: {
    flex: 0,
    maxWidth: "100%",
  },
});
