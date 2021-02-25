module.exports = ac => {
    ac.grant("adopter").grant("foster").extend("adopter")
        .readAny("User")
        .readAny("AppResponse")
        .createAny("BehavorialAssessment")
        .readAny("BehavorialAssessment")
        .updateAny("BehavorialAssessment")
        .readAny("AssessQuestion")

};