import { beforeEach, describe, expect, test } from "vitest";
import { getHeroesByPageAction } from "./get-heroes-bay-page.actions";
import AxiosMockAdapter from 'axios-mock-adapter'
import { heroApi } from "../api/hero.api";

const BASE_URL = import.meta.env.VITE_API_URL;


describe('getHeroByPageAction', () => {

    beforeEach(() => {
        heroApiMock.reset();
    })

    const heroApiMock = new AxiosMockAdapter(heroApi);

    test('should return default values', async () => {
        heroApiMock.onGet('/').reply(200, {
            total: 10,
            pages: 1,
            heroes: [
                {
                    image: `${BASE_URL}/images/1.jpg`
                },
                {
                    image: `${BASE_URL}/images/2.jpg`
                }
            ]
        })
        const response = await getHeroesByPageAction(1);
        console.log(response)

    });

    test('should return the correct hero when page is a string number', async () => {
        const responseObject = {
            total: 10,
            pages: 1,
            heroes: []
        }
        heroApiMock.onGet('/').reply(200, responseObject);

        await getHeroesByPageAction('5' as unknown as number);

        const params = heroApiMock.history.get[0].params

        console.log(heroApiMock.history)

        expect(params).toStrictEqual({ limit: 5, offset: 20, category: 'all' })


    })

    test('should return the correct params', async () => {
        const responseObject = {
            total: 10,
            pages: 1,
            heroes: []
        }
        heroApiMock.onGet('/').reply(200, responseObject);

        await getHeroesByPageAction(2, 10, 'Hero');

        const params = heroApiMock.history.get[0].params

        console.log(heroApiMock.history)
        expect(params).toStrictEqual({ limit: 10, offset: 10, category: 'Hero' })
    })



})