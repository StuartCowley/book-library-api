module.exports = (connection, DataTypes) => {
    const schema = {
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    args: [true],
                    msg: 'A genre must be entered.',
                },
                notNull: {
                    args: [true],
                    msg: 'A genre must be entered.',
                },
            },
        },
    };

    const GenreModel = connection.define('Genre', schema);
    return GenreModel;
};