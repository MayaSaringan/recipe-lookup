import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default class FoodTile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.item;
    return (
      <View style={[styles.container, { width: this.props.width }]} key={item.name}>
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>{item.name}</Text>
        <Image
          source={{ uri: item.thumbnail }}
          style={{ width: 100, height: 100 }}
        />
        <Text style={{ fontSize: 20 }}>Ingredients</Text>
        {item.ingredients.split(",").map((i) => {
          return <Text>x {i}</Text>;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderColor: "gray",
  },
});
