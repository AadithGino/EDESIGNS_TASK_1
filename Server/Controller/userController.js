const userModel = require("../Model/userModel");
const twilio = require("../OTP");
const client = require("twilio")(twilio.accountSID, twilio.authToken);

exports.addNumber = async (req, res) => {
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

exports.verifyNumber = async (req, res) => {
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
          userModel.findOne({Number:Number}).then((data)=>{
            if(data!=null){
              userModel.updateOne({Number:Number},{$set:{otpStatus:true}}).then((data)=>{
                res.status(200).json("OTP VALID")
              })
            }else{
              userModel.create(details).then((data) => {
                res.status(201).json("OTP VALID");
              });
            }
          })
        } else {
          let details = {
            Number,
            otpStatus: false,
          };
          userModel.findOne({Number:Number}).then((data)=>{
            if(data!=null){
              userModel.updateOne({Number:Number},{$set:{otpStatus:false}}).then((data)=>{
                res.status(200).json("OTP INVALID")
              })
            }else{
              userModel.create(details).then((data) => {
                res.status(201).json("OTP INVALID");
              });
            }
          })
         
        }
      });
  } catch (error) {}
};
