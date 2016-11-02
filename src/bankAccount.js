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

    transfer(srcBillName, dstBillName, amount) {
        let srcBill = this._getBillByName(srcBillName);
        let dstBill = this._getBillByName(dstBillName);
        this._makeDecTransaction(srcBill, 'transfer to ' + dstBillName, amount);

        this._makeIncTransaction(dstBill, 'transfer from ' + srcBillName, amount);
    }

    pay(billName, serviceName, amount) {
        let bill = this._getBillByName(billName);
        this._makeDecTransaction(bill, serviceName, amount);
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

    _makeDecTransaction(bill, transactionName, amount) {
        if (bill.amount < amount)
            throw new Error('Not enough amount');
        bill.amount -= amount;

        bill.tranasctions.push(transactionName + ' ' + amount + ' roubles');
    }

    _makeIncTransaction(bill, transactionName, amount) {
        bill.amount += amount;

        bill.tranasctions.push(transactionName + ' ' + amount + ' roubles');
    }
}