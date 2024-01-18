import { addMeal, editItem, MealEdit, deleteMeal, storeData } from './scripts/Function';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

describe('Meal Management Functions', () => {
  let mockSetTableData, mockSetInputText, mockSetInputCalories, mockSetInputMealType, mockSetEditingId;
  let tableData;

  beforeEach(() => {
    mockSetTableData = jest.fn();
    mockSetInputText = jest.fn();
    mockSetInputCalories = jest.fn();
    mockSetInputMealType = jest.fn();
    mockSetEditingId = jest.fn();
    tableData = [];
    AsyncStorage.setItem.mockClear();
  });

  describe('addMeal', () => {
    it('should add a new meal', () => {
      const meal = { name: 'Pizza', calories: '300', mealType: 'Dinner' };
      addMeal(meal.name, meal.calories, meal.mealType, tableData, mockSetTableData, mockSetInputText, mockSetInputCalories, mockSetInputMealType);
      expect(mockSetTableData).toHaveBeenCalled();
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@meals', expect.any(String));
      expect(mockSetInputText).toHaveBeenCalledWith('');
      expect(mockSetInputCalories).toHaveBeenCalledWith('');
      expect(mockSetInputMealType).toHaveBeenCalledWith('');
    });

  });

  describe('editItem', () => {
    it('should set fields for editing an item', () => {
      const item = { id: '1', name: 'Salad', calories: '100', mealType: 'Lunch' };
      tableData.push(item);
      editItem(item.id, tableData, mockSetInputText, mockSetInputCalories, mockSetInputMealType, mockSetEditingId);
      expect(mockSetInputText).toHaveBeenCalledWith(item.name);
      expect(mockSetInputCalories).toHaveBeenCalledWith(item.calories);
      expect(mockSetInputMealType).toHaveBeenCalledWith(item.mealType);
      expect(mockSetEditingId).toHaveBeenCalledWith(item.id);
    });

  });

  describe('MealEdit', () => {
    it('should update an item', () => {
      const originalItem = { id: '1', name: 'Salad', calories: '100', mealType: 'Lunch' };
      tableData.push(originalItem);
      const updatedItem = { ...originalItem, name: 'Updated Salad', calories: '150' };
      MealEdit(originalItem.id, updatedItem.name, updatedItem.calories, updatedItem.mealType, tableData, mockSetTableData, mockSetEditingId, mockSetInputText, mockSetInputCalories, mockSetInputMealType);
      expect(mockSetTableData).toHaveBeenCalledWith(expect.any(Array));
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@meals', expect.any(String));
    });

  });

  describe('deleteMeal', () => {
    it('should delete an item', () => {
      const item = { id: '1', name: 'Burger', calories: '500', mealType: 'Dinner' };
      tableData.push(item);
      deleteMeal(item.id, tableData, mockSetTableData);
      expect(mockSetTableData).toHaveBeenCalledWith([]);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@meals', expect.any(String));
    });

  });
});
