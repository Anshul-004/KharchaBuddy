import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import RNFS from "react-native-fs";
import { GOOGLE_VISION_API_KEY } from "@env";

const PreviewInvoice = () => {
  const [result, setResult] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const { imageUri }: any = useLocalSearchParams();
  console.log("Image URI:", imageUri); 

  const extractTotalAmount = (text: string): number | null => {
    const totalKeywords = [
      "total",
      "grand total",
      "amount due",
      "balance due",
      "total amount",
      "net amount",
      "net total",
      "amount payable",
      "total sale",
      "sales total"
    ];
  
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
    return null;
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
      }
    );

    const result = await res.json();
    setResult(result);
    let t1 = "";
    if (result.responses[0].textAnnotations) {
      t1 = result.responses[0].textAnnotations[0].description;
      console.log("Extracted Text:", t1);
    }
    
    const total : any = extractTotalAmount(t1);
    setTotalAmount(total);
  };
  
  
  
  useEffect(() => {
    if (imageUri) {
      getTextFromImage(imageUri);
    }
  }, [imageUri]);
  
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

      <Text className="text-xl m-3">{totalAmount}</Text>
    </View>
  );
};

export default PreviewInvoice;
