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
        this._makeTransaction(srcBill, 'transfer to' + dstBillName, amount)

        this._getBillByName(dstBillName).amount += amount;
    }

    pay(billName, serviceName, amount) {
        let bill = this._getBillByName(billName);
        this._makeTransaction(bill, serviceName, amount);
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

    _makeTransaction(bill, transactionName, amount) {
        if (bill.amount < amount)
            throw new Error('Not enough amount');
        bill.amount -= amount;

        bill.tranasctions.push(transactionName + ' ' + amount + ' roubles');
    }
}