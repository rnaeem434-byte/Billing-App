console.log("Billing App Started");


/* ================================
   DATE
================================ */

document.addEventListener("DOMContentLoaded", function () {

    const dateInput = document.getElementById("billDate");

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        dateInput.value = `${year}-${month}-${day}`;
    }

    loadBills();

});


/* ================================
   CALCULATION
================================ */

const feetInput = document.getElementById("totalFeet");
const rateInput = document.getElementById("rate");
const paidInput = document.getElementById("paid");


if (feetInput) {
    feetInput.addEventListener("input", calculateBill);
}

if (rateInput) {
    rateInput.addEventListener("input", calculateBill);
}

if (paidInput) {
    paidInput.addEventListener("input", calculateBill);
}


function calculateBill() {

    const feet = Number(
        document.getElementById("totalFeet").value
    ) || 0;

    const rate = Number(
        document.getElementById("rate").value
    ) || 0;

    const paid = Number(
        document.getElementById("paid").value
    ) || 0;


    const total = feet * rate;

    const pending = Math.max(total - paid, 0);


    document.getElementById("totalBill").value = total;

    document.getElementById("pending").value = pending;


    document.getElementById("summaryFeet").textContent =
        feet;

    document.getElementById("summaryTotal").textContent =
        "Rs. " + total.toLocaleString();

    document.getElementById("summaryPaid").textContent =
        "Rs. " + paid.toLocaleString();

    document.getElementById("summaryPending").textContent =
        "Rs. " + pending.toLocaleString();

}


/* ================================
   SAVE BILL
================================ */

function saveBill() {

    const customerName =
        document.getElementById("customerName").value.trim();

    const location =
        document.getElementById("customerLocation").value.trim();

    const date =
        document.getElementById("billDate").value;

    const feet =
        Number(document.getElementById("totalFeet").value) || 0;

    const rate =
        Number(document.getElementById("rate").value) || 0;

    const total =
        Number(document.getElementById("totalBill").value) || 0;

    const paid =
        Number(document.getElementById("paid").value) || 0;

    const pending =
        Number(document.getElementById("pending").value) || 0;


    if (!customerName) {

        alert("Please enter customer name.");

        return;
    }


    if (feet <= 0) {

        alert("Please enter total feet.");

        return;
    }


    if (rate <= 0) {

        alert("Please enter rate.");

        return;
    }


    const bill = {

        id: Date.now(),

        date: date,

        customerName: customerName,

        location: location,

        feet: feet,

        rate: rate,

        total: total,

        paid: paid,

        pending: pending

    };


    let bills =
        JSON.parse(localStorage.getItem("customerBills")) || [];


    bills.push(bill);


    localStorage.setItem(
        "customerBills",
        JSON.stringify(bills)
    );


    alert("Customer bill saved successfully ✅");


    clearForm();

    loadBills();

}


/* ================================
   LOAD BILLS
================================ */

