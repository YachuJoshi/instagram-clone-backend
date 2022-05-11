import { Application } from "express";
import { Server } from "http";
import supertest, { SuperAgentTest } from "supertest";

let request: SuperAgentTest;
let server: Server;

export async function setupApp(app: Application) {
  server = app.listen();
  request = supertest.agent(server);
}

export function getAppRequest() {
  return request;
}

export async function closeApp() {
  await server.close();
}
