const Favorite = require('../models/favoris');
const Annanceur = require('../models/annonceur')
// Create a new favorite
// Create a new favorite
const createFavorite = async (req, res) =>
{
  try
  {
    const { userId, computerId } = req.body;

    const existingFavorite = await Favorite.findOne({ userId, computerIds: computerId });

    if (existingFavorite)
    {
      return res.status(400).json({
        status: 'failure',
        message: 'This computer is already in your favorites list'
      });
    }

    const newFavorite = new Favorite({ userId, computerIds: [computerId] });

    const result = await newFavorite.save();

    res.status(201).json({
      status: 'success',
      data: result
    });
  } catch (error)
  {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      message: error,
    });
  }
};


// Get all favorites for a user
const getFavorites = async (req, res) =>
{
  try
  {
    const data = req.body;

    // Check if user exists 
    const user = await Annanceur.findById(data.userId);
    const user_id = data.userId;
    console.log(data);
    if (!user)
    {
      console.log(user);
      return res.status(404).json({
        status: 'failure',
        message: 'User not found',
      });
    }

    // Check if user has any favorites
    const favorites = await Favorite.findOne({ user_id }).populate('computerIds');
    if (!favorites)
    {
      return res.status(403).json({
        status: 'failure',
        message: 'User has no favorites',
      });
    }

    res.status(200).json({
      status: 'success',
      data: favorites,
    });
  } catch (error)
  {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      message: error,
    });
  }
};



// Get a favorite by ID
const getFavoriteById = async (req, res) =>
{
  try
  {
    const { id } = req.params;
    const userId = req.body.id;

    const favorite = await Favorite.findOne({ _id: id, userId }).populate('computerIds');

    if (!favorite)
    {
      return res.status(404).json({
        status: 'failure',
        message: 'Favorite not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: favorite,
    });
  } catch (error)
  {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      message: error,
    });
  }
};

// Update a favorite
const updateFavorite = async (req, res) =>
{
  try
  {
    const { id } = req.params;
    const { computerIds } = req.body;
    const userId = req.user._id;

    const favorite = await Favorite.findOneAndUpdate(
      { _id: id, userId },
      { computerIds },
      { new: true }
    ).populate('computerIds');

    if (!favorite)
    {
      return res.status(404).json({
        status: 'failure',
        message: 'Favorite not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: favorite,
    });
  } catch (error)
  {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      message: error,
    });
  }
};

// Delete a favorite
const deleteFavorite = async (req, res) =>
{
  try
  {
    const { id } = req.params;
    const userId = req.user._id;

    const favorite = await Favorite.findOneAndDelete({ _id: id, userId });

    if (!favorite)
    {
      return res.status(404).json({
        status: 'failure',
        message: 'Favorite not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {},
    });
  } catch (error)
  {
    console.error(error);
    res.status(500).json({
      status: 'failure',
      message: error,
    });
  }
};

module.exports = {
  createFavorite,
  getFavorites,
  deleteFavorite,
  updateFavorite,
  getFavoriteById,
};
