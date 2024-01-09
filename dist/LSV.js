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
exports.LSVParser = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class LSVParser {
    static read(src) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield promises_1.default.readFile(path_1.default.join(__dirname, 'db', src), 'utf8');
            const lines = file.split('\n');
            let result = [];
            lines.forEach(line => {
                const s = line.split(' ');
                if (s.length > 1) {
                    result.push({
                        id: +s[0],
                        name: s[1]
                    });
                }
            });
            return result;
        });
    }
    static append(src, id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield promises_1.default.appendFile(path_1.default.join(__dirname, 'db', src), `${id} ${name}\n`, {
                encoding: 'utf8'
            });
        });
    }
}
exports.LSVParser = LSVParser;
