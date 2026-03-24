const User = require('../models/User');
const { asyncHandler, AppError } = require('../middleware/errorMiddleware');

// ==========================================
// GET CURRENT LOGGED IN USER
// ==========================================
exports.getMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .select('-password -refreshToken');

  if (!user) {
    throw new AppError('User not found', 404);
  }
  const response = {
    success: true,
    user
  };

  // Add message for pending verification users
  if (user.status === 'pending_verification') {
    response.message = 'Your account is pending admin approval. You can update your profile but cannot access full features yet.';
  }

  res.json(response);
});

// ==========================================
// UPDATE PROFILE
// ==========================================
exports.updateMyProfile = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;

  // Validation
  if (!name || name.trim().length === 0) {
    throw new AppError('Name is required', 400);
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Update fields
  user.name = name.trim();
  if (phone) user.phone = phone.trim();

  await user.save();

  res.json({
    success: true,
    message: 'Profile updated successfully',
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status
    }
  });
});

// ==========================================
// CHANGE PASSWORD
// ==========================================
exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  // Validation
  if (!currentPassword || !newPassword) {
    throw new AppError('Current password and new password are required', 400);
  }

  if (newPassword.length < 6) {
    throw new AppError('New password must be at least 6 characters', 400);
  }

  // Find user with password field
  const user = await User.findById(req.user.id).select('+password');

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Verify current password
  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    throw new AppError('Current password is incorrect', 401);
  }

  // Update password (will be auto-hashed by pre-save hook)
  user.password = newPassword;
  await user.save();

  res.json({
    success: true,
    message: 'Password changed successfully'
  });
});

// ==========================================
// GET MY PROPERTIES
// ==========================================
exports.getMyProperties = asyncHandler(async (req, res) => {
  const Property = require('../models/Property');

  const properties = await Property.getByOwner(req.user.id);

  res.json({
    success: true,
    count: properties.length,
    properties
  });
});

// ==========================================
// GET MY SHORTLISTED PROPERTIES
// ==========================================
exports.getMyShortlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate({
      path: 'shortlistedProperties',
      match: { approvalStatus: 'approved' }, // Only show approved
      select: 'title listingType price location.address.city featuredImage specifications.bhk'
    });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    count: user.shortlistedProperties.length,
    shortlist: user.shortlistedProperties
  });
});

// ==========================================
// ADD TO SHORTLIST
// ==========================================
exports.addToShortlist = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;
  const Property = require('../models/Property');

  // Check if property exists and is approved
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new AppError('Property not found', 404);
  }

  if (property.approvalStatus !== 'approved') {
    throw new AppError('Cannot shortlist pending or rejected properties', 400);
  }

  // Add to shortlist using model method
  const user = await User.findById(req.user.id);
  await user.addToShortlist(propertyId);

  res.json({
    success: true,
    message: 'Property added to shortlist'
  });
});

// ==========================================
// REMOVE FROM SHORTLIST
// ==========================================
exports.removeFromShortlist = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;

  const user = await User.findById(req.user.id);
  await user.removeFromShortlist(propertyId);

  res.json({
    success: true,
    message: 'Property removed from shortlist'
  });
});

// ==========================================
// DELETE MY ACCOUNT
// ==========================================
exports.deleteMyAccount = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!password) {
    throw new AppError('Password is required to delete account', 400);
  }

  // Find user with password
  const user = await User.findById(req.user.id).select('+password');

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Verify password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new AppError('Incorrect password', 401);
  }

  // Delete user (consider soft delete in production)
  await User.findByIdAndDelete(req.user.id);

  // Clear cookie
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });

  res.json({
    success: true,
    message: 'Account deleted successfully'
  });
});

// ==========================================
// GET MY SUBSCRIPTION INFO
// ==========================================
exports.getMySubscription = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .select('subscription');

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    subscription: user.subscription
  });
});
