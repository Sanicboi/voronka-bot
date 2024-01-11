import { FailSafe } from "./failSafe";
import Bot from 'node-telegram-bot-api';
import { TextDB } from "./textDB";
import { LSVParser } from "./LSV";
import d from 'dotenv';
import { ImageReader } from "./imageReader";
import express from 'express';
import fs from 'fs';
try {

d.config();

const failSafe = new FailSafe();
const db = new TextDB();
const bot = new Bot(process.env.TG_TOKEN, {
    polling: true
});

const wait = async (s: number) => {
    await new Promise((resolve, reject) => setTimeout(resolve, 1000 * s));
}

const getKeyboard = (btns: string[]): Bot.SendMessageOptions =>  {
    let result: Bot.KeyboardButton[][] = [];
    btns.forEach((b: string) => {
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
    }
} 

bot.onText(/\/start/, async (msg: Bot.Message) => {
    if (failSafe.status()) {
        await bot.sendPhoto(msg.from.id, await ImageReader.read('1.jpg'), {
            caption: db.get('intro1'),
            parse_mode: 'MarkdownV2'
        });
        await wait(7.5);
        await bot.sendPhoto(msg.from.id, await ImageReader.read('2.jpg'), {
            caption: db.get('intro2'),
            parse_mode: 'MarkdownV2'
        });
        await wait(12);
        await bot.sendMessage(msg.from.id, db.get('intro3'));
    }
});

bot.onText(/^[A-Za-zА-Яа-яЁё]*$/, async (msg: Bot.Message) => {
    if (failSafe.status()) {
        const key = db.getRes(msg.text);
        if (!key) {
            const name = msg.text.split(' ')[0];
            await LSVParser.append('main.lsv', msg.from.id, name);
            await bot.sendMessage(msg.from.id, 'Очень рада знакомству 🩷🩷');
            await wait(1);
            await bot.sendMessage(msg.from.id, db.get('question'), {
                reply_markup: getKeyboard(['Есть такое 😢']).reply_markup,
                parse_mode: 'MarkdownV2'
            })

            // end;
            return;

        }
    }

})

bot.onText(/./, async (msg: Bot.Message) => {
    if (failSafe.status()) {
        const key = db.getRes(msg.text);
        switch (key) {
            case "letsgo":
                await bot.sendMessage(msg.from.id, db.get('letsgo'), getKeyboard(['идем! ']));
                break;
            case "feedbacks1":
                
                  let images: Bot.InputMedia[] = [
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
                
                await bot.sendMessage(msg.from.id, db.get('feedbacks1'));
                await wait(3);
                await bot.sendMediaGroup(msg.from.id, images);
                await wait(5);
                await bot.sendMessage(msg.from.id, db.get('feedbacks2'), {
                    parse_mode: 'MarkdownV2'
                });
                await bot.sendMessage(msg.from.id, db.get('feedbacks3'), {
                    reply_markup: getKeyboard(['Круто!)']).reply_markup, 
                    parse_mode: 'MarkdownV2'
                });
                break;
            case "case":
                const img = await ImageReader.read('12.jpg');
                await bot.sendPhoto(msg.from.id, img, {
                    reply_markup: getKeyboard(['Блин, круто!😭']).reply_markup,
                    caption: db.get('case'),
                    parse_mode: 'MarkdownV2'
                });
                break;
            case "reasons1":
                await bot.sendMessage(msg.from.id, db.get('reasons1'), 
                {
                    reply_markup: getKeyboard(['Хочу туда😌']).reply_markup,
                    parse_mode: 'MarkdownV2'
                });
                break;
            case "reasons2":
                await bot.sendMessage(msg.from.id, db.get('okay'));
                await wait(1);
                await bot.sendMessage(msg.from.id, 'Я буду твоим проводником ');
                await wait(1);
                await bot.sendMessage(msg.from.id, 'Итак на счет 3');
                await wait(1);
                await bot.sendMessage(msg.from.id, '1');
                await wait(1);
                await bot.sendMessage(msg.from.id, '2');
                await wait(1);
                await bot.sendMessage(msg.from.id, '3');
                await wait(1);
                await bot.sendMessage(msg.from.id, db.get('reasons2'));
                await wait(5);
                await bot.sendMessage(msg.from.id, db.get('reasons3'), 
                {
                    reply_markup: getKeyboard(['Хочу прогноз', 'Нет, я не готов к переменам']).reply_markup,
                    parse_mode: 'MarkdownV2'
                });
                break;
            case "letstry":
                await bot.sendMessage(msg.from.id, db.get('letstry'));
                break;
            case "notready":
                await bot.sendMessage(msg.from.id, db.get('notready'), getKeyboard(['Да, не готов!', 'Хочу больше информации про прогноз.']));
                break;
            case "stillnotready":
                await bot.sendMessage(msg.from.id, db.get('stillnotready'));
                break;
            case "wantmore":
                await bot.sendMessage(msg.from.id, db.get('wantmore'));
                await wait(1.5 * 60);
                await bot.sendMessage(msg.from.id, 'Готов попробовать?',getKeyboard(['Давай попробуем)', 'Нет, пока что это не для меня!']));
                break;
            case "notforme":
                await bot.sendMessage(msg.from.id, db.get('notforme'));
        }
    }
});


} catch (error) {
    throw new Error();
}