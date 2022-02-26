const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
    before(async () => Book.sequelize.sync());

    beforeEach(async () => {
        await Book.destroy({ where: {} });
    });

    describe('with no records in the database', () => {
        describe('POST /books', () => {
            it('creates a new book in the database', async () => {
                const response = await request(app).post('/books').send({
                    title: 'Pride and prejudice',
                    author: 'Jane Austin',
                    genre: 'Romance',
                    ISBN: '9780140430721',
                });
                const newBookRecord = await Book.findByPk(response.body.id, {
                    raw: true,
                });

                expect(response.status).to.equal(201);
                expect(response.body.title).to.equal('Pride and prejudice');
                expect(newBookRecord.title).to.equal('Pride and prejudice');
                expect(newBookRecord.author).to.equal('Jane Austin');
                expect(newBookRecord.genre).to.equal('Romance');
                expect(newBookRecord.ISBN).to.equal('9780140430721');
            });
        });
    });
})