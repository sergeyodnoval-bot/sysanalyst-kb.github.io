import React, {useState, useMemo} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import questionsData from '@site/tests/level-test.json';

interface Question {
  id: string;
  text: string;
  options: string[];
  correct: number;
  maps_to: string;
}

interface TestResult {
  wrongCount: number;
  userLevel: number;
  recommendedArticle: string;
}

function calculateResult(
  answers: Map<string, number>,
  questions: Question[],
): TestResult {
  const wrongArticleIds: Set<string> = new Set();

  for (const q of questions) {
    const userAnswer = answers.get(q.id);
    if (userAnswer === undefined || userAnswer !== q.correct) {
      wrongArticleIds.add(q.maps_to);
    }
  }

  if (wrongArticleIds.size === 0) return {wrongCount: 0, userLevel: 7, recommendedArticle: ''};

  const articleLevels: Record<string, number> = {
    'basics/client-server': 1,
    'basics/http-protocol': 2,
    'modeling/bpmn': 3,
    'integration/api-rest-basics': 4,
    'integration/api-openapi': 5,
  };

  let minLevel = Infinity;
  for (const id of wrongArticleIds) {
    const level = articleLevels[id];
    if (level && level < minLevel) minLevel = level;
  }

  const userLevel = minLevel === Infinity ? 1 : Math.max(1, minLevel - 1);

  const sortedArticles = Object.entries(articleLevels)
    .sort(([, a], [, b]) => a - b);

  const recommended = sortedArticles.find(([, lvl]) => lvl <= userLevel + 1);
  const recommendedArticle = recommended ? recommended[0] : sortedArticles[0][0];

  return {wrongCount: wrongArticleIds.size, userLevel, recommendedArticle};
}

export default function LevelTest(): React.ReactElement {
  const questions = questionsData.questions as Question[];
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Map<string, number>>(new Map());
  const [finished, setFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const result = useMemo(() => calculateResult(answers, questions), [answers]);

  function handleAnswer(optionIndex: number) {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);

    const newAnswers = new Map(answers);
    newAnswers.set(questions[currentQ].id, optionIndex);
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOption(null);
      } else {
        setFinished(true);
      }
    }, 800);
  }

  function restart() {
    setCurrentQ(0);
    setAnswers(new Map());
    setFinished(false);
    setSelectedOption(null);
  }

  if (finished) {
    const articleNames: Record<string, string> = {
      'basics/client-server': 'Клиент-серверная архитектура',
      'basics/http-protocol': 'HTTP — протокол передачи данных',
      'modeling/bpmn': 'BPMN — моделирование бизнес-процессов',
      'integration/api-rest-basics': 'Основы REST API',
      'integration/api-openapi': 'Документирование API со спецификацией OpenAPI',
    };

    return (
      <Layout title="Результат теста" description="Результаты теста на определение уровня">
        <div className="container" style={{paddingTop: '2rem', paddingBottom: '2rem', maxWidth: 600}}>
          <h1>🎯 Ваш результат</h1>
          <p>
            Правильных ответов: <strong>{questions.length - result.wrongCount}</strong> из{' '}
            <strong>{questions.length}</strong>
          </p>
          <p>
            Ваш уровень: <strong>{result.userLevel}</strong> из 7
          </p>
          {result.recommendedArticle && (
            <div className="alert alert--info" style={{marginTop: '1rem'}}>
              <strong>Рекомендуемая стартовая статья:</strong>
              <div style={{marginTop: '0.5rem'}}>
                <Link to={`/docs/${result.recommendedArticle}`}>
                  {articleNames[result.recommendedArticle] || result.recommendedArticle}
                </Link>
              </div>
            </div>
          )}
          <button className="button button--primary" onClick={restart} style={{marginTop: '1rem'}}>
            Пройти заново
          </button>
        </div>
      </Layout>
    );
  }

  const question = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;

  return (
    <Layout title="Тест на уровень" description="Определите свой уровень системного аналитика">
      <div className="container" style={{paddingTop: '2rem', paddingBottom: '2rem', maxWidth: 600}}>
        <h1>🎯 Тест на уровень</h1>
        <p>
          Вопрос {currentQ + 1} из {questions.length}
        </p>

        <div style={{
          width: '100%',
          height: 8,
          background: '#e5e7eb',
          borderRadius: 4,
          marginBottom: '1.5rem',
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: '#4f8ef7',
            borderRadius: 4,
            transition: 'width 0.3s',
          }} />
        </div>

        <h2 style={{fontSize: '1.25rem', marginBottom: '1.5rem'}}>{question.text}</h2>

        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          {question.options.map((option, idx) => {
            let bg = '#fff';
            let border = '#d1d5db';
            if (selectedOption !== null) {
              if (idx === question.correct) {
                bg = '#f0fdf4';
                border = '#22c55e';
              } else if (idx === selectedOption && idx !== question.correct) {
                bg = '#fef2f2';
                border = '#ef4444';
              } else {
                bg = '#f9fafb';
                border = '#e5e7eb';
              }
            }
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selectedOption !== null}
                style={{
                  padding: '12px 16px',
                  background: bg,
                  border: `2px solid ${border}`,
                  borderRadius: 8,
                  cursor: selectedOption !== null ? 'default' : 'pointer',
                  textAlign: 'left',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
