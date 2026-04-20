const authorization = (...roles) => {
  return (req, res, next) => {
    // HCI: Clear feedback for denied access
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Forbidden: Your role (${req.user.role}) does not have permission to perform this action.` 
      });
    }
    next();
  };
};

export default authorization;