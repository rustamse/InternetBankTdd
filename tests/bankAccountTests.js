import assert from 'assert';
import {BankAccount} from '../src/bankAccount';

suite('internet bank account tests', function () {
    suite('bills list tests', function () {
        let bills = [{name: 'main', amount: 10000}, {name: 'additional', amount: 20000}];
        let bankAccount = new BankAccount(bills);

        suite('when user ask list of bills', function () {
            test('user will get list of bills', function () {
                let billsNames = bankAccount.getNamesOfBills()

                assert.equal('main', billsNames[0]);
                assert.equal('additional', billsNames[1]);
            });
        });

        suite('when user ask amount of main bill', function () {
            test('user will get 10000', function () {
                let amount = bankAccount.getAmountByBillName('main');

                assert.equal(10000, amount);
            });
        });

        suite('when user ask amount of (NON-existing) credit bill', function () {
            test('user will get exception Not found bill', function () {
                assert.throws(() => bankAccount.getAmountByBillName('credit'), /Bill not found: credit/);
            });
        });
    });

    suite('when user transfer 500 roubles from main bill to additional bill', function () {
        suite('when main bill amount 1000 rouble (more than 500)', function () {
            var bills;
            var bankAccount;
            setup('', function () {
                bills = [{name: 'main', amount: 1000}, {name: 'additional', amount: 20000}];
                bankAccount = new BankAccount(bills);
            });

            test('additional bill amount increased on 500 roubles and total amount = 20500', function () {
                bankAccount.transfer('main', 'additional', 500);

                let additionalAmount = bankAccount.getAmountByBillName('additional');

                assert.equal(20000 + 500, additionalAmount);
            });

            test('main bill amount decreased on 500 roubles and total amount = 500', function () {
                bankAccount.transfer('main', 'additional', 500);

                let mainAmount = bankAccount.getAmountByBillName('main');

                assert.equal(1000 - 500, mainAmount);
            });

            test('main bill transaction history last transaction is transfer to additional 500 roubles', function () {
                bankAccount.transfer('main', 'additional', 500);

                let transactions = bankAccount.getTransactionsHistory('main');

                assert.equal('transfer to additional 500 roubles', transactions[0]);
            });

            test('additional bill transaction history last transaction is transfer from main 500 roubles', function () {
                bankAccount.transfer('main', 'additional', 500);

                let transactions = bankAccount.getTransactionsHistory('additional');

                assert.equal('transfer from main 500 roubles', transactions[0]);
            });
        });

        suite('when main bill amount 300 roubles', function () {
            test('user will get exception Not enough amount', function () {
                let bills = [{name: 'main', amount: 300}, {name: 'additional', amount: 20000}];
                let bankAccount = new BankAccount(bills);

                assert.throws(() => bankAccount.transfer('main', 'additional', 500), '/Not enough amount/');
            });
        });
    });

    suite('when user pay for mobile phone 500 roubles from main bill', function () {
        suite('when main bill amount is 1000 roubles (more than 500)', function () {
            let bills = [{name: 'main', amount: 1000}, {name: 'additional', amount: 20000}];
            let bankAccount = new BankAccount(bills);

            bankAccount.pay('main', 'mobile phone', 500);

            test('main bill amount decreased on 500 roubles', function () {
                let mainAmount = bankAccount.getAmountByBillName('main');

                assert.equal(1000 - 500, mainAmount);
            });

            test('main bill history last transaction is mobile phone 500 roubles', function () {
                let transactions = bankAccount.getTransactionsHistory('main');

                assert.equal('mobile phone 500 roubles', transactions[0]);
            });
        });

        suite('when main bill amount is 200 roubles (smaller than 500)', function () {
            let bills = [{name: 'main', amount: 200}, {name: 'additional', amount: 20000}];
            let bankAccount = new BankAccount(bills);

            test('user will get exception Not enough amount', function () {
                assert.throws(() => bankAccount.pay('main', 'mobile phone', 500), /Not enough amount/);
            });

            test('main bill history is empty (not contains mobile phone 500 roubles)', function () {
                try {
                    bankAccount.pay('main', 'mobile phone', 500);
                }
                catch (ex) {
                }
                let transactions = bankAccount.getTransactionsHistory('main');
                assert.equal(0, transactions.length);
            });
        });
    });

});