// src/components/Promotion.js
import React from 'react';
import { Row, Col, Card } from 'antd';

const { Meta } = Card;

const promotions = [
  { id: 1, title: "Phim Thật Hay - Combo Thật Đã", image: "promo1.jpg" },
  { id: 2, title: "Khuyến Mãi Đặc Biệt", image: "promo2.jpg" }
];

const Promotion = () => {
  return (
    <div>
      <h2 style={{ color: 'white' }}>Khuyến mãi</h2>
      <Row gutter={16}>
        {promotions.map(promo => (
          <Col span={12} key={promo.id}>
            <Card
              hoverable
              cover={<img alt={promo.title} src={promo.image} />}
              style={{ marginBottom: 20 }}
            >
              <Meta title={promo.title} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Promotion;
