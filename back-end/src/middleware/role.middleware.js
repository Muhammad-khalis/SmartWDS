


const authorization=(...role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            return res.status(401).json({message : "Access denied"});
        }
        next();
    }
}
export default authorization;