import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import RNFS from "react-native-fs";
import { GOOGLE_VISION_API_KEY } from "@env";

const PreviewInvoice = () => {
  const [result, setResult] = useState(null);
  const { imageUri }: any = useLocalSearchParams();
  console.log("Image URI:", imageUri); //imageUri is path to image

  const getTextFromImage = async (imageUri: any) => {
    const base64Image = await RNFS.readFile(imageUri, "base64");
    console.log("Base64 Image:", base64Image);
    const data = {
      requests: [
        {
          image: {
            content: base64Image  ,
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
      }
    );
    // console.log("RESPONSE", res);df
    const result = await res.json();
    // console.log("RESULT", result);
    setResult(result);
    if (result.responses[0].textAnnotations) {
      const text = result.responses[0].textAnnotations[0].description;
      console.log("Extracted Text:", text);
    }
    //text has the extracted text

    //identify total amount
  };

  return (
    <View>
      <Text className="text-2xl font-bold">PreviewInvoice</Text>
      
      {imageUri && (
        <Image
          source={{
            uri: imageUri,
          }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          if (imageUri) {
            getTextFromImage(imageUri);
          } else {
            Alert.alert(
              "Error",
              "No image data available. Please capture an image first."
            );
          }
        }}
        className="bg-blue-500 p-4 rounded-lg"
      >
        <Text>Get Text From Image</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default PreviewInvoice;
