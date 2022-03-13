module.exports = (connection, DataTypes) => {
    const schema = {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: [true],
                    msg: 'Please enter your name',
                },
                notNull: {
                    args: [true],
                    msg: 'Please enter your name',
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    args: [true],
                    msg: 'Email must be correct format',
                },
                notEmpty: {
                    args: [true],
                    msg: 'Please enter your email',
                },
                notNull: {
                    args: [true],
                    msg: 'Please enter your email',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: [true],
                    msg: 'Please enter a password of at least 8 characters',
                },
                len: {
                    args: [8],
                    msg: 'Your password must be at least 8 characters long',
                },
            },
        },
    };

    const ReaderModel = connection.define('Reader', schema);
    return ReaderModel;
};