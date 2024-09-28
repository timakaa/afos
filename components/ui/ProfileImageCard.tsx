"use client";

import React, { useEffect, useState } from "react";
import testpackblur from "../../public/test_pack_blur.jpg";
import Modal from "./Modal";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom } from "swiper/modules";
import Image from "next/image";
import fetchProtectedImage from "@/lib/fetchProtectedImage";

const ProfileImageCard = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (isClicked) {
      setTimeout(() => {
        setIsDelete(true);
      }, 200);
    }
  }, [isClicked]);

  useEffect(() => {
    function loadImage() {
      try {
        fetchProtectedImage()
          .then((url) => {
            setImageUrl(url);
          })
          .catch((error) => {
            console.error("Ошибка загрузки изображения", error);
          });
      } catch (error) {
        console.error("Ошибка загрузки изображения", error);
      }
    }

    loadImage();
  }, []);

  return (
    <>
      <button
        onClick={() => setIsClicked(true)}
        className={`w-full text-center relative h-[300px] ${
          isClicked
            ? ""
            : 'before:content-["See"] before:absolute before:block before:z-30 before:left-1/2 before:top-1/2 before:text-white before:text-3xl before:font-bold before:-translate-x-1/2 before:-translate-y-1/2'
        }`}
      >
        <div>
          <Image
            alt=''
            src={testpackblur}
            className={`absolute max-h-[300px] w-full mx-auto inset-0 rounded-lg object-cover bg-center ${
              isClicked ? "opacity-0" : "opacity-100"
            } ${
              isDelete ? "hidden" : "block"
            } z-10 duration-100 bg-no-repeat bg-cover`}
          />
          <Image
            onClick={() => setIsModalOpen(true)}
            src={imageUrl}
            alt=''
            width={300}
            height={300}
            className='absolute max-h-[300px] w-full object-cover mx-auto inset-0 rounded-lg bg-center duration-100 bg-no-repeat bg-cover'
          />
        </div>
      </button>
      <Modal
        isVisible={isModalOpen}
        setIsVisible={setIsModalOpen}
        centerChildren
      >
        <div className='flex h-full justify-center mx-auto'>
          <Swiper
            modules={[Zoom]}
            centeredSlides
            cssMode
            slidesPerView={1}
            zoom={true}
            className='overflow-hidden'
          >
            <SwiperSlide>
              <div className='swiper-zoom-container flex justify-center'>
                <motion.div
                  initial='from'
                  animate='to'
                  exit='from'
                  variants={{
                    from: { width: "50%", height: "50%", opacity: 0 },
                    to: { width: "100%", height: "100%", opacity: 1 },
                  }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <Image
                    height={300}
                    width={300}
                    alt=''
                    src={imageUrl}
                    className='object-cover w-auto h-auto'
                  />
                </motion.div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </Modal>
    </>
  );
};

export default ProfileImageCard;
