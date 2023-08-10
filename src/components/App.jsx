import { SearchBar } from './SearchBar/SearchBar';
import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { getImages } from '../api/api.services';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Audio } from 'react-loader-spinner';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(12);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    if (value && page) {
      setIsLoading(true);
      getImages(value, page)
        .then(({ hits }) => {
          setImages(prevImages => [...prevImages, ...hits]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [value, page]);

  const handleSubmit = submittedValue => {
    setValue(submittedValue);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = largeImage => {
    setIsShown(true);
    setLargeImage(largeImage);
  };

  const handleCloseModal = () => {
    setIsShown(false);
    setLargeImage('');
  };

  return (
    <div className={styles.App}>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery images={images} onOpenModal={handleOpenModal} />
      {images.length >= per_page * page && (
        <Button handleLoadMore={handleLoadMore} />
      )}
      {isLoading && <Audio />}
      {isShown && <Modal image={largeImage} onCloseModal={handleCloseModal} />}
    </div>
  );
};
