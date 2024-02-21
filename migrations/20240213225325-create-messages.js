'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING,
        allowNull: true
      },
      senderId: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "tblUsers"
        }
      },
      receiverId: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "tblUsers"
        }
      },
      type: {
        type: Sequelize.STRING
      },
      blob: {
        type: Sequelize.BLOB,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};