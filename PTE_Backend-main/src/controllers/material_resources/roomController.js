const { ObjectId } = require("mongodb");
const Room = require("../../models/material_resources/room");
const RoomEvent = require("../../models/material_resources/events/roomEvent");
const User = require("../../models/user")
const nodemailer = require("nodemailer");

/** Add Room */
module.exports.addRoom = async function (req, res, next) {
  try {
    const body = {capacity: req.body.capacity, label: req.body.label, location: req.body.location };
    const room = await Room.create({ ...body });
    // if (room) {
    //   res.status(200).json(room);
    // }
    console.log(room)
  } catch (error) {
    res.status(500).json(error);
  }
};
/** Delete Room */
module.exports.deleteRoom = async function (req, res, next) {
  try {
    const room = await Room.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(room);
  } catch (error) {
    res.status(404).json(error);
  }
};
/** getAllRooms  */
module.exports.getAllRooms = async function (req, res) {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json(error);
  }
};
/**Seach a room by label or location */
module.exports.searchRoom = async function (req, res) {
  try {
    const rooms = await Room.find({
      $or: [
        {
          capacity: new RegExp(req.query.text, "i"),
        },
        {
          label: new RegExp(req.query.text, "i"),
        },
        {
          location: new RegExp(req.query.text, "i"),
        },
      ],
    });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(404).json(error);
  }
};
module.exports.UpdateRoom = async function(req, res, next) {
  const ID = req.params.id;

  if (!ObjectId.isValid(ID)) {
    return res.status(404).json('ID is not valid');
  }
  
  

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      ID,
      {
        capacity: req.body.capacity,
        label: req.body.label,
        location: req.body.location,
      },
      { new: true } // return the updated document
    );

    if (!updatedRoom) {
      return res.status(404).json('Room not found');
    }

    return res.json(updatedRoom);
  } catch (err) {
    console.error(err);
    return res.status(500).json('Server error');
  }
};


/*******************************************************/
/***Events managment */
/*******************************************************/

/** create events by room ID*/

// module.exports.createEvent = async function (req, res) {
//   try {

//     const eventExist = await RoomEvent.find({
//       start: { $gte: req.body.start },
//       end: { $lte: req.body.end },
//       room: req.body.room,
//       isAccepted: true,
//     });
//     if (eventExist.length > 0) {
//       return res.status(500).json("Dates already reserved");
//     } else {
//       // if dates are free to reserve => create event
//       const body = {
//         title: req.body.title,
//         start: req.body.start,
//         end: req.body.end,
//         room: req.body.room,
//         applicant: req.body.applicant,
//       };
//       const event = await RoomEvent.create({ ...body });
//       if (event) {
//         res.status(200).json(event);
//       }
//       console.log(body)
    
//   }
//  } catch (error) {
//     res.status(500).json(error);
//   }
// };

module.exports.createEvent = async function (req, res) {
  try {
    const eventExist = await RoomEvent.find({
      start: { $gte: req.body.start },
      end: { $lte: req.body.end },
      room: req.body.room,
      isAccepted: true,
    });

    // if dates are  already reserved
    if (eventExist.length > 0) {
      return res.status(500).json("Dates already reserved");
    } else {
      // if dates are free to reserve => create event
      const body = {
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        room: req.body.room,
        applicant: req.body.applicant,
      };
      
      if (res.locals.user.roles.includes("admin")) {
        body.isAccepted = true;
      }
      
      const event = await RoomEvent.create({ ...body });
      if (event) {
        res.status(200).json(event);
      }
      const user = await User.findOne({ _id: req.body.applicant });
      //send mail to user
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
        text: " We will send you an email when your reservation is  confermed . " 
      });
      }
  } catch (error) {
    res.status(500).json(error);
  }
};



/** get events by room ID*/

module.exports.getRoomEvents = async function (req, res) {
  const ID = req.query.room;

if (!ObjectId.isValid(ID)) {
  return res.status(404).json("ID is not valid");
}
try {
  //if connected user is admin
  const events = await RoomEvent.find({
    room: ID,
    // start: { $gte: req.query.start },
    // end: { $lte: req.query.end },
  }).populate({ path: "applicant", select: "fisrtName lastName image" });

  if (events) {
    
    res.status(200).json(events);
  }
} catch (error) {
  res.status(404).json("there is an error ");
}
}


/**Update Event  */
module.exports.updateEvent = async function (req, res) {
  const ID = req.params.id;
  const body = { ...req.body };
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    if (body.isAccepted) {
      const event = await RoomEvent.findById(ID);

      //check if there is a conflict (to assure that there  is no conflicts)
      const checkExist = await RoomEvent.find({
        start: { $gte: event.start },
        end: { $lte: event.end },
        room: event.room,
        isAccepted: true,
      });

      if (checkExist.length > 0) {
        return res.status(500).json("Dates already reserved");
      }
      //Accept Event
      const accept = await RoomEvent.findByIdAndUpdate(ID, {
        isAccepted: true,
      });

      // delete non-confirmed events that are in conflict with the accepted event
      await RoomEvent.deleteMany({
        room: event.room,
        start: { $gte: event.start },
        end: { $gte: event.end },
        isAccepted: false,
      });
      const user = await User.findOne({ _id: req.body.applicant });
      if (accept){
        
        //send mail to user
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
          text: " Your register request is accepted . " 
        });
        return res.status(200).json(accept);
      } 
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

/**deleteEvent */
module.exports.deleteEvent = async function (req, res) {
  const ID = req.params.id;
  if (!ObjectId.isValid(ID)) {
    return res.status(404).json("ID is not valid");
  }
  try {
    const event = await RoomEvent.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json(error);
  }
};
