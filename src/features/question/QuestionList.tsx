import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';

interface QuestionListProps {
  testId: string;
  onBack: () => void;
}

const QuestionList: React.FC<QuestionListProps> = observer(({ testId, onBack}) => {
  const { questionStore, userStore, testStore } = useStore();
  const userId = userStore.user?.id;
  const [selectedOptions, setSelectedOptions] = useState<{ [questionId: string]: string }>({});

  useEffect(() => {
    questionStore.loadQuestionsWithOptions(testId);
    
  }, [testId, questionStore]);

  const handleOptionChange = (questionId: string, optionId: string) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: optionId,
    }));
  };

  const handleSubmitTest = async () => {
    let totalScore = 0;
  
    questionStore.questionsWithOptions.forEach((questionOption) => {
      const selectedOptionId = selectedOptions[questionOption.questionDto.id];
      const selectedOption = questionOption.optionDtos.find(option => option.id === selectedOptionId);
  
      if (selectedOption && selectedOption.isCorrect) {
        totalScore += questionOption.questionDto.value;
      }
    });
  
    console.log("Total score:", totalScore);
  
    if (userId) {
      await questionStore.submitTestResults(testId, userId, totalScore);
      onBack();
    }
  }

  return (
    <div>
      <h3>testStore.</h3>
      {questionStore.questionsWithOptions.map((questionOption) => (
        <div key={questionOption.questionDto.id}>
          <h3>{questionOption.questionDto.title}</h3>
          {questionOption.optionDtos.map((option) => (
            <label key={option.id}>
              <input
                type="radio"
                name={questionOption.questionDto.id}
                value={option.id}
                onChange={() => handleOptionChange(questionOption.questionDto.id, option.id)}
                checked={selectedOptions[questionOption.questionDto.id] === option.id}
              />
              {option.text}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmitTest}>Submit Test</button>
    </div>
  );
});

export default QuestionList;