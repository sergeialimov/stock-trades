const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize("sqlite::memory:");

const Trade = sequelize.define('Trade', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.ENUM('buy', 'sell'),
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[A-Z]+$/i, // Ensure symbol is alphanumeric
            len: [1, 5] // Assuming symbols are between 1 to 5 characters. TBD
        }
    },
    shares: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 100
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.BIGINT, // To store timestamp in milliseconds
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Trade',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['type', 'user_id'] // TBD
        }
    ]
});

module.exports = Trade;
