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
        ISBN: {
            type: 
            DataTypes.STRING,
        },
    };

    const BookModel = connection.define('Book', schema);
    return BookModel;
};