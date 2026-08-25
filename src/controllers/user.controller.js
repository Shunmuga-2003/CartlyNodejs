const User=require('../model/User.model');
const asyncHandler = require('../utils/asyncHandler');

const getAddress=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);
    res.status(200).json({success:true,data:user.addresses});
});

const addAddress=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);
    if (req.body.isDefault) {
    user.addresses.forEach((addr) => (addr.isDefault = false));
  }

  user.addresses.push(req.body);
  await user.save();

  res.status(201).json({ success: true, data: user.addresses });
});

const deleteAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.addresses = user.addresses.filter(
    (addr) => addr._id.toString() !== req.params.addressId
  );
  await user.save();

  res.status(200).json({ success: true, data: user.addresses });
});

const updateAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const address = user.addresses.id(req.params.addressId);

  if (!address) throw new ApiError(404, 'Address not found');

  if (req.body.isDefault) {
    user.addresses.forEach((addr) => (addr.isDefault = false));
  }

  Object.assign(address, req.body);
  await user.save();

  res.status(200).json({ success: true, data: user.addresses });
});

module.exports={getAddress,addAddress,updateAddress,deleteAddress};