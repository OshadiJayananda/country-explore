import "@testing-library/jest-dom";
import { server } from "./_mocks_/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
