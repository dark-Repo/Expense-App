import { Progress } from 'antd';
import './Analytics.css'; // Import custom CSS for styling
// Import custom CSS for styling

export default function Analytics({ AllTransection }) {
    const categories = ['salary', 'tip', 'project', 'food', 'movie', 'bills', 'medical', 'fees', 'tax'];

    const totalTransection = AllTransection.length;
    const totalIncome = AllTransection.filter(transection => transection.type === 'income');
    const totalExpense = AllTransection.filter(transection => transection.type === 'expense');

    // Prevent division by zero errors
    const totalIncomePercent = totalTransection > 0 ? (totalIncome.length / totalTransection) * 100 : 0;
    const totalExpensePercent = totalTransection > 0 ? (totalExpense.length / totalTransection) * 100 : 0;

    const totalTurnover = AllTransection.reduce((acc, transection) => acc + Number(transection.amount), 0);
    const totalIncomeTurnover = totalIncome.reduce((acc, transection) => acc + Number(transection.amount), 0);
    const totalExpenseTurnover = totalExpense.reduce((acc, transection) => acc + Number(transection.amount), 0);

    // Prevent division by zero errors
    const totalIncomeTurnoverPercent = totalTurnover > 0 ? (totalIncomeTurnover / totalTurnover) * 100 : 0;
    const totalExpenseTurnoverPercent = totalTurnover > 0 ? (totalExpenseTurnover / totalTurnover) * 100 : 0;

    return (
        <div className="container-fluid analytics-container">
            {/* First row for Total Transactions and Total Turnover */}
            <div className="row mt-4 justify-content-center">
                <div className="col-md-4 mb-4">
                    <div className="card bg-blue-grey text-light border-0 shadow-sm">
                        <div className="card-header bg-blue-grey-header text-light">Total Transactions: {totalTransection}</div>
                        <div className="card-body">
                            <h5 className="text-income">Income: {totalIncome.length}</h5>
                            <h5 className="text-expense">Expense: {totalExpense.length}</h5>
                            <div className="d-flex justify-content-center mt-3">
                                <Progress
                                    type="circle"
                                    strokeColor="#4CAF50"
                                    trailColor="#455A7A"
                                    className="mx-2"
                                    percent={totalIncomePercent.toFixed(0)}
                                    strokeWidth={8}
                                />
                                <Progress
                                    type="circle"
                                    strokeColor="#EF5350"
                                    trailColor="#455A7A"
                                    className="mx-2"
                                    percent={totalExpensePercent.toFixed(0)}
                                    strokeWidth={8}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card bg-blue-grey text-light border-0 shadow-sm">
                        <div className="card-header bg-blue-grey-header text-light">Total Turnover: {totalTurnover}</div>
                        <div className="card-body">
                            <h5 className="text-income">Income: {totalIncomeTurnover}</h5>
                            <h5 className="text-expense">Expense: {totalExpenseTurnover}</h5>
                            <div className="d-flex justify-content-center mt-3">
                                <Progress
                                    type="circle"
                                    strokeColor="#4CAF50"
                                    trailColor="#455A7A"
                                    className="mx-2"
                                    percent={totalIncomeTurnoverPercent.toFixed(0)}
                                    strokeWidth={8}
                                />
                                <Progress
                                    type="circle"
                                    strokeColor="#EF5350"
                                    trailColor="#455A7A"
                                    className="mx-2"
                                    percent={totalExpenseTurnoverPercent.toFixed(0)}
                                    strokeWidth={8}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second row for Category-wise analysis */}
            <div className="row mt-4 justify-content-center">
                <div className="col-md-4 mb-4">
                    <div className="card bg-blue-grey text-light border-0 shadow-sm">
                        <div className="card-header bg-blue-grey-header text-light">Category Wise Income</div>
                        <div className="card-body">
                            {categories.map(category => {
                                const amount = AllTransection
                                    .filter(t => t.type === 'income' && t.category === category)
                                    .reduce((acc, t) => acc + Number(t.amount), 0);
                                return (
                                    amount > 0 && (
                                        <div key={category} className="mb-3">
                                            <h5 className="text-capitalize">{category}</h5>
                                            {totalIncomeTurnover > 0 && (
                                                <Progress
                                                    percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                                                    strokeColor="#4CAF50"
                                                    trailColor="#455A7A"
                                                    strokeWidth={10}
                                                />
                                            )}
                                        </div>
                                    )
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card bg-blue-grey text-light border-0 shadow-sm">
                        <div className="card-header bg-blue-grey-header text-light">Category Wise Expense</div>
                        <div className="card-body">
                            {categories.map(category => {
                                const amount = AllTransection
                                    .filter(t => t.type === 'expense' && t.category === category)
                                    .reduce((acc, t) => acc + Number(t.amount), 0);
                                return (
                                    amount > 0 && (
                                        <div key={category} className="mb-3">
                                            <h5 className="text-capitalize">{category}</h5>
                                            {totalExpenseTurnover > 0 && (
                                                <Progress
                                                    percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
                                                    strokeColor="#EF5350"
                                                    trailColor="#455A7A"
                                                    strokeWidth={10}
                                                />
                                            )}
                                        </div>
                                    )
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}