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
    
    describe('with books in the database', () => {
        let books;

        beforeEach(async () => {
            books = await Promise.all([
                Book.create({
                    title: 'Pride and prejudice',
                    author: 'Jane Austin',
                    genre: 'Romance',
                    ISBN: '9780140430721',
                }),
                Book.create({ 
                    title: 'The Illiad', 
                    author: 'Homer', 
                    genre: 'Epic poetry', 
                    ISBN: '9780800042011'
                }),
                Book.create({
                    title: 'Nineteen Eighty-Four',
                    author: 'George Orwell',
                    genre: 'Dystopian',
                    ISBN: '9780140817744'
                }),
            ]);
        });   

            describe('GET /books', () => {
                it('gets all books records', async () => {
                    const response = await request(app).get('/books');

                    expect(response.status).to.equal(200);
                    expect(response.body.length).to.equal(3);

                    response.body.forEach((book) => {
                        const expected = books.find((a) => a.id === book.id);

                        expect(book.title).to.equal(expected.title);
                        expect(book.author).to.equal(expected.author);
                        expect(book.genre).to.equal(expected.genre);
                        expect(book.ISBN).to.equal(expected.ISBN);
                    });
                });
            });

            describe('GET /books/:id', () => {
                it('gets book records by id', async () => {
                    const book = books[0];
                    const response = await request(app).get(`/books/${book.id}`);

                    expect(response.status).to.equal(200);
                    expect(response.body.title).to.equal(book.title);
                });

                it('returns a 404 if the book does not exist', async () => {
                    const response = await request(app).get('/books/12345');

                    expect(response.status).to.equal(404);
                    expect(response.body.error).to.equal('The book could not be found');
                });
            });
    });
});