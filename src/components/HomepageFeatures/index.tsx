import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: ReactNode;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Тест на уровень',
    emoji: '🎯',
    description: (
      <>
        Не знаешь с чего начать? Пройди тест — получи рекомендацию стартовой статьи под твой уровень.
      </>
    ),
    link: '/test',
  },
  {
    title: 'Треки обучения',
    emoji: '📚',
    description: (
      <>
        От Junior до Senior. Выбери трек и двигайся по нему последовательно, от простого к сложному.
      </>
    ),
    link: '/tracks',
  },
];

function Feature({title, emoji, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{emoji} {title}</Heading>
        <p>{description}</p>
        <Link to={link} className="button button--outline button--primary">
          Перейти
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
