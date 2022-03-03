module.exports = (connection, DataTypes) => {
    const schema = {
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
    };

    const AuthorModel = connection.define('author', schema);
    return AuthorModel;
};
