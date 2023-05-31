const { ObjectId } = require("mongodb");
const VirtualizationEnv = require("../../models/material_resources/virtualization_env");
const virtualization_env = require("../../models/material_resources/virtualization_env");
const User = require("../../models/user");
const nodemailer = require("nodemailer");
/** Add VirtualizationEnv */
module.exports.addVirtEnv = async function (req, res, next) {
    try {
        const virtualizationEnv = new VirtualizationEnv({
          type: req.body.type,
          processur: req.body.processur,
          ram: req.body.ram,
          stockage: req.body.stockage,
          bande_passante: req.body.bande_passante,
          systeme_exploitation: req.body.systeme_exploitation,
          start: req.body.start,
          end: req.body.end,
          applicant: req.body.applicant,
          isAccepted: false,
        });
    
        // Save the virtualization event to the database
        const savedVirtualizationEnv = await virtualizationEnv.save();

        if(savedVirtualizationEnv){

          //send mail to user
        const user = await User.findOne({ _id: req.body.applicant });
        const transporter = nodemailer.createTransport({
          service: "gmail",
          port: 587,
          auth: {
            user: "prologic.simop@gmail.com",
            pass: "mepdngigwccwxwog",
          },
        });
        transporter.sendMail({
          from: "prologic.simop@gmail.com",
          to: user.email,
          subject: "Prologic -- Reservation request",
          text: " We will send you an email when your request is accepted . " 
        });



        }
    
        res.status(201).json(savedVirtualizationEnv); 
      } catch (error) {
        res.status(500).json({ error: 'Failed to add virtualization event to the database' });
      }
};

    


/** Delete VirtualizationEnv */
module.exports.deleteVirtEnv = async function (req, res, next) {
    try {
    const virtualizationEnv =await VirtualizationEnv.findByIdAndDelete(
        {
            _id : req.params.id
        })
        console.log("Virtualization-Env deleted succefully")
        res.status(200).json("Virtualization-Env deleted succefully");
        
    
    }catch (error) {
        res.status(404).json("Virtualization-Env not found" + error.message);
    }
}


/** getAllVirtualizationEnvs  */
module.exports.getAllVirtsEnv = async function (req, res, next) {
    try {
        const virtualizationEnvs = await VirtualizationEnv.find().populate({ path: "applicant", select: "firstName lastName email phone " });
        res.status(200).json(virtualizationEnvs);
      } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve virtualization environments from the database' });
      }

      
    
};


/** getVirtualizationEnvById  */
module.exports.getVirtEnvById = async function (req, res, next) {
    try {
    const virtualizationEnv =await VirtualizationEnv.findById({
        _id: req.params.id
    })
        res.status(200).json(virtualizationEnv);
        console.log(virtualizationEnv);
        
    }catch (error) {
        res.status(404).json("virtualization-Env not found" + error.message);
    }
}


module.exports.accepetEvent = async function (req, res, next){
    const ID = req.params.id;
    console.log(ID)


    if (!ObjectId.isValid(ID)) {
        return res.status(404).json("ID is not valid");
      }
    try {
        

        const updatedVirtualizationEnv = await VirtualizationEnv.findByIdAndUpdate(
          ID,
          { isAccepted: true },
    
        );
        
        //send mail to user
        const user = await User.findOne({ _id: updatedVirtualizationEnv.applicant });
        console.log(user);
        const transporter = nodemailer.createTransport({
          service: "gmail",
          port: 587,
          auth: {
            user: "prologic.simop@gmail.com",
            pass: "mepdngigwccwxwog",
          },
        });
        transporter.sendMail({
          from: "prologic.simop@gmail.com",
          to: user.email,
          subject: "Prologic -- Reservation request",
          text: " Your request is accepted. " 
        });
    
        if (!updatedVirtualizationEnv) {
          return res.status(404).json({ error: 'Virtualization environment not found' });
        }
    
        res.status(200).json(updatedVirtualizationEnv);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update virtualization environment' });
      }


}


module.exports.SendEmail = async function (req, res, next){
  
  

   //send mail to user
   const user = await User.findOne({ _id: req.body.applicant });
   const transporter = nodemailer.createTransport({
     service: "gmail",
     port: 587,
     auth: {
       user: "prologic.simop@gmail.com",
       pass: "mepdngigwccwxwog",
     },
   });
   transporter.sendMail({
     from: "prologic.simop@gmail.com",
     to: req.body.to,
     subject: req.body.subject,
     text: req.body.message,
   });

}