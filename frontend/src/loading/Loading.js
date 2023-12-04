import React from 'react';
import { Background, LoadingText } from './Styles';
import Spinner from '../assets/Spinner-1.8s-800px.gif';
import Header from '../header/Header3';
import Footer from '../header/Footer';

const Loading = () => {
  return (
    <>
    <Header />
    <Background className='col-12'>
      <LoadingText>잠시만 기다려주세요</LoadingText>
      <img src={Spinner} alt="로딩중" width="30%" />
      <Footer />
    </Background>
    
    </>
  );
}

export default Loading;