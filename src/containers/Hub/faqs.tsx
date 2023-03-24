import React, { useState } from "react";
import styles from "./Faqs.module.css";

const faqData = [
  {
    question: "What are 'Hours'?",
    answer:
      `Hours refer to the amount of GPU processing time allocated per month for different plans.

      The basic plan comes with 200 GPU-minutes/mo, the standard plan with 15 GPU-hours/mo, and the pro plan with 30 GPU-hours/mo.

      One hour is roughly equivalent to 60 minutes of text processing, 30 minutes of image generation, 12 minutes of video generation.

      Additionally, it takes roughly 5 hours to train a model. Note that these numbers are estimates and may be subject to change.`  },
  {
    question: "What if I want MORE hours?",
    answer:
      'Hours can be bought in addition to your plan or individually. They have no expiration date, but require an active staking with a 30 day lock to use.'
  },

  {
    question: "What is the Community Gallery?",
    answer:
      'The Gallery is a place where paid members can explore images being made on the platform and a central place to organize your own images, collect favorites, and more.'
  },
  {
    question: "What if I don't want my images to appear in the Gallery?",
    answer:
      'We are building an open-by-default community focused on collective exploration and fun. If you have a need to opt-out of this and be private-by-default you can stake the pro plan and activate private generation with the "/private" command.'
  },
  {
    question: "How does commercial use work?",
    answer:
      'If you have staked and subscribed at any point, you are free to use your images in just about any way you want.'
  },
  {
    question: "Can I cancel my staking subscription plan?",
    answer:
      'You are free to cancel your staking subscription at any time but the unstaking will be possible at the end of a 30 day lock cycle. If you change your mind, you can stake and relock your tokens before the end of the 30 day cycle.'
  },
  {
    question: "Can I change my subscription plan?",
    answer:
      'You are free to change your subscription plan at any time by changing the number of tokens staked and locked, effective immediately. Any remaining hours will be credited to your new plan.'
  },
  {
    question: "Do token taxes apply on staking?",
    answer:
      'There are no token taxes applied in any of the staking, locking, restaking or unstaking events. You will keep exactly the same amount of tokens.'
  },
];

export default function Faqs(props) {
  const [questionIndex, setQuestionIndex] = useState(faqData.length + 1);
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        <div className={styles.left}>
          <h2>AI Is The Future</h2>
          <h3>
            Frequently Asked <span>Questions</span>{" "}
          </h3>
          <div>
            <p>
              Looking for a reliable NFT staking contract, Token staking
              contract or Miner contract ? Look no further than Pixia.
            </p>
            <p>
              Our platform will guide you through the process of creating a
              customized contract that meets your specific needs.
            </p>
            <div className={styles.dotsFrame}>
              <img src={'/assets/imgs/dots-frame.png'} alt="" />
            </div>
          </div>

          {/*
          <div className={styles.btnsCont}>
            <MyButton>Talk to Pixia</MyButton>
          </div>

          <div className={styles.twitterTelegram}>
            <div>
              <p>Twitter</p>
            </div>
            <span className={styles.separator}></span>
            <div>
              <p>Telegram</p>
            </div>
          </div>
          */}
        </div>
        <div className={styles.right}>
          {faqData.map((question, index) => (
            <FaqQuestion
              key={index}
              {...question}
              counter={index}
              open={index === questionIndex ? true : false}
              setOpen={setQuestionIndex}
            ></FaqQuestion>
          ))}
        </div>
      </div>
    </div>
  );
}

const FaqQuestion = ({ question, answer, counter, setOpen, open }) => {
  return (
    <>
      <div className={styles.questionCont}>
        <div className={styles.question}>
          <span>{question}</span>

          {open ? (
            <span
              className={styles.controllerIcon}
              onClick={() => setOpen(faqData.length + 1)}
            >
              <img src={open ? "/assets/imgs/close.svg" : "/assets/imgs/plus-expanded-icon.svg"} alt="" />
            </span>
          ) : (
            <span
              className={styles.controllerIcon}
              onClick={() => setOpen(counter)}
            >
              <img src={open ? "/assets/imgs/close.svg" : "/assets/imgs/plus-expanded-icon.svg"} alt="" />
            </span>
          )}
        </div>
        {open ? <div className={styles.answer}>{answer}</div> : null}
      </div>

      {counter !== faqData.length - 1 ? (
        <div className={styles.separator}></div>
      ) : null}
    </>
  );
};
