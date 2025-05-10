
import "./Transaction.css";
import { addTransaction, getTransactions } from "../../utils/ApiRequest";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import TableData from "./TableData";
import "react-datepicker/dist/react-datepicker.css";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BarChartIcon from "@mui/icons-material/BarChart";
import Analytics from "./Analytics";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from "react-bootstrap";
import Footer from "./Footer";

function Transaction() {
   const navigate = useNavigate();
  
    const toastOptions = {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    };

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
  
    const handleStartChange = (date) => {
      setStartDate(date);
    };
  
    const handleEndChange = (date) => {
      setEndDate(date);
    };
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    
    const [values, setValues] = useState({
      title: "",
      amount: "",
      description: "",
      category: "",
      date: "",
      transactionType: "",
    });
  
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
  
    const handleChangeFrequency = (e) => {
      setFrequency(e.target.value);
    };
  
    const handleSetType = (e) => {
      setType(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const { title, amount, description, category, date, transactionType } =
        values;
  
      if (
        !title ||
        !amount ||
        !description ||
        !category ||
        !date ||
        !transactionType
      ) {
        toast.error("Please enter all the fields", toastOptions);
      }
      setLoading(true);
  
      const { data } = await axios.post(addTransaction, {
        title: title,
        amount: amount,
        description: description,
        category: category,
        date: date,
        transactionType: transactionType,
        userId: cUser._id,
      });
  
      if (data.success === true) {
        toast.success(data.message, toastOptions);
        handleClose();
        setRefresh(!refresh);
      } else {
        toast.error(data.message, toastOptions);
      }
  
      setLoading(false);
    };
  
    const handleReset = () => {
      setType("all");
      setStartDate(null);
      setEndDate(null);
      setFrequency("7");
    };
  
  
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
    });
  

    useEffect(() => {
  const calculateIncomeExpense = () => {
    let incomeSum = 0;
    let expenseSum = 0;

    transactions.forEach((transaction) => {
      if (transaction.transactionType === "credit") {
        incomeSum += transaction.amount;
      } else if (transaction.transactionType === "expense") {
        expenseSum += transaction.amount;
      }
    });

    setIncome(incomeSum);
    setExpense(expenseSum);
    setTotalBalance(incomeSum - expenseSum);

    console.log("Income:", incomeSum, "Expense:", expenseSum, "Total Balance:", incomeSum - expenseSum);
  };

  calculateIncomeExpense();
}, [transactions]); // ✅ Only run when transactions change


    const handleTableClick = (e) => {
      setView("table");
    };
  
    const handleChartClick = (e) => {
      setView("chart");
    };
    console.log("transactions", transactions);

  return (
    <>
      
      <Header/>

      <main>
        <div className="summary">
        <div className="total-balance">
          <div className="label">Total Balance</div>
          <div className="amount">₹{totalBalance.toFixed(2)}</div>
        </div>
        <div className="income">
          <div className="label">Income</div>
          <div className="amount">₹{income.toFixed(2)}</div>
        </div>
        <div className="expenditure">
          <div className="label">Expenditure</div>
          <div className="amount">₹{expense.toFixed(2)}</div>
        </div>
      </div>

        <section className="transactions">
          <h2>Recent Transactions</h2>
          <div className="transaction-list">
          {transactions.map((tx) => (
          <Det
            key={tx._id}
            title={tx.title}
            amount={`₹${tx.amount}`}
            type={tx.transactionType === "credit" ? "Received" : "Spent"}
            date={new Date(tx.date).toLocaleDateString()}
          />
        ))}</div>
        </section>
              
      </main>
      <TableData setRefresh={setRefresh}/>
      <br/><br/><br/>


      <Footer/>
    
    </>
  );
}

function Det({ title, amount, type, date }) {
  return (
    <div className="transaction">
      <div className="title">{title}</div>
      <div className="spent-received">{type}: {amount}</div>
      <div className="date">Date: {date}</div>
    </div>
  );
}

export default Transaction;
