import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Slider.css';
import Item from './Item';
import { useSwipeable } from 'react-swipeable';
import logo from '../src/images/BrainForge-logo.png';

const Slider = ({quizSettings}) => {
  const [active, setActive] = useState(0);
  const items = Array.from({ length: 5 }, (_, i) => `Question ${i + 1}`);
  const [questions, setQuestions] = useState(Array(5).fill({ question: '', options: [] }));
  const navigate = useNavigate();

  //function to alert loosing progress on navigating back
  const handleAlert = (event) => {
    event.preventDefault(); 
    const userConfirmed = window.confirm('You will lose your current progress.\n Are you sure you want to go back to the home page?');
    if (userConfirmed) {
      navigate('/'); // Manually navigate after confirmation
    }
  };


  //fetching questions and options from API
  const fetchQuizQuestions = async () => {
    const { topic, difficulty } = quizSettings;
    const fetchedQuestions = [];

    for (let i = 0; i < 5; i++) {
      const prompt = `Generate a multiple-choice quiz question about ${topic} for a ${difficulty} level. The question should have 4 answer options with one correct answer clearly marked.

Example format:
Question: [Your question here]
a) Option 1
b) Option 2
c) Option 3
d) Option 4
Correct Answer: [Correct option]`;

    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      if (!apiKey) {
        throw new Error('API Key is not defined.');
      }

      console.log('Using API Key:', apiKey);

      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          prompt: prompt,
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        // Log detailed error response
        const errorData = await response.json();
        console.error('API error details:', errorData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const text = data.choices[0].text.trim();
        const [questionPart, ...optionsParts] = text.split('\n').filter(part => part.trim());
        const question = questionPart.replace('Question: ', '');
        const options = optionsParts.slice(0, 4).map(option => option.slice(3).trim());

        fetchedQuestions.push({ question, options });
      } else {
        console.error('No choices found in the API response');
        fetchedQuestions.push({ question: 'Error fetching question', options: [] });
        }
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
        fetchedQuestions.push({ question: 'Error fetching question', options: [] });
      }
    }

    setQuestions(fetchedQuestions);
  };

  useEffect(() => {
    fetchQuizQuestions();
  }, [quizSettings]);


  //event listener for arrow keys
  useEffect(() => {
    loadShow();
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [active]);


  //slider frontend load
  const loadShow = () => {
    const sliderItems = document.querySelectorAll('.slider .item');
    let stt = 0;

    sliderItems[active].style.transform = 'none';
    sliderItems[active].style.zIndex = 1;
    sliderItems[active].style.filter = 'none';
    sliderItems[active].style.opacity = 1;

    for (let i = active + 1; i < sliderItems.length; i++) {
      stt++;
      sliderItems[i].style.transform = `translateX(${160 * stt}px) scale(${1 - 0.2 * stt}) perspective(30px) rotateY(-0.5deg)`;
      sliderItems[i].style.zIndex = -stt;
      sliderItems[i].style.filter = 'blur(5px)';
      sliderItems[i].style.opacity = stt > 2 ? 0 : 0.6;
    }

    stt = 0;
    for (let i = active - 1; i >= 0; i--) {
      stt++;
      sliderItems[i].style.transform = `translateX(${-160 * stt}px) scale(${1 - 0.2 * stt}) perspective(30px) rotateY(0.5deg)`;
      sliderItems[i].style.zIndex = -stt;
      sliderItems[i].style.filter = 'blur(5px)';
      sliderItems[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
  };

  //function to set next card item active
  const nextSlide = () => {
    setActive((prev) => (prev + 1 < items.length ? prev + 1 : prev));
  };

  //function to set previous card item active
  const prevSlide = () => {
    setActive((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  //function to add event listener on keyUp
  const handleKeyUp = (event) => {
    if (event.key === 'ArrowRight') {
      nextSlide();
    }
    if (event.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  //function to handle swipe event on card items
  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide, // Trigger nextSlide on left swipe
    onSwipedRight: prevSlide, // Trigger prevSlide on right swipe
  });

  return (
    <div>
    <Link to="/" onClick={handleAlert}>
        <img src={logo} alt='logo' />
    </Link>
    <div className="slider" {...swipeHandlers}>
      
      {items.map((item, index) => (
        <Item key={index} content={item} ques={questions[index].question} options={questions[index].options} />
      ))}
      <button id="next" onClick={prevSlide}> &lt; </button>
      <button id="prev" onClick={nextSlide}> &gt; </button>
    </div>
    </div>
  );
};

export default Slider;