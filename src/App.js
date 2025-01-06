import React, { useState, useEffect } from 'react';
// Components
import SearchBar from './components/SearchBar/SearchBar';
import VideoList from './components/VideoList/VideoList';
import VideoDetail from './components/VideoDetail/VideoDetail';
import Nav from './components/Nav/Nav';
// styles
import { Container } from './appStyles.js';
// Personal Key
import API_KEY from './key';

function App() {
  const [videos, setVideos] = useState(null);
  const [selectedVideo, setSelectVideo] = useState();

  const handleSearch = async term => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${term}&maxResults=50`
      );
      const data = await response.json();
      setVideos(data.items); // The 'items' array contains the videos
      setSelectVideo(data.items[0]); // Select the first video by default
    } catch (error) {
      console.error('Error fetching data from YouTube API:', error);
    }
  };

  useEffect(() => {
    handleSearch('Guns and roses');
  }, []);

  return (
    <Container>
      <Nav>
        <SearchBar handleSearch={handleSearch} />
      </Nav>
      <VideoDetail videos={selectedVideo}>
        <VideoList
          videos={videos}
          handleSelectVideo={selectedVideo => setSelectVideo(selectedVideo)}
        />
      </VideoDetail>
    </Container>
  );
}

export default App;
