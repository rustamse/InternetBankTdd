'use strict';

export class BankAccount {
    constructor(bills) {
        this._bills = bills;
    }

    getNamesOfBills() {
        return this._bills.map((bill) => bill.name);
    }
}