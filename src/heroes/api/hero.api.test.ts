import { describe, expect, test } from "vitest";
import { heroApi } from "./hero.api";
const BASE_URL =import.meta.env.VITE_API_URL;

// $env:PORT=3001
// npm run start:dev

describe('Hero App test',()=>{
    test('should be configure pointing to the testing server',()=>{
        console.log(heroApi.defaults.baseURL);
        expect(heroApi).toBeDefined();
        expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`)
        expect(BASE_URL).toContain('3001')

    })
})