'use strict';

export class BankAccount {
    constructor(bills) {
        this._bills = bills;
    }

    getNamesOfBills() {
        return this._bills.map((bill) => bill.name);
    }

    getAmountByBillName(billName) {
        let bills = this._bills.filter((bill) => bill.name == billName);
        return bills[0].amount;
    }
}