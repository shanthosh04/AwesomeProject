import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './Style';
import { addMeal, editItem, MealEdit, deleteMeal } from './Function';
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MyTableScreen}
          options={{ title: 'MyCaloriesTracker' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MyTableScreen = () => {
  const [tableData, setTableData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [inputCalories, setInputCalories] = useState('');
  const [inputMealType, setInputMealType] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const readData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@meals');
        if (jsonValue != null) setTableData(JSON.parse(jsonValue));
      } catch (e) {
        console.error('Error reading the AsyncStorage data', e);
      }
    };
    
    readData();
  }, []);

  const handleAddMeal = () => addMeal(inputText, inputCalories, inputMealType, tableData, setTableData, setInputText, setInputCalories, setInputMealType);
  const handleEditItem = (id) => editItem(id, tableData, setInputText, setInputCalories, setInputMealType, setEditingId);
  const handleMealEdit = () => MealEdit(editingId, inputText, inputCalories, inputMealType, tableData, setTableData, setEditingId, setInputText, setInputCalories, setInputMealType);
  const handleDeleteMeal = (id) => deleteMeal(id, tableData, setTableData);

  const totalCalories = tableData.reduce((sum, item) => sum + parseInt(item.calories, 10), 0);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your Meal"
        value={inputText}
        onChangeText={setInputText}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter your Calories"
        value={inputCalories}
        onChangeText={setInputCalories}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Enter your Mealtype"
        value={inputMealType}
        onChangeText={setInputMealType}
        style={styles.input}
      />
      {editingId ? (
        <Button title="Save Meal change" onPress={handleMealEdit} />
      ) : (
        <Button title="Save Meal" onPress={handleAddMeal} />
      )}

      <FlatList
        data={tableData}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name} : {item.calories} kcal : {item.mealType}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleEditItem(item.id)} style={styles.button}>
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteMeal(item.id)} style={styles.button}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <Text style={styles.totalCaloriesText}>Total Calories: {totalCalories} kcal</Text>
      <Text style={styles.totalCaloriesText}>daily consumption: 2000 kcal</Text>
    </View>
  );
};

export default MyStack;
