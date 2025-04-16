import { Alert, Text, TextInput, TouchableOpacity, View, Modal, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { addInvoice } from "../services/databaseService";
import { auth as fauth } from "@/FirebaseConfig";
import { getAuth } from "@react-native-firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";


export default function ManualInvoice() {
  const userE = fauth.currentUser;
  const userG = getAuth().currentUser;
  const user = userE || userG;
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState("others");
  const [modeOfPayment, setModeOfPayment] = useState("cash");
  const [totalAmount, setTotalAmount] = useState(50);
  const [title, setTitle] = useState("");

  const handleSaveInvoice = async () => {
    console.log("UID ", user?.uid);
    if (totalAmount) {
      const invoiceData = {
        id: user?.uid || "pickachu",
        title: title || category,
        day: new Date().toLocaleDateString("en-US", { weekday: "short" }),
        amount: totalAmount,
        category: category,
        modeOfPayment: modeOfPayment,
        date: new Date().toISOString(),
        isPaid: true,
      };
      console.log("Invoice Data:", invoiceData);
      await addInvoice(invoiceData);
      console.log("Invoice saved:");
      Alert.alert("Invoice saved successfully!");
      router.replace('/(tabs)');
    } else {
      Alert.alert("No total amount found to save.");
    }
  };
  const renderCategorySelector = () => {
    return (
      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">Select category</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue: string) => setCategory(itemValue)}
          style={{ height: 50, width: 200 }}
        >
          <Picker.Item label="Food" value="food" />
          <Picker.Item label="Transport" value="transport" />
          <Picker.Item label="Utilities" value="utilities" />
          <Picker.Item label="Entertainment" value="entertainment" />
          <Picker.Item label="Shopping" value="shopping" />
          <Picker.Item label="Healthcare" value="healthcare" />
          <Picker.Item label="Others" value="other" />
        </Picker>
      </View>
    );
  };
  const renderPaymentSelector = () => {
    return (
      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">Select Mode of Payment</Text>
        <Picker
          selectedValue={modeOfPayment}
          onValueChange={(itemValue: string) => setModeOfPayment(itemValue)}
          style={{ height: 50, width: 200 }}
        >
          <Picker.Item label="Cash" value="cash" />
          <Picker.Item label="Card" value="card" />          
        </Picker>
      </View>
    );
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
    <ScrollView className="flex-1">
      <View className="flex-1 px-4 pt-4 pb-8">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity className="p-2" onPress={() => {router.replace('/(tabs)')}}>
            <Ionicons name="arrow-back-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800 mr-32">Manual Invoice</Text>
        </View>
        
        {/* Invoice Card */}
        <View className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
          
          <View className="p-5">
            <View className="flex-row justify-between items-center mb-4">
              <TextInput
                className="flex-1 border border-gray-200 rounded-lg p-3 mr-2"
                placeholder="Need title for your invoice?"
                placeholderTextColor="#9CA3AF"
                value={title}
                onChangeText={setTitle}
              />
              {/* save title btn */}
              <TouchableOpacity 
                className="px-4 py-3 bg-blue-500 rounded-lg"
                // handle save logic here
                // onPress={}
              >
                <Ionicons name="checkmark-done-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center mb-4">
              
            </View>

            {renderCategorySelector()}
            {renderPaymentSelector()}

            
            <View className="border-t border-gray-200 pt-4">
              <View className="flex-row justify-between">
                <Text className="text-gray-700 text-xl font-bold">Total</Text>
                {/* <View className="text-xl font-bold"> */}
                  {/* {formatCurrency(totalAmount)} */}
                  <Text className="ml-40 mt-2 text-2xl font-bold color-red-500">₹</Text>
                  <TextInput
                    placeholder="Enter Total Amount"
                    keyboardType="numeric"
                    className="border border-gray-300 p-2 rounded-md w-1/3"
                    value={totalAmount.toString()}
                    onChangeText={(value) => setTotalAmount(parseFloat(value) || 0)}
                    />
                  
                {/* </View> */}
              </View>
              <View className="flex-row">
                <TouchableOpacity 
                  className="flex-1"
                  onPress={() => setModalVisible(true)}
                >
                  <View className="flex-row justify-end mt-2">
                    <Text className="text-base font-medium" style={{color: 'red'}}>Not Correct? </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        
        
        {/* Action Button */}
        

        {/* Save Invoice Button */}
        <TouchableOpacity 
          className="mt-6 w-full py-4 bg-blue-500 rounded-xl shadow-sm"
          onPress={handleSaveInvoice}
        >
          <View className="flex-row justify-center items-center">
            <Ionicons name="save-outline" size={20} color="white" className="mr-2" />
            <Text className="text-white text-base font-medium">Save Invoice</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
    
    {/* Popup Modal */}
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-center bg-black/30 px-4">
          <View className="bg-white py-6 px-6 rounded-2xl">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-gray-800">Edit Total Amount</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} className="p-1">
                <Ionicons name="close-circle" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <TextInput
              className="border border-gray-300 bg-gray-50 p-4 rounded-lg mb-6"
              placeholder="Enter total amount"
              placeholderTextColor={"#d1d5db"}
              keyboardType="numeric"
              style={{ color: '#374151' }}
              value={totalAmount.toString()}
              onChangeText={(value) => setTotalAmount(parseFloat(value) || 0)}
            />

            <TouchableOpacity
              className="py-4 rounded-lg items-center"
              style={{ backgroundColor: '#007AFF' }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text className="text-white font-bold text-base">Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
    </SafeAreaView> 
  );
}
