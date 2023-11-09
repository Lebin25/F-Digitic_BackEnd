const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         require: true
      },
      shippingInfo: {
         firstName: {
            type: String,
            require: true
         },
         lastName: {
            type: String,
            require: true
         },
         address: {
            type: String,
            require: true
         },
         city: {
            type: String,
            require: true
         },
         state: {
            type: String,
            require: true
         },
         other: {
            type: String,
            require: true
         },
         pincode: {
            type: Number,
            require: true
         },
      },
      paymentInfo: {
         razorpayOrderId: {
            type: String,
            require: true
         },
         razorpayPaymentId: {
            type: String,
            require: true
         },
      },
      orderItem: [
         {
            product: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Product",
               require: true
            },
            color: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Color",
               require: true
            },
            quantity: {
               type: Number,
               require: true
            },
            price: {
               type: Number,
               require: true
            },
         }
      ],
      paidAt: {
         type: Date,
         default: Date.now()
      },
      totalPrice: {
         type: Number,
         require: true
      },
      totalPriceAfterDiscount: {
         type: Number,
         require: true
      },
      orderStatus: {
         type: String,
         default: "Ordered"
      }
   },
   {
      timestamps: true,
   }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);