function loadBills() {

    const tableBody =
        document.getElementById("billTableBody");


    if (!tableBody) {
        return;
    }


    let bills =
        JSON.parse(localStorage.getItem("customerBills")) || [];


    tableBody.innerHTML = "";


    bills.forEach(function (bill, index) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${index + 1}</td>

            <td>${bill.date}</td>

            <td>${bill.customerName}</td>

            <td>${bill.location}</td>

            <td>${bill.feet}</td>

            <td>Rs. ${bill.rate.toLocaleString()}</td>

            <td>Rs. ${bill.total.toLocaleString()}</td>

            <td>Rs. ${bill.paid.toLocaleString()}</td>

            <td>Rs. ${bill.pending.toLocaleString()}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteBill(${bill.id})"
                >
                    Delete
                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


/* ================================
   DELETE
================================ */

function deleteBill(id) {

    const confirmDelete =
        confirm("Delete this bill?");


    if (!confirmDelete) {
        return;
    }


    let bills =
        JSON.parse(localStorage.getItem("customerBills")) || [];


    bills =
        bills.filter(function (bill) {

            return bill.id !== id;

        });


    localStorage.setItem(
        "customerBills",
        JSON.stringify(bills)
    );


    loadBills();

}


/* ================================
   CLEAR FORM
================================ */

function clearForm() {

    document.getElementById("customerName").value = "";

    document.getElementById("customerLocation").value = "";

    document.getElementById("totalFeet").value = "";

    document.getElementById("rate").value = "";

    document.getElementById("paid").value = "";

    document.getElementById("totalBill").value = 0;

    document.getElementById("pending").value = 0;


    document.getElementById("summaryFeet").textContent = 0;

    document.getElementById("summaryTotal").textContent =
        "Rs. 0";

    document.getElementById("summaryPaid").textContent =
        "Rs. 0";

    document.getElementById("summaryPending").textContent =
        "Rs. 0";

}


/* ================================
   DASHBOARD
================================ */

function goHome() {

    window.location.href = "index.html";

}/* ================================
   LABOUR SYSTEM
================================ */


const workerRates = {

    Ahad: 8,

    Adeel: 10,

    Bilal: 14

};



/* ================================
   SET WORKER RATE
================================ */

function setWorkerRate() {

    const worker =
        document.getElementById("workerName").value;


    const rate =
        workerRates[worker] || 0;


    document.getElementById("workerRate").value =
        rate;


    document.getElementById("summaryWorker").textContent =
        worker || "-";


    calculateLabour();

}



/* ================================
   LABOUR CALCULATION
================================ */

const labourFeetInput =
    document.getElementById("labourFeet");


const labourPaidInput =
    document.getElementById("labourPaid");


if (labourFeetInput) {

    labourFeetInput.addEventListener(
        "input",
        calculateLabour
    );

}


if (labourPaidInput) {

    labourPaidInput.addEventListener(
        "input",
        calculateLabour
    );

}



function calculateLabour() {


    const feet =

        Number(
            document.getElementById("labourFeet").value
        ) || 0;



    const rate =

        Number(
            document.getElementById("workerRate").value
        ) || 0;



    const paid =

        Number(
            document.getElementById("labourPaid").value
        ) || 0;



    const total = feet * rate;



    const pending =
        Math.max(total - paid, 0);



    document.getElementById("labourTotal").value =
        total;



    document.getElementById("labourPending").value =
        pending;



    document.getElementById("summaryLabourFeet").textContent =
        feet;



    document.getElementById("summaryLabourTotal").textContent =
        "Rs. " + total.toLocaleString();



    document.getElementById("summaryLabourPending").textContent =
        "Rs. " + pending.toLocaleString();

}



/* ================================
   SAVE LABOUR
================================ */

function saveLabour() {


    const worker =
        document.getElementById("workerName").value;



    const date =
        document.getElementById("labourDate").value;



    const customer =
        document.getElementById("labourCustomer").value.trim();



    const location =
        document.getElementById("labourLocation").value.trim();



    const feet =
        Number(
            document.getElementById("labourFeet").value
        ) || 0;



    const rate =
        Number(
            document.getElementById("workerRate").value
        ) || 0;



    const total =
        Number(
            document.getElementById("labourTotal").value
        ) || 0;



    const paid =
        Number(
            document.getElementById("labourPaid").value
        ) || 0;



    const pending =
        Number(
            document.getElementById("labourPending").value
        ) || 0;



    if (!worker) {

        alert("Please select worker.");

        return;

    }



    if (!customer) {

        alert("Please enter customer name.");

        return;

    }



    if (feet <= 0) {

        alert("Please enter total feet.");

        return;

    }



    const labour = {

        id: Date.now(),

        date: date,

        worker: worker,

        customer: customer,

        location: location,

        feet: feet,

        rate: rate,

        total: total,

        paid: paid,

        pending: pending

    };



    let records =

        JSON.parse(
            localStorage.getItem("labourRecords")
        ) || [];



    records.push(labour);



    localStorage.setItem(
        "labourRecords",
        JSON.stringify(records)
    );



    alert("Labour entry saved successfully ✅");



    clearLabourForm();

    loadLabourRecords();

    updateWorkerSummary();

}



/* ================================
   LOAD LABOUR
================================ */

function loadLabourRecords() {


    const tableBody =
        document.getElementById("labourTableBody");


    if (!tableBody) {

        return;

    }



    let records =

        JSON.parse(
            localStorage.getItem("labourRecords")
        ) || [];



    tableBody.innerHTML = "";



    records.forEach(function (record, index) {


        const row =
            document.createElement("tr");



        row.innerHTML = `

            <td>${index + 1}</td>

            <td>${record.date}</td>

            <td>${record.worker}</td>

            <td>${record.customer}</td>

            <td>${record.location}</td>

            <td>${record.feet}</td>

            <td>Rs. ${record.rate.toLocaleString()}</td>

            <td>Rs. ${record.total.toLocaleString()}</td>

            <td>Rs. ${record.paid.toLocaleString()}</td>

            <td>Rs. ${record.pending.toLocaleString()}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteLabour(${record.id})"
                >
                    Delete
                </button>

            </td>

        `;



        tableBody.appendChild(row);

    });

}



/* ================================
   DELETE LABOUR
================================ */

function deleteLabour(id) {


    const confirmDelete =
        confirm("Delete this labour entry?");


    if (!confirmDelete) {

        return;

    }



    let records =

        JSON.parse(
            localStorage.getItem("labourRecords")
        ) || [];



    records =

        records.filter(function(record) {

            return record.id !== id;

        });



    localStorage.setItem(
        "labourRecords",
        JSON.stringify(records)
    );



    loadLabourRecords();

    updateWorkerSummary();

}



/* ================================
   WORKER SUMMARY
================================ */

function updateWorkerSummary() {


    let records =

        JSON.parse(
            localStorage.getItem("labourRecords")
        ) || [];



    let totals = {

        Ahad: 0,

        Adeel: 0,

        Bilal: 0

    };



    records.forEach(function(record) {

        if (totals[record.worker] !== undefined) {

            totals[record.worker] += record.total;

        }

    });



    const ahad =
        document.getElementById("ahadSummary");


    const adeel =
        document.getElementById("adeelSummary");


    const bilal =
        document.getElementById("bilalSummary");



    if (ahad) {

        ahad.textContent =
            "Rs. " + totals.Ahad.toLocaleString();

    }



    if (adeel) {

        adeel.textContent =
            "Rs. " + totals.Adeel.toLocaleString();

    }



    if (bilal) {

        bilal.textContent =
            "Rs. " + totals.Bilal.toLocaleString();

    }

}



/* ================================
   CLEAR LABOUR FORM
================================ */

function clearLabourForm() {


    document.getElementById("workerName").value = "";

    document.getElementById("labourCustomer").value = "";

    document.getElementById("labourLocation").value = "";

    document.getElementById("labourFeet").value = "";

    document.getElementById("workerRate").value = 0;

    document.getElementById("labourTotal").value = 0;

    document.getElementById("labourPaid").value = "";

    document.getElementById("labourPending").value = 0;


    document.getElementById("summaryWorker").textContent =
        "-";

    document.getElementById("summaryLabourFeet").textContent =
        0;

    document.getElementById("summaryLabourTotal").textContent =
        "Rs. 0";

    document.getElementById("summaryLabourPending").textContent =
        "Rs. 0";

}



/* ================================
   DATE
================================ */

if (document.getElementById("labourDate")) {


    const today = new Date();


    const year =
        today.getFullYear();


    const month =
        String(today.getMonth() + 1).padStart(2, "0");


    const day =
        String(today.getDate()).padStart(2, "0");


    document.getElementById("labourDate").value =
        `${year}-${month}-${day}`;


}



/* ================================
   LOAD ON PAGE
================================ */

if (document.getElementById("labourTableBody")) {

    loadLabourRecords();

    updateWorkerSummary();

}



/* ================================
   BACK
================================ */

function goCustomerBills() {

    window.location.href = "index.html";

}/* =================================
   MAIN DASHBOARD
================================= */


function openCustomerBills() {

    window.location.href = "customer.html";

}


function openWorkers() {

    window.location.href = "worker.html";

}


function loadDashboard() {

    let bills =
        JSON.parse(
            localStorage.getItem("customerBills")
        ) || [];


    let labour =
        JSON.parse(
            localStorage.getItem("labourRecords")
        ) || [];



    /* CUSTOMER TOTALS */

    let totalFeet = 0;

    let totalSales = 0;

    let totalReceived = 0;

    let totalPending = 0;


    bills.forEach(function (bill) {

        totalFeet += Number(bill.feet) || 0;

        totalSales += Number(bill.total) || 0;

        totalReceived += Number(bill.paid) || 0;

        totalPending += Number(bill.pending) || 0;

    });



    const billsElement =
        document.getElementById("totalCustomerBills");


    if (billsElement) {

        billsElement.textContent =
            bills.length;

    }



    const feetElement =
        document.getElementById("totalCustomerFeet");


    if (feetElement) {

        feetElement.textContent =
            totalFeet.toLocaleString();

    }



    const salesElement =
        document.getElementById("totalSales");


    if (salesElement) {

        salesElement.textContent =
            "Rs. " + totalSales.toLocaleString();

    }



    const receivedElement =
        document.getElementById("totalReceived");


    if (receivedElement) {

        receivedElement.textContent =
            "Rs. " + totalReceived.toLocaleString();

    }



    const pendingElement =
        document.getElementById("totalPending");


    if (pendingElement) {

        pendingElement.textContent =
            "Rs. " + totalPending.toLocaleString();

    }



    /* WORKER TOTALS */

    let ahad = 0;

    let adeel = 0;

    let bilal = 0;

    let labourTotal = 0;

    let labourPending = 0;


    labour.forEach(function (record) {


        const amount =
            Number(record.total) || 0;


        const pending =
            Number(record.pending) || 0;


        labourTotal += amount;

        labourPending += pending;



        if (record.worker === "Ahad") {

            ahad += amount;

        }


        if (record.worker === "Adeel") {

            adeel += amount;

        }


        if (record.worker === "Bilal") {

            bilal += amount;

        }

    });



    const labourElement =
        document.getElementById("totalLabour");


    if (labourElement) {

        labourElement.textContent =
            "Rs. " + labourTotal.toLocaleString();

    }



    const ahadElement =
        document.getElementById("dashboardAhad");


    if (ahadElement) {

        ahadElement.textContent =
            "Rs. " + ahad.toLocaleString();

    }



    const adeelElement =
        document.getElementById("dashboardAdeel");


    if (adeelElement) {

        adeelElement.textContent =
            "Rs. " + adeel.toLocaleString();

    }



    const bilalElement =
        document.getElementById("dashboardBilal");


    if (bilalElement) {

        bilalElement.textContent =
            "Rs. " + bilal.toLocaleString();

    }



    const customerPendingElement =
        document.getElementById(
            "dashboardCustomerPending"
        );


    if (customerPendingElement) {

        customerPendingElement.textContent =
            "Rs. " + totalPending.toLocaleString();

    }



    const labourPendingElement =
        document.getElementById(
            "dashboardLabourPending"
        );


    if (labourPendingElement) {

        labourPendingElement.textContent =
            "Rs. " + labourPending.toLocaleString();

    }



    /* MONTH */

    const monthElement =
        document.getElementById("dashboardMonth");


    if (monthElement) {

        const now = new Date();

        const monthName =
            now.toLocaleString(
                "en-US",
                { month: "long" }
            );

        const year =
            now.getFullYear();


        monthElement.textContent =
            `${monthName} ${year} Business Summary`;

    }

}


/* LOAD DASHBOARD */

if (
    document.getElementById("totalCustomerBills")
) {

    loadDashboard();

}/* =================================
   PAYMENT SYSTEM
================================ */


/* ---------- CUSTOMER BILL LIST ---------- */

function loadPaymentBills() {

    const select =
        document.getElementById("paymentBill");

    if (!select) {
        return;
    }


    const bills =
        JSON.parse(
            localStorage.getItem("customerBills")
        ) || [];


    select.innerHTML =
        '<option value="">Select Bill</option>';


    bills.forEach(function (bill) {

        const option =
            document.createElement("option");


        option.value = bill.id;


        option.textContent =
            `${bill.customerName} - Rs. ${bill.total.toLocaleString()} - ${bill.date}`;


        select.appendChild(option);

    });

}



/* ---------- SHOW CUSTOMER BILL ---------- */

function showBillPaymentInfo() {

    const select =
        document.getElementById("paymentBill");


    const id =
        Number(select.value);


    const bills =
        JSON.parse(
            localStorage.getItem("customerBills")
        ) || [];


    const bill =
        bills.find(function(item) {

            return item.id === id;

        });


    if (!bill) {

        return;

    }


    document.getElementById("paymentCustomer").value =
        bill.customerName;


    document.getElementById("paymentBillTotal").value =
        bill.total;


    document.getElementById("paymentAlreadyPaid").value =
        bill.paid;


    document.getElementById("paymentCurrentPending").value =
        bill.pending;


    document.getElementById("paymentSummaryBill").textContent =
        "Rs. " + bill.total.toLocaleString();


    document.getElementById("paymentSummaryPaid").textContent =
        "Rs. " + bill.paid.toLocaleString();


    document.getElementById("paymentSummaryNew").textContent =
        "Rs. 0";


    document.getElementById("paymentSummaryPending").textContent =
        "Rs. " + bill.pending.toLocaleString();

}



/* ---------- CUSTOMER PAYMENT ---------- */

function receiveCustomerPayment() {

    const select =
        document.getElementById("paymentBill");


    const id =
        Number(select.value);


    const amount =
        Number(
            document.getElementById(
                "newCustomerPayment"
            ).value
        ) || 0;


    if (!id) {

        alert("Please select customer bill.");

        return;

    }


    if (amount <= 0) {

        alert("Please enter payment amount.");

        return;

    }


    let bills =
        JSON.parse(
            localStorage.getItem("customerBills")
        ) || [];


    const billIndex =
        bills.findIndex(function(item) {

            return item.id === id;

        });


    if (billIndex === -1) {

        alert("Bill not found.");

        return;

    }


    const bill =
        bills[billIndex];


    if (amount > bill.pending) {

        alert(
            "Payment cannot be greater than pending amount."
        );

        return;

    }


    bill.paid =
        Number(bill.paid) + amount;


    bill.pending =
        Number(bill.total) - Number(bill.paid);


    bills[billIndex] = bill;


    localStorage.setItem(
        "customerBills",
        JSON.stringify(bills)
    );


    savePaymentHistory({

        id: Date.now(),

        date: new Date().toISOString().split("T")[0],

        type: "Customer Payment",

        name: bill.customerName,

        amount: amount

    });


    alert(
        "Customer payment saved successfully ✅"
    );


    document.getElementById(
        "newCustomerPayment"
    ).value = "";


    showBillPaymentInfo();


    loadPaymentHistory();

}



/* ---------- LABOUR LIST ---------- */

function loadLabourPaymentRecords() {

    const select =
        document.getElementById(
            "labourPaymentRecord"
        );


    if (!select) {

        return;

    }


    const records =
        JSON.parse(
            localStorage.getItem("labourRecords")
        ) || [];


    select.innerHTML =
        '<option value="">Select Labour Record</option>';


    records.forEach(function(record) {

        const option =
            document.createElement("option");


        option.value =
            record.id;


        option.textContent =
            `${record.worker} - ${record.customer} - ${record.feet} ft`;


        select.appendChild(option);

    });

}



/* ---------- SHOW LABOUR ---------- */

function showLabourPaymentInfo() {

    const select =
        document.getElementById(
            "labourPaymentRecord"
        );


    const id =
        Number(select.value);


    const records =
        JSON.parse(
            localStorage.getItem("labourRecords")
        ) || [];


    const record =
        records.find(function(item) {

            return item.id === id;

        });


    if (!record) {

        return;

    }


    document.getElementById(
        "labourPaymentWorker"
    ).value =
        record.worker;


    document.getElementById(
        "labourPaymentCustomer"
    ).value =
        record.customer;


    document.getElementById(
        "labourPaymentTotal"
    ).value =
        record.total;


    document.getElementById(
        "labourAlreadyPaid"
    ).value =
        record.paid;


    document.getElementById(
        "labourCurrentPending"
    ).value =
        record.pending;

}



/* ---------- PAY LABOUR ---------- */

function payLabour() {

    const select =
        document.getElementById(
            "labourPaymentRecord"
        );


    const id =
        Number(select.value);


    const amount =
        Number(
            document.getElementById(
                "newLabourPayment"
            ).value
        ) || 0;


    if (!id) {

        alert("Please select labour record.");

        return;

    }


    if (amount <= 0) {

        alert("Please enter cash out amount.");

        return;

    }


    let records =
        JSON.parse(
            localStorage.getItem("labourRecords")
        ) || [];


    const recordIndex =
        records.findIndex(function(item) {

            return item.id === id;

        });


    if (recordIndex === -1) {

        alert("Labour record not found.");

        return;

    }


    const record =
        records[recordIndex];


    if (amount > record.pending) {

        alert(
            "Cash out cannot be greater than pending labour."
        );

        return;

    }


    record.paid =
        Number(record.paid) + amount;


    record.pending =
        Number(record.total) - Number(record.paid);


    records[recordIndex] =
        record;


    localStorage.setItem(
        "labourRecords",
        JSON.stringify(records)
    );


    savePaymentHistory({

        id: Date.now(),

        date: new Date().toISOString().split("T")[0],

        type: "Labour Cash Out",

        name: record.worker,

        amount: amount

    });


    alert(
        "Labour cash out saved successfully ✅"
    );


    document.getElementById(
        "newLabourPayment"
    ).value = "";


    showLabourPaymentInfo();


    loadPaymentHistory();

}



/* ---------- PAYMENT HISTORY ---------- */

function savePaymentHistory(payment) {

    let history =
        JSON.parse(
            localStorage.getItem("paymentHistory")
        ) || [];


    history.push(payment);


    localStorage.setItem(
        "paymentHistory",
        JSON.stringify(history)
    );

}



function loadPaymentHistory() {

    const body =
        document.getElementById(
            "paymentHistoryBody"
        );


    if (!body) {

        return;

    }


    const history =
        JSON.parse(
            localStorage.getItem("paymentHistory")
        ) || [];


    body.innerHTML = "";


    history.slice().reverse().forEach(
        function(payment, index) {


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${index + 1}</td>

                <td>${payment.date}</td>

                <td>${payment.type}</td>

                <td>${payment.name}</td>

                <td>
                    Rs. ${payment.amount.toLocaleString()}
                </td>

            `;


            body.appendChild(row);

        }
    );

}



/* ---------- PAYMENT PAGE LOAD ---------- */

if (
    document.getElementById("paymentBill")
) {

    loadPaymentBills();

    loadLabourPaymentRecords();

    loadPaymentHistory();

}



/* ---------- DASHBOARD ---------- */

function goDashboard() {

    window.location.href = "index.html";

}/* =================================
   SETTINGS SYSTEM
================================ */


const defaultSettings = {

    businessName: "Masters Sons Wallpaper",

    businessAddress: "Near HBL Bank, Talwandi Bhindaran",

    businessWhatsApp: "03086550030",

    businessPhone: "03331477450",

    workerRates: {

        Ahad: 8,

        Adeel: 10,

        Bilal: 14

    },

    defaultCustomerRate: 0

};



function getSettings() {

    const saved =

        JSON.parse(
            localStorage.getItem("appSettings")
        );


    if (!saved) {

        localStorage.setItem(
            "appSettings",
            JSON.stringify(defaultSettings)
        );

        return defaultSettings;

    }


    return saved;

}



/* =================================
   LOAD SETTINGS
================================= */

function loadSettings() {

    const settings = getSettings();


    const businessName =
        document.getElementById("businessName");

    if (businessName) {

        businessName.value =
            settings.businessName;

    }


    const address =
        document.getElementById("businessAddress");

    if (address) {

        address.value =
            settings.businessAddress;

    }


    const whatsapp =
        document.getElementById("businessWhatsApp");

    if (whatsapp) {

        whatsapp.value =
            settings.businessWhatsApp;

    }


    const phone =
        document.getElementById("businessPhone");

    if (phone) {

        phone.value =
            settings.businessPhone;

    }


    const ahad =
        document.getElementById("ahadRate");

    if (ahad) {

        ahad.value =
            settings.workerRates.Ahad;

    }


    const adeel =
        document.getElementById("adeelRate");

    if (adeel) {

        adeel.value =
            settings.workerRates.Adeel;

    }


    const bilal =
        document.getElementById("bilalRate");

    if (bilal) {

        bilal.value =
            settings.workerRates.Bilal;

    }


    const customerRate =
        document.getElementById(
            "defaultCustomerRate"
        );

    if (customerRate) {

        customerRate.value =
            settings.defaultCustomerRate;

    }

}



/* =================================
   SAVE SETTINGS
================================= */

function saveSettings() {


    const settings = {

        businessName:
            document.getElementById(
                "businessName"
            ).value.trim(),


        businessAddress:
            document.getElementById(
                "businessAddress"
            ).value.trim(),


        businessWhatsApp:
            document.getElementById(
                "businessWhatsApp"
            ).value.trim(),


        businessPhone:
            document.getElementById(
                "businessPhone"
            ).value.trim(),


        workerRates: {

            Ahad:
                Number(
                    document.getElementById(
                        "ahadRate"
                    ).value
                ) || 0,


            Adeel:
                Number(
                    document.getElementById(
                        "adeelRate"
                    ).value
                ) || 0,


            Bilal:
                Number(
                    document.getElementById(
                        "bilalRate"
                    ).value
                ) || 0

        },


        defaultCustomerRate:
            Number(
                document.getElementById(
                    "defaultCustomerRate"
                ).value
            ) || 0

    };


    localStorage.setItem(
        "appSettings",
        JSON.stringify(settings)
    );


    alert("Settings saved successfully ✅");

}



/* =================================
   RESET SETTINGS
================================= */

function resetSettings() {


    const confirmReset =
        confirm(
            "Reset all settings to default?"
        );


    if (!confirmReset) {

        return;

    }


    localStorage.setItem(
        "appSettings",
        JSON.stringify(defaultSettings)
    );


    loadSettings();


    alert("Settings reset successfully.");

}



/* =================================
   SETTINGS PAGE LOAD
================================= */

if (
    document.getElementById("businessName")
) {

    loadSettings();

}



/* =================================
   DASHBOARD LINK
================================ */

function openSettings() {

    window.location.href =
        "settings.html";

}
