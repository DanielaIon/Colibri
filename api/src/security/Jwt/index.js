const jwt = require('jsonwebtoken');

const {
    ServerError
} = require('../../errors');

const {
    validateFields
} = require('../../utils');

const options = {
    issuer: process.env.JWT_ISSUER,
    subject: process.env.JWT_SUBJECT,
    audience: process.env.JWT_AUDIENCE
};

const generateToken = async (payload) => {
    // to be done
   try {
    const token = jwt.sign(payload,process.env.JWT_SECRET_KEY, options);
    return token;
    } catch (err) {
        console.trace(err);
        throw new ServerError("Eroare la generarea tokenului!", 400);
    }
};

const verifyAndDecodeData = async (token) => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY, options);
        return decoded;
    } catch (err) {
        console.trace(err);
        throw new ServerError("Eroare la decriptarea tokenului!", 400);
    }
};

const authorizeAndExtractToken = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new ServerError('Lipseste headerul de autorizare!', 403);
        }
        const token = req.headers.authorization.split(" ")[1]; // se separa dupa " " deoarece este de forma: Bearer 1wqeiquqwe0871238712qwe

        validateFields({
            jwt: {
                value: token,
                type: 'jwt'
            }
        });

        const decoded = await verifyAndDecodeData(token);
        /*
         Decoded este obiectul care a fost trimis pentru criptare in functia "generateToken"
         are forma:
         {
            userId: ,
            userRole: 
         }
        */

        /* 
        pentru a putea folosi informatia in middleware-ul urmator retin informatia decodata in campul "state" al obiectului "req" 
        obiectul "req" va fi transmis implicit la urmatorul middleware
        */

        req.state = {
            decoded
        };

        next();
    } catch (err) {
        next(err);
    }
};

const authorizeAndExtractTokenAdminSuport = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new ServerError('Lipseste headerul de autorizare!', 403);
        }
        const token = req.headers.authorization.split(" ")[1]; // se separa dupa " " deoarece este de forma: Bearer 1wqeiquqwe0871238712qwe

        validateFields({
            jwt: {
                value: token,
                type: 'jwt'
            }
        });

        const decoded = await verifyAndDecodeData(token);
        /*
         Decoded este obiectul care a fost trimis pentru criptare in functia "generateToken"
         are forma:
         {
            userId: ,
            userRole: 
         }
        */

        /* 
        pentru a putea folosi informatia in middleware-ul urmator retin informatia decodata in campul "state" al obiectului "req" 
        obiectul "req" va fi transmis implicit la urmatorul middleware
        */

        req.state = {
            decoded
        };
        
        if(decoded.userRole == "admin" || decoded.userRole == "suport" ){
             next();
        }
        else{
            throw new ServerError('Nu esti administrator!', 403);
        }
    } catch (err) {
        next(err);
    }
};

const authorizeAndExtractTokenAdmin = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new ServerError('Lipseste headerul de autorizare!', 403);
        }
        const token = req.headers.authorization.split(" ")[1]; // se separa dupa " " deoarece este de forma: Bearer 1wqeiquqwe0871238712qwe

        validateFields({
            jwt: {
                value: token,
                type: 'jwt'
            }
        });

        const decoded = await verifyAndDecodeData(token);
        /*
         Decoded este obiectul care a fost trimis pentru criptare in functia "generateToken"
         are forma:
         {
            userId: ,
            userRole: 
         }
        */

        /* 
        pentru a putea folosi informatia in middleware-ul urmator retin informatia decodata in campul "state" al obiectului "req" 
        obiectul "req" va fi transmis implicit la urmatorul middleware
        */

        req.state = {
            decoded
        };
        
        if(decoded.userRole == "admin"){
             next();
        }
        else{
            throw new ServerError('Nu esti administrator!', 403);
        }
    } catch (err) {
        next(err);
    }
};
module.exports = {
    generateToken,
    authorizeAndExtractToken,
    authorizeAndExtractTokenAdminSuport,
    authorizeAndExtractTokenAdmin
};