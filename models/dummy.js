const { User, Category, Pin, Group, Emotion } = require("../models");

async function generateDummy() {
  await User.bulkCreate([
    {
      email: "aaa@aaa.com",
      password: "aaa",
      name: "김에이",
    },
    {
      email: "bbb@bbb.com",
      password: "bbb",
      name: "김삐삐",
    },
    {
      email: "ccc@ccc.com",
      password: "ccc",
      name: "김씨씨",
    },
  ]);

  await Category.bulkCreate([
    { name: "맛집" },
    { name: "카페" },
    { name: "문화" },
  ]);

  await Group.bulkCreate([
    { userId: 1, name: "아지트" },
    { userId: 1, name: "데이트" },
    { userId: 1, name: "초코랑" },
  ]);

  await Emotion.bulkCreate([
    { name: "행복" },
    { name: "슬픔" },
    { name: "멋짐" },
  ]);

  await Pin.bulkCreate([
    {
      userId: 1,
      categoryId: 1,
      emotionId: 1,
      groupId: 1,
      name: "민아랑 갔던 아지트",
      address: "경기도 수원시 영통구 원천동 팔달관",
    },
    {
      userId: 1,
      categoryId: 2,
      emotionId: 2,
      groupId: 2,
      name: "오빠랑 갔던 카페",
      address: "경기도 수원시 영통구 원천동 팔달관",
    },
    {
      userId: 1,
      categoryId: 2,
      emotionId: 3,
      groupId: 3,
      name: "초코랑 갔던 카페",
      address: "경기도 수원시 영통구 원천동 팔달관",
    },
  ]);
} // end of generateDummy()

module.exports.generateDummy = generateDummy;
