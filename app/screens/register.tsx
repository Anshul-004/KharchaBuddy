import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useRouter } from 'expo-router';
import React, { useState } from 'react'
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { auth } from '@/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [cnfPassword, setCnfPassword] = useState("")
    const router = useRouter();

    const handleSingup = async () => {
        try {
            if (password === cnfPassword) {
                const user = await createUserWithEmailAndPassword(auth, email, password);
                
                const userdet = user.user;
                console.log(userdet);
                   
                if (user) router.replace('/(tabs)');

            } else {
                alert("Ensure Confirmed Password and Password are the same.");
            }
        } catch (err: any) {
            console.log(err);
            alert("We're having trouble getting you connected !");
        }
    };
  return (
    
    <View className="flex-1 justify-center items-center bg-white mb-10">
        <View className="w-[80%]">
            <View className="items-center">
                <Text className="text-3xl font-bold mb-8 text-center text-gray-800">Register</Text>
                <Image 
                    source={images.register}
                    className="w-58 h-48 self-center mb-8"
                    resizeMode="contain"
                />
                
                <TextInput
                    className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg"
                    placeholder="Full Name"
                    value={fullName}
                    onChangeText={text => setFullName(text)}
                    autoCapitalize="words"
                />

                <TextInput
                    className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg"
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    autoCapitalize="none"
                />
                
                <TextInput
                    className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg"
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />

                <TextInput
                    className="w-full h-12 px-4 mb-6 border border-gray-300 rounded-lg"
                    placeholder="Confirm Password"
                    value={cnfPassword}
                    onChangeText={text => setCnfPassword(text)}
                    secureTextEntry
                />
                
                <TouchableOpacity className="w-[80%] bg-blue-500 py-3 rounded-lg mb-4" onPress={handleSingup}>
                    <Text className="text-white text-center font-semibold">Register</Text>
                </TouchableOpacity>

                <View className="flex-row items-center mb-4 w-full">
                    <View className="flex-1 border-t border-gray-300"></View>
                    <Text className="mx-2 text-gray-500">OR</Text>
                    <View className="flex-1 border-t border-gray-300"></View>
                </View>
                <TouchableOpacity className="w-[80%] bg-gray-200 py-3 rounded-lg mb-4 flex-row items-center justify-center">
                    <Image 
                        source={icons.google}
                        className="w-6 h-6 mr-2"
                    />
                    <Text className="text-gray-800 font-semibold">Login with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity className="w-[80%] bg-gray-200 py-3 rounded-lg mb-4 flex-row items-center justify-center">
                    <Image
                        source={icons.github}
                        className="w-6 h-6 mr-2"
                    />
                    <Text className="text-gray-800 font-semibold">Login with Github</Text>
                </TouchableOpacity>

                <View className="flex-row">
                    <Text className="text-gray-600">Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.push("../screens/login")}>
                        <Text className="text-blue-500 font-semibold">Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>

  )
}

export default Register