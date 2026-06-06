const expenses = [];

const expenseList = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total-display');
const countDisplay = document.getElementById('count-display');
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const addBtn = document.getElementById('add-btn');

function updateSummary() {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  totalDisplay.textContent = `₦${total.toFixed(2)}`;
  countDisplay.textContent = expenses.length;
}

function renderExpenses() {
  if (expenses.length === 0) {
    expenseList.innerHTML = '<li class="empty-message">No expenses yet</li>';
    return;
  }

  expenseList.innerHTML = expenses
    .map(
      (e, i) =>
        `<li class="expense-item">
          <span class="expense-name">${e.name}</span>
          <span>
            <span class="expense-amount">₦${e.amount.toFixed(2)}</span>
            <button class="delete-btn" data-index="${i}">&times;</button>
          </span>
        </li>`
    )
    .join('');
}

function addExpense() {
  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!name || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid expense name and amount.');
    return;
  }

  expenses.push({ name, amount });
  nameInput.value = '';
  amountInput.value = '';
  renderExpenses();
  updateSummary();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
  updateSummary();
}

expenseList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    deleteExpense(parseInt(e.target.dataset.index, 10));
  }
});

addBtn.addEventListener('click', addExpense);

nameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') amountInput.focus();
});

amountInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addExpense();
});

renderExpenses();
updateSummary();
