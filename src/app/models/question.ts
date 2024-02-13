export interface QuestionDto {
    id: string;
    title: string;
    value: number;
    testId: string;
}

export interface OptionDtos {
    id: string;
    text: string;
    isCorrect: boolean;
    questionId: string;
}


export interface QuestionOption {
    questionDto: QuestionDto;
    optionDtos: OptionDtos[];
}