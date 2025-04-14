export interface Invoice {
    id: string;
    title: string;
    amount: number;
    category: string;
    modeOfPayment: string;
    date: string;
    day:string;
    isPaid: boolean;
};