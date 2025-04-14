import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { addInvoice } from "../services/databaseService";
import { auth as fauth } from "@/FirebaseConfig";
import  { getAuth } from "@react-native-firebase/auth";

export default function ManualInvoice() {
    const userE = fauth.currentUser;
    const userG = getAuth().currentUser;
    const user = userE || userG;
    
    const [category, setCategory] = useState("misc")
    const [modeOfPayment, setModeOfPayment] = useState("cash")
    const [totalAmount, setTotalAmount] = useState(69)
    const [title, setTitle] = useState("")

    const handleSaveInvoice = async () => {
        console.log("UID ",user?.uid);
        if (totalAmount) {
          const invoiceData = {
            id: user?.uid || "pickachu",
            title: title || category,
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
        } else {
          Alert.alert("No total amount found to save.");
        }
      };
  return (
    
    <View>
      <Text>Manual Invoice Button Pressed</Text>
      <Text className="text-xl m-3">Total Inovoice Amount is : </Text>
        <TextInput
            placeholder="Enter Total Amount"
            keyboardType="numeric"
            className="border border-gray-300 p-2 rounded-md m-3"
            value={totalAmount.toString()}
            onChangeText={(value) => setTotalAmount(parseFloat(value) || 0) }
        />
        <TextInput
            placeholder="Enter Title"
            className="border border-gray-300 p-2 rounded-md m-3"
            value={title}
            onChangeText={(value) => setTitle(value) }
        />
      <Text className="text-xl m-3">Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue : string) => setCategory(itemValue)}
        style={{ height: 50, width: 200 }}>
        <Picker.Item label="Misc" value="misc" />
        <Picker.Item label="Travel" value="travel" />
        <Picker.Item label="Shopping" value="shopping" />
      </Picker>

      <Text className="text-xl m-3">Mode of Payment</Text>
      <Picker
        selectedValue={modeOfPayment}
        onValueChange={(itemValue : string) => setModeOfPayment(itemValue)}
        style={{ height: 50, width: 200 }}>
        <Picker.Item label="Cash" value="cash" />
        <Picker.Item label="Card" value="card" />
      </Picker>

      <TouchableOpacity
        onPress={handleSaveInvoice}
        className="bg-blue-500 p-3 rounded-md">
        <Text className="text-white text-center">Save Invoice</Text>
      </TouchableOpacity>

    </View>
  )
}
