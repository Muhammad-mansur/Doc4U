// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {  // Check if user is logged in
        return next();
    }
    res.redirect('/signin');  // Redirect to sign-in if not authenticated
};

export default isAuthenticated;