'use strict';
const uuid = require('uuid')
module.exports = {
  async up (queryInterface, Sequelize) {
    const { count } = await queryInterface.sequelize
        .query(`SELECT COUNT(*) FROM operations.scrap_url`)
        .then(response => response[0][0])
    const today = new Date()
    let dataScrapUrl = [
      {
        url: 'https://www.mercadolibre.com.mx/'
      },
      {
        url: 'https://www.amazon.com/'
      },
      {
        url: 'https://spanish.alibaba.com/'
      }
    ]
    dataScrapUrl = dataScrapUrl.map((el,idx) =>{
      return{
        ...el,
        index: parseInt(count + 1) + idx,
        id: uuid.v4(),
        created_at: today,
        updated_at: today
      }
    })

    return  await queryInterface.bulkInsert({schema: 'operations' , tableName: 'scrap_url'}, dataScrapUrl, {});
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('scrap_url', null, {});
  }
};
