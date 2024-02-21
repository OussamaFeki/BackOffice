const Stade_Owner = require('../models/StadeOwners');
const Stade = require('../models/Stade');

const stadeOwnerController = {
  // Create a new stade
  createStade: async (req, res) => {
    const { name, location, capacity,stadeOwnerId } = req.body;
    
    try {
      // Create a new stade
      const newStade = await Stade.create({
        name,
        location,
        capacity,
        stadeOwner: stadeOwnerId, // Assuming you have authentication middleware that sets req.user
      });
       // Validate capacity
       if (capacity < 6 || capacity > 22) {
        return res.status(400).json({ error: 'Capacity must be between 6 and 22' });
        }

      // Update the Stade_Owner's stades array with the new stade
      const stadeOwner = await Stade_Owner.findById(stadeOwnerId);
      if(stadeOwner.isApproved){
        stadeOwner.stades.push(newStade._id);
        await stadeOwner.save();
        res.json({ message: 'Stade created successfully', stade: newStade });
      }else{
        res.status(500).send('stade owner is not approved');
      }
      

     
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
  // Add a new Stade Owner
  addStadeOwner: async (req, res) => {
    const { name, firstname, email, password, phone, city, packId } = req.body;
  
    try {
      const newStadeOwner = await Stade_Owner.create({
        name,
        firstname,
        email,
        password,
        phone,
        city,
        pack: packId, // Assign the chosen pack to the 'pack' field
      });
  
      res.json({ message: 'Stade Owner added successfully', stadeOwner: newStadeOwner });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = stadeOwnerController;
