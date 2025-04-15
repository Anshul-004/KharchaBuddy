import { 
  Text, View, Image, Alert, TouchableOpacity, Modal, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import RNFS from "react-native-fs";
import { GOOGLE_VISION_API_KEY } from "@env";
import { addInvoice } from "../services/databaseService";
import { auth as fauth } from "@/FirebaseConfig";
import  { getAuth } from "@react-native-firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";

const PreviewInvoice = () => {
  const userE = fauth.currentUser;
  const userG = getAuth().currentUser;
  const user = userE || userG;
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [result, setResult] = useState(null);
  const [category, setCategory] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("card");
  const [totalAmount, setTotalAmount] = useState(0);
  const { imageUri }: any = useLocalSearchParams();
  const [title, setTitle] = useState("");
  // console.log("Image URI:", imageUri); 

  const formatCurrency = (amount: any) => {
    if (amount == null || isNaN(amount)) {
      return "₹ 0.00"; 
    }
    return "₹ " + amount.toLocaleString("en-IN", { minimumFractionDigits: 2 });
  };

  const extractTotalAmount = (text: string): number => {
    const totalKeywords = [
      "total", "grand total", "amount due", "balance due", "total amount", "net amount", "net total", "amount payable", "total sale", "sales total" ];
  
    const lines = text.split("\n");
  
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase().replace(/\s+/g, " ").trim();
  
      // Check if this line contains any keyword
      if (totalKeywords.some(keyword => line.includes(keyword))) {
        // Try to match amount in the same line
        let match = lines[i].match(/[\*\₹\$\s]*[\d,]+(?:\.\d{1,2})?/);
  
        // If not found, try the next line (some receipts have the amount below)
        if (!match && i + 1 < lines.length) {
          match = lines[i + 1].match(/[\*\₹\$\s]*[\d,]+(?:\.\d{1,2})?/);
        }
  
        if (match) {
          const amountStr = match[0].replace(/[^0-9.]/g, ""); // Remove *, ₹, etc.
          const amountNum : any = parseFloat(amountStr);
          if (!isNaN(amountNum)) {
            console.log("Total Amount Found:", amountNum);
            setTotalAmount(amountNum);
            return amountNum;
          }
        }
      }
    }
  
    console.log("Total Amount Not Found");
    setTotalAmount(0);
    return 0;
  };
  
  

  const getTextFromImage = async (imageUri: any) => {
    const base64Image = await RNFS.readFile(imageUri, "base64");
    console.log("Base64 Image:", base64Image);
    const data = {
      requests: [
        {
          image: {
            content: base64Image,
          },
          features: [
            {
              type: "TEXT_DETECTION",
              maxResults: 1,
            },
          ],
        },
      ],
    };
    
  
    const apiKey = GOOGLE_VISION_API_KEY;
    console.log("API KEY", apiKey);
    //works up to here
    const res = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    const result = await res.json();
    setResult(result);
    let t1 = "";
    if (result.responses[0].textAnnotations) {
      t1 = result.responses[0].textAnnotations[0].description;
      console.log("Extracted Text:", t1);
    }
    
    const total : number = extractTotalAmount(t1);
    setTotalAmount(total);
  };
  
  const handleSaveInvoice = async () => {
    console.log("UID ",user?.uid);
    if (totalAmount) {
      const invoiceData = {
        id: user?.uid || "pickachu",
        title: title || category,
        day:new Date().toLocaleDateString("en-US", { weekday: "short" }),
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
      router.replace("/(tabs)"); // Navigate to the home screen after saving
    } else {
      Alert.alert("No total amount found to save.");
    }
  };
  
  useEffect(() => {
    if (imageUri) {
      getTextFromImage(imageUri);
    }
  }, [imageUri]);

   const renderCategorySelector = () => {
    return (
      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">Select category</Text>
        <Picker
         selectedValue={category}
         onValueChange={(itemValue : string) => setCategory(itemValue)}
         style={{ height: 50, width: 200 }}>
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

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
    <ScrollView className="flex-1">
      <View className="flex-1 px-4 pt-4 pb-8">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity className="p-2" onPress={() => {router.replace('/(tabs)')}}>
            <Ionicons name="arrow-back-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800 mr-32">Invoice Preview</Text>
        </View>

        {/* Image */}
        <View className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <Text className="text-[#007AFF] font-medium mb-3">Receipt Image:</Text>
          <View className="items-center">
            <Image
              source={{ uri: imageUri }}
              className="w-full h-72 rounded-lg"
              resizeMode="contain"
            />
          </View>
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
              {/* <View className="flex-1 h-px bg-gray-300" />
              <Text className="px-3 text-gray-400 font-medium">OR</Text>
              <View className="flex-1 h-px bg-gray-300" /> */}
            </View>

            {renderCategorySelector()}

            
            <View className="border-t border-gray-200 pt-4">
              <View className="flex-row justify-between">
                <Text className="text-gray-700 font-bold">Total</Text>
                <Text className="text-xl font-bold" style={{color: '#007AFF'}}>
                  {formatCurrency(totalAmount)}
                </Text>
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
};

export default PreviewInvoice;
