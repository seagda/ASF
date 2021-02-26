module.exports = ac => {
    ac.grant("user")
        .readOwn("Dog")
        .createOwn("Address")
        .readOwn("Address")
        .updateOwn("Address")
        .readOwn("Alert")
        .updateOwn("Alert")   
        .readAny("AppQuestion")
        .createOwn("AppResponse")
        .readOwn("AppResponse")
        .readAny("AppTypes")
        .createOwn("Familymember")
        .readOwn("Event")
        .readOwn("ExtContact")
        .readOwn("Familymember")
        .updateOwn("Familymember")
        .deleteOwn("Familymember")
        .readOwn("User", ["*", "!password", "!blocked", "!adminNotes"])
        .updateOwn("User", ["*", "!active", "!blocked", "!adminNotes","!maxCapacity", "!puppies","!adults","!seniors","!withBehaviorIssues", "!withMedicalIssues"])
        .createOwn("Reference")
        .readOwn("Reference")
        .updateOwn("Reference")
        .deleteOwn("Reference")
        .readOwn("Region")
};