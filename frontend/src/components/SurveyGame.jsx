import { useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { surveyQuestions } from '../data/questions';
import { saveSurveyResponse } from '../lib/saveResponse';
import Mascot from './Mascot';
import ProgressMission from './ProgressMission';
import RippleButton from './RippleButton';

const moodsByStep = ['curious', 'happy', 'curious', 'happy', 'clap', 'wink', 'celebrate'];

function hasAnswer(question, value) {
  if (!question) {
    return false;
  }

  if (question.type !== 'choice') {
    return Boolean(value);
  }

  if (question.multiple) {
    return Array.isArray(value) && value.length > 0;
  }

  return Boolean(value);
}

function normalizeValue(value) {
  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : null;
  }

  return value || null;
}

export default function SurveyGame({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const question = surveyQuestions[step];
  const totalSteps = surveyQuestions.length;
  const missionCount = Math.min(step + 1, totalSteps);

  const canGoNext = useMemo(() => hasAnswer(question, answers[question?.id]), [answers, question]);

  if (!open) {
    return null;
  }

  function setAnswer(value) {
    setAnswers((prev) => {
      if (question.type === 'choice' && question.multiple) {
        const current = Array.isArray(prev[question.id]) ? prev[question.id] : [];
        const nextValues = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
        return { ...prev, [question.id]: nextValues };
      }

      return { ...prev, [question.id]: value };
    });
  }

  function next() {
    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
      return;
    }

    submit();
  }

  function back() {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  }

  async function submit() {
    setLoading(true);
    setError('');

    try {
      await saveSurveyResponse({
        userType: normalizeValue(answers.userType),
        phoneBehavior: normalizeValue(answers.phoneBehavior),
        biggestProblem: normalizeValue(answers.biggestProblem),
        wouldUse: normalizeValue(answers.wouldUse),
        excitesMost: normalizeValue(answers.excitesMost),
        suggestions: normalizeValue(answers.suggestions),
        email: normalizeValue(answers.email),
        answers,
        timestamp: new Date().toISOString()
      });
      setDone(true);
    } catch (submitError) {
      setError(submitError.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function resetAndClose() {
    setStep(0);
    setAnswers({});
    setDone(false);
    setError('');
    onClose();
  }

  return (
    <section className="fixed inset-0 z-50 overflow-y-auto bg-zuvvy-white/95 p-4 backdrop-blur-md md:p-8">
      <div className="mx-auto max-w-3xl rounded-[30px] border border-zuvvy-purple/30 bg-gradient-to-br from-zuvvy-white via-zuvvy-blue/10 to-zuvvy-teal/10 p-6 shadow-bubble md:p-8">
        {!done ? (
          <>
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="font-heading text-sm text-zuvvy-ink">Mission {missionCount}</p>
                <h3 className="font-heading text-2xl text-zuvvy-ink md:text-3xl">{question.prompt}</h3>
                {question.type === 'choice' && question.multiple ? (
                  <p className="mt-2 text-sm text-zuvvy-ink/70">Choose all that apply.</p>
                ) : null}
              </div>
              <Mascot mood={moodsByStep[step] || 'happy'} className="h-24 w-24 md:h-28 md:w-28" />
            </div>

            <ProgressMission currentStep={missionCount} totalSteps={totalSteps} />

            <div className="mt-6 space-y-4">
              {question.type === 'choice' && (
                <div className="grid gap-3 md:grid-cols-2">
                  {question.options.map((option) => {
                    const answerValue = answers[question.id];
                    const selected = question.multiple
                      ? Array.isArray(answerValue) && answerValue.includes(option.value)
                      : answerValue === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setAnswer(option.value)}
                        className={`relative rounded-3xl border-2 p-4 pr-12 text-left font-heading text-lg transition hover:-translate-y-1 ${
                          selected
                            ? 'border-zuvvy-purple bg-zuvvy-purple/15 shadow-soft'
                            : 'border-zuvvy-blue/45 bg-zuvvy-white hover:border-zuvvy-teal'
                        }`}
                      >
                        {question.multiple ? (
                          <span
                            className={`absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full border transition ${
                              selected
                                ? 'border-zuvvy-purple bg-zuvvy-purple text-zuvvy-white'
                                : 'border-zuvvy-blue/40 bg-zuvvy-white text-transparent'
                            }`}
                          >
                            <Check size={16} />
                          </span>
                        ) : null}
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {question.type === 'text' && (
                <textarea
                  rows="4"
                  className="w-full rounded-3xl border-2 border-zuvvy-blue/45 bg-zuvvy-white p-4 font-body text-zuvvy-ink outline-none transition focus:border-zuvvy-purple focus:shadow-[0_0_0_4px_rgba(108,92,231,0.25)]"
                  placeholder={question.placeholder}
                  value={answers[question.id] || ''}
                  onChange={(event) => setAnswer(event.target.value)}
                />
              )}

              {question.type === 'email' && (
                <input
                  type="email"
                  className="w-full rounded-3xl border-2 border-zuvvy-blue/45 bg-zuvvy-white p-4 font-body text-zuvvy-ink outline-none transition focus:border-zuvvy-purple focus:shadow-[0_0_0_4px_rgba(108,92,231,0.25)]"
                  placeholder={question.placeholder}
                  value={answers[question.id] || ''}
                  onChange={(event) => setAnswer(event.target.value)}
                />
              )}
            </div>

            {error && <p className="mt-4 rounded-2xl bg-zuvvy-yellow/45 p-3 text-sm text-zuvvy-ink">{error}</p>}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="rounded-full border border-zuvvy-blue bg-zuvvy-white px-5 py-2 font-heading text-zuvvy-ink transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Back
              </button>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="rounded-full border border-zuvvy-blue/60 bg-zuvvy-white px-5 py-2 font-heading text-zuvvy-ink transition hover:-translate-y-1"
                >
                  Pause Mission
                </button>
                <RippleButton
                  className="bg-zuvvy-yellow hover:-translate-y-1"
                  onClick={next}
                  disabled={loading || !canGoNext}
                >
                  {step === totalSteps - 1 ? (loading ? 'Sending...' : 'Send My Ideas to Zuvvy!') : 'Next Mission'}
                </RippleButton>
              </div>
            </div>
          </>
        ) : (
          <div className="relative overflow-hidden rounded-3xl bg-zuvvy-white p-6 text-center md:p-10">
            <div className="confetti-wrap" aria-hidden="true">
              {Array.from({ length: 28 }).map((_, index) => (
                <span
                  key={index}
                  className="confetti-piece"
                  style={{
                    left: `${(index % 14) * 7}%`,
                    animationDelay: `${(index % 7) * 0.12}s`
                  }}
                />
              ))}
            </div>

            <Mascot mood="celebrate" className="mx-auto h-28 w-28 md:h-36 md:w-36" />
            <h3 className="mt-5 font-heading text-3xl text-zuvvy-ink">You unlocked the future!</h3>
            <p className="mx-auto mt-3 max-w-xl text-lg text-zuvvy-ink">
              You just helped build a better creative internet for kids.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <RippleButton className="bg-zuvvy-yellow hover:-translate-y-1" onClick={resetAndClose}>
                Return to Playground
              </RippleButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
