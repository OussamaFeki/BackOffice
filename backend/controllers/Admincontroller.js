const Stade_Owner = require('../models/StadeOwners');
const Stade = require('../models/Stade');
const Admin = require('../models/Admin');
const Pack= require('../models/Pack');
const Player=require('../models/Players')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminController = {
  // Admin login
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Find admin by username
      const admin = await Admin.findOne({ username });

      if (!admin) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, admin.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate a JWT token
      const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  // View pending Stade Owner registrations
  viewPendingRegistrations: async (req, res) => {
    try {
      const pendingRegistrations = await Stade_Owner.find({ isApproved: false }).populate('pack','name price');;
      res.json(pendingRegistrations);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  viewApprovedStadeOwners : async (req, res) => {
    try {
        // Find all approved Stade Owners
        const approvedStadeOwners = await Stade_Owner.find({ isApproved: true }).populate('pack','name price');;

        res.json(approvedStadeOwners);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  },
  // Accept Stade Owner registration
  acceptRegistration: async (req, res) => {
    const { stadeOwnerId } = req.body;

    try {
      const stadeOwner = await Stade_Owner.findById(stadeOwnerId);

      if (!stadeOwner) {
        return res.status(404).send('Stade Owner not found');
      }

      stadeOwner.isApproved = true;
      await stadeOwner.save();

      res.json({ message: 'Registration accepted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Refuse Stade Owner registration and delete from database
  refuseRegistration: async (req, res) => {
    const { stadeOwnerId } = req.params;

    try {
      const stadeOwner = await Stade_Owner.findByIdAndDelete(stadeOwnerId);

      if (!stadeOwner) {
        return res.status(404).send('Stade Owner not found');
      }

      res.json({ message: 'Registration refused and Stade Owner deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  givelength: async(req, res) => {
    const stadeOwnerLength = (await Stade_Owner.find()).length;
    res.json(stadeOwnerLength);
  },
  // View all stades and associated Stade Owners
  viewAllStades: async (req, res) => {
    try {
        const stades = await Stade.find().populate('stadeOwner', 'name email');
    res.json(stades);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
    }
  },
  // Create a new pack
  createPack: async (req, res) => {
    const { name, description, price, cap_stades, features } = req.body;

    try {
      const newPack = await Pack.create({
        name,
        description,
        price,
        cap_stades,
        features,
      });

      res.json({ message: 'Pack created successfully', pack: newPack });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Delete a pack
  deletePack: async (req, res) => {
    const { packId } = req.params;

    try {
      const deletedPack = await Pack.findByIdAndDelete(packId);

      if (!deletedPack) {
        return res.status(404).send('Pack not found');
      }

      res.json({ message: 'Pack deleted successfully', pack: deletedPack });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Edit a pack
  editPack: async (req, res) => {
    const { packId } = req.params;
    const { name, description, price, stades, features } = req.body;

    try {
      const updatedPack = await Pack.findByIdAndUpdate(
        packId,
        { name, description, price, stades, features },
        { new: true, runValidators: true }
      );

      if (!updatedPack) {
        return res.status(404).send('Pack not found');
      }

      res.json({ message: 'Pack edited successfully', pack: updatedPack });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  // Create a new admin
  createAdmin: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Check if an admin with the same username already exists
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin with this username already exists' });
      }

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new admin
      const newAdmin = await Admin.create({
        username,
        password: hashedPassword,
      });

      res.json({ message: 'Admin created successfully', admin: newAdmin });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  // Get all packs
getAllPacks: async (req, res) => {
    try {
    const packs = await Pack.find();
    res.json(packs);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  // Add a new Stade Owner
  addStadeOwner: async (req, res) => {
    const { name, firstname, email, password, phone, city, pack } = req.body;

    try {
      const newStadeOwner = await Stade_Owner.create({
        name,
        firstname,
        email,
        password,
        phone,
        city,
        pack: pack,
        isApproved: true, // Set isApproved to true for each new Stade Owner
      });

      res.json({ message: 'Stade Owner added successfully', stadeOwner: newStadeOwner });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  //view Player
  viewallPlayer:async(req,res)=>{
    try {
      const players = await Player.find();
      res.status(200).json(players);
    } catch (error) {
      console.error('Error getting players:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
   // Create a new player with password encryption
   createPlayer: async (req, res) => {
    const { name, firstname, NickName,email,city, password, phone } = req.body;

    try {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      const newPlayer = await Player.create({
        name,
        firstname,
        email,
        NickName,
        city,
        password: hashedPassword,
        phone,
      });

      res.json({ message: 'Player created successfully', player: newPlayer });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

};

module.exports = adminController;
