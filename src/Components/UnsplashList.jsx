import React, { useEffect, useState, useCallback } from 'react';
import { photosService } from '../Feathers';
import { Menu, Form, Input } from 'semantic-ui-react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import InfiniteScroll from 'react-infinite-scroll-component';

const UnsplashList = () => {
  const [state, setState] = useState({ start: 1, count: 30, photos: null, loading: true, userInput: 'nature', unsplashImages: null, currentImage: 0, viewerIsOpen: false });

  useEffect(() => {
    const fetch = async () => {
      const res = await photosService.find({
        query: {
          searchField: state.userInput,
          start: state.start,
          count: state.count,
        },
      });
      const new_images = res.data.map((file) => {
        const url = file.urls.small;
        return { src: url, width: file.width, height: file.height };
      });
      setState({ ...state, unsplashImages: [...new_images], loading: false });
    };
    fetch();
  }, []);
  console.log(state);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSubmit = () => {
    const fetch = async () => {
      const res = await photosService.find({
        query: {
          searchField: state.userInput,
          start: 1,
          count: state.count,
        },
      });
      const new_images = res.data.map((file) => {
        const url = file.urls.small;
        return { src: url, width: file.width, height: file.height };
      });
      setState({ ...state, unsplashImages: new_images, start: 1, loading: false });
    };
    fetch();
  };

  const openLightbox = useCallback((event, { photo, index }) => {
    if (state.unsplashImages) {
      setState({ ...state, currentImage: index, viewerIsOpen: true });
    }
  }, []);
  const closeLightbox = () => {
    setState({ ...state, currentImage: 0, viewerIsOpen: false });
  };
  const fetchImages = () => {
    const fetch = async () => {
      const res = await photosService.find({
        query: {
          searchField: state.userInput,
          start: state.start,
          count: state.count,
        },
      });
      const new_images = res.data.map((file) => {
        const url = file.urls.small;
        return { src: url, width: file.width, height: file.height };
      });
      setState({ ...state, start: state.start + 1, unsplashImages: [...state.unsplashImages, ...new_images], loading: false });
    };
    fetch();
  };
  return (
    <div>
      <Menu fixed='top'>
        <Menu.Menu position='right'>
          <Form onSubmit={onSubmit}>
            <Input loading={state.loading} icon='search' placeholder='Search...' name='userInput' onChange={onChange} value={state.userInput} />
          </Form>
        </Menu.Menu>
      </Menu>
      <div className='container' style={{ width: '50%', margin: '0 auto' }}>
        {state.unsplashImages && (
          <InfiniteScroll next={fetchImages} dataLength={state.unsplashImages.length} hasMore={true} loader={<h4>Loading</h4>}>
            <Gallery photos={state.unsplashImages} onClick={openLightbox} />
            <ModalGateway>
              {state.viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                  <Carousel
                    currentIndex={state.currentImage}
                    views={state.unsplashImages.map((x) => ({
                      ...x,
                      srcset: x.srcSet,
                      caption: x.title,
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default UnsplashList;
