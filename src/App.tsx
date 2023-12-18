// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './words.json';

import './App.css';

const shuffleArray = (array: any[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const App: React.FC = () => {
  const [phrases, setPhrases] = useState(data.phrases);
  const [index, setIndex] = useState<number>(-1);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);

  useEffect(() => {
    const shuffledPhrases = shuffleArray(data.phrases);
    setPhrases(shuffledPhrases);
    showNextCard();
  }, []);

  const showNextCard = () => {
    if (index < phrases.length - 1) {
      setIndex(index + 1);
      setShowTranslation(false);
    } else {
      alert('Вы достигли конца списка слов.');
    }
  };

  const handleShowTranslation = () => {
    setShowTranslation(true);
  };

  return (
    <Container className="mt-5 text-center">
      {index !== -1 && (
        <Card className={`card ${showTranslation ? 'flipped' : ''}`}>
          <Card.Body>
            <Card.Title>{phrases[index].russian}</Card.Title>
            {!showTranslation && (
              <Button variant="primary" onClick={handleShowTranslation}>
                Показать перевод
              </Button>
            )}
            {showTranslation && (
              <Card.Text className="mt-3">{phrases[index].english}</Card.Text>
            )}
          </Card.Body>
        </Card>
      )}
      <Button className="mt-3" variant="success" onClick={showNextCard}>
        Next
      </Button>
    </Container>
  );
};

export default App;
