"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb, CheckCircle2, XCircle, Clock, Heart } from "lucide-react";

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation?: string;
}

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer?: (optionId: string) => void;
}

export function QuizOption({ question, onAnswer }: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleOptionClick = (optionId: string) => {
    setSelectedOption(optionId);
    onAnswer?.(optionId);
  };

  const handleAnswer = () => {
    if (selectedOption) {
      setOpenModal(true);
    }
  };

  const isCorrect = selectedOption === question.correctOptionId;
  const selectedOptionText = question.options.find(
    (opt) => opt.label === selectedOption,
  )?.text;

  return (
    <>
      <div className="w-full rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Question Header */}
        <div className="flex items-start justify-between gap-2 sm:gap-4">
          <h3 className="text-base sm:text-lg font-bold text-foreground flex-1 leading-tight sm:leading-snug">
            <span className="text-sm sm:text-base">{question.id}.</span>{" "}
            {question.question}
          </h3>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="text-border hover:text-destructive transition-colors flex-shrink-0 p-1.5 sm:p-2"
            aria-label="Add to favorites"
          >
            <Circle size={18} />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-2 sm:space-y-3">
          {question.options.map((option) => {
            const isSelected = selectedOption === option.label;
            const highlighted = selectedOption && isSelected;

            return (
              <button
                key={option.label}
                onClick={() => handleOptionClick(option.label)}
                className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-200 flex items-center gap-2.5 sm:gap-4 group ${
                  highlighted
                    ? isCorrect
                      ? "bg-card border-2 border-green-500"
                      : "bg-card border-2 border-red-500"
                    : "border-2 border-border bg-card hover:border-border/60"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm sm:text-base transition-all ${
                    highlighted
                      ? isCorrect
                        ? "border-green-500 bg-transparent text-green-500"
                        : "border-red-500 bg-transparent text-red-500"
                      : "border-border text-foreground group-hover:border-border/70"
                  }`}
                >
                  {option.label}
                </div>
                <span className="flex-1 text-foreground font-medium text-sm sm:text-base line-clamp-2">
                  {option.text}
                </span>
                {highlighted && (
                  <>
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 sm:gap-3 flex-wrap justify-center pt-1 sm:pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAnswer}
            disabled={!selectedOption}
            className="px-4 sm:px-6 py-1.5 sm:py-2 h-auto text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            উত্তর
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="px-3 sm:px-5 py-1.5 sm:py-2 h-auto"
          >
            <Clock size={16} className="sm:w-[18px] sm:h-[18px]" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowExplanation(!showExplanation)}
            className="px-4 sm:px-6 py-1.5 sm:py-2 h-auto text-xs sm:text-sm"
          >
            ব্যাখ্যা
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFavorite(!isFavorite)}
            className="px-3 sm:px-5 py-1.5 sm:py-2 h-auto"
          >
            <Heart
              size={16}
              className={`sm:w-[18px] sm:h-[18px] ${
                isFavorite ? "fill-rose-500 border-transparent" : "fill-none"
              }`}
            />
          </Button>
        </div>

        {/* Explanation Section */}
        {showExplanation && question.explanation && (
          <div className="p-3 sm:p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
            <p className="text-xs sm:text-sm text-foreground leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Answer Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="bg-card border-border max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-green-500">সঠিক!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-500">ভুল</span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">আপনার উত্তর:</p>
              <p className="text-foreground font-semibold">
                {selectedOptionText}
              </p>
            </div>

            {!isCorrect && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  সঠিক উত্তর:
                </p>
                <p className="text-green-500 font-semibold">
                  {
                    question.options.find(
                      (opt) => opt.label === question.correctOptionId,
                    )?.text
                  }
                </p>
              </div>
            )}

            {question.explanation && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">ব্যাখ্যা:</p>
                <p className="text-sm text-foreground leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Circle({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
