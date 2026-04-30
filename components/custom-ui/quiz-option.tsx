"use client";

import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock, Heart } from "lucide-react";

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
  headerAction?: ReactNode;
}

export function QuizOption({
  question,
  onAnswer,
  headerAction,
}: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleOptionClick = (optionId: string) => {
    if (revealed) return;
    setSelectedOption(optionId);
    setRevealed(true);
    onAnswer?.(optionId);
  };

  const handleAnswer = () => {
    setRevealed(true);
  };

  const isCorrect =
    selectedOption !== null && selectedOption === question.correctOptionId;
  const correctOptionText = question.options.find(
    (o) => o.label === question.correctOptionId,
  )?.text;

  const getOptionStyle = (optionLabel: string) => {
    if (!revealed) {
      const isSelected = selectedOption === optionLabel;
      return isSelected
        ? "border-2 border-primary bg-primary/10"
        : "border-2 border-border bg-card hover:border-border/60";
    }

    const isCorrectOption = optionLabel === question.correctOptionId;
    const isSelectedOption = optionLabel === selectedOption;

    if (isCorrectOption) {
      // Always highlight the correct answer green after reveal
      return "border-2 border-green-500 bg-green-500/10";
    }
    if (isSelectedOption && !isCorrect) {
      // Highlight wrong selected answer red
      return "border-2 border-red-500 bg-red-500/10";
    }
    return "border-2 border-border bg-card opacity-50";
  };

  const getLabelStyle = (optionLabel: string) => {
    if (!revealed) {
      const isSelected = selectedOption === optionLabel;
      return isSelected
        ? "border-primary text-primary"
        : "border-border text-foreground";
    }

    const isCorrectOption = optionLabel === question.correctOptionId;
    const isSelectedOption = optionLabel === selectedOption;

    if (isCorrectOption) return "border-green-500 text-green-500";
    if (isSelectedOption && !isCorrect) return "border-red-500 text-red-500";
    return "border-border text-foreground";
  };

  const getTrailingIcon = (optionLabel: string) => {
    if (!revealed) return null;

    const isCorrectOption = optionLabel === question.correctOptionId;
    const isSelectedOption = optionLabel === selectedOption;

    if (isCorrectOption) {
      return (
        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
      );
    }
    if (isSelectedOption && !isCorrect) {
      return (
        <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
      );
    }
    return null;
  };

  return (
    <>
      <div className="w-full rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Question Header */}
        <div className="flex items-start justify-between gap-2 sm:gap-4">
          <h3 className="text-base sm:text-lg font-bold text-foreground flex-1 leading-tight sm:leading-snug">
            <span className="text-sm sm:text-base">{question.id}.</span>{" "}
            {question.question}
          </h3>
          {headerAction}
        </div>

        {/* Options */}
        <div className="space-y-2 sm:space-y-3">
          {question.options.map((option) => (
            <button
              key={option.label}
              onClick={() => handleOptionClick(option.label)}
              disabled={revealed}
              className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-200 flex items-center gap-2.5 sm:gap-4 group ${getOptionStyle(option.label)}`}
            >
              <div
                className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm sm:text-base transition-all ${getLabelStyle(option.label)}`}
              >
                {option.label}
              </div>
              <span className="flex-1 text-foreground font-medium text-sm sm:text-base line-clamp-2">
                {option.text}
              </span>
              {getTrailingIcon(option.label)}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 sm:gap-3 flex-wrap justify-center pt-1 sm:pt-2">
          <Button
            variant="outline"
            size="sm"
            name="Answer"
            onClick={handleAnswer}
            disabled={revealed}
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

          {/* Explain button: opens modal */}
          <Button
            variant="outline"
            size="sm"
            name="Explain"
            onClick={() => setShowExplanationModal(true)}
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
                isFavorite ? "fill-rose-500 stroke-rose-500" : "fill-none"
              }`}
            />
          </Button>
        </div>
      </div>

      {/* Explanation Modal */}
      <Dialog
        open={showExplanationModal}
        onOpenChange={setShowExplanationModal}
      >
        <DialogContent className="bg-card border-border max-w-sm px-2">
          <DialogHeader>
            <DialogTitle className="text-foreground">ব্যাখ্যা</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-foreground leading-relaxed">
              {question.explanation ?? "এই প্রশ্নের জন্য কোনো ব্যাখ্যা নেই।"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function CircleIcon({ size }: { size: number }) {
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
