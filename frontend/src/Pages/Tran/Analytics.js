import React from "react";
// import CardBox from "./CardBox";
import { Container, Row } from "react-bootstrap";
import CircularProgressBar from "../../components/CircularProgressBar";
import LineProgressBar from "../../components/LineProgressBar";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// import MovingIcon from '@mui/icons-material/Moving';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState } from "react";
import { useContext } from "react";   
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';

import { useNavigate } from "react-router-dom";
import { addTransaction, getTransactions } from "../../utils/ApiRequest"; 
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';



const Analytics = () => {

  const navigate = useNavigate();
      const [income, setIncome] = useState(0);
      const [expense, setExpense] = useState(0);
      const [totalBalance, setTotalBalance] = useState(0);
      const [cUser, setcUser] = useState();
      const [show, setShow] = useState(false);
      const [loading, setLoading] = useState(false);
      const [transactions, setTransactions] = useState([]);
      const [refresh, setRefresh] = useState(false);
      const [frequency, setFrequency] = useState("7");
      const [type, setType] = useState("all");
      const [startDate, setStartDate] = useState(null);
      const [endDate, setEndDate] = useState(null);
      const [view, setView] = useState("table");

  

useEffect(() => { 
  
  const fetchAllTransactions = async () => {
    try {
      setLoading(true);
      console.log(cUser._id, frequency, startDate, endDate, type);
      const { data } = await axios.post(getTransactions, {
        userId: cUser._id,
        frequency: frequency,
        startDate: startDate,
        endDate: endDate,
        type: type,
      });
      console.log(data);

      setTransactions(data.transactions);

      setLoading(false);
    } catch (err) {
      // toast.error("Error please Try again...", toastOptions);
      setLoading(false);
    }
  };

  fetchAllTransactions();
}, [refresh, frequency, endDate, type, startDate]);

console.log(transactions);
  const TotalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (item) => item.transactionType === "credit"
  );
  const totalExpenseTransactions = transactions.filter(
    (item) => item.transactionType === "expense"
  );

  let totalIncomePercent =
    (totalIncomeTransactions.length / TotalTransactions) * 100;
  let totalExpensePercent =
    (totalExpenseTransactions.length / TotalTransactions) * 100;

  // console.log(totalIncomePercent, totalExpensePercent);

  const totalTurnOver = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalTurnOverIncome = transactions
    .filter((item) => item.transactionType === "credit")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalTurnOverExpense = transactions
    .filter((item) => item.transactionType === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const TurnOverIncomePercent = (totalTurnOverIncome / totalTurnOver) * 100;
  const TurnOverExpensePercent = (totalTurnOverExpense / totalTurnOver) * 100;

  const categories = [
    "Groceries",
    "Rent",
    "Salary",
    "Tip",
    "Food",
    "Medical",
    "Utilities",
    "Entertainment",
    "Transportation",
    "Other",
  ];

  const colors = {
    "Groceries": '#FF6384',
    "Rent": '#36A2EB',
    "Salary": '#FFCE56',
    "Tip": '#4BC0C0',
    "Food": '#9966FF',
    "Medical": '#FF9F40',
    "Utilities": '#8AC926',
    "Entertainment": '#6A4C93',
    "Transportation": '#1982C4',
    "Other": '#F45B69',
  };
  
  

  return (
  
    <>
    <Header/>
  {/* First Row: Total Transactions & Total Turnover */}
  <Container className="justify-content-center mt-4 mb-4 ms-5 ps-5">
  <Row style={{maxWidth :'800' }} className="mb-4">
    <div className="col-md-6 mb-4"p-3 >
      <div className="card h-100 w-100 p-lg-2">
        <div className="card-header bg-secondary text-white">
          <strong>Total Transactions:</strong> {TotalTransactions}
        </div>
        <div className="card-body mb-4 bg-none d-inline">
          <h5 className="text-success">
            Income: <ArrowDropUp /> {totalIncomeTransactions.length}
          </h5>
          <h5 className="text-danger">
            Expense: <ArrowDropDown /> {totalExpenseTransactions.length}
          </h5>
          <div className="row mt-3">
          <div style={{height:150}} className="d-grid ps-5 col-6 p-2 my-2">
            <CircularProgressBar
              percentage={totalIncomePercent.toFixed(0)}
              color="green"
            />
          </div>
          <div style={{height:150}} className="d-grid col-6  p-2 my-2">
            <CircularProgressBar
              percentage={totalExpensePercent.toFixed(0)}
              color="red"
            />
          </div>
          </div>
        </div>
      </div>
    </div>

    <div className="col-md-6 mb-4"p-3 >
      <div className="card h-100 w-100 p-lg-2">
        <div className="card-header bg-secondary text-white">
          <strong>Total TurnOver:</strong> {totalTurnOver}
        </div>
        <div className="card-body mb-4 bg-none d-inline">
          <h5 className="text-success">
            Income: <ArrowDropUp /> {totalTurnOverIncome} <CurrencyRupeeIcon />
          </h5>
          <h5 className="text-danger">
            Expense: <ArrowDropDown /> {totalTurnOverExpense} <CurrencyRupeeIcon />
          </h5>
          <div className="row mt-3">
          <div style={{height:150}} className="d-grid col-6 ps-5  p-2 my-2">
            <CircularProgressBar
              percentage={TurnOverIncomePercent.toFixed(0)}
              color="green"
            />
          </div>
          <div  style={{height:150}} className="d-grid col-6  p-2 my-2">
            <CircularProgressBar
              percentage={TurnOverExpensePercent.toFixed(0)}
              color="red"
            />
          </div>
          </div>
        </div>
      </div>
    </div>
  </Row>

  {/* Second Row: Categorywise Income and Expense */}
  <Row>
    <div className="col-md-6 mb-4">
      <div className="card h-100 w-100 p-lg-2">
        <div className="card-header bg-secondary text-white">
          <strong>Categorywise Income</strong>
        </div>
        <div className="card-body mb-4  m-0 bg-none d-inline">
          {categories.map((category) => {
            const income = transactions
              .filter((t) => t.transactionType === "credit" && t.category === category)
              .reduce((acc, t) => acc + t.amount, 0);
            const incomePercent = (income / totalTurnOver) * 100;

            return (
              income > 0 && (
                <LineProgressBar
                  key={`${category}-income`}
                  label={category}
                  percentage={incomePercent.toFixed(0)}
                  lineColor={colors[category]}
                />
              )
            );
          })}
        </div>
      </div>
    </div>

    <div className="col-md-6 mb-4"p-3 >
      <div className="card h-100 w-100 p-lg-2">
        <div className="card-header bg-secondary text-white">
          <strong>Categorywise Expense</strong>
        </div>
        <div className="card-body mb-4 bg-none d-inline">
          {categories.map((category) => {
            const expense = transactions
              .filter((t) => t.transactionType === "expense" && t.category === category)
              .reduce((acc, t) => acc + t.amount, 0);
            const expensePercent = (expense / totalTurnOver) * 100;

            return (
              expense > 0 && (
                <LineProgressBar
                  key={`${category}-expense`}
                  label={category}
                  percentage={expensePercent.toFixed(0)}
                  lineColor={colors[category]}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  </Row>
  </Container>
  <br/>
  <br/>
      <Footer/>
    </>
  );
};

export default Analytics;
