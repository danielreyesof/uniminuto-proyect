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
exports.generate = void 0;
const html_pdf_1 = __importDefault(require("html-pdf"));
const path = __importStar(require("path"));
const pdf_template_controller_1 = __importDefault(require("../templates/pdf-template.controller"));
const generateUUID_1 = require("./../utils/generateUUID");
const readWriteFile_1 = require("../utils/readWriteFile");
const validateTojen_1 = __importDefault(require("../utils/validateTojen"));
let directoryCreate = './../temp/';
let directoryFiles = './../simulatedDatabases/files.json';
let options = { format: 'Letter' };
const generate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uid = (0, generateUUID_1.generateUUID)();
    const token = req.headers['authorization'];
    const { status, message, user } = yield (0, validateTojen_1.default)(token);
    console.log(user);
    req.body.uid = uid;
    let html = (0, pdf_template_controller_1.default)(req.body, user);
    let fileName = `yottaCertificacionServicios_${user.employeeId}_${uid}.pdf`;
    let fullpath = path.join(__dirname, `${directoryCreate}/${user.employeeId}/${fileName}`);
    let fileinfo = {
        _id: (0, generateUUID_1.generateUUID)(),
        fileName,
        path: fullpath,
        date_create: new Date(),
        user_create: user._id,
    };
    const fileContentsUsers = yield (0, readWriteFile_1.readFileFs)(directoryFiles);
    const count = fileContentsUsers.length;
    let savedFile;
    html_pdf_1.default.create(html, options).toFile(fullpath, function (_err, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (count == 0) {
                console.log(res.filename);
                savedFile = yield (0, readWriteFile_1.writeFileFs)(directoryFiles, [fileinfo]);
            }
            else {
                let content = yield (0, readWriteFile_1.readFileFs)(directoryFiles);
                content = JSON.parse(content);
                content.push(fileinfo);
                savedFile = yield (0, readWriteFile_1.writeFileFs)(directoryFiles, content);
            }
        });
    });
    res.status(200).json({ status: 200, test: fullpath });
});
exports.generate = generate;
