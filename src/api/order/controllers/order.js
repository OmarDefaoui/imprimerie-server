"use strict";
const stripe = require("stripe")(process.env.STRIPE_KEY);
const nodemailer = require("nodemailer");

/**
 * order controller
 */
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order");

// Modify the create function to send email
module.exports.create = async (ctx) => {
  try {
    // Create the order object
    const order = await strapi.services.order.create(ctx.request.body);

    // Send the order object via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@example.com",
        pass: "your-email-password",
      },
    });

    const mailOptions = {
      from: "your-email@example.com",
      to: "recipient-email@example.com",
      subject: "New Order",
      text: `A new order has been created:\n\n${JSON.stringify(order, null, 2)}`,
    };

    await transporter.sendMail(mailOptions);

    // Return a success response
    ctx.send({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    // Return an error response
    ctx.throw(500, "Failed to create order");
  }
};
