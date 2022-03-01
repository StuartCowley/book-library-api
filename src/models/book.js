module.exports = (connection, DataTypes) => {
    const schema = {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: [true],
                    msg: 'A title must be entered.',
                },
                notNull: {
                    args: [true],
                    msg: 'A title must be entered.',
                },
            },
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: [true],
                    msg: 'A author must be entered.',
                },
                notNull: {
                    args: [true],
                    msg: 'A author must be entered.',
                },
            },
        },
        genre: {
            type: DataTypes.STRING,
        },
        ISBN: {
            type: 
            DataTypes.STRING,
        },
    };

    const BookModel = connection.define('Book', schema);
    return BookModel;
};