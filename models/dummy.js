const { User, Category, Pin, Group, Emotion } = require("../models");
const faker = require("faker");
// faker.locale = "ko";

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
    {
      email: faker.internet.email(),
      password: faker.lorem.word(5),
      name: faker.name.firstName(),
    },
  ]);

  for (let i = 0; i < 400; i++) {
    await User.create({
      email: faker.internet.email(),
      password: faker.lorem.word(5),
      name: faker.name.firstName(),
    });
  }

  await Category.bulkCreate([
    { categoryId: 1, name: "맛집" },
    { categoryId: 2, name: "카페" },
    { categoryId: 3, name: "술집" },
    { categoryId: 4, name: "관광지" },
    { categoryId: 5, name: "주차장" },
  ]);

  await Group.bulkCreate([
    { userId: 1, name: "아지트" },
    { userId: 1, name: "데이트" },
    { userId: 1, name: "초코랑" },
  ]);

  await Emotion.bulkCreate([
    { emotionId: 1, name: "매우좋음" },
    { emotionId: 2, name: "좋음" },
    { emotionId: 3, name: "보통" },
    { emotionId: 4, name: "별로" },
    { emotionId: 5, name: "매우별로" },
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
