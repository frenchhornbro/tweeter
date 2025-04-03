import { TweeterRequest, TweeterResponse } from "tweeter-shared";

export class ClientCommunicator {
    private SERVER_URL: string;
    
    public constructor(severURL: string) {
        this.SERVER_URL = severURL;
    }

    public async doPost<REQ extends TweeterRequest, RES extends TweeterResponse>(req: REQ | undefined, endpoint: string, headers?: Headers): Promise<RES> {
        if (headers && req) headers.append("Content-type", "application/json");
        else if (req) headers = new Headers({"Content-type": "application/json"});
        const url = this.SERVER_URL + endpoint;
        const params = this.getParams("POST", headers, req ? JSON.stringify(req) : req);

        try {
            const res: Response = await fetch(url, params);
            if (res.ok) {
                const ret: RES = await res.json();
                return ret;
            }
            else {
                const error = await res.json();
                throw new Error(error.errorMessage);
            }
        }
        catch (error) {
            console.error(error);
            throw new Error(`Client communicator ${params.method} failed:\n${(error as Error).message}`);
        }
    }

    private getParams(method: string, headers?: Headers, body?: BodyInit): RequestInit {
        const params: RequestInit = {method: method};
        if (headers) params.headers = headers;
        if (body) params.body = body;
        return params;
    }
}