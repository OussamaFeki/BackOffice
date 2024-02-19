const Stade_Owner = require('../models/StadeOwners');
const Stade = require('../models/Stade');
const Admin = require('../models/Admin');
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
      const token = jwt.sign({ adminId: admin._id }, 'your_secret_key', { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  // View pending Stade Owner registrations
  viewPendingRegistrations: async (req, res) => {
    try {
      const pendingRegistrations = await Stade_Owner.find({ isApproved: false });
      res.json(pendingRegistrations);
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
    const { stadeOwnerId } = req.body;

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
    const { name, description, price, stades, features } = req.body;

    try {
      const newPack = await Pack.create({
        name,
        description,
        price,
        stades,
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
};

module.exports = adminController;
