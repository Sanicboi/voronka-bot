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
const failSafe_1 = require("./failSafe");
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const textDB_1 = require("./textDB");
const LSV_1 = require("./LSV");
const dotenv_1 = __importDefault(require("dotenv"));
const imageReader_1 = require("./imageReader");
dotenv_1.default.config();
const failSafe = new failSafe_1.FailSafe();
const db = new textDB_1.TextDB();
const bot = new node_telegram_bot_api_1.default(process.env.TG_TOKEN, {
    polling: true
});
const wait = (s) => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise((resolve, reject) => setTimeout(resolve, 1000 * s));
});
const getKeyboard = (btns) => {
    let result = [];
    btns.forEach((b) => {
        result.push([{
                text: b
            }]);
    });
    return {
        reply_markup: {
            keyboard: result,
            one_time_keyboard: true,
            resize_keyboard: true,
        }
    };
};
bot.onText(/\/start/, (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (failSafe.status()) {
        yield bot.sendPhoto(msg.from.id, yield imageReader_1.ImageReader.read('1.jpg'), {
            caption: db.get('intro1'),
            parse_mode: 'MarkdownV2'
        });
        yield wait(7.5);
        yield bot.sendPhoto(msg.from.id, yield imageReader_1.ImageReader.read('2.jpg'), {
            caption: db.get('intro2'),
            parse_mode: 'MarkdownV2'
        });
        yield wait(12);
        yield bot.sendMessage(msg.from.id, db.get('intro3'));
    }
}));
bot.onText(/^[A-Za-zА-Яа-яЁё]*$/, (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (failSafe.status()) {
        const key = db.getRes(msg.text);
        if (!key) {
            const name = msg.text.split(' ')[0];
            yield LSV_1.LSVParser.append('main.lsv', msg.from.id, name);
            yield bot.sendMessage(msg.from.id, 'Очень рада знакомству 🩷🩷');
            yield wait(1);
            yield bot.sendMessage(msg.from.id, db.get('question'), {
                reply_markup: getKeyboard(['Есть такое 😢']).reply_markup,
                parse_mode: 'MarkdownV2'
            });
            // end;
            return;
        }
    }
}));
bot.onText(/./, (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (failSafe.status()) {
        const key = db.getRes(msg.text);
        switch (key) {
            case "letsgo":
                yield bot.sendMessage(msg.from.id, db.get('letsgo'), getKeyboard(['идем! ']));
                break;
            case "feedbacks1":
                let images = [
                    {
                        type: 'photo',
                        media: 'https://i.ibb.co/85TPVSn/3.jpg'
                    },
                    {
                        type: 'photo',
                        media: 'https://i.ibb.co/2nYgL94/4.jpg',
                    },
                    {
                        type: 'photo',
                        media: 'https://i.ibb.co/9WPwG62/5.jpg',
                    },
                    {
                        type: 'photo',
                        media: 'https://i.ibb.co/QNN4Wpj/6.jpg'
                    },
                    {
                        type: 'photo',
                        media: 'https://i.ibb.co/b6Z7hYV/7.jpg'
                    },
                    {
                        type: 'photo',
                        media: 'https://i.ibb.co/5Gs7JBw/8.jpg'
                    },
                    {
                        type: 'photo',
                        media: 'https://i.ibb.co/fDt108k/9.jpg'
                    },
                    {
                        type: 'photo',
                        media: 'https://i.ibb.co/WvFF1zd/10.jpg'
                    },
                    {
                        type: 'photo',
                        media: 'https://i.ibb.co/pQfYWnb/11.jpg'
                    }
                ];
                yield bot.sendMessage(msg.from.id, db.get('feedbacks1'));
                yield wait(3);
                yield bot.sendMediaGroup(msg.from.id, images);
                yield wait(5);
                yield bot.sendMessage(msg.from.id, db.get('feedbacks2'), {
                    parse_mode: 'MarkdownV2'
                });
                yield bot.sendMessage(msg.from.id, db.get('feedbacks3'), {
                    reply_markup: getKeyboard(['Круто!)']).reply_markup,
                    parse_mode: 'MarkdownV2'
                });
                break;
            case "case":
                const img = yield imageReader_1.ImageReader.read('12.jpg');
                yield bot.sendPhoto(msg.from.id, img, {
                    reply_markup: getKeyboard(['Блин, круто!😭']).reply_markup,
                    caption: db.get('case'),
                    parse_mode: 'MarkdownV2'
                });
                break;
            case "reasons1":
                yield bot.sendMessage(msg.from.id, db.get('reasons1'), {
                    reply_markup: getKeyboard(['Хочу туда😌']).reply_markup,
                    parse_mode: 'MarkdownV2'
                });
                break;
            case "reasons2":
                yield bot.sendMessage(msg.from.id, db.get('okay'));
                yield wait(1);
                yield bot.sendMessage(msg.from.id, 'Я буду твоим проводником ');
                yield wait(1);
                yield bot.sendMessage(msg.from.id, 'Итак на счет 3');
                yield wait(1);
                yield bot.sendMessage(msg.from.id, '1');
                yield wait(1);
                yield bot.sendMessage(msg.from.id, '2');
                yield wait(1);
                yield bot.sendMessage(msg.from.id, '3');
                yield wait(1);
                yield bot.sendMessage(msg.from.id, db.get('reasons2'));
                yield wait(5);
                yield bot.sendMessage(msg.from.id, db.get('reasons3'), {
                    reply_markup: getKeyboard(['Хочу прогноз', 'Нет, я не готов к переменам']).reply_markup,
                    parse_mode: 'MarkdownV2'
                });
                break;
            case "letstry":
                yield bot.sendMessage(msg.from.id, db.get('letstry'));
                break;
            case "notready":
                yield bot.sendMessage(msg.from.id, db.get('notready'), getKeyboard(['Да, не готов!', 'Хочу больше информации про прогноз.']));
                break;
            case "stillnotready":
                yield bot.sendMessage(msg.from.id, db.get('stillnotready'));
                break;
            case "wantmore":
                yield bot.sendMessage(msg.from.id, db.get('wantmore'));
                yield wait(3 * 60);
                yield bot.sendMessage(msg.from.id, 'Готов попробовать?', getKeyboard(['Давай попробуем)', 'Нет, пока что это не для меня!']));
                break;
            case "notforme":
                yield bot.sendMessage(msg.from.id, db.get('notforme'));
        }
    }
}));
