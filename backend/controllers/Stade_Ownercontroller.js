const Stade_Owner = require('../models/StadeOwners');
const Stade = require('../models/Stade');

const stadeOwnerController = {
  // Create a new stade
  createStade: async (req, res) => {
    const { name, location, capacity } = req.body;
    
    try {
      // Create a new stade
      const newStade = await Stade.create({
        name,
        location,
        capacity,
        stadeOwner: req.user.stadeOwnerId, // Assuming you have authentication middleware that sets req.user
      });

      // Update the Stade_Owner's stades array with the new stade
      const stadeOwner = await Stade_Owner.findById(req.user.stadeOwnerId);
      stadeOwner.stades.push(newStade._id);
      await stadeOwner.save();

      res.json({ message: 'Stade created successfully', stade: newStade });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Add an existing stade
  addStade: async (req, res) => {
    const { stadeId } = req.body;

    try {
      // Check if the stade exists
      const stade = await Stade.findById(stadeId);
      if (!stade) {
        return res.status(404).send('Stade not found');
      }

      // Check if the stade owner already owns the stade
      const stadeOwner = await Stade_Owner.findById(req.user.stadeOwnerId);
      if (stadeOwner.stades.includes(stadeId)) {
        return res.status(400).send('Stade already added by the Stade Owner');
      }

      // Add the stade to the Stade_Owner's stades array
      stadeOwner.stades.push(stadeId);
      await stadeOwner.save();

      res.json({ message: 'Stade added successfully', stade });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  // Create a new stade and add it
  createAndAddStade: async (req, res) => {
    const { name, location, capacity } = req.body;

    try {
      // Create a new stade
      const newStade = await Stade.create({
        name,
        location,
        capacity,
      });

      // Add the new stade to the Stade_Owner's stades array
      const stadeOwner = await Stade_Owner.findById(req.user.stadeOwnerId);
      stadeOwner.stades.push(newStade._id);
      await stadeOwner.save();

      res.json({ message: 'Stade created and added successfully', stade: newStade });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  // Add a new Stade Owner
  addStadeOwner: async (req, res) => {
    const { name, firstname, email, password, phone, city } = req.body;

    try {
      const newStadeOwner = await Stade_Owner.create({
        name,
        firstname,
        email,
        password,
        phone,
        city,
      });

      res.json({ message: 'Stade Owner added successfully', stadeOwner: newStadeOwner });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = stadeOwnerController;
