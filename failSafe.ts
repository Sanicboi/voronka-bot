import express from 'express';

export class FailSafe {
    app: express.Application;
    private ok: boolean = true;
    constructor() {
        this.init = this.init.bind(this);
        this.status = this.status.bind(this);
        this.init();
    }

    public async init() {
        this.app = express();
        this.app.post('/fail', async (req, res) => {
            this.ok = false;
            res.status(200).end('OK DOWN');
        });
        this.app.post('/ok', async (req, res) => {
            this.ok = true;
            res.status(200).end('OK UP');
        });
        this.app.listen(7734);
    }

    public status() {
        return this.ok;
    }
}