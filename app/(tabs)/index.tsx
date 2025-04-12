import {View, Text, ScrollView, TouchableOpacity, Animated, Image, Alert, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { images } from "@/constants/images";
import LoadingIndicator from "../components/LoadingIndicator";
import { Ionicons, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { launchCamera } from "react-native-image-picker";
import { auth as fauth } from "@/FirebaseConfig";
import  { getAuth } from "@react-native-firebase/auth";

const Index = () => {
  const userE = fauth.currentUser;
  const userG = getAuth().currentUser;
  const user = userE || userG; // Use the user from either Firebase Auth or React Native Firebase
  
  const navigation = useNavigation();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    setIsOpen(!isOpen);
  };

  // Animation interpolations
  const scanInvoiceTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -120],
  });

  const addManuallyTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });

  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  // Check if the user is logged in and navigate accordingly
  React.useEffect(() => {
    const unsubscribe = fauth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is Logged In:", user.email);
        navigation.replace("/(tabs)", { email: user.email });
      } else {
        navigation.replace("/screens/login");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  //Camera function
  const openCamera = async () => {
      const res:any = await launchCamera({ mediaType: "photo", includeBase64: true });
      console.log(res.assets[0].base64);
      if (!res.didCancel) {
        console.log("Waiting for image processing camera picker");
        // setImagedata(res);
        console.log("Image processing camera picker done");
      } else {
        Alert.alert("Eror", "Please try again");
      }
      console.log("Invoice Image URI:", res.assets[0].uri);
      router.push(`/screens/PreviewInvoice?imageUri=${res.assets[0].uri}`);
    };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between bg-white shadow-sm">
          <Image source={images.logo} className="w-24 h-24 rounded-2xl ml-3" />
          <TouchableOpacity className="right-10 w-10 h-10 bg-gray-200 rounded-full items-center justify-center">
            <Ionicons name="search" size={22} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Balance Card, map user imfo and total expense here */}
        <View className="mx-4 mt-4 bg-white rounded-2xl p-5 shadow-sm">
          <View>
            <Text className="text-gray-600 text-base">Hello,</Text>
            <Text className="text-gray-900 text-2xl font-semibold">
              {user?.displayName || user?.email}
            </Text>
          </View>

          <View className="flex-row justify-between mt-6">
            {/* Expense */}
            <View className="flex-row items-center">
              <MaterialIcons name="arrow-upward" size={20} color="#E74C3C" />
              <Text className="text-gray-600 ml-1">Total Expense:</Text>
            </View>

            <Text className="text-red-500 text-xl font-semibold">
              $ 1830.00
            </Text>
          </View>
        </View>

        {/* Recent Transactions, map the scanned invoice data here, for now dummy data is placed */}
        <View className="px-4 mt-6 mb-10">
          <Text className="text-gray-900 text-xl font-semibold mb-4">
            Recent Transactions
          </Text>

          <View className="bg-white rounded-2xl p-4 mb-3 flex-row items-center shadow-sm">
            <View className="w-12 h-12 bg-red-400 rounded-full items-center justify-center mr-3">
              <FontAwesome5 name="heartbeat" size={20} color="white" />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between">
                <Text className="text-gray-800 text-lg">Health</Text>
                <Text className="text-red-500 text-lg font-medium">- $30</Text>
              </View>
              <View className="flex-row justify-between mt-1">
                <Text className="text-gray-500">checkup fee</Text>
                <Text className="text-gray-500">10 Apr</Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-2xl p-4 mb-3 flex-row items-center shadow-sm">
            <View className="w-12 h-12 bg-green-500 rounded-full items-center justify-center mr-3">
              <FontAwesome5 name="car" size={20} color="white" />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between">
                <Text className="text-gray-800 text-lg">Travel</Text>
                <Text className="text-red-600 text-lg font-medium">- $120</Text>
              </View>
              <View className="flex-row justify-between mt-1">
                <Text className="text-gray-500">Goa Trip</Text>
                <Text className="text-gray-500">10 Apr</Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-2xl p-4 mb-3 flex-row items-center shadow-sm">
            <View className="w-12 h-12 bg-amber-500 rounded-full items-center justify-center mr-3">
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={20}
                color="white"
              />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between">
                <Text className="text-gray-800 text-lg">Utilities</Text>
                <Text className="text-red-500 text-lg font-medium">- $25</Text>
              </View>
              <View className="flex-row justify-between mt-1">
                <Text className="text-gray-500">Electricity bill</Text>
                <Text className="text-gray-500">10 Apr</Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-2xl p-4 mb-3 flex-row items-center shadow-sm">
            <View className="w-12 h-12 bg-yellow-500 rounded-full items-center justify-center mr-3">
              <MaterialCommunityIcons name="food" size={20} color="white" />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between">
                <Text className="text-gray-800 text-lg">Food</Text>
                <Text className="text-red-500 text-lg font-medium"> $35</Text>
              </View>
              <View className="flex-row justify-between mt-1">
                <Text className="text-gray-500">Dinner bill</Text>
                <Text className="text-gray-500">10 Apr</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Expandable Floating Action Button */}
      <View className="absolute right-5 bottom-32">
        {/* Scan Invoice Button */}
        <Animated.View
          style={{ transform: [{ translateY: scanInvoiceTranslateY }] }}
          className="absolute right-2 bottom-0"
        >
          <TouchableOpacity
            className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center mb-2 shadow-md"
            onPress={() => {
              toggleMenu();
              openCamera();
              console.log("Scan Invoice pressed");
              router.push("/screens/PreviewInvoice");
            }}
          >
            <Ionicons name="scan" size={22} color="white" />
          </TouchableOpacity>
        </Animated.View>

        {/* Add Manually Button */}
        <Animated.View
          style={{ transform: [{ translateY: addManuallyTranslateY }] }}
          className="absolute right-2 bottom-0"
        >
          <TouchableOpacity
            className="w-12 h-12 bg-purple-500 rounded-full items-center justify-center mb-2 shadow-md"
            onPress={() => {
              toggleMenu();
              console.log("Add Manually pressed");
              // Add manual entry logic here
            }}
          >
            <FontAwesome5 name="pencil-alt" size={18} color="white" />
          </TouchableOpacity>
        </Animated.View>

        {/* Main FAB Button */}
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <TouchableOpacity
            className="w-16 h-16 bg-primary rounded-full items-center justify-center shadow-md"
            onPress={toggleMenu}
          >
            <MaterialIcons name="add" size={32} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
