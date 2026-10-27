import { describe, expect, test } from "vitest";
import { getHero } from "./getHero";

describe('getHeroAction', () => {

    test('sdhould throw hero data and resturn whit commplete image url', async () => {
        const result = await getHero('clark-kent');

        const resulImageUrl = result.image;
        expect(resulImageUrl).toContain('http');
        expect(result).toStrictEqual({
            id: '1',
            name: 'Clark Kent',
            slug: 'clark-kent',
            alias: 'Superman',
            powers: [
                'Súper fuerza',
                'Vuelo',
                'Visión de calor',
                'Visión de rayos X',
                'Invulnerabilidad',
                'Súper velocidad'
            ],
            description: 'El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.',
            strength: 10,
            intelligence: 8,
            speed: 9,
            durability: 10,
            team: 'Liga de la Justicia',
            image: 'http://localhost:3001/images/1.jpeg',
            firstAppearance: '1938',
            status: 'Active',
            category: 'Hero',
            universe: 'DC'
        });

    });

    test('should trhow an error if hero is not found ', async () => {
        const result = await getHero('clark-kent-2').catch(error => {
            console.log(error)
            expect(error.status).toBe(404);
        });
        expect(result).toBeUndefined()


    })

})