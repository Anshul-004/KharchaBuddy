import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { fetchExpenses } from '../services/databaseService';
import { auth as fauth } from "@/FirebaseConfig";
import { getAuth } from "@react-native-firebase/auth";
import LoadingIndicator from '../components/LoadingIndicator';
import { Invoice } from '../types/databaseSchema';
export default function Expenses() {
  const userE = fauth.currentUser;
  const userG = getAuth().currentUser;
  const user = userE || userG;


  const [activeTab, setActiveTab] = useState('weekly');
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState<Invoice[]>([]);
  const [data, setChartData] = useState({
    weekly: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }],
    },
    yearly: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }],
    },
  });
    
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Chart Configuration
  const getChartConfig = () => {
    const baseConfig = {
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      fillShadowGradientOpacity: 1,
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 16,
        paddingRight: 20,
      },
      propsForLabels: {
        fontSize: 12,
        dx: 5,
      },
      spacingInner: 0.5,
      spacingOuter: 0.5,
    };
    
    if (activeTab === 'yearly') {
      return {
        ...baseConfig,
        barPercentage: 0.2, 
        propsForLabels: {
          ...baseConfig.propsForLabels,
          fontSize: 10, 
        },
      };
    }
    
    
    return {
      ...baseConfig,
      barPercentage: 0.3,
    };
  };

  const handleTabChange = (tab: any) => {
    if (tab === activeTab) return;
    
    // Animate out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      // Change tab
      setActiveTab(tab);
      
      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    });
  };
  const fetchUserExpenses = async (uid: string) => {
      try {
        if (user?.uid) {
          console.log("User ID:", uid);
          const userExpenses = await fetchExpenses(uid);
          console.log("Fetched User Expenses:", userExpenses);
          setExpenses(userExpenses); 

        } else {
          console.error("User is not authenticated.");
        }
      } catch (error) {
        console.error("Error fetching user expenses:", error);
      } finally {
        setLoading(false); 
      }
    };
    if (loading) {
      return <LoadingIndicator />;
    }
  useEffect(() => {
      if (user?.uid) {
        console.log("Fetching expenses for user:", user.uid);
        fetchUserExpenses(user.uid);
      }
    }, [user?.uid]);

    //grouping for charts
    const groupByDay = (expenses : Invoice[]) => {
      const dailyTotals : Record<string, number> = {};
    
      expenses.forEach((expense) => {
        const day = expense.day; 
        const amount = parseFloat(expense.amount) || 0;
    
        if (!dailyTotals[day]) {
          dailyTotals[day] = 0;
        }
        dailyTotals[day] += amount;
      });
    
      return dailyTotals;
    };
    
    const groupByMonth = (expenses : Invoice[]) => {
      const monthlyTotals : Record<string, number> = {};
    
      expenses.forEach((expense ) => {
        const date = new Date(expense.date); 
        const month = date.toLocaleString("default", { month: "short" }); 
        const amount = parseFloat(expense.amount) || 0;
    
        if (!monthlyTotals[month]) {
          monthlyTotals[month] = 0;
        }
        monthlyTotals[month] += amount;
      });
    
      return monthlyTotals;
    };
    //data here.
    useEffect(() => {
  if (expenses.length > 0) {
    // Group by day
    const dailyTotals = groupByDay(expenses);
    const weeklyData = Object.keys(dailyTotals).map((day) => dailyTotals[day]);

    // Group by month
    const monthlyTotals = groupByMonth(expenses);
    const yearlyData = Object.keys(monthlyTotals).map((month) => monthlyTotals[month]);

    // Update chart data
    setChartData({
      weekly: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // Adjust labels as needed
        datasets: [
          {
            data: weeklyData,
          },
        ],
      },
      yearly: {
        labels: Object.keys(monthlyTotals), // e.g., ["Jan", "Feb", "Mar"]
        datasets: [
          {
            data: yearlyData,
          },
        ],
      },
    });
  }
}, [expenses]);
    // const data = {
    //   weekly: {
    //     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    //     datasets: [
    //       {
    //         data: [2, 1, 18, 10, 2, 35, 20],
            
    //       }
    //     ]
    //   },
    //   yearly: {
    //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    //     datasets: [
    //       {
    //         data: [120, 100, 145, 200, 150, 300, 250, 400, 350, 500, 450, 600],
            
    //       }
    //     ]
    //   }
    // };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView className="flex-1 px-4 pt-8">
        {/* Statistics Section */}
        <View className="mb-6">
          <Text className="text-black text-2xl font-bold mb-4">Statistics</Text>
          
          {/* Tabs */}
          <View className="flex-row mb-6 bg-gray-200 rounded-full p-1">
            <TouchableOpacity 
              className={`flex-1 py-2 rounded-full ${activeTab === 'weekly' ? 'bg-white' : ''}`}
              onPress={() => handleTabChange('weekly')}
            >
              <Text className={`text-center font-medium ${activeTab === 'weekly' ? 'text-black' : 'text-gray-600'}`}>Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`flex-1 py-2 rounded-full ${activeTab === 'yearly' ? 'bg-white' : ''}`}
              onPress={() => handleTabChange('yearly')}
            >
              <Text className={`text-center font-medium ${activeTab === 'yearly' ? 'text-black' : 'text-gray-600'}`}>Yearly</Text>
            </TouchableOpacity>
          </View>
          
          {/* Animated Chart */}
          <Animated.View 
            className="mb-4"
            style={{
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }}
          >
          <BarChart data={data[activeTab]} width={Dimensions.get('window').width - 32} height={220} chartConfig={getChartConfig()} 
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          withInnerLines={false}
          showBarTops={false}
          fromZero={true}
          withCustomBarColorFromData={false}
          flatColor={true}
          yAxisInterval={1}
          />
          </Animated.View>
        </View>
        
        {/* Transactions Section */}
        <View>
          <Text className="text-black text-2xl font-bold mb-4">Transactions</Text>
          
          <View className="bg-gray-100 p-4 rounded-xl mb-3 flex-row items-center">
            <View className="w-10 h-10 bg-red-500 rounded-xl items-center justify-center mr-3">
              <Ionicons name="heart" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-black text-lg font-medium">Health</Text>
              <Text className="text-gray-500">checkup fee</Text>
            </View>
            <View className="items-end">
              <Text className="text-red-500 text-lg">- $30</Text>
              <Text className="text-gray-500">26 Nov</Text>
            </View>
          </View>
          
          <View className="bg-gray-100 p-4 rounded-xl mb-3 flex-row items-center">
            <View className="w-10 h-10 bg-green-500 rounded-xl items-center justify-center mr-3">
              <Ionicons name="logo-usd" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-black text-lg font-medium">Income</Text>
              <Text className="text-gray-500">random money</Text>
            </View>
            <View className="items-end">
              <Text className="text-green-500 text-lg">+ $20</Text>
              <Text className="text-gray-500">26 Nov</Text>
            </View>
          </View>
          
          <View className="bg-gray-100 p-4 rounded-xl mb-3 flex-row items-center">
            <View className="w-10 h-10 bg-amber-500 rounded-xl items-center justify-center mr-3">
              <Ionicons name="bulb" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-black text-lg font-medium">Utilities</Text>
              <Text className="text-gray-500">Electricity bill</Text>
            </View>
            <View className="items-end">
              <Text className="text-red-500 text-lg">- $25</Text>
              <Text className="text-gray-500">25 Nov</Text>
            </View>
          </View>
          
          <View className="bg-gray-100 p-4 rounded-xl mb-3 flex-row items-center">
            <View className="w-10 h-10 bg-green-500 rounded-xl items-center justify-center mr-3">
              <Ionicons name="logo-usd" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-black text-lg font-medium">Income</Text>
              <Text className="text-gray-500">salary</Text>
            </View>
            <View className="items-end">
              <Text className="text-green-500 text-lg">+ $25</Text>
              <Text className="text-gray-500">24 Nov</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}