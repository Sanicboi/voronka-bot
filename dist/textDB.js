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
exports.TextDB = exports.VALID_KEYS = void 0;
const textReader_1 = require("./textReader");
exports.VALID_KEYS = [
    'intro1', 'intro2', 'intro3',
    'case', 'feedbacks1', 'feedbacks2',
    'letstry', 'notready', 'question',
    'ready', 'reasons1', 'reasons2', 'okay', 'reasons3', 'stillnotready', 'wantmore', 'letsgo', 'notforme'
];
class TextDB {
    constructor() {
        this.db = new Map();
        this.responseDb = new Map();
        this.init = this.init.bind(this);
        this.get = this.get.bind(this);
        this.getRes = this.getRes.bind(this);
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            exports.VALID_KEYS.forEach((key) => __awaiter(this, void 0, void 0, function* () {
                const text = yield textReader_1.TextReader.read(`${key}.txt`);
                this.db.set(key, text);
            }));
            this.responseDb.set('Есть такое 😢', 'letsgo');
            this.responseDb.set('идем!', 'feedbacks1');
            this.responseDb.set('Круто!)', 'case');
            this.responseDb.set('Блин, круто!😭', 'reasons1');
            this.responseDb.set('Хочу туда😌', 'reasons2');
            this.responseDb.set('Хочу прогноз', 'letstry');
            this.responseDb.set('Нет, я не готов к переменам', 'notready');
            this.responseDb.set('Да, не готов!', 'stillnotready');
            this.responseDb.set('Давай попробуем)', 'letstry');
            this.responseDb.set('Хочу больше информации про прогноз.', 'wantmore');
            this.responseDb.set('Нет, пока что это не для меня!', 'notforme');
        });
    }
    get(key) {
        return this.db.get(key);
    }
    getRes(text) {
        return this.responseDb.get(text);
    }
}
exports.TextDB = TextDB;
