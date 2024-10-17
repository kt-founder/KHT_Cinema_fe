// src/components/MovieList.js
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import axios from 'axios';

const { Meta } = Card;

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách phim
    axios.get('/api/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2 style={{ color: 'white' }}>Phim đang chiếu</h2>
      <Row gutter={16}>
        {movies.map(movie => (
          <Col span={6} key={movie.id}>
            <Card
              hoverable
              cover={<img alt={movie.name} src={movie.poster} />}
              style={{ marginBottom: 20 }}
            >
              <Meta title={movie.name} description={movie.category} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MovieList;
