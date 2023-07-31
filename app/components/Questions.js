import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';

const height = Dimensions.get('window').height / 4;

const Question = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.question_container}>
        <View style={styles.inner_container}>
          <Text>{item.question}</Text>
        </View>
      </View>
      {item.option_one ? (
        <View style={styles.answer_container}>
          <Text style={styles.option_text}>{'A'}</Text>
          <View style={styles.verticle_line}></View>
          <Text>{item.option_one}</Text>
        </View>
      ) : null}
      {item.option_two ? (
        <View style={styles.answer_container}>
          <Text style={styles.option_text}>{'B'}</Text>
          <View style={styles.verticle_line}></View>
          <Text>{item.option_two}</Text>
        </View>
      ) : null}
      {item.option_three ? (
        <View style={styles.answer_container}>
          <Text style={styles.option_text}>{'C'}</Text>
          <View style={styles.verticle_line}></View>
          <Text>{item.option_three}</Text>
        </View>
      ) : null}
      {item.option_four ? (
        <View style={styles.answer_container}>
          <Text style={styles.option_text}>{'D'}</Text>
          <View style={styles.verticle_line}></View>
          <Text>{item.option_four}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  question_container: {
    height: height,
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 20,
  },
  inner_container: {
    height:"100%",
    width:"100%",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#efefef',
  },
  answer_container: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#707070',
  },
  option_text: {
    marginHorizontal: 5,
  },
  verticle_line: {
    height: '100%',
    width: 0.5,
    backgroundColor: '#707070',
    marginHorizontal: 5,
  },
});
