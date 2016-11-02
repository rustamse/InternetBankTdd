import assert from 'assert';
import {BankAccount} from '../src/bankAccount';

suite('internet bank account tests', function () {
    suite('when user ask list of bills', function () {
        let bills = [{name: 'main', amount: 10000}, {name: 'additional', amount: 20000}];
        let bankAccount = new BankAccount(bills);

        test('user will get list of bills', function () {
            let billsNames = bankAccount.getNamesOfBills()

            assert.equal('main', billsNames[0]);
            assert.equal('additional', billsNames[1]);
        });
    });

    suite('when user ask amount of main bill', function () {
        let bills = [{name: 'main', amount: 10000}, {name: 'additional', amount: 20000}];
        let bankAccount = new BankAccount(bills);

        test('user will get 10000', function () {
            let amount = bankAccount.getAmountByBillName('main');

            assert.equal(10000, amount);
        });
    });

    suite('when user transfer 500 roubles from main bill to additional bill', function () {
        test('additional bill amount increased on 500 roubles and total amount = 20500', function () {
            let bills = [{name: 'main', amount: 10000}, {name: 'additional', amount: 20000}];
            let bankAccount = new BankAccount(bills);

            bankAccount.transfer('main', 'additional', 500);

            let additionalAmount = bankAccount.getAmountByBillName('additional');

            assert.equal(20000 + 500, additionalAmount);
        });

        test('main bill amount decreased on 500 roubles and total amount = 9500', function () {
            let bills = [{name: 'main', amount: 10000}, {name: 'additional', amount: 20000}];
            let bankAccount = new BankAccount(bills);

            bankAccount.transfer('main', 'additional', 500);

            let mainAmount = bankAccount.getAmountByBillName('main');

            assert.equal(10000 - 500, mainAmount);
        });
    });

    suite('when user pay for mobile phone 500 roubles from main bill', function () {
        test('main bill amount decreased on 500 roubles', function () {
            let bills = [{name: 'main', amount: 10000}, {name: 'additional', amount: 20000}];
            let bankAccount = new BankAccount(bills);

            bankAccount.pay('main', 'mobile phone', 500);

            let mainAmount = bankAccount.getAmountByBillName('main');

            assert.equal(10000 - 500, mainAmount);
        });
    });
});