import { db } from "@/FirebaseConfig";
import { collection, addDoc, query, where, getDocs, doc } from 'firebase/firestore';
import { Invoice } from "../types/databaseSchema";

export const addInvoice = async (invoiceData : Invoice) => {
    try {
        const docRef = await addDoc(collection(db, "userExpenses"), invoiceData);
        console.log("REFDOC",docRef)
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};
