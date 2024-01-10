import { TextReader } from "./textReader";
export type VALID_KEY_T = 
    'intro1' | 'intro2' | 'intro3' |
    'case' | 'feedbacks1' | 'feedbacks2' |
    'letstry' | 'notready' | 'question' |
    'ready' | 'reasons1' | 'reasons2' | 'letsgo' | 'okay' | 'reasons3' | 'stillnotready' | 'wantmore' | 'notforme' | 'feedbacks3';

export const VALID_KEYS: VALID_KEY_T[] = [
    'intro1', 'intro2','intro3',
    'case', 'feedbacks1', 'feedbacks2',
    'letstry', 'notready', 'question',
    'ready', 'reasons1', 'reasons2', 'okay', 'reasons3', 'stillnotready', 'wantmore', 'letsgo', 'notforme', 'feedbacks3'
];

export class TextDB {
    private db: Map<VALID_KEY_T, string>;
    private responseDb: Map<string, VALID_KEY_T>;
    constructor() {
        this.db = new Map<VALID_KEY_T, string>();
        this.responseDb = new Map<string, VALID_KEY_T>();
        this.init = this.init.bind(this);
        this.get = this.get.bind(this);
        this.getRes = this.getRes.bind(this);
        this.init();
    }

    private async init() {
        VALID_KEYS.forEach(async key => {
            const text = await TextReader.read(`${key}.txt`);
            this.db.set(key, text);
        });
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
    }

    public get(key: VALID_KEY_T): string {
        return this.db.get(key);
    }

    public getRes(text: string): VALID_KEY_T {
        return this.responseDb.get(text);
    }
}