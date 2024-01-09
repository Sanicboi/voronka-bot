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
exports.FailSafe = void 0;
const express_1 = __importDefault(require("express"));
class FailSafe {
    constructor() {
        this.ok = true;
        this.init = this.init.bind(this);
        this.status = this.status.bind(this);
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app = (0, express_1.default)();
            this.app.post('/fail', (req, res) => __awaiter(this, void 0, void 0, function* () {
                this.ok = false;
                res.status(200).end('OK DOWN');
            }));
            this.app.post('/ok', (req, res) => __awaiter(this, void 0, void 0, function* () {
                this.ok = true;
                res.status(200).end('OK UP');
            }));
            this.app.listen(7734);
        });
    }
    status() {
        return this.ok;
    }
}
exports.FailSafe = FailSafe;
