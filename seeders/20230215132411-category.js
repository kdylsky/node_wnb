"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        id: 1,
        categroyName: "해변 바로 앞",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        categroyName: "한적한 시골",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        categroyName: "국립공원",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        categroyName: "개인실",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        categroyName: "최고의 전망",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        categroyName: "한옥",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        categroyName: "료칸",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        categroyName: "기상천외한 숙소",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        categroyName: "저택",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        categroyName: "멋진 수영장",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        categroyName: "캠핑장",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        categroyName: "Luxe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        categroyName: "농장",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        categroyName: "초소형 주택",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        categroyName: "캐슬",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        categroyName: "그랜드 피아노",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        categroyName: "유서 깊은 주택",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        categroyName: "열대 지역",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        categroyName: "창작공간",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        categroyName: "통나무집",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 21,
        categroyName: "키즈",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 22,
        categroyName: "북극",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 23,
        categroyName: "스키",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 24,
        categroyName: "호숫가",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 25,
        categroyName: "섬",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("categories", null, {});
  },
};
