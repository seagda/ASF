module.exports = (sequelize, DataTypes) => {
    const MicrochipMfg = sequelize.define("MicrochipMfg", {
        name: { type: DataTypes.STRING, allowNull: false }
    }, { underscored: true });
    return MicrochipMfg;
};

