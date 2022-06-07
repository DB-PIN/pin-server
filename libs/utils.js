const { Group } = require("../models");

async function getDefaultGroupId(userId) {
  const defaultGroup = await Group.findOne({
    where: { userId: userId, name: "기본 그룹" },
  });
  return defaultGroup.groupId;
}

exports.getDefaultGroupId = getDefaultGroupId;
