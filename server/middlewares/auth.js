import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error('Authorization header is missing');
        }
        const token = authHeader.split(' ')[1];
        let decodeData = jwt.verify(token, 'test');
        req.userId = decodeData?.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default auth;
