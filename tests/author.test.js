const { expect } = require('chai');
const request = require('supertest');
const { Author } = require('../src/models');
const app = require('../src/app');

describe('/authors', () => {
    before(async () => Author.sequelize.sync());

    beforeEach(async () => {
        await Author.destroy({ where: {} });
    });

    describe('with no records in the database', () => {
        describe('POST /authors', () => {
            it('creates a new author in the database', async () => {
                const response = await request(app).post('/authors').send({
                    author: 'Jane Austin'
                });
                const newAuthorRecord = await Author.findByPk(response.body.id, {
                    raw: true,
                });

                expect(response.status).to.equal(201);
                expect(response.body.author).to.equal('Jane Austin');
                expect(newAuthorRecord.author).to.equal('Jane Austin');
            });

            it('errors if author is an empty string', async () => {
                const response = await request(app).post('/authors').send({
                    author: '',
                });
                const newAuthorRecord = await Author.findByPk(response.body.id);

                expect(response.status).to.equal(400);
                expect(response.body).to.haveOwnProperty('errors');
                expect(newAuthorRecord).to.equal(null);
            });

            it('errors if author is null', async () => {
                const response = await request(app).post('/authors').send({
                    author: null,
                });
                const newAuthorRecord = await Author.findByPk(response.body.id);

                expect(response.status).to.equal(400);
                expect(response.body).to.haveOwnProperty('errors');
                expect(newAuthorRecord).to.equal(null);
            });
        });
    });

    describe('with records in the database', () => {
        let authors;

        beforeEach(async () => {
            await Author.destroy({ where: {} });

            authors = await Promise.all([
                Author.create({
                    author: 'Jessie Burton',
                }),
                Author.create({
                    author: 'C.S Lewis',
                }),
            ]);
        });

        describe('POST /authors', () => {
            it('should return 400 error if the author already exists', async () => {
                const authorData = authors[0].author;
                const response = await request(app).post('/authors').send(authorData)
                console.log(response.body);
                expect(response.status).to.equal(400);
            });
        });

        describe('GET /authors', () => {
            it('gets all author records', async () => {
                const response = await request(app).get('/authors');

                expect(response.status).to.equal(200);
                expect(response.body.length).to.equal(2);

                response.body.forEach((author) => {
                    const expected = authors.find((a) => a.id === author.id);

                    expect(author.author).to.equal(expected.author);
                });
            });
        });

        describe('GET /authors/:id', () => {
            it('gets author by id', async () => {
                const author = authors[0];
                const response = await request(app).get(`/authors/${author.id}`);

                expect(response.status).to.equal(200);
                expect(response.body.author).to.equal(author.author);
            });

            it('returns a 404 if the author does not exist', async () => {
                const response = await request(app).get('/authors/12345');

                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The author could not be found.');
            });
        });

        describe('PATCH /authors/:id', () => {
            it('updates authors by id', async () => {
                const author = authors[0];
                const response = await request(app)
                .patch(`/authors/${author.id}`)
                .send({ author: 'Jess Burton' });
                const updatedAuthorRecord = await Author.findByPk(author.id, {
                    raw: true,
                });

                expect(response.status).to.equal(200);
                expect(updatedAuthorRecord.author).to.equal('Jess Burton');
            });

            it('returns a 404 if the author does not exist', async () => {
                const response = await request(app)
                .patch('/authors/12345')
                .send({ author: '12'});

                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The author could not be found.');
            });
        });

        describe('DELETE /authors/:id', () => {
            it('deletes genre record by id', async () => {
                const author = authors[0];
                const response = await request(app).delete(`/authors/${author.id}`);
                const deletedAuthor = await Author.findByPk(author.id, {
                    raw: true
                });
                
                expect(response.status).to.equal(204);
                expect(deletedAuthor).to.equal(null);
            });

            it('returns a 404 if the author does not exist', async () => {
                const response = await request(app).delete('/authors/12345');
                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The author could not be found.');
            });
        });
    });
});