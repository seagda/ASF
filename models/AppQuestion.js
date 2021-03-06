module.exports = (sequelize, DataTypes) => {
    const AppQuestion = sequelize.define("AppQuestion", {
        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM("boolean", "text", "number", "url", "radiogroup", "checkbox"),
            allowNull: false
        },
        isRequired: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        // dependsOnAnswer is the answer value for the dependsOnQuestion that triggers asking this question
        dependsOnAnswer: DataTypes.INTEGER
    });

    AppQuestion.associate = db => {
        db.AppQuestionCategory.hasMany(AppQuestion);
        AppQuestion.belongsTo(db.AppQuestionCategory);

        AppQuestion.belongsTo(AppQuestion, { as: "DependsOnQuestion", foreignKey: "dependsOnQuestionId" });
    };

    return AppQuestion;
};