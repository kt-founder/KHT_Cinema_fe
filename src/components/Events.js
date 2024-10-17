// src/components/Events.js
import React from 'react';
import { Row, Col, Card } from 'antd';

const { Meta } = Card;

const events = [
  { id: 1, title: "Hoàn thành chương trình khảo sát", image: "event1.jpg" },
  { id: 2, title: "Sự kiện đặc biệt tháng 10", image: "event2.jpg" }
];

const Events = () => {
  return (
    <div>
      <h2 style={{ color: 'white' }}>Sự kiện</h2>
      <Row gutter={16}>
        {events.map(event => (
          <Col span={12} key={event.id}>
            <Card
              hoverable
              cover={<img alt={event.title} src={event.image} />}
              style={{ marginBottom: 20 }}
            >
              <Meta title={event.title} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Events;
