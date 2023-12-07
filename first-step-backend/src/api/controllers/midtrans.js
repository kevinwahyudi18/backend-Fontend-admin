const midtransClient = require("midtrans-client");
const catchError = require("../middlewares/custom-error");

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
  clientKey: process.env.CLIENT_KEY,
});

exports.proceedPayment = async (req, res, next) => {
  try {
    let parameter = {
      transaction_details: {
        order_id: req.body.order_id,
        gross_amount: req.body.payment,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      },
      callbacks: {
        finish: "http://localhost:5000/payment/status",
      },
      enabled_payments: [
        "credit_card",
        "mandiri_clickpay",
        "bca_klikbca",
        "bca_klikpay",
        "echannel",
        "permata_va",
        "bca_va",
        "bni_va",
        "other_va",
        "gopay",
        "indomaret",
      ],
    };

    const transaction = await snap.createTransaction(parameter);

    const dataPayment = {
      midtransResponse: JSON.stringify(transaction),
    };

    let transactionToken = transaction.token;

    res.status(200).json({
      status: true,
      message: "berhasil",
      dataPayment,
      token: transactionToken,
    });
  } catch (e) {
    res.status(400).json({
      status: false,
      message: "Pembayaran gagal",
      error: e.message,
    });
  }
};

exports.paymentResponse = async (req, res, next) => {
  try {
    const response = await snap.transaction.status(req.params.order_id);

    res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "order tidak ditemukan",
      error: error.message,
    });
  }
};

exports.midtransApi = catchError(async (req, res, next) => {
  res.status(200).json({
    clientKey: process.env.CLIENT_KEY,
  });
});