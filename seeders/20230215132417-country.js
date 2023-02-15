"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("countries", [
      {
        id: 1,
        countryName: "korea",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        countryName: "japan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        countryName: "china",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        countryName: "france",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        countryName: "usa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        countryName: "canada",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        countryName: "australia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        countryName: "italy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        countryName: "vietnam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        countryName: "thailand",
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
    return queryInterface.bulkDelete("countries", null, {});
  },
};
