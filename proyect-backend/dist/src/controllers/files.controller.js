"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.counter = exports.download = void 0;
const path = __importStar(require("path"));
const readWriteFile_1 = require("../utils/readWriteFile");
const validateTojen_1 = __importDefault(require("../utils/validateTojen"));
let directoryFiles = './../simulatedDatabases/files.json';
let directoryFilesTemp = 'C:/Users/kevin/Desktop/uniminuto-proyect/proyect-backend/src/temp/';
const download = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'];
    const { status, message, user } = yield (0, validateTojen_1.default)(token);
    const { _id } = req.query;
    console.log(_id);
    let filesContent = yield (0, readWriteFile_1.readFileFs)(directoryFiles);
    const count = filesContent.length;
    if (count == 0) {
        res.status(400).json({ status: 400, message: 'No se encontro el archivo solicitado' });
    }
    filesContent = JSON.parse(filesContent).filter((id) => id._id == _id);
    let idOTC = user.employeeId.toString();
    let pathFile = path.join(directoryFilesTemp, idOTC, filesContent[0].fileName);
    let filename = path.join(filesContent[0].fileName);
    res.set('Content-disposition', 'attachment; filename=' + filename);
    res.set('Content-Type', path.extname(pathFile));
    res.download(pathFile, filename);
});
exports.download = download;
const counter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'];
    const { status, message, user } = yield (0, validateTojen_1.default)(token);
    let filesContent = yield (0, readWriteFile_1.readFileFs)(directoryFiles);
    const count = filesContent.length;
    if (count == 0) {
        res.status(200).json({ status: 200, message: 'No se encontraron archivos' });
        return;
    }
    filesContent = JSON.parse(filesContent).filter((id) => id.user_create == user._id);
    res.status(200).json({ status: 201, filesContent });
});
exports.counter = counter;
