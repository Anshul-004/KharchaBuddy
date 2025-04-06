import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';
import { images } from '@/constants/images';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Onboarding = () => {
    const router = useRouter();
    const width = Dimensions.get('window').width;
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
            alignItems: 'center',
            justifyContent: 'center',
            height: "100%",
        },
        slide: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            margin: 50,
            backgroundColor: "#fff",
            height: "100%"
        },
        title: {
            fontSize: 34,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
            marginTop: 20,
        },
        description: {
            fontSize: 16,
            textAlign: 'center',
            color: '#666',
            marginBottom: 20,
        },
        image: {
            width: "100%",
            height: "100%",
        },
        button: {
            backgroundColor: '#007AFF',
            paddingHorizontal: 30,
            paddingVertical: 15,
            borderRadius: 25,
            marginBottom: 40,
        },
        buttonText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
        },
        indicatorContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
        },
        indicator: {
            height: 8,
            width: 8,
            borderRadius: 4,
            backgroundColor: '#CCCCCC',
            marginHorizontal: 4,
        },
        activeIndicator: {
            backgroundColor: '#007AFF',
            width: 24,
        }
    });
    
    const onboardingData = [
        {
            title: 'Welcome to KharchaBuddy',
            description: 'Your personal expense tracking companion',
            image: images.welcome
        },
        {
            title: 'Track Expenses',
            description: 'Easily record and categorize your daily expenses',
            image: images.track
        },
        {
            title: 'Smart Analytics',
            description: 'Get insights about your spending habits',
            image: images.analyze
        },
    ];

    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.slide}>
                <Image className='w-full h-full m-4' source={item.image}></Image>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        );
    };

    const handleGetStarted = async () => {
        await AsyncStorage.setItem("hasOnboarded", "true");
        router.replace("/(tabs)"); 
      };

    const renderIndicators = () => {
        return (
            <View style={styles.indicatorContainer}>
                {onboardingData.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.indicator,
                            activeIndex === index && styles.activeIndicator
                        ]}
                    />
                ))}
            </View>
        );
    };

    return (
        <>
            <View style={styles.container}>
                <Carousel
                    ref={carouselRef}
                    loop={false}
                    width={width}
                    height={width}
                    data={onboardingData}
                    renderItem={renderItem}
                    mode="parallax"
                    scrollAnimationDuration={150}
                    modeConfig={{
                        parallaxScrollingScale: .96,
                        parallaxScrollingOffset: 50,
                    }}
                    onSnapToItem={(index) => setActiveIndex(index)}
                />
            </View>
            
            <View className='h-[20%] justify-center items-center bg-[#fff]'>
                {renderIndicators()}
                {activeIndex === 2 && (
                    <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                )}
            </View>
        </>
    );
};

export default Onboarding;