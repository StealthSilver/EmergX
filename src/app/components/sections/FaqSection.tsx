"use client";

import { useState } from "react";
import { faqContent } from "@/lib/data/faq.data";

const ACCENT_COLOR = "#60189b";

function FaqDivider() {
  return (
    <hr
      className="faq-divider"
      aria-hidden
    />
  );
}

type FaqItemProps = {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

function FaqItem({ question, answer, index, isOpen, onToggle }: FaqItemProps) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="faq-item">
      <button
        id={buttonId}
        type="button"
        className="faq-question-btn"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span
          className="faq-bullet"
          style={{ backgroundColor: ACCENT_COLOR }}
          aria-hidden
        />
        <span className="faq-question">{question}</span>
        <span
          className="faq-toggle"
          style={{ backgroundColor: ACCENT_COLOR }}
          aria-hidden
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`faq-answer-panel${isOpen ? " faq-answer-panel--open" : ""}`}
      >
        <p className="faq-answer">{answer}</p>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="w-full bg-black px-7 py-24 font-primary text-white sm:py-32"
      aria-labelledby="faq-heading"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="faq-heading"
          className="text-center text-4xl font-medium leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          Frequently Asked Questions
        </h2>

        <div className="faq-list mt-14 sm:mt-16">
          <FaqDivider />

          {faqContent.map((item, index) => (
            <div key={item.question}>
              <FaqItem
                question={item.question}
                answer={item.answer}
                index={index}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
              <FaqDivider />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
