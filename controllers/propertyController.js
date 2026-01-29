const Property = require('../models/Property');

// @desc    Get properties within a specific radius
// @route   GET /api/properties/search
// @access  Public
exports.getPropertiesByLocation = async (req, res) => {
  try {
    const { latitude, longitude, radius, type, status, minPrice, maxPrice, bhk } = req.query;

    // Validate coordinates
    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        error: 'Please provide latitude and longitude'
      });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const rad = parseFloat(radius) || 5; // Default radius 5km

    // Build query
    let query = {
      'location.coordinates': {
        $geoWithin: {
          $centerSphere: [[lng, lat], rad / 6378.1] // Radius in radians (Earth radius ~6378.1 km)
        }
      }
    };

    // Add filters
    if (type) {
      query.type = type;
    }

    if (status) {
      query.status = status;
    }

    if (bhk) {
      query['specifications.bhk'] = parseInt(bhk);
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query['price.amount'] = {};
      if (minPrice) query['price.amount'].$gte = parseFloat(minPrice);
      if (maxPrice) query['price.amount'].$lte = parseFloat(maxPrice);
    }

    const properties = await Property.find(query)
      .populate('owner', 'name email phone')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
