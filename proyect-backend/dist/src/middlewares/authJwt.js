"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./../config"));
const readWriteFile_1 = require("./../utils/readWriteFile");
let directoryBL = './../simulatedDatabases/bltokens.json';
let directory = './../simulatedDatabases/users.json';
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers['authorization'];
        if (!token)
            return res.status(403).json({ status: 403, message: 'No token provided' });
        const tokensJson = yield (0, readWriteFile_1.readFileFs)(directoryBL);
        const count = tokensJson.length;
        if (count != 0) {
            const blListed = JSON.parse(tokensJson).filter((fil) => fil.token == token);
            if (blListed.length >= 1)
                return res.status(403).json({ status: 403, message: 'This session does not exist' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.secret);
        req.user_id = decoded.id;
        const usersJson = yield (0, readWriteFile_1.readFileFs)(directory);
        const userFound = JSON.parse(usersJson)
            .filter((fil) => fil._id == req.user_id)
            .map((res) => {
            delete res.password;
            return res;
        });
        if (userFound.length == 0)
            return res.status(403).json({ message: 'No user found' });
        return res.status(200).json({ status: 200, message: 'Authorized', user: userFound[0] });
    }
    catch (error) {
        return res.status(401).json({ status: 401, message: `Unauthorized ${error.message}` });
    }
});
exports.verifyToken = verifyToken;
