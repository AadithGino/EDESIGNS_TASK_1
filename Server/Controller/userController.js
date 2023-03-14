const userModel = require("../Model/userModel");
const twilio = require("../OTP");
const client = require("twilio")(twilio.accountSID, twilio.authToken);

export const addNumber = async (req, res) => {
  const { Number } = req.body;

  try {
    client.verify
      .services(twilio.serviceID)
      .verifications.create({
        to: `+91${Number}`,
        channel: "sms",
      })
      .then((data) => {
        let details = {
          Number,
        };
        res.status(200).json(details);
      });
  } catch (error) {}
};

export const verifyNumber = async (req, res) => {
  const { otp, Number } = req.body;
  try {
    client.verify
      .services(twilio.serviceID)
      .verificationChecks.create({
        to: `+91${Number}`,
        code: otp,
      })
      .then((data) => {
        if (data.status == "approved") {
          let details = {
            Number,
            otpStatus: true,
          };
          userModel.create(details).then((data) => {
            res.status(201).json(data);
          });
        } else {
          let details = {
            Number,
            otpStatus: false,
          };
          userModel.create(details).then((data) => {
            res.status(201).json(data);
          });
          res.status(401).json("Incorrect OTP");
        }
      });
  } catch (error) {}
};
