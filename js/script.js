'use strict';

let startButton = document.getElementById('start'),
    // valueItems = document.querySelectorAll('div[class*="-value"]'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.querySelectorAll('.expenses-item'),
    expensesButton = document.getElementsByTagName('button')[0],
    optionalExpensesButton = document.getElementsByTagName('button')[1],
    countButton = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    possibleIncome = document.querySelector('.choose-income'),
    checkboxItem = document.querySelector('#savings'),
    sumItem = document.querySelector('.choose-sum'),
    percentItem = document.querySelector('.choose-percent'),
    yearItem = document.querySelector('.year-value'),
    monthItem = document.querySelector('.month-value'),
    dayItem = document.querySelector('.day-value');

    
let money, time;

expensesButton.disabled = true;
optionalExpensesButton.disabled = true;
countButton.disabled = true;


startButton.addEventListener('click', function() {
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");

    while(isNaN(money) || money == '' || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearItem.value = new Date(Date.parse(time)).getFullYear();
    monthItem.value = new Date(Date.parse(time)).getMonth() + 1;
    dayItem.value = new Date(Date.parse(time)).getDate();

    expensesButton.disabled = false;
    optionalExpensesButton.disabled = false;
    countButton.disabled = false;
});

expensesButton.addEventListener('click', function() {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
        if (typeof(a) === 'string' && typeof(a) != null && typeof(b) != null
            && a != '' && b != '' && a.length < 50 && !isNaN(b)) {
            console.log("done");
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i = i - 1;
        }
        expensesValue.textContent = sum;
    }
});

optionalExpensesButton.addEventListener('click', function() {
    for (let i = 0; i <= optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countButton.addEventListener('click', function() {
    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
    
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = "Произошла ошибка";
        }
    } else {
        dayBudgetValue.textContent = 'Произошла ошибка';
    }
});

possibleIncome.addEventListener('input', function() {
    let items = possibleIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkboxItem.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumItem.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +sumItem.value;
        let percent = +percentItem.value;
        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentItem.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +sumItem.value,
        percent = +percentItem.value;
        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});


const appData = {
    budget: money, 
    expenses: {},
    optionalExpenses: {}, 
    income: [],
    timeData: time,
    savings: false,
};

// for (let key in appData) {
//     console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]); 
// }