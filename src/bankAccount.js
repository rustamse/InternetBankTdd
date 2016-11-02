'use strict';

export class BankAccount {
    constructor(bills) {
        this._bills = bills;
    }

    getNamesOfBills() {
        return this._bills.map((bill) => bill.name);
    }

    getAmountByBillName(billName) {
        let bill = this._getBillByName(billName);
        return bill.amount;
    }

    transfer(srcBill, dstBill, amount) {
        this._getBillByName(srcBill).amount -= amount;
        this._getBillByName(dstBill).amount += amount;
    }

    _getBillByName(billName) {
        let bills = this._bills.filter((bill) => bill.name == billName);
        return bills[0];
    }
}