// src/database/seeders/XXXXXXXXXXXXXX-seed-courses-table.js

'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const [categories] = await queryInterface.sequelize.query('SELECT id FROM categories;');

        await queryInterface.bulkInsert('courses', [
            { name: 'Inglês Básico: Gramática e Vocabulário', synopsis: 'Aprenda a base da gramática e vocabulário do inglês para iniciantes.', featured: true, category_id: categories[0].id, created_at: new Date(), updated_at: new Date() },
            { name: 'Francês Intermediário: Conversação', synopsis: 'Melhore suas habilidades de conversação em francês com tópicos do dia a dia.', category_id: categories[2].id, created_at: new Date(), updated_at: new Date() },
            { name: 'Espanhol Avançado: Compreensão Auditiva', synopsis: 'Desenvolva suas habilidades de compreensão auditiva em espanhol com diálogos avançados.', featured: true, category_id: categories[3].id, created_at: new Date(), updated_at: new Date() },
            { name: 'Japonês para Negócios', synopsis: 'Aprenda japonês com foco em situações de negócios e etiqueta empresarial.', featured: true, category_id: categories[4].id, created_at: new Date(), updated_at: new Date() },
            { name: 'Italiano Básico: Leitura e Escrita', synopsis: 'Introdução à leitura e escrita em italiano para iniciantes.', featured: true, category_id: categories[5].id, created_at: new Date(), updated_at: new Date() },
            { name: 'Chinês Mandarim: Cultura e Idioma', synopsis: 'Explore a cultura chinesa enquanto aprende mandarim.', featured: true, category_id: categories[6].id, created_at: new Date(), updated_at: new Date() },
            { name: 'Alemão para Viagens', synopsis: 'Aprenda frases e vocabulário essenciais para se comunicar em viagens pela Alemanha.', category_id: categories[0].id, created_at: new Date(), updated_at: new Date() },
            { name: 'Português Brasileiro: Gírias e Expressões', synopsis: 'Descubra as gírias e expressões comuns no português brasileiro.', category_id: categories[1].id, created_at: new Date(), updated_at: new Date() },
            { name: 'Russo Intermediário: Conversação', synopsis: 'Aprimore sua capacidade de conversação em russo com exercícios práticos.', category_id: categories[2].id, created_at: new Date(), updated_at: new Date() },
            { name: 'Árabe Básico: Escrita e Leitura', synopsis: 'Introdução à escrita e leitura em árabe para iniciantes.', category_id: categories[3].id, created_at: new Date(), updated_at: new Date() },
            { name: 'Coreano: Cultura Pop e Idioma', synopsis: 'Aprenda coreano através da cultura pop, incluindo K-pop e dramas.', category_id: categories[4].id, created_at: new Date(), updated_at: new Date() },
            { name: 'Sueco para Iniciantes', synopsis: 'Curso básico de sueco, cobrindo gramática e vocabulário essencial.', category_id: categories[5].id, created_at: new Date(), updated_at: new Date() },
            { name: 'Hebraico Moderno: Compreensão Auditiva', synopsis: 'Melhore sua compreensão auditiva em hebraico com diálogos modernos.', category_id: categories[6].id, created_at: new Date(), updated_at: new Date() },
            { name: 'Turco: Frases Essenciais para Conversação', synopsis: 'Aprenda frases e vocabulário essenciais para se comunicar em turco.', category_id: categories[2].id, created_at: new Date(), updated_at: new Date() }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('courses', null, {});
    }
};