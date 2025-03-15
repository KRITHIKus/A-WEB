import { useState } from "react";
import { motion } from "framer-motion";
import ResponseForm from "./ResponseForm";
import React from "react";

const chapters = [
  {
    title: "To You, The One Who Made My Heart Pause",
    content: `I never planned to fall for you. But love doesn’t follow plans—it just happens.
              It all started back in our 3rd semester. I saw you sitting alone on a bench, lost in your own world. 
              You weren’t talking much, and I kept wondering—why is she always alone? A part of me wanted to go up to you, 
              sit beside you, and say something—anything. But I didn’t. I just watched from a distance, 
              overthinking every word I never said.`
  },
  {
    title: "How It All Started",
    content: `I was never the kind of person who could just walk up to someone and start a conversation. 
              I struggled to talk to girls, and yet, without ever speaking a word to you, I found myself drawn to you. 
              People say you need a reason to fall in love. I don’t believe that. Love isn’t logic; it’s a feeling. 
              And feelings don’t need explanations.`
  },
  {
    title: "Building Myself for You",
    content: `But I knew one thing—I wasn’t ready. Love isn’t just about emotions; 
              it’s also about being worthy of the person you love. 
              So I made a promise to myself: I would build my career first, grow as a person, 
              and then, when I felt ready, I would tell you.
              
              I waited. I worked. Brick by brick, I built a foundation for myself. 
              And finally, in our 6th semester, I had the courage to tell you how I felt.`
  },
  {
    title: "But I Failed",
    content: `I just said “I love you” and walked away. I didn’t tell you who I am, what you mean to me, 
              or why I chose this moment to speak. You don’t know my story. 
              You don’t know the countless days I spent gathering the courage to face you. 
              And that’s my fault—not yours.`
  },
  {
    title: "What You Mean to Me",
    content: `You weren’t just another person in my class. You were someone special.
              I saw how you carried yourself—always calm, always smiling. 
              You spoke to people with kindness, with warmth. And that made you stand out.
              
              I never stalked you. I never tried to intrude into your life. But I noticed things—the little things. 
              Like the way you smiled at people, the way you treated everyone with respect, 
              the way your presence felt like a quiet reassurance.
              
              For me, you became a silent motivation. Just by existing, you made my world a little brighter.`
  },
  {
    title: "What Love Means to Me",
    content: `People define love in many ways. Some say it’s about sharing and caring. 
              Others say it’s about finding happiness in another person.
              
              For me, love is growth. Love isn’t just about looking at someone and feeling butterflies—it’s about 
              two people learning, evolving, and becoming better versions of themselves together.`
  },
  {
    title: "Love is Like the Sky and the Sea",
    content: `Love is like the sky and the sea. The sky doesn’t own the sea, and the sea doesn’t belong to the sky. 
              But when they meet at the horizon, they create something breathtaking.
              
              Love should be the same—two people standing side by side, lifting each other, but never trapping one another.`
  },
  {
    title: "Before You Choose Your Answer",
    content: `I don’t know what your answer will be. But I want you to know this—no matter what you choose, I respect you.
              
              If your answer is yes, I will consider myself the luckiest person alive. 
              If your answer is no, I will accept it with grace, because love is not about forcing someone to feel the same way—it is about respecting their choice.
              
              Life is about moving forward. I am no longer the same boy from the 3rd semester who was afraid to speak. 
              I have grown, I have learned, and I have accepted that some stories are meant to be lived, not owned.
              
              You are a chapter in my life that I will cherish, whether or not we write the next page together.`
  },
  {
    title: "My Final Words",
   content: (
      <>
        If I failed, then I failed because I did not take the time to let you know me.
        That is my fault, not yours. I should have pushed myself harder, but I didn’t. And for that, I take responsibility.
        <br />
        <br />
        Whatever your answer is, I will leave this moment with nothing but respect for you.
        Because real love is never selfish—it just wishes the best for the person it loves.
        And so, I ask you—

        <br />
        <br />
        <motion.span
          className="block mt-4 text-lg font-bold text-blue-600"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          Will you take this journey with me?
        </motion.span>
      </>
    ),
  }

];

const Chapter: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < chapters.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen p-6 bg-gray-50">
      <motion.div
        key={currentIndex}
        className="max-w-3xl p-6 bg-white shadow-lg rounded-lg transition-all duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {chapters[currentIndex].title}
        </h2>
        <p className="text-gray-600 leading-relaxed">{chapters[currentIndex].content}</p>
      </motion.div>

      <div className="mt-9 flex gap-4">
        {currentIndex > 0 && (
          <motion.button
            className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition"
            onClick={prevSlide}
            whileTap={{ scale: 0.95 }}
          >
            Previous
          </motion.button>
        )}

        {currentIndex < chapters.length - 1 ? (
          <motion.button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={nextSlide}
            whileTap={{ scale: 0.95 }}
          >
            Next
          </motion.button>
        ) : (
          <ResponseForm />
        )}
      </div>
    </div>
  );
};

export default Chapter;
