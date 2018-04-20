import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as logger from "morgan";
import * as http from "http";
import { Application, Request, Response } from "express";
import { User } from "../interfaces/user";
import { authenticateRoute } from "../routes/authenticate";
import { AppConfig } from "../interfaces/app-config";
import { APP_CONFIG } from "../config";
import * as mongoose from "mongoose";
import { authorize, MongooseHandler } from "forms-common-libraries";
import { getUserPermissions } from "../routes/get-user-permissions";
import * as request from "request";

const fs = require('fs');

export class Server {
    private _application: express.Application;

    public start( port: number): Promise<Server> {
        const self: Server = this;
        const jiraConfig: object = APP_CONFIG.defaultJiraConfig;
        
        let arrStringPostal: string[] = [];
        let arrStringOktmo: string[] = [];

        self._application = express();
        
        return new Promise<Server>((resolve, reject) => {
            const server = http.createServer(self._application);
            server.on("error", (error: Error) => {
                reject(error);
            });
            server.on("listening", () => {
                resolve(self);
            });
    
            

            this._application.use(cors({
                origin: "*",
                exposedHeaders: [
                    'Content-Range'
                ]
            }));
            this._application.options("*", cors());
    
            self._application.use(express.json());
            self._application.use(logger("dev"));

            self._application.post("/wright", (req, res) => {
                const agent: any = req.headers["user-agent"];
                const qeryParams: any = req.query;
                let authToken: string;

                arrStringPostal[arrStringPostal.length] = qeryParams['postal'];
                arrStringOktmo[arrStringOktmo.length] = qeryParams['oktmo'];

                res.json({res: 'sucess'});
            }).on("error", (err, response) => {
                response.json({
                    error: err
                });
            });

            self._application.post("/save", (req, res) => {

                fs.writeFile('C:/postal.txt', arrStringPostal.join('\n'), (err: Error) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
                fs.writeFile('C:/oktmo.txt', arrStringOktmo.join('\n'), (err: Error) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });

                res.json({res: 'sucess'});
            }).on("error", (err, response) => {
                response.json({
                    error: err
                });
            });

            server.listen(port);
        });
    }
}