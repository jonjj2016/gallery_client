import React, { useCallback, useState } from 'react';
import { Menu, Form, Input, Segment } from 'semantic-ui-react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import Loader from '../Loader/Loader';

const Component = ({ loading, images, err, state, fetchImages, onChange, onSubmit }) => {
  const [myState, setMyState] = useState({
    currentImage: 0,
    viewerIsOpen: false,
  });
  const openLightbox = useCallback((event, { photo, index }) => {
    setMyState({ ...state, currentImage: index, viewerIsOpen: true });
  }, []);

  const closeLightbox = () => {
    setMyState({ ...state, currentImage: 0, viewerIsOpen: false });
  };

  return (
    <div style={{ backgroundColor: '#000' }}>
      <Menu inverted fixed='top'>
        <Menu.Menu style={{ margin: '1rem auto' }} position='right'>
          <Form style={{ width: '50vw' }} inverted onSubmit={onSubmit}>
            <Input fluid value={state.searchField} inverted loading={loading} icon='search' onChange={onChange} placeholder='Search...' name='userInput' />
          </Form>
        </Menu.Menu>
      </Menu>
      <Wrapper>
        {!loading && images && (
          <InfiniteScroll next={fetchImages} dataLength={images.length} hasMore={true} loader={<Loader />}>
            <React.Fragment>
              <Gallery photos={images} onClick={openLightbox} />
              <ModalGateway>
                {myState.viewerIsOpen ? (
                  <Modal onClose={closeLightbox}>
                    <Carousel
                      currentIndex={myState.currentImage}
                      views={images.map((x) => ({
                        ...x,
                        srcset: x.srcSet,
                        caption: x.title,
                      }))}
                    />
                  </Modal>
                ) : null}
              </ModalGateway>
            </React.Fragment>
          </InfiniteScroll>
        )}
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.div`
  width: 75%;

  margin: 0 auto;
  padding: 3rem 0;
`;

export default Component;
