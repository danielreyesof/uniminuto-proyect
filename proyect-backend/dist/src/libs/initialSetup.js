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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = exports.ROLES = void 0;
const readWriteFile_1 = require("./../utils/readWriteFile");
const generateUUID_1 = require("./../utils/generateUUID");
exports.ROLES = ['client', 'admin', 'employee', 'developer'];
const readFile = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let directory = './../simulatedDatabases/roles.json';
        const fileContents = yield (0, readWriteFile_1.readFileFs)(directory);
        const count = fileContents.length;
        if (count > 0)
            return;
        const dataSave = [];
        exports.ROLES.forEach((rol) => {
            dataSave.push({
                _id: (0, generateUUID_1.generateUUID)(),
                name: rol,
                status: 1,
                date_create: Date.now(),
                date_update: Date.now(),
                date_delete: null,
            });
        });
        yield (0, readWriteFile_1.writeFileFs)(directory, dataSave);
    }
    catch (err) {
        console.log('error is: ', err);
    }
});
exports.readFile = readFile;
