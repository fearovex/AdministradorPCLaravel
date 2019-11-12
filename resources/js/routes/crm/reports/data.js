// invoice list data
export const invoiceList = [
   {
      id: "#inv001",
      firstName: "Steven",
      lastName: "Gonz",
      typeColor: "primary",
      accountType: "Paid",
      dateCreated: "13 Aug 2017",
      dueDate: "4 Jan 2018",
      amount: "$1000"
   },
   {
      id: "#inv002",
      firstName: "Joseph",
      lastName: "Good",
      accountType: "partially paid",
      typeColor: "info",
      dateCreated: "22 Aug 2017",
      dueDate: "28 Feb 2019",
      amount: "$2500"
   },
   {
      id: "#inv003",
      firstName: "Mario",
      lastName: "Harmon",
      accountType: "paid",
      typeColor: "primary",
      dateCreated: "13 Aug 2017",
      dueDate: "10 Mar 2018",
      amount: "$500"
   },
   {
      id: "#inv004",
      firstName: "Aleta",
      lastName: "Good",
      accountType: "unpaid",
      typeColor: "danger",
      dateCreated: "22 Aug 2017",
      dueDate: "23 Aug 2019",
      amount: "$700"
   },
   {
      id: "#inv005",
      firstName: "Floren",
      lastName: "Smith",
      accountType: "partially paid",
      typeColor: "info",
      dateCreated: "13 Aug 2018",
      dueDate: "25 June 2018",
      amount: "$1090"
   },
   {
      id: "#inv006",
      firstName: "Helen",
      lastName: "Moron",
      accountType: "unpaid",
      typeColor: "danger",
      dateCreated: "22 Aug 2017",
      dueDate: "29 Nov 2018",
      amount: "$1900"
   }
];
//Payments content
export const paymentList = [
   {
      payid: "#pay001",
      firstName: "Leonard",
      lastName: "Gonz",
      paymentType: "Paypal",
      typeColor: "primary",
      paidDate: "19 Aug 2017",
      amount: "$2000"
   },
   {
      payid: "#pay002",
      firstName: "Agnes",
      lastName: "Good",
      paymentType: "Paytm",
      typeColor: "info",
      paidDate: "22 Mar 2017",
      amount: "$500"
   },
   {
      payid: "#pay003",
      firstName: "Bonnie",
      lastName: "Harmon",
      paymentType: "Debit Card",
      typeColor: "primary",
      paidDate: "30 Sep 2017",
      amount: "$1500"
   },
   {
      payid: "#pay004",
      firstName: "Virgil",
      lastName: "Good",
      paymentType: "Credit Card",
      typeColor: "info",
      paidDate: "20 Aug 2017",
      amount: "$1700"
   },
   {
      payid: "#pay005",
      firstName: "Kevin",
      lastName: "Smith",
      paymentType: "paypal",
      typeColor: "primary",
      paidDate: "13 Aug 2018",
      amount: "$1290"
   },
   {
      payid: "#pay006",
      firstName: "Alice",
      lastName: "Moron",
      paymentType: "Phone pe",
      typeColor: "danger",
      paidDate: "22 Aug 2017",
      amount: "$1500"
   }
];
// Transaction List table data
export const transactionList = [
   {
      transid: "#trn001",
      date: "19 Aug 2018",
      account: "Citibank",
      type: "Saving",
      typeColor: "primary",
      amount: "$2000",
      debit: "$1,807.00",
      credit: "$0.00",
      balance: "$0.00"
   },
   {
      transid: "#trn002",
      date: "22 Mar 2018",
      account: "Standard Chartered Bank",
      type: "Income",
      typeColor: "info",
      amount: "$500",
      debit: "$1,307.00",
      credit: "$0.00",
      balance: "$0.00"
   },
   {
      transid: "#trn003",
      date: "30 Sep 2018",
      account: "HSBC Bank",
      type: "Expense",
      typeColor: "danger",
      amount: "$1500",
      debit: "$2,307.00",
      credit: "$0.00",
      balance: "$0.00"
   },
   {
      transid: "#trn004",
      date: "20 Aug 2018",
      account: "Deutsche Bank",
      type: "Income",
      typeColor: "info",
      amount: "$1700",
      debit: "$3,307.00",
      credit: "$0.00",
      balance: "$0.00"
   },
   {
      transid: "#trn005",
      date: "13 Jan 2018",
      account: "Bank of Scotland",
      type: "Saving",
      typeColor: "primary",
      amount: "$1290",
      debit: "$1,000.00",
      credit: "$0.00",
      balance: "$0.00"
   },
   {
      transid: "#trn006",
      date: "13 Jan 2018",
      account: "Barclays Bank",
      type: "Income",
      typeColor: "info",
      amount: "$1290",
      debit: "$1,500.00",
      credit: "$0.00",
      balance: "$0.00"
   },
   {
      transid: "#trn007",
      date: "13 Jan 2018",
      account: "The Bank of America",
      type: "Expense",
      typeColor: "danger",
      amount: "$1290",
      debit: "$1,709.00",
      credit: "$0.00",
      balance: "$0.00"
   },
];
//transfer report table content
export const transferreport = [
   {
      transid: "#trn001",
      date: "19 Aug 2018",
      account: "Citibank",
      type: "Saving",
      typeColor: "primary",
      amount: "$2000",
      balance: "$1,807.00",
      statusColor: 'primary',
      status: "Send"
   },
   {
      transid: "#trn002",
      date: "22 Mar 2018",
      account: "Standard Chartered Bank",
      type: "Income",
      typeColor: "info",
      amount: "$500",
      balance: "$1,807.00",
      statusColor: 'danger',
      status: "Not Send"
   },
   {
      transid: "#trn003",
      date: "30 Sep 2018",
      account: "HSBC Bank",
      type: "Expense",
      typeColor: "danger",
      amount: "$1500",
      balance: "$1,807.00",
      statusColor: 'primary',
      status: "Send"
   },
   {
      transid: "#trn004",
      date: "20 Aug 2018",
      account: "Deutsche Bank",
      type: "Income",
      typeColor: "info",
      amount: "$1700",
      balance: "$1,807.00",
      statusColor: 'primary',
      status: "Send"
   },
   {
      transid: "#trn005",
      date: "13 Jan 2018",
      account: "Bank of Scotland",
      type: "Saving",
      typeColor: "primary",
      amount: "$1290",
      balance: "$1,807.00",
      statusColor: 'danger',
      status: "Not Send"
   },
   {
      transid: "#trn006",
      date: "13 Jan 2018",
      account: "Barclays Bank",
      type: "Income",
      typeColor: "info",
      amount: "$1290",
      balance: "$1,807.00",
      statusColor: 'primary',
      status: "Send"
   },
   {
      transid: "#trn007",
      date: "13 Jan 2018",
      account: "The Bank of America",
      type: "Expense",
      typeColor: "danger",
      amount: "$1290",
      balance: "$1,807.00",
      statusColor: 'danger',
      status: "Not Send"
   },
]
//expense category table content
export const expenseCategory = [
   {
      itmNo: "#itm001",
      date: "19 Aug 2018",
      type: "Hotel",
      typeColor: "primary",
      description: "Hotel charges",
      amount: "$2000",
      statusColor: 'primary',
      status: "paid"
   },
   {
      itmNo: "#itm002",
      date: "22 Mar 2018",
      type: "Meal",
      typeColor: "info",
      description: "food delivery charges",
      amount: "$500",
      statusColor: 'primary',
      status: "paid"
   },
   {
      itmNo: "#itm003",
      date: "30 Sep 2018",
      type: "car rental",
      typeColor: "primary",
      description: "car service bill",
      amount: "$1500",
      statusColor: 'danger',
      status: "not paid"
   },
   {
      itmNo: "#itm004",
      date: "20 Aug 2018",
      type: "Health",
      typeColor: "info",
      description: "Hospital bill",
      amount: "$1700",
      statusColor: 'primary',
      status: "paid"
   },
   {
      itmNo: "#itm005",
      date: "13 Jan 2018",
      type: "accommodation",
      typeColor: "primary",
      description: "House rent",
      amount: "$1290",
      statusColor: 'danger',
      status: "Not paid"
   },
   {
      itmNo: "#itm006",
      date: "24 Mar 2018",
      type: "Meal",
      typeColor: "info",
      description: "food delivery charges",
      amount: "$500",
      statusColor: 'primary',
      status: "paid"
   },
   {
      itmNo: "#itm007",
      date: "30 Jan 2019",
      type: "accommodation",
      typeColor: "primary",
      description: "House rent",
      amount: "$1290",
      statusColor: 'danger',
      status: "Not paid"
   },
];
//Tax Rates content
export const taxRates = [
   {
      date: "4 Jan 2018",
      account: "The Bank of America",
      typeColor: "primary",
      type: "Expense",
      amount: "$1000.00",
      credit: "$300.00",
      balance: "$200.00"
   },
   {
      date: "28 Feb 2019",
      account: "Barclays Bank",
      typeColor: "info",
      type: "Income",
      amount: "$2500.00",
      credit: "$200.00",
      balance: "$150.00"
   },
   {
      date: "10 Mar 2018",
      account: "Bank of Scotland",
      typeColor: "primary",
      type: "Saving",
      amount: "$500.00",
      credit: "$100.00",
      balance: "$50.00"

   },
   {
      date: "23 Aug 2019",
      account: "Deutsche Bank",
      typeColor: "danger",
      type: "Income",
      amount: "$700.00",
      credit: "$300.00",
      balance: "$200.00"

   },
   {
      date: "25 June 2018",
      account: "HSBC Bank",
      typeColor: "info",
      type: "Saving",
      amount: "$1090.00",
      credit: "$800.00",
      balance: "$600.00"

   },
   {
      date: "29 Nov 2018",
      account: "HSBC Bank",
      typeColor: "danger",
      type: "Expense",
      amount: "$1900.00",
      credit: "$600.00",
      balance: "$400.00"

   }
];
//Add Tickets content
export const addTickets = [
   {
      srno: "01",
      ticketCode: "TRC 45651",
      subject: "Fly Bimen",
      date: "19 Aug 2017",
      department: "First Class",
      status: "Booked",
      statusColor: "primary"
   },
   {
      srno: "02",
      ticketCode: "TRC 45652",
      subject: "Fly Emeters",
      date: "22 Mar 2017",
      department: "Second Class",
      status: "cancel",
      statusColor: "danger"
   },
   {
      srno: "03",
      ticketCode: "TRC 45653",
      subject: "Air India",
      date: "30 Sep 2017",
      department: "First Class",
      status: "Booked",
      statusColor: "primary"
   },
   {
      srno: "04",
      ticketCode: "TRC 45654",
      subject: "Air India",
      date: "20 Aug 2017",
      department: "First Class",
      status: "Booked",
      statusColor: "primary"
   },
   {
      srno: "05",
      ticketCode: "TRC 45655",
      subject: "Air India",
      date: "13 Aug 2018",
      department: "Second Class",
      status: "cancel",
      statusColor: "danger"
   },
   {
      srno: "06",
      ticketCode: "TRC 45656",
      subject: "Air India",
      date: "22 Aug 2017",
      department: "First Class",
      status: "booked",
      statusColor: "primary"
   }
];