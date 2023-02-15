"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("facilities", [
      {
        id: 1,
        facilityName: "무선 인터넷",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        facilityName: "주방",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        facilityName: "세탁기",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        facilityName: "건조기",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        facilityName: "에어컨",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        facilityName: "난방",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        facilityName: "업무 전용 공간",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        facilityName: "TV",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        facilityName: "헤어드라이어",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        facilityName: "다리미",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        facilityName: "수영장",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        facilityName: "온수 욕조",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        facilityName: "건물 내 무료 주차",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        facilityName: "전기차 충전시설",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        facilityName: "아기 침대",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        facilityName: "헬스장",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        facilityName: "바비큐 그릴",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        facilityName: "아침식사",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        facilityName: "실내 벽난로",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        facilityName: "흡연가능",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 21,
        facilityName: "해변에 인접",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 22,
        facilityName: "수변에 인접",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 23,
        facilityName: "스키를 탄 채로 출입 가능",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 24,
        facilityName: "화재경보기",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 25,
        facilityName: "일산화탄소 경보기",
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
    return queryInterface.bulkDelete("facilities", null, {});
  },
};
