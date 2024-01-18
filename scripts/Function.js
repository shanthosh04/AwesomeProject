import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@meals', jsonValue);
  } catch (e) {
    console.error('Error storing the AsyncStorage data', e);
  }

};

export const addMeal = (inputText, inputCalories, inputMealType, tableData, setTableData, setInputText, setInputCalories, setInputMealType) => {
  if (inputText.trim() === '' || inputCalories.trim() === '' || inputMealType.trim() === '') return;
  const newMeal = { id: Math.random().toString(), name: inputText, calories: inputCalories, mealType: inputMealType };
  const updatedTableData = [...tableData, newMeal];
  setTableData(updatedTableData);
  storeData(updatedTableData);
  setInputText('');
  setInputCalories('');
  setInputMealType('');
};

export const editItem = (id, tableData, setInputText, setInputCalories, setInputMealType, setEditingId) => {
  const item = tableData.find(item => item.id === id);
  if (item) {
    setInputText(item.name);
    setInputCalories(item.calories);
    setInputMealType(item.mealType);
    setEditingId(id);
  }
};

export const MealEdit = (editingId, inputText, inputCalories, inputMealType, tableData, setTableData, setEditingId, setInputText, setInputCalories, setInputMealType) => {
  const updatedTableData = tableData.map(item =>
    item.id === editingId ? { ...item, name: inputText, calories: inputCalories, mealType: inputMealType } : item
  );
  setTableData(updatedTableData);
  storeData(updatedTableData);
  setEditingId(null);
  setInputText('');
  setInputCalories('');
  setInputMealType('');
};

export const deleteMeal = (id, tableData, setTableData) => {
  const updatedTableData = tableData.filter(item => item.id !== id);
  setTableData(updatedTableData);
  storeData(updatedTableData);
};
