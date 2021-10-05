import Fastify, { FastifyReply, FastifyRequest } from "fastify";
//import express = require('express');
import { book, manifest } from "../types";
import type { workerHandlers } from "./worker";

const createWorkerRouter = (
    handlers: workerHandlers,
    workerManifest: manifest
) => {
    const fastify = Fastify({
        logger: true,
    });

    const respond = (reply: FastifyReply, data: any = {}!) => {
        reply.headers({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json",
        });

        reply.send(data);
    };

    //Get worker manifest route.
    fastify.get("/manifest", (req: any, rep: any) => {
        respond(rep, workerManifest);
    });

    //Search book route
    fastify.get(
        "/search",
        {
            schema: {
                querystring: {
                    type: "object",
                    properties: {
                        text: {
                            type: "string",
                        },
                    },
                },
            },
        },
        async (req: any, rep: any) => {
            if (!req.query.text) rep.send({ books: [] });
            else {
                const books = await handlers?.searchHandler?.(req.query.text);
                respond(rep, { books: books });
            }
        }
    );
};
