/**
 * Purepoint test assignment
 *
 * @format
 * @flow
 */
import React from 'react';
import {
  View,
  Platform,
  FlatList,
  StatusBar,
  UIManager,
  SafeAreaView,
  LayoutAnimation,
  Text,
  Linking,
  TouchableOpacity,
} from "react-native";

// Custom modules
import SearchBar from "react-native-dynamic-search-bar";
import LinearGradient from "react-native-linear-gradient";
import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { CustomLayoutSpring } from "react-native-animation-layout";
import styles, { centerSubtitleStyle } from "./styles";

// API modules
import recipepuppy, { PAGE_SIZE } from './api/recipepuppy-client';

const RESULTS_NUMBER = 20;
const LOAD_MORE_SIZE = 10;

export default class App extends React.Component {
  /** 
   * Initial inner state
   *
   * @type {object}
   */
  state = {
    page: 1,
    refreshing: false,
    dataSource: [],
  }

  /**
   * Renders a result card
   *
   * @param {object} item
   * @param {number} idx
   */
  renderItem = (item, idx) => {
    return (
      <TouchableOpacity onPress={() => Linking.openURL(item.href)}>
        <LinearGradient
          key={idx}
          start={{x: 0, y: 0}} end={{x: 1, y: 0}}
          colors={styles.cardColors} 
          style={styles.cardStyle}>
            <Text style={styles.cardTitle}>
              {item.title}
            </Text>
            <Text style={styles.cardSubtitle}>
              {item.ingredients}
            </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };  

  /**
   * Fetches the recepies filtered down by the given string
   *
   * @param {string} keywords
   * @async
   */
  filterList = keywords => {
    if (!keywords) {
      this.setState({
        query: keywords,
        dataSource: [],
      });
      return;
    }

    this.setState({ refreshing: true })
    recipepuppy
      .fetch(keywords, RESULTS_NUMBER)
      .then((dataSource) => {
        LayoutAnimation.configureNext(CustomLayoutSpring(null, null, "scaleXY"));
        this.setState({
          refreshing: false,
          dataSource,
        });
      })
      .catch(ex => console.warn(ex));
  };

  /**
   * Loads more results from further pages
   *
   * @async
   */
  loadMore = () => {
    this.setState({
      refreshing: true,
      page: this.state.page + 2
    });

    recipepuppy
      .fetch(this.state.query, LOAD_MORE_SIZE, this.state.page)
      .then((dataSource) => {
        const newDataSource = [
          ...this.state.dataSource,
          ...dataSource,
        ];
        this.setState({
          dataSource: newDataSource,
          refreshing: false,
        })
      })
      .catch(ex => console.warn(ex));
    
  };

  /**
   * Renders the React component
   */
  render() {
    return (
      <SafeAreaView style={styles.safeAreaViewStyle}>
        <StatusBar barStyle={"light-content"} />
        <View style={styles.container}>
          <SearchBar
            onPressToFocus
            autoFocus={false}
            fontColor="#c6c6c6"
            iconColor="#c6c6c6"
            shadowColor="#282828"
            cancelIconColor="#c6c6c6"
            backgroundColor="#353d5e"
            placeholder="Search here"
            onChangeText={text => this.filterList(text)}
            onPressCancel={() => this.filterList()}
          />
          <View style={styles.flatListStyle}>
            <FlatList
              data={this.state.dataSource}
              onEndReached={this.loadMore}
              refreshing={this.state.refreshing}
              renderItem={({ item, index }) => this.renderItem(item, index)}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
