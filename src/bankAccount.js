'use strict';

export class BankAccount {
    constructor(bills) {
        this._bills = bills;
        this._bills.map((a) => a.tranasctions = []);
    }

    getNamesOfBills() {
        return this._bills.map((bill) => bill.name);
    }

    getAmountByBillName(billName) {
        let bill = this._getBillByName(billName);
        return bill.amount;
    }

    transfer(srcBill, dstBill, amount) {
        var srcBill = this._getBillByName(srcBill);
        if (srcBill.amount < amount)
            throw new Error('Not enough amount');

        srcBill.amount -= amount;
        this._getBillByName(dstBill).amount += amount;
    }

    pay(billName, serviceName, amount) {
        let bill = this._getBillByName(billName);
        bill.amount -= amount;

        bill.tranasctions.push(serviceName + ' ' + amount + ' roubles');
    }

    getTransactionsHistory(billName) {
        let bill = this._getBillByName(billName);
        return bill.tranasctions;
    }

    _getBillByName(billName) {
        let bills = this._bills.filter((bill) => bill.name == billName);
        if (bills.length == 0)
            throw new Error('Not found bill ' + billName);
        return bills[0];
    }
}