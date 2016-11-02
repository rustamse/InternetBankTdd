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
});