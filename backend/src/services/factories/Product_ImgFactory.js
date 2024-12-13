// src/services/factories/Product_ImgFactory.js
import { faker } from '@faker-js/faker';

class Product_ImgFactory {
  static async generate(count = 1) {
    const pool = await import('../../configs/db.js').then((m) => m.default);
    const result = await pool.request().query('SELECT Product_ID FROM Product');
    const productIds = result.recordset.map((r) => r.Product_ID);

    if (productIds.length === 0) {
      throw new Error('No products found in database');
    }

    const items = [];
    for (const productId of productIds) {
      // Mỗi sản phẩm có 3-5 ảnh
      const imageCount = faker.number.int({ min: 3, max: 5 });
      // Lấy ngẫu nhiên các URL ảnh không trùng lặp
      const selectedUrls = faker.helpers.arrayElements(
        this.shoeImageUrls,
        imageCount
      );

      for (const url of selectedUrls) {
        items.push({
          Product_ID: productId,
          Img_url: url,
        });
      }
    }
    return items;
  }

  // Danh sách URL ảnh tĩnh
  static shoeImageUrls = [
    // Nike
    'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/350e7f3a-979a-402b-9396-a9cb2a06865b/air-force-1-07-shoes-WrLlWX.png',
    'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7c5678f4-c28d-4862-a8d9-56750f839f12/zegama-trail-running-shoes-9q0qZg.png',
    'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6da41fa-1be4-4ce5-b89c-22be4f1f02d4/air-force-1-07-shoes-WrLlWX.png',
    'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/350e7f3a-979a-402b-9396-a9cb2a06865b/air-max-90-shoes-kRsBnD.png',
    'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7c5678f4-c28d-4862-a8d9-56750f839f12/zoom-fly-5-road-running-shoes-lkx7Zp.png',

    // Adidas
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/09c5ea6df1bd4be6baaaac5e003e7047_9366/Forum_Low_Shoes_White_FY7756_01_standard.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8c5d1994dfd343e28567ad4400dd351d_9366/Ultra_4D_Shoes_Black_Q46439_01_standard.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/68ae7ea7849b43eca70aac1e00f5146d_9366/Stan_Smith_Shoes_White_FX5502_01_standard.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Superstar_Shoes_White_GV7610_01_standard.jpg',
    'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2cee64414e1f4f31a126ae8400103c55_9366/NMD_R1_Shoes_Black_GZ9256_01_standard.jpg',

    // Puma
    'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_700,h_700/global/374915/01/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers',
    'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_700,h_700/global/384721/01/sv01/fnd/PNA/fmt/png/CA-Pro-Classic-Sneakers',
    'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_700,h_700/global/380591/01/sv01/fnd/PNA/fmt/png/Slipstream-Lo-Sneakers',
    'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_700,h_700/global/385629/01/sv01/fnd/PNA/fmt/png/RS-X-Sneakers',
    'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_700,h_700/global/384721/02/sv01/fnd/PNA/fmt/png/CA-Pro-Classic-Sneakers-Black',

    // New Balance
    'https://nb.scene7.com/is/image/NB/m990gl5_nb_02_i?$pdpflexf2$&wid=440&hei=440',
    'https://nb.scene7.com/is/image/NB/bb550wtb_nb_02_i?$pdpflexf2$&wid=440&hei=440',
    'https://nb.scene7.com/is/image/NB/u9060aab_nb_02_i?$pdpflexf2$&wid=440&hei=440',
    'https://nb.scene7.com/is/image/NB/m5740ca_nb_02_i?$pdpflexf2$&wid=440&hei=440',
    'https://nb.scene7.com/is/image/NB/m2002raa_nb_02_i?$pdpflexf2$&wid=440&hei=440',
  ];
}

export default Product_ImgFactory;
