import { db } from "@/FirebaseConfig";
import { collection, addDoc, query, where, getDocs, doc, orderBy } from 'firebase/firestore';
import { Invoice } from "../types/databaseSchema";

export const addInvoice = async (invoiceData : Invoice) => {
    try {
        const docRef = await addDoc(collection(db, "userExpenses"), invoiceData);
        console.log("REFDOC",docRef)
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

export const fetchExpenses = async (userUid : string) => {
    try {
        // Query the Firestore collection
        const q = query(
            collection(db, "userExpenses"),
            where("id", "==", userUid), // Filter by user ID id === uid
            orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        
        const expenses :any = [];
        querySnapshot.forEach((doc) => {
            expenses.push({
                id: doc.id,
                ...doc.data(), // Document data
            });
        });

        // console.log("Fetched Expenses:", expenses);
        return expenses;
    } catch (e) {
        console.error("Error fetching expenses:", e);
        throw e;
    }
};