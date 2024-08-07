'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('categories', [
            { name: 'Gramática', position: 1, created_at: new Date(), updated_at: new Date() },
            { name: 'Vocabulário', position: 2, created_at: new Date(), updated_at: new Date() },
            { name: 'Conversação', position: 3, created_at: new Date(), updated_at: new Date() },
            { name: 'Compreensão Auditiva', position: 4, created_at: new Date(), updated_at: new Date() },
            { name: 'Leitura', position: 5, created_at: new Date(), updated_at: new Date() },
            { name: 'Escrita', position: 6, created_at: new Date(), updated_at: new Date() },
            { name: 'Cultura', position: 7, created_at: new Date(), updated_at: new Date() }
        ], {})
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('categories', null, {});
    }
};