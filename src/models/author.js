module.exports = (connection, DataTypes) => {
    const schema = {
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    args: [true],
                    msg: 'An author must be entered.',
                },
                notNull: {
                    args: [true],
                    msg: 'An author must be entered.',
                },
            },
        },
    };

    const AuthorModel = connection.define('Author', schema);
    return AuthorModel;
};
