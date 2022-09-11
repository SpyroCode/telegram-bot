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
        url: 'https://listado.mercadolibre.com.mx/VALUE#D[A:VALUE]',
        code: 'MERCADO-LIBRE',
        configuration: '{"container": ".ui-search-results", "section": ".ui-search-layout__item", "elements":  {"price": ".price-tag-fraction", "name": ".ui-search-item__title", "image": ".ui-search-result-image__element"}}'
      },
      {
        url: 'https://spanish.alibaba.com//trade/search?fsb=y&IndexArea=product_en&CatId=&tab=all&SearchText=VALUE',
        code: 'ALIBABA',
        configuration: '{"container": ".app-organic-search__content", "section": ".list-no-v2-outter", "elements":  {"price": ".elements-offer-price-normal__promotion", "name": ".elements-title-normal__outter", "image": ".seb-img-switcher__imgs"}}'
      }
    ]
    dataScrapUrl = dataScrapUrl.map((el,idx) =>{
      return{
        ...el,
        index: parseInt(count) + 1 + idx,
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
