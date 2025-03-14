import { NextFunction, Request, Response } from "express";
import { envs } from "../config/envs";

export class GithubMiddleware {
    private static encoder = new TextEncoder();

    static async verifyGitHubSignature(req: Request, res: Response, next: NextFunction) {
        const xHubSignature = `${req.headers['x-hub-signature-256']}`;
        const body = JSON.stringify(req.body);
        const isValid = await GithubMiddleware.verifySignature(envs.SECRET_TOKEN, xHubSignature, body)

        if (isValid) {
            next();
        }
        else {
            res.status(401).json({ error: 'Invalid signature' });
        }
    }

    private static async verifySignature(secret: any, header: any, payload: any) {
        let parts = header.split("=");
        let sigHex = parts[1];

        let algorithm = { name: "HMAC", hash: { name: 'SHA-256' } };

        let keyBytes = this.encoder.encode(secret);
        let extractable = false;
        let key = await crypto.subtle.importKey(
            "raw",
            keyBytes,
            algorithm,
            extractable,
            ["sign", "verify"],
        );

        let sigBytes = this.hexToBytes(sigHex);
        let dataBytes = this.encoder.encode(payload);
        let equal = await crypto.subtle.verify(
            algorithm.name,
            key,
            sigBytes,
            dataBytes,
        );

        return equal;
    }

    private static hexToBytes(hex: any) {
        let len = hex.length / 2;
        let bytes = new Uint8Array(len);
        let index = 0;

        for (let i = 0; i < hex.length; i += 2) {
            let c = hex.slice(i, i + 2);
            let b = parseInt(c, 16);
            bytes[index] = b;
            index += 1;
        }

        return bytes;
    }
}