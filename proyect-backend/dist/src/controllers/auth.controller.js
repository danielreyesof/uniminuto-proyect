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
exports.comparePassword = exports.encryptPassword = exports.logout = exports.signin = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const readWriteFile_1 = require("../utils/readWriteFile");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./../config"));
const generateUUID_1 = require("./../utils/generateUUID");
let directory = './../simulatedDatabases/users.json';
let directoryBL = './../simulatedDatabases/bltokens.json';
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, roles, employeeId, position, backAccount, salary, bank, eps, pensionFund, } = req.body;
    let newUser = {
        _id: (0, generateUUID_1.generateUUID)(),
        firstName,
        lastName,
        email,
        employeeId,
        position,
        backAccount,
        salary,
        bank,
        eps,
        pensionFund,
        password: yield (0, exports.encryptPassword)(password),
        roles,
        status: 1,
        date_create: Date.now(),
        date_update: Date.now(),
        date_delete: null,
    };
    const fileContentsUsers = yield (0, readWriteFile_1.readFileFs)(directory);
    const count = fileContentsUsers.length;
    let savedUser;
    if (count == 0) {
        savedUser = yield (0, readWriteFile_1.writeFileFs)(directory, [newUser]);
    }
    else {
        let content = yield (0, readWriteFile_1.readFileFs)(directory);
        content = JSON.parse(content);
        content.push(newUser);
        savedUser = yield (0, readWriteFile_1.writeFileFs)(directory, content);
    }
    let token = jsonwebtoken_1.default.sign({ id: newUser._id }, config_1.default.secret, {
        expiresIn: 8640000,
    });
    res.status(200).json({ status: 201, token });
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const usersJson = yield (0, readWriteFile_1.readFileFs)(directory);
    if (usersJson.length == 0)
        return res.status(400).json({ message: 'No existe el usuario' });
    const userFound = JSON.parse(usersJson).filter((fil) => fil.email == email);
    if (userFound.length == 0)
        return res.status(400).json({ message: 'Correo electronico o contraseña incorrecta' });
    console.log({ userFound });
    const matchPassword = yield (0, exports.comparePassword)(password, userFound[0].password);
    if (!matchPassword)
        return res.status(401).json({ token: null, message: 'Correo electronico o contraseña incorrecta' });
    const token = jsonwebtoken_1.default.sign({ id: userFound[0]._id }, config_1.default.secret, {
        expiresIn: 8640000,
    });
    res.status(200).json({ status: 200, token });
});
exports.signin = signin;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'];
    let newToken = new Object({
        _id: (0, generateUUID_1.generateUUID)(),
        token,
        date_create: Date.now(),
    });
    const fileContentsTokens = yield (0, readWriteFile_1.readFileFs)(directoryBL);
    const count = fileContentsTokens.length;
    let savedTokens;
    if (count == 0) {
        savedTokens = yield (0, readWriteFile_1.writeFileFs)(directoryBL, [newToken]);
    }
    else {
        let content = yield (0, readWriteFile_1.readFileFs)(directoryBL);
        content = JSON.parse(content);
        content.push(newToken);
        savedTokens = yield (0, readWriteFile_1.writeFileFs)(directoryBL, content);
    }
    res.status(200).json({ status: 200, message: 'Sesion terminada' });
});
exports.logout = logout;
const encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return yield bcryptjs_1.default.hash(password, salt);
});
exports.encryptPassword = encryptPassword;
const comparePassword = (password, recievedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, recievedPassword);
});
exports.comparePassword = comparePassword;
