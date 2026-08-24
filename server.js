const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;


/*
  Middleware
*/

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));


/*
  Serve BismiMart frontend
*/

app.use(
  express.static(
    path.join(__dirname)
  )
);


/*
  Home page
*/

app.get("/", (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      "index.html"
    )
  );

});


/*
  Health check
*/

app.get("/api/health", (req, res) => {

  res.json({

    success: true,

    message:
      "BismiMart server is running.",

    time:
      new Date().toISOString()

  });

});


/*
  Create order
*/

app.post(
  "/api/create-order",
  (req, res) => {

    const {
      id,
      customerName,
      customerPhone,
      customerAddress,
      paymentMethod,
      items,
      total
    } = req.body;


    if (
      !customerName ||
      !customerPhone ||
      !customerAddress ||
      !paymentMethod ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !total
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Missing required order information."

      });

    }


    const allowedPaymentMethods = [
      "cod",
      "easypaisa",
      "jazzcash"
    ];


    if (
      !allowedPaymentMethods.includes(
        paymentMethod
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid payment method."

      });

    }


    /*
      IMPORTANT:

      This is currently a demo order endpoint.

      In the real BismiMart system,
      orders should be saved in a
      secure database.

      Payment gateways should also be
      connected here securely.
    */


    console.log(
      "New BismiMart order:",
      {
        id,
        customerName,
        customerPhone,
        customerAddress,
        paymentMethod,
        items,
        total
      }
    );


    return res.status(201).json({

      success: true,

      message:
        "Order received successfully.",

      orderId: id,

      status:
        "Order Placed"

    });

  }
);


/*
  404 handler
*/

app.use(
  (req, res) => {

    res.status(404).json({

      success: false,

      message:
        "BismiMart resource not found."

    });

  }
);


/*
  Start server
*/

app.listen(
  PORT,
  () => {

    console.log(
      `BismiMart server running on port ${PORT}`
    );

  }
);
