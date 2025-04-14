export interface Invoice {
    id: string;
    amount: number;
    category: string;
    modeOfPayment: string;
    date: string;
    isPaid: boolean;
};